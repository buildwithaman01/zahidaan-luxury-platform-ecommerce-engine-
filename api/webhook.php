<?php
/**
 * ZAHIDAAN - Webhook Handler
 * Triggered by Sanity CMS on product updates.
 */

require_once 'api.php'; // To reuse getDB()

header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$payload = file_get_contents('php://input');
$db = getDB();

try {
    $stmt = $db->prepare("INSERT INTO rebuild_log (payload, success) VALUES (?, ?)");
    $stmt->execute([$payload, 1]);
    
    echo json_encode(['status' => 'logged', 'message' => 'Sanity rebuild logged']);
    
    // FUTURE: Trigger GitHub Action rebuild via API if needed
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>
