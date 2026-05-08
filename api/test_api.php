<?php
/**
 * ZAHIDAAN - API Verification
 * Run this in your browser to check if DB and API are configured correctly.
 */

require_once 'api.php';

echo "<h1>Zahidaan API Verification</h1>";

// 1. Check PHP Version
echo "PHP Version: " . phpversion() . " - " . (version_compare(phpversion(), '8.1.0', '>=') ? "✅ OK" : "❌ Error: PHP 8.1+ required") . "<br>";

// 2. Check DB Connection
try {
    $db = getDB();
    echo "Database Connection: ✅ Connected successfully to " . DB_NAME . "<br>";
    
    // 3. Check Tables
    $tables = ['orders', 'order_items', 'order_status_log', 'rebuild_log'];
    foreach ($tables as $table) {
        $stmt = $db->query("SHOW TABLES LIKE '$table'");
        if ($stmt->rowCount() > 0) {
            echo "Table '$table': ✅ Exists<br>";
        } else {
            echo "Table '$table': ❌ MISSING - Did you run schema.sql?<br>";
        }
    }
} catch (Exception $e) {
    echo "Database Connection: ❌ FAILED (" . $e->getMessage() . ")<br>";
    echo "<i>Tip: Check DB_USER and DB_PASS in config.php. For XAMPP, usually user is 'root' and pass is empty.</i><br>";
}

echo "<br><hr>";
echo "<h3>Next Steps:</h3>";
echo "1. If local (XAMPP), update <b>config.php</b> with <code>DB_USER = 'root'</code> and <code>DB_PASS = ''</code>.<br>";
echo "2. Use Postman or frontend to test <code>create_order</code> action.<br>";
?>
