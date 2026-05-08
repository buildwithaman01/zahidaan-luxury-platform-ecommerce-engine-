<?php
/**
 * ZAHIDAAN - Sanity Webhook Trigger
 * Triggers a manual log entry or GitHub Action rebuild on content change.
 */

// --- CONFIGURATION ---
$secret = 'SANITY_WEBHOOK_SECRET_TBD'; // [TBD] Update in Sanity + here
$logFile = __DIR__ . '/logs/webhook.log';

// --- AUTHENTICATION ---
$body = file_get_contents('php://input');
$signature = $_SERVER['HTTP_SANITY_WEBHOOK_SIGNATURE'] ?? '';

// Basic signature verification (if secret is set)
if ($secret !== 'SANITY_WEBHOOK_SECRET_TBD') {
    $expected = 'sha1=' . hash_hmac('sha1', $body, $secret);
    if (!hash_equals($expected, $signature)) {
        http_response_code(401);
        exit('Unauthorized');
    }
}

// --- LOGGING ---
$data = json_decode($body, true);
$docId = $data['_id'] ?? 'unknown';
$type = $data['_type'] ?? 'unknown';
$action = $data['action'] ?? 'update';

// File Log
$logDir = __DIR__ . '/logs';
if (!is_dir($logDir)) mkdir($logDir, 0755, true);
$entry = date('Y-m-d H:i:s') . " [SANITY] Doc: {$docId} | Type: {$type} | Action: {$action}\n";
file_put_contents($logFile, $entry, FILE_APPEND);

// Database Log
require_once 'api.php';
try {
    $db = getDB();
    $stmt = $db->prepare("INSERT INTO rebuild_log (triggered_by, payload, success) VALUES (?, ?, ?)");
    $stmt->execute(['sanity', $body, 1]);
} catch (Exception $e) {
    // Silently fail if DB is down, already logged to file
}

// --- REBUILD TRIGGER (Placeholder for GitHub Actions) ---
/*
$github_token = 'GITHUB_PAT_TOKEN';
$repo = 'pehchanly/zahidaan';
$ch = curl_init("https://api.github.com/repos/{$repo}/dispatches");
curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_HTTPHEADER => [
        "Authorization: token {$github_token}",
        "Accept: application/vnd.github.v3+json",
        "User-Agent: ZahidaanWebhook"
    ],
    CURLOPT_POSTFIELDS => json_encode(['event_type' => 'sanity-content-update']),
    CURLOPT_RETURNTRANSFER => true
]);
curl_exec($ch);
curl_close($ch);
*/

http_response_code(200);
echo json_encode(['success' => true, 'message' => 'Webhook received and logged']);
