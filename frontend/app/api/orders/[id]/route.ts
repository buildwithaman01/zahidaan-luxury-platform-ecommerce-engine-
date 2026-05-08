import { NextResponse } from 'next/server';
import { writeClient } from '@/lib/sanity';

export const dynamic = 'force-dynamic';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ success: false, error: 'Order ID is required' }, { status:400 });
    }

    // Fetch order from Sanity by _id
    const order = await writeClient.fetch(`*[_type == "order" && _id == $id][0]`, { id });

    if (!order) {
      return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 });
    }

    // Return the order data formatted for the frontend
    return NextResponse.json({
      success: true,
      order_id: order.orderNumber,
      status: order.status,
      payment_status: order.payment?.paymentStatus || 'pending',
      customer: order.customer,
      items: order.items,
      totals: order.totals,
      tracking: order.tracking
    });

  } catch (error) {
    console.error('Order Fetch Error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
