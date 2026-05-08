<?php
/**
 * ZAHIDAAN - PHP API Bridge
 * Handles Order Creation, Status Polling, and Confirmation.
 */

require_once 'config.php';

// Allow CORS for local development and production frontend
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json");

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

/**
 * getDB()
 */
function getDB() {
    static $pdo = null;
    if ($pdo === null) {
        $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4";
        $options = [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ];
        try {
            $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
        } catch (\PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Database connection failed']);
            exit;
        }
    }
    return $pdo;
}

$action = $_GET['action'] ?? '';

switch ($action) {
    case 'create_order':
        handleCreateOrder();
        break;
    
    case 'get_status':
        handleGetStatus();
        break;

    case 'confirm_order':
        handleConfirmOrder();
        break;

    default:
        echo json_encode(['status' => 'ok', 'message' => 'Zahidaan API is live']);
        break;
}

/**
 * handleCreateOrder()
 */
function handleCreateOrder() {
    $input = json_decode(file_get_contents('php://input'), true);
    if (!$input) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid request data']);
        return;
    }

    $db = getDB();
    
    // Generate Tokens
    $orderToken = bin2hex(random_bytes(16));
    $confirmToken = bin2hex(random_bytes(16));

    try {
        $db->beginTransaction();

        // 1. Insert Order
        $stmt = $db->prepare("
            INSERT INTO orders (
                order_token, confirm_token, 
                customer_name, customer_phone, customer_email,
                address_line, area, city, state, pincode, delivery_type,
                payment_method,
                subtotal_paise, shipping_paise, cod_charge_paise, total_paise
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ");

        $stmt->execute([
            $orderToken, $confirmToken,
            $input['customer_name'], $input['customer_phone'], $input['customer_email'],
            $input['address_line'], $input['area'], $input['city'], $input['state'], $input['pincode'],
            $input['delivery_type'], // 'local' or 'pan_india'
            $input['payment_method'], // 'upi' or 'cod'
            $input['subtotal_paise'],
            $input['shipping_paise'],
            $input['cod_charge_paise'],
            $input['total_paise']
        ]);

        $orderId = $db->lastInsertId();

        // 2. Insert Items
        $itemStmt = $db->prepare("
            INSERT INTO order_items (
                order_id, product_id, product_name, size, quantity, unit_price_paise, line_total_paise
            ) VALUES (?, ?, ?, ?, ?, ?, ?)
        ");

        foreach ($input['items'] as $item) {
            $itemStmt->execute([
                $orderId,
                $item['product_id'],
                $item['product_name'],
                $item['size'],
                $item['quantity'],
                $item['unit_price_paise'],
                $item['line_total_paise']
            ]);
        }

        $db->commit();

        // TODO: Send WhatsApp/Email to Owner (mail.php)

        echo json_encode([
            'success' => true,
            'order_token' => $orderToken,
            'message' => 'Order placed successfully'
        ]);

    } catch (Exception $e) {
        $db->rollBack();
        http_response_code(500);
        echo json_encode(['error' => $e->getMessage()]);
    }
}

/**
 * handleGetStatus()
 */
function handleGetStatus() {
    $token = $_GET['token'] ?? '';
    if (!$token) {
        http_response_code(400);
        echo json_encode(['error' => 'Token required']);
        return;
    }

    $db = getDB();
    $stmt = $db->prepare("SELECT status, total_paise FROM orders WHERE order_token = ? AND deleted_at IS NULL");
    $stmt->execute([$token]);
    $order = $stmt->fetch();

    if (!$order) {
        http_response_code(404);
        echo json_encode(['error' => 'Order not found']);
        return;
    }

    echo json_encode($order);
}

/**
 * handleConfirmOrder()
 */
function handleConfirmOrder() {
    $token = $_GET['token'] ?? '';
    if (!$token) {
        http_response_code(400);
        echo json_encode(['error' => 'Confirmation token required']);
        return;
    }

    $db = getDB();
    $stmt = $db->prepare("
        UPDATE orders 
        SET status = 'confirmed', confirm_used = 1, updated_at = NOW() 
        WHERE confirm_token = ? AND confirm_used = 0 AND deleted_at IS NULL
    ");
    $stmt->execute([$token]);

    if ($stmt->rowCount() > 0) {
        echo json_encode(['success' => true, 'message' => 'Order confirmed']);
        // TODO: Send Confirmation Email to Customer (mail.php)
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid or already used token']);
    }
}
?>
