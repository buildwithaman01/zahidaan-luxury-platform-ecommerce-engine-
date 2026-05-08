const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_ID;
const OWNER_NUMBER = process.env.OWNER_WHATSAPP || '918297008727';

async function sendTemplate(to: string, templateName: string, components: any[]) {
  try {
    const response = await fetch(
      `https://graph.facebook.com/v18.0/${PHONE_NUMBER_ID}/messages`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${WHATSAPP_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to,
          type: 'template',
          template: {
            name: templateName,
            language: { code: 'en' },
            components
          }
        })
      }
    );
    return await response.json();
  } catch (error) {
    console.error('WhatsApp Template Error:', error);
    return null;
  }
}

/**
 * Sends a detailed order notification to the shop owner.
 */
export async function sendOwnerWhatsApp(order: any) {
  const message = 
`🛍️ NEW ORDER — ZAHIDAAN
━━━━━━━━━━━━━━━
Order: ${order.orderNumber}
Customer: ${order.customer.name}
Phone: ${order.customer.phone}
━━━━━━━━━━━━━━━
${order.items.map((i: any) => `${i.name} (${i.size}) × ${i.quantity} — ₹${i.price * i.quantity}`).join('\n')}
━━━━━━━━━━━━━━━
Total: ₹${order.totals.total}
Payment: ${order.payment.method}
UTR: ${order.payment.utrNumber || 'N/A'}
━━━━━━━━━━━━━━━
Address: ${order.customer.address}, ${order.customer.city}, ${order.customer.state} - ${order.customer.pincode}
━━━━━━━━━━━━━━━
👉 View in Studio: zahidaan.in/studio`;

  try {
    await fetch(
      `https://graph.facebook.com/v18.0/${PHONE_NUMBER_ID}/messages`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${WHATSAPP_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: OWNER_NUMBER,
          type: 'text',
          text: { body: message }
        })
      }
    );
  } catch (error) {
    console.error('WhatsApp Owner Alert Error:', error);
  }
}

/**
 * Sends a confirmation or status update to the customer.
 */
export async function sendCustomerWhatsApp(phone: string, data: any) {
  const to = phone.startsWith('91') ? phone : `91${phone}`;
  
  if (data.type === 'confirmed') {
    await sendTemplate(to, 'order_confirmed', [{
      type: 'body',
      parameters: [
        { type: 'text', text: data.orderNumber },
        { type: 'text', text: `${data.totalAmount}` },
        { type: 'text', text: 'PhonePe UPI' }
      ]
    }]);
  }
  
  if (data.type === 'shipped') {
    await sendTemplate(to, 'order_shipped', [{
      type: 'body',
      parameters: [
        { type: 'text', text: data.orderNumber },
        { type: 'text', text: data.courier },
        { type: 'text', text: data.trackingNumber },
        { type: 'text', text: '3–5' }
      ]
    }]);
  }

  if (data.type === 'delivered') {
    await sendTemplate(to, 'order_delivered', [{
      type: 'body',
      parameters: [
        { type: 'text', text: 'https://g.page/zahidaan-attars-perfumes/review' }
      ]
    }]);
  }
}
