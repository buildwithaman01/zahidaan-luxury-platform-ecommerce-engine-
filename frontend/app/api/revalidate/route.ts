import { revalidatePath, revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get('secret');

    // Security check
    if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
      return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
    }

    const body = await request.json();
    const documentType = body._type;

    // Revalidate based on document type
    if (documentType === 'product') {
      (revalidateTag as any)('products');
      revalidatePath('/shop', 'page');
      if (body.slug?.current) {
        revalidatePath(`/product/${body.slug.current}`, 'page');
      }
    }
    
    if (documentType === 'blogPost') {
      (revalidateTag as any)('posts');
      revalidatePath('/blog', 'page');
      if (body.slug?.current) {
        revalidatePath(`/blog/${body.slug.current}`, 'page');
      }
    }

    if (documentType === 'category') {
      revalidatePath('/shop', 'page');
    }

    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err) {
    console.error('Revalidation Error:', err);
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 });
  }
}
