<?php
/**
 * ZAHIDAAN - Order API Bridge
 * Handles create_order, status, confirm, cancel, health.
 */

// --- CONFIGURATION ---
// Allow local development (localhost) and production domain
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$allowedOrigins = ['https://zahidaan.in', 'http://localhost:3000', 'http://127.0.0.1:3000'];

if (in_array($origin, $allowedOrigins)) {
    header("Access-Control-Allow-Origin: $origin");
} else {
    header("Access-Control-Allow-Origin: https://zahidaan.in");
}

header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit;

define('DB_HOST', 'localhost');
define('DB_NAME', 'zahidaan_db');
define('DB_USER', 'zahidaan_user');
define('DB_PASS', 'STRONG_PASSWORD_TBD'); // [TBD] Update before launch

define('LOCAL_PINCODES', ['502307', '502319', '502313', '500032', '500075', '500019', '500090']);
define('COD_MINIMUM', 59900);       // in paise (₹599) [TBD]
define('COD_CHARGE', 6000);        // in paise (₹60)  [TBD]
define('FREE_SHIPPING_THRESHOLD', 99900); // in paise (₹999) [TBD]
define('SHIPPING_CHARGE', 7900);   // in paise (₹79)  [TBD]

require_once 'mail.php';

// --- UTILITIES ---

function getDB(): PDO {
    static $pdo = null;
    if ($pdo === null) {
        try {
            $pdo = new PDO(
                "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4",
                DB_USER, DB_PASS,
                [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC]
            );
        } catch (PDOException $e) {
            logError('DB', $e->getMessage());
            die(json_encode(['success' => false, 'error' => 'Service unavailable']));
        }
    }
    return $pdo;
}

function logError(string $context, string $message): void {
    $logDir = __DIR__ . '/logs';
    if (!is_dir($logDir)) mkdir($logDir, 0755, true);
    $entry = date('Y-m-d H:i:s') . " [{$context}] {$message}\n";
    file_put_contents($logDir . '/api_errors.log', $entry, FILE_APPEND);
}

/**
 * Basic Rate Limiting
 * Max 10 create_order calls per IP per hour
 */
function checkRateLimit(): void {
    $logDir = __DIR__ . '/logs';
    if (!is_dir($logDir)) mkdir($logDir, 0755, true);
    $file = $logDir . '/rate_limits.json';
    $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    $now = time();
    $window = 3600; // 1 hour

    $data = file_exists($file) ? json_decode(file_get_contents($file), true) : [];
    
    // Cleanup old entries
    foreach ($data as $storedIp => $attempts) {
        $data[$storedIp] = array_filter($attempts, function($ts) use ($now, $window) {
            return $ts > ($now - $window);
        });
        if (empty($data[$storedIp])) unset($data[$storedIp]);
    }

    if (isset($data[$ip]) && count($data[$ip]) >= 10) {
        http_response_code(429);
        die(json_encode(['success' => false, 'error' => 'Too many order attempts. Please try again later.']));
    }

    $data[$ip][] = $now;
    file_put_contents($file, json_encode($data));
}

/**
 * Log order status changes to order_status_log
 */
function logStatusChange(int $orderId, ?string $oldStatus, string $newStatus, string $by = 'system', ?string $note = null): void {
    try {
        $db = getDB();
        $stmt = $db->prepare("INSERT INTO order_status_log (order_id, old_status, new_status, changed_by, note) VALUES (?, ?, ?, ?, ?)");
        $stmt->execute([$orderId, $oldStatus, $newStatus, $by, $note]);
    } catch (Exception $e) {
        logError('AUDIT_LOG', $e->getMessage());
    }
}

function sanitize(string $data, string $type = 'string'): string {
    $data = trim($data);
    switch ($type) {
        case 'phone': return preg_replace('/[^0-9]/', '', $data);
        case 'pincode': return preg_replace('/[^0-9]/', '', $data);
        case 'email': return filter_var($data, FILTER_SANITIZE_EMAIL);
        case 'hex': return preg_replace('/[^a-f0-9]/', '', $data);
        default: return htmlspecialchars(strip_tags($data));
    }
}

function buildWhatsAppOwnerLink(array $order): string {
    $itemsSummary = "";
    foreach ($order['items'] as $item) {
        $itemsSummary .= "{$item['name']} ({$item['size']}) x{$item['qty']} | ";
    }
    $itemsSummary = rtrim($itemsSummary, " | ");

    $msg = "🌿 *New ZAHIDAAN Order #{$order['id']}*\n\n";
    $msg .= "👤 {$order['customer_name']} — {$order['customer_phone']}\n";
    $msg .= "📦 $itemsSummary\n";
    $msg .= "💰 ₹" . number_format($order['total_paise'] / 100, 0) . " — " . strtoupper($order['payment_method']) . "\n";
    $msg .= "📍 {$order['city']}, {$order['pincode']}\n\n";
    $msg .= "✅ Confirm: https://zahidaan.in/api/api.php?action=confirm&token={$order['confirm_token']}";

    return 'https://wa.me/' . preg_replace('/[^0-9]/', '', OWNER_WHATSAPP) . '?text=' . urlencode($msg);
}

// --- ACTIONS ---

$action = $_GET['action'] ?? $_POST['action'] ?? '';

switch ($action) {
    case 'health':
        $dbStatus = 'error';
        try {
            if (getDB()) $dbStatus = 'connected';
        } catch (Exception $e) {
            $dbStatus = 'error: ' . $e->getMessage();
        }
        echo json_encode([
            'status' => 'ok',
            'service' => 'ZAHIDAAN API',
            'db' => $dbStatus,
            'timestamp' => date('c')
        ]);
        break;

    case 'create_order':
        checkRateLimit();
        handleCreateOrder();
        break;

    case 'status':
        handleStatus();
        break;

    case 'confirm':
        handleConfirmCancel('confirmed');
        break;

    case 'cancel':
        handleConfirmCancel('cancelled');
        break;

    default:
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Invalid action']);
        break;
}

function handleCreateOrder() {
    $raw = file_get_contents('php://input');
    $input = json_decode($raw, true);

    if (!$input) {
        echo json_encode(['success' => false, 'error' => 'Invalid JSON payload']);
        return;
    }

    // 1. Sanitize & Validate
    $name    = sanitize($input['name'] ?? '');
    $phone   = sanitize($input['phone'] ?? '', 'phone');
    $email   = sanitize($input['email'] ?? '', 'email');
    $address = sanitize($input['address'] ?? '');
    $area    = sanitize($input['area'] ?? '');
    $city    = sanitize($input['city'] ?? '');
    $state   = sanitize($input['state'] ?? '');
    $pincode = sanitize($input['pincode'] ?? '', 'pincode');
    $pm      = $input['payment_method'] ?? 'upi';

    if (empty($name) || strlen($phone) < 10 || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['success' => false, 'error' => 'Missing or invalid customer details']);
        return;
    }

    // 2. Logic Check
    $deliveryType = in_array($pincode, LOCAL_PINCODES) ? 'local' : 'pan_india';
    
    $subtotal = (int)($input['subtotal'] ?? 0); 
    $shipping = ($deliveryType === 'local' || $subtotal >= FREE_SHIPPING_THRESHOLD) ? 0 : SHIPPING_CHARGE;
    $codCharge = ($pm === 'cod' && $deliveryType === 'pan_india') ? COD_CHARGE : 0;
    
    if ($pm === 'cod' && $deliveryType === 'pan_india' && $subtotal < COD_MINIMUM) {
        echo json_encode(['success' => false, 'error' => 'Minimum order for COD is ₹' . (COD_MINIMUM/100)]);
        return;
    }

    $total = $subtotal + $shipping + $codCharge;

    // 3. Tokens
    $orderToken = bin2hex(random_bytes(16));
    $confirmToken = bin2hex(random_bytes(16));

    // 4. DB Insert
    try {
        $db = getDB();
        $db->beginTransaction();

        $ip = $_SERVER['REMOTE_ADDR'] ?? null;
        $ua = $_SERVER['HTTP_USER_AGENT'] ?? null;

        $stmt = $db->prepare("INSERT INTO orders (order_token, confirm_token, customer_name, customer_phone, customer_email, customer_ip, user_agent, address_line, area, city, state, pincode, delivery_type, payment_method, subtotal_paise, shipping_paise, cod_charge_paise, total_paise, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')");
        $stmt->execute([$orderToken, $confirmToken, $name, $phone, $email, $ip, $ua, $address, $area, $city, $state, $pincode, $deliveryType, $pm, $subtotal, $shipping, $codCharge, $total]);
        
        $orderId = $db->lastInsertId();

        $itemStmt = $db->prepare("INSERT INTO order_items (order_id, product_id, product_name, size, quantity, unit_price_paise, line_total_paise) VALUES (?, ?, ?, ?, ?, ?, ?)");
        $items = $input['items'] ?? [];
        foreach ($items as $item) {
            $itemStmt->execute([
                $orderId, 
                sanitize($item['product_id'] ?? ''), 
                sanitize($item['name'] ?? ''), 
                sanitize($item['size'] ?? ''), 
                (int)($item['qty'] ?? 1), 
                (int)($item['price'] ?? 0), 
                (int)(($item['price'] ?? 0) * ($item['qty'] ?? 1))
            ]);
        }

        // Audit Log for initial status
        logStatusChange($orderId, null, 'pending', 'system', 'Order created');

        $db->commit();

        // 5. Notify Owner
        $orderData = [
            'id' => $orderId,
            'confirm_token' => $confirmToken,
            'customer_name' => $name,
            'customer_phone' => $phone,
            'customer_email' => $email,
            'address_line' => $address,
            'area' => $area,
            'city' => $city,
            'state' => $state,
            'pincode' => $pincode,
            'payment_method' => $pm,
            'subtotal_paise' => $subtotal,
            'shipping_paise' => $shipping,
            'cod_charge_paise' => $codCharge,
            'total_paise' => $total,
            'items' => $items
        ];
        
        $waLink = buildWhatsAppOwnerLink($orderData);
        sendOwnerNotification($orderData, $items, $waLink);

        echo json_encode([
            'success' => true, 
            'order_id' => $orderId, 
            'order_token' => $orderToken, 
            'redirect' => "/order-status/$orderToken"
        ]);

    } catch (Exception $e) {
        if ($db->inTransaction()) $db->rollBack();
        logError('CREATE_ORDER', $e->getMessage());
        echo json_encode(['success' => false, 'error' => 'Database error']);
    }
}

function handleStatus() {
    $token = sanitize($_GET['token'] ?? '', 'hex');
    if (strlen($token) !== 32) {
        echo json_encode(['success' => false, 'error' => 'Invalid token']);
        return;
    }

    $db = getDB();
    $stmt = $db->prepare("SELECT id as order_id, status, updated_at FROM orders WHERE order_token = ? AND deleted_at IS NULL");
    $stmt->execute([$token]);
    $order = $stmt->fetch();

    if (!$order) {
        echo json_encode(['success' => false, 'error' => 'Order not found']);
        return;
    }

    echo json_encode(['success' => true] + $order);
}

function handleConfirmCancel(string $newStatus) {
    $token = sanitize($_GET['token'] ?? '', 'hex');
    if (strlen($token) !== 32) {
        die("Invalid token format.");
    }

    $db = getDB();
    // Check if token exists and is not used
    $stmt = $db->prepare("SELECT id, status, customer_name, customer_email, total_paise, address_line, area, city, pincode FROM orders WHERE confirm_token = ? AND confirm_used = 0 AND deleted_at IS NULL");
    $stmt->execute([$token]);
    $order = $stmt->fetch();

    if (!$order) {
        die("Invalid link or link already used.");
    }

    $oldStatus = $order['status'];
    $timestampField = ($newStatus === 'confirmed') ? 'confirmed_at' : 'cancelled_at';

    // Update status and mark token as used
    $update = $db->prepare("UPDATE orders SET status = ?, confirm_used = 1, $timestampField = NOW(), updated_at = NOW() WHERE id = ?");
    $update->execute([$newStatus, $order['id']]);

    // Audit Log for status change
    logStatusChange($order['id'], $oldStatus, $newStatus, 'owner', 'Owner action via email link');

    // Send customer email if confirmed
    if ($newStatus === 'confirmed') {
        $itemStmt = $db->prepare("SELECT product_name, size, quantity FROM order_items WHERE order_id = ?");
        $itemStmt->execute([$order['id']]);
        $items = $itemStmt->fetchAll();
        sendCustomerConfirmation($order, $items);
        echo "<h1>Order #{$order['id']} confirmed ✓</h1><p>Customer notified.</p>";
    } else {
        echo "<h1>Order #{$order['id']} cancelled.</h1>";
    }
}
