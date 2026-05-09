<?php
/**
 * ZAHIDAAN - Mailer Service (Resend API Edition)
 */

define('RESEND_API_KEY', 're_ZTRVEd7X_DCKiSYHzpQ9J1cVuS6S7xk2S'); 
define('SENDER_EMAIL', 'orders@zahidaan.in');
define('OWNER_EMAIL', 'hello.zahidaan@gmail.com');
define('OWNER_WHATSAPP', '918121666675');

function sendEmail($to, $subject, $body) {
    if (empty($to) || $to === 'no-email@zahidaan.in') return true; // Skip if no email provided

    $apiKey = 're_ZTRVEd7X_DCKiSYHzpQ9J1cVuS6S7xk2S'; 
    $from = 'ZAHIDAAN <orders@zahidaan.in>';

    $payload = json_encode([
        'from' => $from,
        'to' => [$to],
        'subject' => $subject,
        'html' => $body
    ]);

    $ch = curl_init('https://api.resend.com/emails');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'Authorization: Bearer ' . $apiKey
    ]);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    return ($httpCode >= 200 && $httpCode < 300);
}

function sendOwnerNotification($order, $items, $waLink = "") {
    $subject = "New Order #{$order['id']} — ₹" . number_format($order['total_paise'] / 100, 0);
    
    $itemsHtml = "";
    foreach ($items as $item) {
        $itemsHtml .= "<li>{$item['name']} ({$item['size']}) x {$item['qty']}</li>";
    }

    $confirmUrl = "https://zahidaan.in/api.php?action=confirm&token=" . $order['confirm_token'];
    $cancelUrl = "https://zahidaan.in/api.php?action=cancel&token=" . $order['confirm_token'];
    $waUrl = "https://wa.me/" . preg_replace('/[^0-9]/', '', $order['customer_phone']);

    $body = "
    <div style='font-family: sans-serif; color: #1C1C1C;'>
        <h2>New Order #{$order['id']}</h2>
        <p><strong>Customer:</strong> {$order['customer_name']}<br>
        <strong>Phone:</strong> {$order['customer_phone']}<br>
        <strong>Address:</strong> {$order['address_line']}, {$order['city']}</p>
        
        <h3>Items:</h3>
        <ul>$itemsHtml</ul>
        <p><strong>Total: ₹" . number_format($order['total_paise'] / 100, 2) . "</strong></p>
        
        <p>
            <a href='$confirmUrl' style='background: #1B4332; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;'>CONFIRM ORDER</a>
            &nbsp;
            <a href='$cancelUrl' style='background: #b91c1c; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;'>CANCEL ORDER</a>
        </p>
    </div>";

    return sendEmail(OWNER_EMAIL, $subject, $body);
}

function sendCustomerConfirmation($order, $items) {
    $subject = "Order Confirmed! ZAHIDAAN #{$order['id']}";
    
    $itemsHtml = "";
    foreach ($items as $item) {
        $name = $item['product_name'] ?? ($item['name'] ?? 'Product');
        $qty = $item['quantity'] ?? ($item['qty'] ?? 1);
        $itemsHtml .= "<li>$name x $qty</li>";
    }

    $body = "
    <div style='font-family: sans-serif;'>
        <h3>Jazakallah Khair {$order['customer_name']},</h3>
        <p>Your order #{$order['id']} has been confirmed.</p>
        <ul>$itemsHtml</ul>
        <p>We will notify you when it's shipped.</p>
    </div>";

    return sendEmail($order['customer_email'], $subject, $body);
}
