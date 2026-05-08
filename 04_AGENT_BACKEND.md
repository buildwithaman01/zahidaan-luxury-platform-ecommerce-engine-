# 04 · AGENT BACKEND
## PHP API Bridge — Orders, Email, Status Polling

> Read `00_MASTER_PLAN.md` first.
> Stack: PHP 8.1 on MilesWeb LiteSpeed. MySQL on MilesWeb.
> Maximum 3 PHP files on server. No frameworks. No Composer on server (bundle if needed).

---

## FILE LIST (3 PHP FILES TOTAL ON SERVER)

```
public_html/
├── api.php          ← Order create, status poll, confirm endpoint
├── webhook.php      ← Sanity content change → triggers GitHub Actions rebuild
└── mail.php         ← PHPMailer wrapper — sends to owner + customer
```

---

## api.php — FULL SPECIFICATION

### Actions handled (via `?action=` query param or POST body):

| Action | Method | Description |
|---|---|---|
| `create_order` | POST | New order from checkout form |
| `status` | GET | Poll order status by token |
| `confirm` | GET | Owner clicks confirm link (tokenized) |
| `cancel` | GET | Owner clicks cancel link (tokenized) |

---

### `create_order` — POST

**Input (JSON body):**
```json
{
  "name": "Rahul Sharma",
  "phone": "9876543210",
  "email": "rahul@example.com",
  "address": "123 MG Road",
  "area": "Banjara Hills",
  "city": "Hyderabad",
  "state": "Telangana",
  "pincode": "500034",
  "payment_method": "upi",
  "items": [
    { "product_id": "ruh-al-oud", "name": "Ruh Al Oud", "size": "6ml", "qty": 2, "price": 699 },
    { "product_id": "jannat-al-firdaus", "name": "Jannat Al Firdaus", "size": "12ml", "qty": 1, "price": 999 }
  ],
  "subtotal": 2397,
  "shipping": 0,
  "cod_charge": 0,
  "total": 2397
}
```

**Processing:**
1. Sanitize and validate all inputs (filter_var, strlen checks)
2. Determine order type: `local` (pincode in LOCAL_PINCODES list) or `pan_india`
3. Validate COD eligibility if `payment_method = cod`:
   - Must be pan-India AND total >= COD_MINIMUM (₹[TBD])
   - COD charge must match expected value
4. Generate unique `order_token` (32-char hex, `bin2hex(random_bytes(16))`)
5. Generate unique `confirm_token` (separate, for owner email link)
6. Insert into `orders` table with status = `pending`
7. Insert line items into `order_items` table
8. Call `mail.php` to send owner notification email
9. Fire WhatsApp pre-fill link (logged, not actually sent — owner opens from email)
10. Return JSON response

**Output (success):**
```json
{
  "success": true,
  "order_id": 42,
  "order_token": "a3f9b2c1...",
  "redirect": "/order-status/a3f9b2c1..."
}
```

**Output (error):**
```json
{
  "success": false,
  "error": "Invalid pincode format"
}
```

---

### `status` — GET

**Input:** `?action=status&token=a3f9b2c1...`

**Processing:**
1. Validate token length (32 chars, hex only)
2. Query `orders` table for matching `order_token`
3. Return current `status` field

**Output:**
```json
{
  "success": true,
  "status": "pending",
  "order_id": 42,
  "updated_at": "2025-05-01 14:32:00"
}
```

Status values: `pending` · `confirmed` · `cancelled` · `shipped` · `delivered`

---

### `confirm` — GET (Owner action from email link)

**Input:** `?action=confirm&token=CONFIRM_TOKEN_HERE`

**Security:** Confirm token is separate from order_token. Single-use — invalidated after first use.

**Processing:**
1. Validate confirm_token
2. Check token not already used (`confirm_used = 0`)
3. Update order status to `confirmed`
4. Mark `confirm_used = 1`
5. Call `mail.php` to send customer confirmation email
6. Return human-readable HTML page (owner sees in browser): "Order #42 confirmed ✓"

---

### `cancel` — GET (Owner action from email link)

Same as confirm but sets status to `cancelled`. Fires customer cancellation email.

---

### Security rules for api.php

```php
// CORS — only allow from your domain
header("Access-Control-Allow-Origin: https://zahidaan.in");
header("Content-Type: application/json");

// Rate limiting — basic (store attempts in MySQL or file)
// Max 10 create_order calls per IP per hour

// Input sanitization — every field
$name = htmlspecialchars(strip_tags(trim($_POST['name'] ?? '')));
$phone = preg_replace('/[^0-9]/', '', $_POST['phone'] ?? '');
$email = filter_var($_POST['email'] ?? '', FILTER_VALIDATE_EMAIL);
$pincode = preg_replace('/[^0-9]/', '', $_POST['pincode'] ?? '');

// Never expose DB errors to client
// Log errors to server-side file only
```

---

### LOCAL_PINCODES constant (in api.php)

```php
define('LOCAL_PINCODES', [
  '502307', '502319', '502313',
  '500032', '500075', '500019', '500090',
  // Add more as owner confirms delivery range
]);

define('COD_MINIMUM', 599);       // ₹[TBD] — update before launch
define('COD_CHARGE', 60);         // ₹[TBD] — update before launch
define('FREE_SHIPPING_THRESHOLD', 999); // ₹[TBD] — update before launch
define('SHIPPING_CHARGE', 79);    // ₹[TBD] — update before launch
```

---

## mail.php — FULL SPECIFICATION

### Owner Notification Email (fires on new order)

**Subject:** `New Order #42 — ₹2,397 — [UPI/COD] — Rahul Sharma, Hyderabad`

**Body (HTML email):**
```
ZAHIDAAN — New Order Received

Order #42 · [DATE TIME]

Customer: Rahul Sharma
Phone: 9876543210 (WhatsApp)
Email: rahul@example.com
Address: 123 MG Road, Banjara Hills, Hyderabad, Telangana - 500034

Items:
- Ruh Al Oud 6ml × 2 = ₹1,398
- Jannat Al Firdaus 12ml × 1 = ₹999
Subtotal: ₹2,397
Shipping: FREE
Total: ₹2,397

Payment Method: UPI (PhonePe)
[Verify payment on your PhonePe Business app before confirming]

─────────────────────────────────────
[CONFIRM ORDER #42]  ←── big green button → confirm link
[CANCEL ORDER #42]   ←── red button → cancel link
─────────────────────────────────────

WhatsApp customer: wa.me/919876543210
```

### Customer Confirmation Email (fires when owner confirms)

**Subject:** `Your ZAHIDAAN Order is Confirmed! 🌿 Order #42`

**Body:**
```
Assalamualaikum Rahul,

Your order has been confirmed. Jazakallah Khair for choosing ZAHIDAAN.

Order #42 — ₹2,397

Items ordered:
- Ruh Al Oud 6ml × 2
- Jannat Al Firdaus 12ml × 1

Delivering to: 123 MG Road, Banjara Hills, Hyderabad - 500034

We will WhatsApp you once your order is shipped with tracking details.
Expected delivery: 3–7 business days (pan-India)

Questions? WhatsApp us: +91 [OWNER NUMBER]
```

---

## webhook.php — SANITY REBUILD TRIGGER

When client updates a product in Sanity Studio, Sanity fires a webhook to this endpoint.
This endpoint triggers a GitHub Actions workflow which rebuilds and FTP-deploys the static site.

```php
<?php
// Verify Sanity webhook secret
$secret = 'SANITY_WEBHOOK_SECRET'; // set in Sanity dashboard + match here
$body = file_get_contents('php://input');
$signature = $_SERVER['HTTP_SANITY_WEBHOOK_SIGNATURE'] ?? '';

// Basic HMAC verification
$expected = 'sha1=' . hash_hmac('sha1', $body, $secret);
if (!hash_equals($expected, $signature)) {
    http_response_code(401);
    exit('Unauthorized');
}

// Trigger GitHub Actions via repository_dispatch
$github_token = 'GITHUB_PAT_TOKEN'; // store in webhook.php only, never in frontend
$repo = 'pehchanly/zahidaan'; // your GitHub repo

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

http_response_code(200);
echo json_encode(['triggered' => true]);
```

**Note:** If GitHub Actions CI/CD is not set up yet, replace the GitHub dispatch with a simple log entry. Manual rebuild is acceptable at launch.

---

## DATABASE CONNECTION (in api.php)

```php
define('DB_HOST', 'localhost');
define('DB_NAME', 'zahidaan_db');
define('DB_USER', 'zahidaan_user');
define('DB_PASS', 'STRONG_PASSWORD_HERE'); // Never commit this

function getDB(): PDO {
    static $pdo = null;
    if ($pdo === null) {
        $pdo = new PDO(
            "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4",
            DB_USER, DB_PASS,
            [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
             PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC]
        );
    }
    return $pdo;
}
```

---

## ERROR LOGGING (server-side only)

```php
function logError(string $context, string $message): void {
    $entry = date('Y-m-d H:i:s') . " [{$context}] {$message}\n";
    file_put_contents(__DIR__ . '/logs/api_errors.log', $entry, FILE_APPEND);
}
```

`/logs/` folder must be outside `public_html` or protected with `.htaccess`:
```
<Files "*.log">
    Order Allow,Deny
    Deny from all
</Files>
```
