<?php
/**
 * ZAHIDAAN - CONFIGURATION
 * All values in paise (where applicable)
 */

// --- DATABASE CONFIG ---
define('DB_HOST', 'localhost');
define('DB_NAME', 'zahidaan_db');
define('DB_USER', 'zahidaan_user');
define('DB_PASS', 'YOUR_STRONG_PASSWORD_HERE'); // Update after cPanel setup

// --- BUSINESS LOGIC (Amounts in Paise) ---
define('COD_CHARGE', 6000);             // ₹60
define('COD_MIN_ORDER', 59900);        // ₹599
define('FREE_SHIPPING_THRESHOLD', 99900); // ₹999
define('SHIPPING_CHARGE', 7900);       // ₹79

// --- LOCAL SERVICE AREA ---
define('LOCAL_PINCODES', [
    '502307', '502319', '502313', '500032', '500075', '500019', '500090'
]);

// --- OWNER CONTACT ---
define('OWNER_WHATSAPP', '91XXXXXXXXXX'); // Country code + 10 digits
define('OWNER_EMAIL', 'zahid@example.com');

// --- SECURITY ---
define('FRONTEND_URL', 'https://zahidaan.in'); // For CORS
?>
