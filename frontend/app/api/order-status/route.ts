import { NextResponse } from 'next/server';
import { sendCustomerWhatsApp } from '@/lib/whatsapp';
import { sendShippedEmail, sendDeliveredEmail } from '@/lib/mail';
import { writeClient } from '@/lib/sanity';

export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get('secret');

    if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
      return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
    }

    const body = await request.json();

    // Only process order updates
    if (body._type !== 'order') {
      return NextResponse.json({ ok: true });
    }

    // Fetch the full order details to ensure we have customer info
    const order = await writeClient.fetch(`*[_type == "order" && _id == $id][0]`, { id: body._id });

    if (!order || !order.customer?.email) return NextResponse.json({ ok: true });

    const customerPhone = order.customer.phone;
    const customerEmail = order.customer.email;

    // Handle Shipped Status
    if (body.status === 'shipped' && order.tracking?.trackingId) {
      const data = {
        type: 'shipped',
        orderNumber: order.orderNumber,
        courier: order.tracking.courier || 'DTDC',
        trackingNumber: order.tracking.trackingId
      };

      // await sendCustomerWhatsApp(customerPhone, data);
      await sendShippedEmail({
        orderNumber: order.orderNumber,
        customerEmail: customerEmail,
        courierName: data.courier,
        trackingNumber: data.trackingNumber
      });
    }

    // Handle Delivered Status
    if (body.status === 'delivered') {
      const data = {
        type: 'delivered',
        orderNumber: order.orderNumber
      };

      // await sendCustomerWhatsApp(customerPhone, data);
      await sendDeliveredEmail({
        orderNumber: order.orderNumber,
        customerName: order.customer.name,
        customerEmail: customerEmail
      });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Order Status Webhook Error:', error);
    return NextResponse.json({ message: 'Internal error' }, { status: 500 });
  }
}
