# 05 · AGENT DATABASE
## MySQL Schema — Tables, Indexes, Seeds

> Read `00_MASTER_PLAN.md` first.
> Database: MilesWeb MySQL 8.0
> Rules: Every table has id + created_at + updated_at. Soft deletes. Paise not rupees for money.

---

## DATABASE RULES (Non-Negotiable)

1. Every table has: `id`, `created_at`, `updated_at`
2. Soft deletes only — `deleted_at` nullable datetime, never hard DELETE
3. Monetary values in **paise** (integers) — ₹699 stored as `69900`
4. Status fields use ENUM, never raw strings
5. Index every foreign key and every frequently filtered column
6. No raw passwords ever stored

---

## SCHEMA — `schema.sql`

```sql
CREATE DATABASE IF NOT EXISTS zahidaan_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE zahidaan_db;

-- ─────────────────────────────────────────
-- ORDERS
-- ─────────────────────────────────────────
CREATE TABLE orders (
  id               INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  order_token      CHAR(32) NOT NULL UNIQUE,         -- customer polling token
  confirm_token    CHAR(32) NOT NULL UNIQUE,         -- owner email action token
  confirm_used     TINYINT(1) NOT NULL DEFAULT 0,    -- 1 = token consumed

  -- Customer
  customer_name    VARCHAR(100) NOT NULL,
  customer_phone   VARCHAR(15) NOT NULL,
  customer_email   VARCHAR(150) NOT NULL,

  -- Delivery address
  address_line     VARCHAR(255) NOT NULL,
  area             VARCHAR(100) NOT NULL,
  city             VARCHAR(100) NOT NULL,
  state            VARCHAR(100) NOT NULL,
  pincode          CHAR(6) NOT NULL,
  delivery_type    ENUM('local', 'pan_india') NOT NULL DEFAULT 'pan_india',

  -- Payment
  payment_method   ENUM('upi', 'cod') NOT NULL,

  -- Amounts (all in paise)
  subtotal_paise   INT UNSIGNED NOT NULL DEFAULT 0,
  shipping_paise   INT UNSIGNED NOT NULL DEFAULT 0,
  cod_charge_paise INT UNSIGNED NOT NULL DEFAULT 0,
  total_paise      INT UNSIGNED NOT NULL DEFAULT 0,

  -- Status
  status           ENUM('pending','confirmed','cancelled','shipped','delivered') NOT NULL DEFAULT 'pending',
  shiprocket_id    VARCHAR(100) NULL,                -- filled when shipped via Shiprocket

  -- Soft delete + timestamps
  deleted_at       DATETIME NULL DEFAULT NULL,
  created_at       DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at       DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  INDEX idx_order_token   (order_token),
  INDEX idx_confirm_token (confirm_token),
  INDEX idx_status        (status),
  INDEX idx_pincode       (pincode),
  INDEX idx_created_at    (created_at)
);

-- ─────────────────────────────────────────
-- ORDER ITEMS
-- ─────────────────────────────────────────
CREATE TABLE order_items (
  id            INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  order_id      INT UNSIGNED NOT NULL,
  product_id    VARCHAR(100) NOT NULL,              -- Sanity slug
  product_name  VARCHAR(200) NOT NULL,
  size          VARCHAR(20) NOT NULL,               -- e.g. "6ml", "50ml"
  quantity      TINYINT UNSIGNED NOT NULL DEFAULT 1,
  unit_price_paise INT UNSIGNED NOT NULL,
  line_total_paise INT UNSIGNED NOT NULL,

  created_at    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE RESTRICT,
  INDEX idx_order_id   (order_id),
  INDEX idx_product_id (product_id)
);

-- ─────────────────────────────────────────
-- ORDER STATUS LOG (audit trail)
-- ─────────────────────────────────────────
CREATE TABLE order_status_log (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  order_id    INT UNSIGNED NOT NULL,
  old_status  VARCHAR(20) NULL,
  new_status  VARCHAR(20) NOT NULL,
  changed_by  VARCHAR(50) NOT NULL DEFAULT 'system', -- 'owner', 'system', 'webhook'
  note        VARCHAR(255) NULL,
  created_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  INDEX idx_order_id (order_id)
);

-- ─────────────────────────────────────────
-- WEBHOOK REBUILD LOG (Sanity → rebuild trigger)
-- ─────────────────────────────────────────
CREATE TABLE rebuild_log (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  triggered_by VARCHAR(100) NOT NULL DEFAULT 'sanity',
  payload     TEXT NULL,
  success     TINYINT(1) NOT NULL DEFAULT 0,
  created_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

---

## SEED DATA — `seed.sql` (Development/Testing Only)

```sql
USE zahidaan_db;

-- Sample order 1: Local COD
INSERT INTO orders (
  order_token, confirm_token,
  customer_name, customer_phone, customer_email,
  address_line, area, city, state, pincode, delivery_type,
  payment_method,
  subtotal_paise, shipping_paise, cod_charge_paise, total_paise,
  status
) VALUES (
  'aaaa1111bbbb2222cccc3333dddd4444',
  'zzzz9999yyyy8888xxxx7777wwww6666',
  'Mohammed Zafar', '9912345678', 'zafar@example.com',
  'Plot 12, Isnapur X Road', 'Isnapur', 'Patancheru', 'Telangana', '502307', 'local',
  'cod',
  149900, 0, 0, 149900,
  'confirmed'
);

INSERT INTO order_items (order_id, product_id, product_name, size, quantity, unit_price_paise, line_total_paise)
VALUES (1, 'ruh-al-oud', 'Ruh Al Oud', '12ml', 1, 129900, 129900),
       (1, 'jannat-al-firdaus', 'Jannat Al Firdaus', '6ml', 1, 69900, 69900);

-- Sample order 2: Pan-India UPI
INSERT INTO orders (
  order_token, confirm_token,
  customer_name, customer_phone, customer_email,
  address_line, area, city, state, pincode, delivery_type,
  payment_method,
  subtotal_paise, shipping_paise, cod_charge_paise, total_paise,
  status
) VALUES (
  'bbbb2222cccc3333dddd4444eeee5555',
  'yyyy8888xxxx7777wwww6666vvvv5555',
  'Priya Nair', '8899001122', 'priya@example.com',
  'Flat 401, Green Valley Apartments', 'Koramangala', 'Bengaluru', 'Karnataka', '560034', 'pan_india',
  'upi',
  249900, 0, 0, 249900,
  'pending'
);

INSERT INTO order_items (order_id, product_id, product_name, size, quantity, unit_price_paise, line_total_paise)
VALUES (2, 'velvet-noir', 'Velvet Noir', '100ml', 1, 299900, 299900);
```

---

## COMMON QUERIES (Reference for api.php)

```sql
-- Get order by customer token
SELECT o.*, GROUP_CONCAT(oi.product_name, ' ', oi.size, ' x', oi.quantity SEPARATOR ' | ') as items_summary
FROM orders o
JOIN order_items oi ON oi.order_id = o.id
WHERE o.order_token = ? AND o.deleted_at IS NULL
GROUP BY o.id;

-- Confirm order (owner action)
UPDATE orders SET status = 'confirmed', confirm_used = 1, updated_at = NOW()
WHERE confirm_token = ? AND confirm_used = 0 AND deleted_at IS NULL;

-- Get all pending orders (admin view)
SELECT o.id, o.customer_name, o.customer_phone, o.total_paise, o.payment_method, o.status, o.created_at
FROM orders o
WHERE o.status = 'pending' AND o.deleted_at IS NULL
ORDER BY o.created_at DESC;

-- Soft delete an order
UPDATE orders SET deleted_at = NOW() WHERE id = ?;
```

---

## MILWSWEB MYSQL SETUP STEPS

1. Login to MilesWeb cPanel
2. Go to MySQL Databases → Create database: `zahidaan_db`
3. Create user: `zahidaan_user` with strong password
4. Assign user to database with ALL PRIVILEGES
5. Open phpMyAdmin → select `zahidaan_db` → SQL tab
6. Paste and run `schema.sql`
7. For development testing only: run `seed.sql`
8. Update DB credentials in `api.php` constants
