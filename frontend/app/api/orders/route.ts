import { NextResponse } from 'next/server';
import { writeClient } from '@/lib/sanity';
import { sendOwnerEmail, sendCustomerConfirmation } from '@/lib/mail';
import { rateLimit } from '@/lib/rateLimiter';
import { CustomerSchema, validateData } from '@/lib/schemas';

export const dynamic = 'force-dynamic';

/**
 * @function POST
 * @description Handles secure order placement, including rate limiting, data validation,
 * stock management, and notification dispatch.
 */
export async function POST(request: Request) {
  // 1. Rate Limiting (5 requests per 60s per IP)
  const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
  const { success: isAllowed, reset } = rateLimit(ip, 5, 60000);
  
  if (!isAllowed) {
    return NextResponse.json({ 
      success: false, 
      error: 'Too many requests. Please try again later.' 
    }, { 
      status: 429,
      headers: { 'X-RateLimit-Reset': reset.toString() }
    });
  }

  try {
    const body = await request.json();

    // 2. Schema Validation (Fail-Fast)
    validateData(CustomerSchema, {
      name: body.name,
      email: body.email,
      phone: body.phone,
      address: body.address,
      city: body.city,
      state: body.state,
      pincode: body.pincode
    }, 'Order Submission (Customer)');

    if (!body.items || body.items.length === 0) {
      return NextResponse.json({ success: false, error: 'Cart is empty' }, { status: 400 });
    }

    // Generate unique order number
    const orderNumber = `ZAH-${Date.now().toString().slice(-6)}`;

    // 2. Prepare Order Document
    const orderDoc = {
      _type: 'order',
      orderNumber,
      status: 'pending',
      customer: {
        name: body.name,
        phone: body.phone,
        email: body.email || '',
        address: body.address,
        city: body.city,
        state: body.state,
        pincode: body.pincode,
      },
      items: body.items.map((item: any) => ({
        productId: item.product_id,
        name: item.name,
        size: item.size,
        quantity: item.qty,
        price: item.price,
      })),
      payment: {
        method: body.payment_method || 'PhonePe',
        utrNumber: body.utrNumber || '',
        paymentStatus: 'pending',
      },
      totals: {
        subtotal: body.subtotal,
        shipping: body.shipping,
        total: body.total,
      },
    };

    // 3. Save to Sanity
    const createdOrder = await writeClient.create(orderDoc);

    // 4. Reduce Stock for each item
    for (const item of body.items) {
      try {
        const product = await writeClient.fetch(`*[_type == "product" && slug.current == $slug][0]`, { slug: item.product_id });
        
        if (product && product.sizes) {
          const sizeIndex = product.sizes.findIndex((s: any) => s.size === item.size);
          if (sizeIndex > -1) {
            await writeClient
              .patch(product._id)
              .dec({ [`sizes[${sizeIndex}].stock`]: item.qty })
              .commit();
          }
        }
      } catch (stockError) {
        console.error(`Failed to update stock for ${item.product_id}:`, stockError);
      }
    }

    // 5. Fire Notifications (Async)
    const emailData = {
      orderNumber,
      customerName: body.name,
      customerPhone: body.phone,
      customerEmail: body.email,
      address: body.address,
      city: body.city,
      state: body.state,
      pincode: body.pincode,
      items: body.items.map((item: any) => ({
        productName: item.name,
        size: item.size,
        qty: item.qty,
        price: item.price
      })),
      subtotal: body.subtotal,
      shippingCharge: body.shipping,
      totalAmount: body.total,
      paymentMethod: body.payment_method || 'PhonePe',
      paymentStatus: 'pending',
      utrNumber: body.utrNumber
    };

    // Owner Email Alert
    sendOwnerEmail(emailData);

    // Customer Email Confirmation
    if (body.email) {
      sendCustomerConfirmation(emailData);
    }

    return NextResponse.json({ 
      success: true, 
      orderNumber, 
      redirect: `/order-status/${createdOrder._id}` 
    });

  } catch (error) {
    console.error('Order Submission Error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Internal server error' 
    }, { 
      status: 500 
    });
  }
}
