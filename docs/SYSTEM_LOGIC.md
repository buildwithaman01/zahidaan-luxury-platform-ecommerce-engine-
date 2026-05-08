# Platform Logic & Advanced Features

This document explores the complex business logic that powers the ZAHIDAAN shopping experience.

## 1. The "2-Minute Confirmation Loop"

To maintain a luxury feel while managing local and national orders, we implemented a custom confirmation workflow:

1. **Order Intake**: `api.php` receives the validated order and writes it to MySQL with a `pending` status.
2. **Notification**: Two simultaneous events occur:
    - An email is fired to the owner via **PHPMailer**.
    - A pre-filled WhatsApp link is generated for the owner.
3. **One-Click Action**: The email contains a tokenized "Confirm Order" button.
4. **Instant Sync**: Clicking the button updates the MySQL database. The customer's "Order Status" page (which polls the API) instantly flips to a "Confirmed" state with an animation.

## 2. Pincode-Aware Shipping

The platform features a smart shipping engine:
- **Local Zone**: A defined array of Hyderabad/Patancheru pincodes (e.g., `502307`, `502319`) triggers:
    - Free shipping.
    - Personal delivery by the boutique owner.
    - Cash on Delivery (COD) without extra fees.
- **Pan-India Zone**: All other pincodes trigger:
    - Calculated shipping fees (waived above a certain threshold).
    - COD surcharge to deter fraud.
    - Shiprocket integration logic.

## 3. Persistent State Management

Using **Zustand**, the platform maintains a robust client-side state:
- **Cart Persistence**: Items remain in the cart even if the browser is closed or refreshed (via `localStorage` middleware).
- **Synchronized UI**: The `CartDrawer` and `Navbar` badge stay perfectly in sync across all pages without layout shifts.

## 4. Performance Engineering

- **Pre-fetching**: Next.js pre-fetches the content of linked pages when they enter the viewport, making navigation feel instantaneous.
- **Luxury Ease**: All transitions use a custom `cubic-bezier` curve designed to mimic the smooth, viscous flow of high-quality attar oils.
- **Zero-runtime CSS**: By using Tailwind 4, the final CSS bundle is extremely small and contains only the styles actually used on the site.

## 5. Security & Reliability

- **Rate Limiting**: Custom PHP middleware prevents automated bot attacks on the order API.
- **Transaction Safety**: MySQL transactions ensure that order items are never orphaned if a database connection drops.
- **Health Monitoring**: A dedicated `/api/api.php?action=health` endpoint provides real-time status of the database and mail services for DevOps monitoring.
