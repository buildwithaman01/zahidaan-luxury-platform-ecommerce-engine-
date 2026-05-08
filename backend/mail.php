<?php
/**
 * ZAHIDAAN - Mailer Service
 * Using bundled PHPMailer (no Composer).
 */

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// [TBD] Update these paths based on where you upload the PHPMailer folder
// Standard folder structure: backend/PHPMailer/src/...
require_once __DIR__ . '/PHPMailer/Exception.php';
require_once __DIR__ . '/PHPMailer/PHPMailer.php';
require_once __DIR__ . '/PHPMailer/SMTP.php';

// [TBD] Update with actual credentials from MilesWeb/Hostinger
define('SMTP_HOST', 'smtp.hostinger.com'); 
define('SMTP_USER', 'orders@zahidaan.in');
define('SMTP_PASS', 'YOUR_SMTP_PASSWORD');
define('SMTP_PORT', 465);
define('OWNER_EMAIL', 'owner@zahidaan.in');
define('OWNER_WHATSAPP', '919876543210');

function sendEmail($to, $subject, $body) {
    $mail = new PHPMailer(true);

    try {
        // Server settings
        $mail->isSMTP();
        $mail->Host       = SMTP_HOST;
        $mail->SMTPAuth   = true;
        $mail->Username   = SMTP_USER;
        $mail->Password   = SMTP_PASS;
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port       = SMTP_PORT;

        // Recipients
        $mail->setFrom(SMTP_USER, 'ZAHIDAAN');
        $mail->addAddress($to);

        // Content
        $mail->isHTML(true);
        $mail->CharSet = 'UTF-8';
        $mail->Subject = $subject;
        $mail->Body    = $body;

        $mail->send();
        return true;
    } catch (Exception $e) {
        // Fallback to error logging function in api.php
        if (function_exists('logError')) {
            logError('MAIL', "Message could not be sent. Mailer Error: {$mail->ErrorInfo}");
        }
        return false;
    }
}

function sendOwnerNotification($order, $items, $waLink = null) {
    $subject = "New Order #{$order['id']} — ₹" . number_format($order['total_paise'] / 100, 2) . " — [" . strtoupper($order['payment_method']) . "]";
    
    $itemsHtml = "";
    foreach ($items as $item) {
        $itemsHtml .= "<li>{$item['name']} ({$item['size']}) &times; {$item['qty']} = ₹" . number_format(($item['price'] * $item['qty']) / 100, 2) . "</li>";
    }

    $confirmUrl = "https://zahidaan.in/api/api.php?action=confirm&token=" . $order['confirm_token'];
    $cancelUrl = "https://zahidaan.in/api/api.php?action=cancel&token=" . $order['confirm_token'];
    $waUrl = $waLink ?? "https://wa.me/" . preg_replace('/[^0-9]/', '', $order['customer_phone']);

    $body = "
    <div style='font-family: sans-serif; line-height: 1.6; color: #1C1C1C; max-width: 600px;'>
        <h2 style='color: #1B4332;'>ZAHIDAAN — New Order Received</h2>
        <p><strong>Order #{$order['id']}</strong> · " . date('d M Y, H:i') . "</p>
        <hr>
        <p><strong>Customer:</strong> {$order['customer_name']}<br>
        <strong>Phone:</strong> {$order['customer_phone']} (<a href='$waUrl'>WhatsApp Reminder</a>)<br>
        <strong>Email:</strong> {$order['customer_email']}<br>
        <strong>Address:</strong> {$order['address_line']}, {$order['area']}, {$order['city']}, {$order['state']} - {$order['pincode']}</p>
        
        <h3>Items:</h3>
        <ul>$itemsHtml</ul>
        <p><strong>Subtotal:</strong> ₹" . number_format($order['subtotal_paise'] / 100, 2) . "<br>
        <strong>Shipping:</strong> " . ($order['shipping_paise'] == 0 ? 'FREE' : '₹' . number_format($order['shipping_paise'] / 100, 2)) . "<br>
        " . ($order['cod_charge_paise'] > 0 ? "<strong>COD Charge:</strong> ₹" . number_format($order['cod_charge_paise'] / 100, 2) . "<br>" : "") . "
        <strong style='font-size: 1.2em;'>Total: ₹" . number_format($order['total_paise'] / 100, 2) . "</strong></p>
        
        <p><strong>Payment Method:</strong> " . strtoupper($order['payment_method']) . " (" . ($order['payment_method'] === 'upi' ? 'PhonePe' : 'COD') . ")</p>
        " . ($order['payment_method'] === 'upi' ? "<p style='background: #fef3c7; padding: 10px; border-left: 4px solid #f59e0b;'><em>[Verify payment on your PhonePe Business app before confirming]</em></p>" : "") . "
        
        <hr>
        <p style='margin: 25px 0;'>
            <a href='$confirmUrl' style='background: #1B4332; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;'>CONFIRM ORDER #{$order['id']}</a>
            &nbsp;
            <a href='$cancelUrl' style='background: #b91c1c; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;'>CANCEL ORDER #{$order['id']}</a>
        </p>
        <hr>
        <p><a href='$waUrl' style='color: #25D366; font-weight: bold;'>Open Pre-filled WhatsApp Link</a></p>
    </div>
    ";

    return sendEmail(OWNER_EMAIL, $subject, $body);
}

function sendCustomerConfirmation($order, $items) {
    $subject = "Your ZAHIDAAN Order is Confirmed! 🌿 Order #{$order['id']}";
    
    $itemsHtml = "";
    foreach ($items as $item) {
        $name = $item['product_name'] ?? ($item['name'] ?? 'Product');
        $size = $item['size'] ?? '';
        $qty = $item['quantity'] ?? ($item['qty'] ?? 1);
        $itemsHtml .= "<li>$name ($size) &times; $qty</li>";
    }

    $body = "
    <div style='font-family: sans-serif; line-height: 1.6; color: #1C1C1C; max-width: 600px;'>
        <h3 style='color: #1B4332;'>Assalamualaikum {$order['customer_name']},</h3>
        <p>Your order has been confirmed. Jazakallah Khair for choosing <strong>ZAHIDAAN</strong>.</p>
        
        <div style='background: #f9fafb; padding: 15px; border-radius: 8px;'>
            <p><strong>Order #{$order['id']}</strong> — ₹" . number_format($order['total_paise'] / 100, 2) . "</p>
            
            <h4>Items ordered:</h4>
            <ul>$itemsHtml</ul>
            
            <p><strong>Delivering to:</strong><br>
            {$order['address_line']}, {$order['area']}, {$order['city']} - {$order['pincode']}</p>
        </div>
        
        <p>We will WhatsApp you once your order is shipped with tracking details.<br>
        Expected delivery: 3–7 business days (pan-India)</p>
        
        <hr style='border: 0; border-top: 1px solid #eee;'>
        <p>Questions? WhatsApp us: +{$order['owner_whatsapp'] ?? OWNER_WHATSAPP}</p>
    </div>
    ";

    return sendEmail($order['customer_email'], $subject, $body);
}
