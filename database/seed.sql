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
