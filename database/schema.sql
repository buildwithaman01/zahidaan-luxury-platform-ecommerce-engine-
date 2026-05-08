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
  customer_ip      VARCHAR(45) NULL,                 -- IPv4 or IPv6
  user_agent       TEXT NULL,

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

  -- Status & Audit
  status           ENUM('pending','confirmed','cancelled','shipped','delivered') NOT NULL DEFAULT 'pending',
  internal_notes   TEXT NULL,
  shiprocket_id    VARCHAR(100) NULL,
  
  -- Timestamps
  confirmed_at     DATETIME NULL DEFAULT NULL,
  cancelled_at     DATETIME NULL DEFAULT NULL,
  deleted_at       DATETIME NULL DEFAULT NULL,
  created_at       DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at       DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  -- Indices for performance
  INDEX idx_order_token   (order_token),
  INDEX idx_confirm_token (confirm_token),
  INDEX idx_status        (status),
  INDEX idx_pincode       (pincode),
  INDEX idx_customer_email(customer_email),
  INDEX idx_customer_phone(customer_phone),
  INDEX idx_created_at    (created_at)
) ENGINE=InnoDB;

-- ─────────────────────────────────────────
-- ORDER ITEMS
-- ─────────────────────────────────────────
CREATE TABLE order_items (
  id               INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  order_id         INT UNSIGNED NOT NULL,
  product_id       VARCHAR(100) NOT NULL,            -- Sanity slug
  product_name     VARCHAR(200) NOT NULL,
  size             VARCHAR(20) NOT NULL,             -- e.g. "6ml", "50ml"
  quantity         TINYINT UNSIGNED NOT NULL DEFAULT 1,
  unit_price_paise INT UNSIGNED NOT NULL,
  line_total_paise INT UNSIGNED NOT NULL,

  created_at       DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at       DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  INDEX idx_order_id   (order_id),
  INDEX idx_product_id (product_id)
) ENGINE=InnoDB;

-- ─────────────────────────────────────────
-- ORDER STATUS LOG (Audit Table)
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
  INDEX idx_order_id (order_id),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB;

-- ─────────────────────────────────────────
-- WEBHOOK REBUILD LOG
-- ─────────────────────────────────────────
CREATE TABLE rebuild_log (
  id           INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  triggered_by VARCHAR(100) NOT NULL DEFAULT 'sanity',
  payload      TEXT NULL,
  success      TINYINT(1) NOT NULL DEFAULT 0,
  created_at   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;
