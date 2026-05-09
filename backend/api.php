<?php
/**
 * ZAHIDAAN - Order API Bridge
 * Handles create_order, status, confirm, cancel, health.
 */

// --- CONFIGURATION ---
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
define('DB_NAME', 'pehchanl1_zahidaan_db');
define('DB_USER', 'pehchanl1_zahidaan_user');
define('DB_PASS', 'Client@HYDERABAD1');

define('SANITY_PROJECT_ID', 'paf2xup3');
define('SANITY_DATASET', 'production');
define('SANITY_TOKEN', 'skvJcjixH3WvYa2Tq7YIPex4DEAPaOX927SkDmVwuiT9Kue7Wu27775nqphzWArK6PqFMoYpzbTUKHtr2s1CkUw1AjuxFjw7dAfjy2kcnlaGJGQ92bu4p02TZaaNv4FcqfLCdXJ2K6lLQK6g8kSdZqnEq1alFS7Kk7Hp3Tu8qeOG0ULeMQag');

define('LOCAL_PINCODES', ['502307', '502319', '502313', '500032', '500075', '500019', '500090']);
define('COD_MINIMUM', 59900);
define('COD_CHARGE', 6000);
define('FREE_SHIPPING_THRESHOLD', 99900);
define('SHIPPING_CHARGE', 7900);

require_once 'mail.php';

// --- UTILITIES ---

function pushToSanity(array $order): void {
    $sanityItems = [];
    foreach ($order['items'] as $item) {
        $sanityItems[] = [
            '_key' => bin2hex(random_bytes(8)),
            'productId' => $item['product_id'],
            'name' => $item['name'],
            'size' => $item['size'],
            'quantity' => (int)$item['qty'],
            'price' => (float)$item['price'] // Already in Rupees
        ];
    }

    $doc = [
        '_type' => 'order',
        'orderNumber' => 'Z' . str_pad($order['id'], 5, '0', STR_PAD_LEFT),
        'customer' => [
            'name' => $order['customer_name'],
            'phone' => $order['customer_phone'],
            'email' => $order['customer_email'] ?: 'no-email@zahidaan.in',
            'address' => $order['address_line'],
            'city' => $order['city'],
            'state' => $order['state'],
            'pincode' => $order['pincode']
        ],
        'items' => $sanityItems,
        'totals' => [
            'subtotal' => (float)($order['subtotal_paise'] / 100),
            'shipping' => (float)($order['shipping_paise'] / 100),
            'total' => (float)($order['total_paise'] / 100)
        ],
        'payment' => [
            'method' => $order['payment_method'],
            'paymentStatus' => 'pending'
        ],
        'status' => 'pending'
    ];

    $url = "https://" . SANITY_PROJECT_ID . ".api.sanity.io/v1/data/mutate/" . SANITY_DATASET;
    $payload = json_encode(['mutations' => [['create' => $doc]]]);

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'Authorization: Bearer ' . SANITY_TOKEN
    ]);
    curl_exec($ch);
    curl_close($ch);
}

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

function checkRateLimit(): void {
    $logDir = __DIR__ . '/logs';
    if (!is_dir($logDir)) mkdir($logDir, 0755, true);
    $file = $logDir . '/rate_limits.json';
    $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    $now = time();
    $window = 3600;

    $data = file_exists($file) ? json_decode(file_get_contents($file), true) : [];
    foreach ($data as $storedIp => $attempts) {
        $data[$storedIp] = array_filter($attempts, function($ts) use ($now, $window) {
            return $ts > ($now - $window);
        });
        if (empty($data[$storedIp])) unset($data[$storedIp]);
    }
    if (isset($data[$ip]) && count($data[$ip]) >= 10) {
        http_response_code(429);
        die(json_encode(['success' => false, 'error' => 'Too many order attempts.']));
    }
    $data[$ip][] = $now;
    file_put_contents($file, json_encode($data));
}

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
        echo json_encode(['status' => 'ok', 'db' => $dbStatus]);
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

    $name    = sanitize($input['name'] ?? '');
    $phone   = sanitize($input['phone'] ?? '', 'phone');
    $email   = sanitize($input['email'] ?? '', 'email');
    $address = sanitize($input['address'] ?? '');
    $area    = sanitize($input['area'] ?? '');
    $city    = sanitize($input['city'] ?? '');
    $state   = sanitize($input['state'] ?? '');
    $pincode = sanitize($input['pincode'] ?? '', 'pincode');
    $pm      = $input['payment_method'] ?? 'upi';

    if (empty($name) || strlen($phone) < 10) {
        echo json_encode(['success' => false, 'error' => 'Missing customer details']);
        return;
    }

    $deliveryType = in_array($pincode, LOCAL_PINCODES) ? 'local' : 'pan_india';
    
    // Convert to Paise immediately
    $subtotal = (int)($input['subtotal'] ?? 0) * 100; 
    $shipping = ($deliveryType === 'local' || $subtotal >= FREE_SHIPPING_THRESHOLD) ? 0 : SHIPPING_CHARGE;
    $codCharge = ($pm === 'cod' && $deliveryType === 'pan_india') ? COD_CHARGE : 0;
    $total = $subtotal + $shipping + $codCharge;

    $orderToken = bin2hex(random_bytes(16));
    $confirmToken = bin2hex(random_bytes(16));

    try {
        $db = getDB();
        $db->beginTransaction();

        $stmt = $db->prepare("INSERT INTO orders (order_token, confirm_token, customer_name, customer_phone, customer_email, address_line, area, city, state, pincode, delivery_type, payment_method, subtotal_paise, shipping_paise, cod_charge_paise, total_paise, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')");
        $stmt->execute([$orderToken, $confirmToken, $name, $phone, $email, $address, $area, $city, $state, $pincode, $deliveryType, $pm, $subtotal, $shipping, $codCharge, $total]);
        
        $orderId = $db->lastInsertId();

        $itemStmt = $db->prepare("INSERT INTO order_items (order_id, product_id, product_name, size, quantity, unit_price_paise, line_total_paise) VALUES (?, ?, ?, ?, ?, ?, ?)");
        $items = $input['items'] ?? [];
        foreach ($items as $item) {
            $itemRupees = (float)($item['price'] ?? 0);
            $itemPaise = (int)($itemRupees * 100);
            $qty = (int)($item['qty'] ?? 1);
            $itemStmt->execute([$orderId, $item['product_id'], $item['name'], $item['size'], $qty, $itemPaise, $itemPaise * $qty]);
        }

        logStatusChange($orderId, null, 'pending', 'system', 'Order created');
        $db->commit();

        $orderData = [
            'id' => $orderId,
            'confirm_token' => $confirmToken,
            'customer_name' => $name,
            'customer_phone' => $phone,
            'customer_email' => $email,
            'address_line' => $address,
            'city' => $city,
            'state' => $state,
            'pincode' => $pincode,
            'payment_method' => $pm,
            'subtotal_paise' => $subtotal,
            'shipping_paise' => $shipping,
            'total_paise' => $total,
            'items' => $items // Contains original Rupees for Sanity
        ];
        
        pushToSanity($orderData);
        sendOwnerNotification($orderData, $items, ""); 

        echo json_encode(['success' => true, 'order_id' => $orderId, 'order_token' => $orderToken, 'redirect' => "/order-status/?token=$orderToken"]);

    } catch (Exception $e) {
        if (isset($db) && $db->inTransaction()) $db->rollBack();
        logError('CREATE_ORDER', $e->getMessage());
        echo json_encode(['success' => false, 'error' => 'Database error: ' . $e->getMessage()]);
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
    if (strlen($token) !== 32) die("Invalid token.");
    $db = getDB();
    $stmt = $db->prepare("SELECT id, status, customer_name, customer_email, total_paise, address_line, area, city, pincode FROM orders WHERE confirm_token = ? AND confirm_used = 0 AND deleted_at IS NULL");
    $stmt->execute([$token]);
    $order = $stmt->fetch();
    if (!$order) die("Invalid link.");
    $oldStatus = $order['status'];
    $timestampField = ($newStatus === 'confirmed') ? 'confirmed_at' : 'cancelled_at';
    $update = $db->prepare("UPDATE orders SET status = ?, confirm_used = 1, $timestampField = NOW(), updated_at = NOW() WHERE id = ?");
    $update->execute([$newStatus, $order['id']]);
    logStatusChange($order['id'], $oldStatus, $newStatus, 'owner');
    if ($newStatus === 'confirmed') {
        $itemStmt = $db->prepare("SELECT product_name, size, quantity FROM order_items WHERE order_id = ?");
        $itemStmt->execute([$order['id']]);
        $items = $itemStmt->fetchAll();
        sendCustomerConfirmation($order, $items);
        echo "<h1>Order #{$order['id']} confirmed ✓</h1>";
    } else {
        echo "<h1>Order #{$order['id']} cancelled.</h1>";
    }
}
