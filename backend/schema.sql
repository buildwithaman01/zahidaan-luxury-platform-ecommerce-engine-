CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_token VARCHAR(64) UNIQUE NOT NULL,
    confirm_token VARCHAR(64) UNIQUE NOT NULL,
    confirm_used TINYINT(1) DEFAULT 0,
    customer_name VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(20) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    customer_ip VARCHAR(45),
    user_agent TEXT,
    address_line TEXT,
    area VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(100),
    pincode VARCHAR(10),
    delivery_type ENUM('local', 'pan_india') NOT NULL,
    payment_method ENUM('upi', 'cod') NOT NULL,
    subtotal_paise BIGINT NOT NULL,
    shipping_paise BIGINT NOT NULL,
    cod_charge_paise BIGINT DEFAULT 0,
    total_paise BIGINT NOT NULL,
    status ENUM('pending', 'confirmed', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
    confirmed_at DATETIME,
    cancelled_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at DATETIME
);

CREATE TABLE IF NOT EXISTS order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id VARCHAR(255) NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    size VARCHAR(50),
    quantity INT NOT NULL,
    unit_price_paise BIGINT NOT NULL,
    line_total_paise BIGINT NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id)
);

CREATE TABLE IF NOT EXISTS order_status_log (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    old_status VARCHAR(50),
    new_status VARCHAR(50) NOT NULL,
    changed_by VARCHAR(100) DEFAULT 'system',
    note TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id)
);
