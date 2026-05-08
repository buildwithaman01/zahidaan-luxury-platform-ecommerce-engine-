import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const OWNER_EMAIL = process.env.OWNER_EMAIL || 'hello.zahidaan@gmail.com';
const FROM_EMAIL = process.env.FROM_EMAIL || 'orders@zahidaan.in';

// ─── OWNER NOTIFICATION ───────────────────────────────

export async function sendOwnerEmail(order: any) {
  try {
    await resend.emails.send({
      from: `ZAHIDAAN Orders <${FROM_EMAIL}>`,
      to: OWNER_EMAIL,
      subject: `New Order ${order.orderNumber} — ₹${order.totalAmount}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #1a1a1a; padding: 24px; text-align: center;">
            <h1 style="color: #c9a96e; margin: 0; font-size: 24px; letter-spacing: 4px;">ZAHIDAAN</h1>
            <p style="color: #888; margin: 4px 0 0; font-size: 12px;">New Order Received</p>
          </div>
          <div style="padding: 24px; background: #f9f9f9; border-left: 4px solid #c9a96e;">
            <p style="margin: 0; font-size: 20px; font-weight: bold;">${order.orderNumber}</p>
            <p style="margin: 4px 0 0; color: #666;">${new Date().toLocaleString('en-IN')}</p>
          </div>
          <div style="padding: 24px;">
            <h3 style="border-bottom: 1px solid #eee; padding-bottom: 8px;">Customer</h3>
            <p><strong>Name:</strong> ${order.customerName}</p>
            <p><strong>Phone:</strong> ${order.customerPhone}</p>
            <p><strong>Email:</strong> ${order.customerEmail || 'Not provided'}</p>
            <p><strong>Address:</strong><br>${order.address}<br>${order.city}, ${order.state} — ${order.pincode}</p>
          </div>
          <div style="padding: 0 24px 24px;">
            <h3 style="border-bottom: 1px solid #eee; padding-bottom: 8px;">Items Ordered</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="background: #f5f5f5;">
                <th style="text-align: left; padding: 8px;">Product</th>
                <th style="text-align: center; padding: 8px;">Qty</th>
                <th style="text-align: right; padding: 8px;">Price</th>
              </tr>
              ${order.items.map((item: any) => `
                <tr style="border-bottom: 1px solid #eee;">
                  <td style="padding: 8px;">${item.productName || item.name} ${item.size || ''}</td>
                  <td style="padding: 8px; text-align: center;">${item.qty || item.quantity}</td>
                  <td style="padding: 8px; text-align: right;">₹${(item.price * (item.qty || item.quantity))}</td>
                </tr>
              `).join('')}
              <tr>
                <td colspan="2" style="padding: 8px; text-align: right;">Shipping</td>
                <td style="padding: 8px; text-align: right;">${order.shippingCharge === 0 ? 'FREE' : `₹${order.shippingCharge}`}</td>
              </tr>
              <tr style="font-weight: bold; font-size: 16px;">
                <td colspan="2" style="padding: 8px; text-align: right;">Total</td>
                <td style="padding: 8px; text-align: right; color: #c9a96e;">₹${order.totalAmount}</td>
              </tr>
            </table>
          </div>
          <div style="padding: 0 24px 24px;">
            <h3 style="border-bottom: 1px solid #eee; padding-bottom: 8px;">Payment</h3>
            <p><strong>Method:</strong> ${order.paymentMethod}</p>
            <p><strong>Status:</strong> <span style="color: ${order.paymentStatus === 'paid' ? 'green' : 'orange'}">${order.paymentStatus.toUpperCase()}</span></p>
            <p><strong>UTR / Transaction ID:</strong> ${order.utrNumber || 'N/A'}</p>
          </div>
          <div style="padding: 16px 24px; background: #1a1a1a; text-align: center;">
            <a href="https://zahidaan.in/studio" style="background: #c9a96e; color: #000; padding: 12px 24px; text-decoration: none; font-weight: bold; border-radius: 4px; display: inline-block;">View in Sanity Studio</a>
          </div>
        </div>
      `,
    });
  } catch (err) {
    console.error('sendOwnerEmail error:', err);
  }
}

// ─── CUSTOMER CONFIRMATION ────────────────────────────

export async function sendCustomerConfirmation(order: any) {
  if (!order.customerEmail) return;
  try {
    await resend.emails.send({
      from: `ZAHIDAAN Attars & Perfumes <${FROM_EMAIL}>`,
      to: order.customerEmail,
      subject: `Order Confirmed — ${order.orderNumber} | ZAHIDAAN`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #1a1a1a; padding: 32px; text-align: center;">
            <h1 style="color: #c9a96e; margin: 0; font-size: 28px; letter-spacing: 6px;">ZAHIDAAN</h1>
            <p style="color: #888; margin: 8px 0 0;">Attars & Perfumes</p>
          </div>
          <div style="padding: 32px; text-align: center; border-bottom: 1px solid #eee;">
            <p style="font-size: 32px; margin: 0;">🌿</p>
            <h2 style="margin: 8px 0;">Order Confirmed</h2>
            <p style="color: #666;">Thank you, ${order.customerName}.</p>
            <p style="font-size: 20px; color: #c9a96e; font-weight: bold;">${order.orderNumber}</p>
          </div>
          <div style="padding: 24px;">
            <h3 style="border-bottom: 1px solid #eee; padding-bottom: 8px;">Your Order</h3>
            ${order.items.map((item: any) => `
              <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #f5f5f5;">
                <span>${item.productName || item.name} ${item.size || ''} × ${item.qty || item.quantity}</span>
                <span>₹${(item.price * (item.qty || item.quantity))}</span>
              </div>
            `).join('')}
            <div style="text-align: right; margin-top: 12px; font-size: 18px; font-weight: bold;">
              Total: <span style="color: #c9a96e;">₹${order.totalAmount}</span>
            </div>
          </div>
          <div style="padding: 0 24px 24px;">
            <h3 style="border-bottom: 1px solid #eee; padding-bottom: 8px;">Delivery Address</h3>
            <p style="color: #444; line-height: 1.6;">${order.address}<br>${order.city}, ${order.state} — ${order.pincode}</p>
          </div>
          <div style="padding: 0 24px 24px;">
            <h3 style="border-bottom: 1px solid #eee; padding-bottom: 8px;">Payment</h3>
            <p><strong>${order.paymentMethod}</strong></p>
            ${order.utrNumber ? `<p style="color: green;">✅ Transaction ID: ${order.utrNumber}</p>` : `<p style="color: #888;">Payment verified manually.</p>`}
          </div>
          <div style="background: #fdf6ec; padding: 20px 24px; border-left: 4px solid #c9a96e; margin: 0 24px 24px;">
            <p style="margin: 0; color: #666; font-size: 14px;">We will send you a shipping confirmation with your tracking details once your order is dispatched — usually within 24-48 hours.</p>
          </div>
          <div style="padding: 24px; background: #1a1a1a; text-align: center;">
            <p style="color: #888; font-size: 13px; margin: 0 0 8px;">Questions? Reply to this email or WhatsApp us.</p>
            <p style="color: #c9a96e; margin: 0;">zahidaan.in</p>
          </div>
        </div>
      `,
    });
  } catch (err) {
    console.error('sendCustomerConfirmation error:', err);
  }
}

// ─── SHIPPED NOTIFICATION ─────────────────────────────

export async function sendShippedEmail(order: any) {
  if (!order.customerEmail) return;
  try {
    await resend.emails.send({
      from: `ZAHIDAAN Attars & Perfumes <${FROM_EMAIL}>`,
      to: order.customerEmail,
      subject: `Your Order is On Its Way — ${order.orderNumber} | ZAHIDAAN`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #1a1a1a; padding: 32px; text-align: center;">
            <h1 style="color: #c9a96e; margin: 0; font-size: 28px; letter-spacing: 6px;">ZAHIDAAN</h1>
          </div>
          <div style="padding: 32px; text-align: center;">
            <p style="font-size: 40px; margin: 0;">🚚</p>
            <h2 style="margin: 12px 0;">Your Order is On Its Way</h2>
            <p style="color: #666;">${order.orderNumber}</p>
          </div>
          <div style="background: #f9f9f9; padding: 20px 24px; margin: 0 24px 24px; border-radius: 8px; text-align: center;">
            <p style="margin: 0 0 8px; color: #666;">Courier</p>
            <p style="margin: 0; font-size: 18px; font-weight: bold;">${order.courierName}</p>
            <p style="margin: 12px 0 4px; color: #666;">Tracking ID</p>
            <p style="margin: 0; font-size: 22px; font-weight: bold; color: #c9a96e; letter-spacing: 2px;">${order.trackingNumber}</p>
            <p style="margin: 12px 0 0; color: #888; font-size: 13px;">Estimated delivery: 3–7 business days</p>
          </div>
          <div style="padding: 24px; background: #1a1a1a; text-align: center;">
            <p style="color: #888; font-size: 13px; margin: 0;">Thank you for choosing ZAHIDAAN 🌿</p>
          </div>
        </div>
      `,
    });
  } catch (err) {
    console.error('sendShippedEmail error:', err);
  }
}

// ─── DELIVERED + REVIEW REQUEST ──────────────────────

export async function sendDeliveredEmail(order: any) {
  if (!order.customerEmail) return;
  try {
    await resend.emails.send({
      from: `ZAHIDAAN Attars & Perfumes <${FROM_EMAIL}>`,
      to: order.customerEmail,
      subject: `Your Fragrance Has Arrived 🌿 — ZAHIDAAN`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #1a1a1a; padding: 32px; text-align: center;">
            <h1 style="color: #c9a96e; margin: 0; font-size: 28px; letter-spacing: 6px;">ZAHIDAAN</h1>
          </div>
          <div style="padding: 32px; text-align: center;">
            <p style="font-size: 40px; margin: 0;">🌿</p>
            <h2 style="margin: 12px 0;">Your Fragrance Has Arrived</h2>
            <p style="color: #666; line-height: 1.7;">We hope the scent fills your space with something beautiful, ${order.customerName}.</p>
          </div>
          <div style="padding: 0 24px 32px; text-align: center;">
            <p style="color: #666; margin-bottom: 20px;">If you have a moment, a Google review means the world to a small business like ours.</p>
            <a href="https://g.page/zahidaan-attars-perfumes/review" style="background: #c9a96e; color: #000; padding: 14px 28px; text-decoration: none; font-weight: bold; border-radius: 4px; display: inline-block;">Leave a Review</a>
          </div>
          <div style="padding: 24px; background: #1a1a1a; text-align: center;">
            <p style="color: #888; font-size: 13px; margin: 0;">JazakAllah Khair 🤍 — ZAHIDAAN, Patancheru</p>
          </div>
        </div>
      `,
    });
  } catch (err) {
    console.error('sendDeliveredEmail error:', err);
  }
}
