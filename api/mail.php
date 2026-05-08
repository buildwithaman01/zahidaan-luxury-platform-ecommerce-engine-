<?php
/**
 * ZAHIDAAN - Mail Service
 * Handles order notifications to owner and confirmations to customers.
 */

require_once 'config.php';

/**
 * sendOwnerNotification()
 */
function sendOwnerNotification($orderData) {
    $to = OWNER_EMAIL;
    $subject = "New Zahidaan Order: #" . $orderData['id'];
    
    $confirmLink = FRONTEND_URL . "/api/api.php?action=confirm_order&token=" . $orderData['confirm_token'];
    
    $message = "You have a new order!\n\n";
    $message .= "Customer: " . $orderData['customer_name'] . "\n";
    $message .= "Total: ₹" . ($orderData['total_paise'] / 100) . "\n\n";
    $message .= "Click here to confirm payment & order:\n" . $confirmLink;

    $headers = "From: noreply@zahidaan.in";

    // Use native mail() as a fallback, user will install PHPMailer later
    return mail($to, $subject, $message, $headers);
}

/**
 * sendCustomerConfirmation()
 */
function sendCustomerConfirmation($orderData) {
    $to = $orderData['customer_email'];
    $subject = "Your Zahidaan Order is Confirmed! ✅";
    
    $message = "Assalamu Alaikum " . $orderData['customer_name'] . ",\n\n";
    $message .= "Your order has been confirmed. We are preparing it for delivery.\n\n";
    $message .= "Order Details:\n";
    $message .= "Total: ₹" . ($orderData['total_paise'] / 100) . "\n\n";
    $message .= "Thank you for choosing Zahidaan.";

    $headers = "From: noreply@zahidaan.in";

    return mail($to, $subject, $message, $headers);
}
?>
