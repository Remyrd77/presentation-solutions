import { NextRequest, NextResponse } from 'next/server';
import { productService } from '@/lib/services/product.service';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    // Build filters from query params
    const filters = {
      category: searchParams.get('category') || undefined,
      brand: searchParams.get('brand') || undefined,
      condition: searchParams.get('condition') || undefined,
      minPrice: searchParams.get('minPrice') ? parseFloat(searchParams.get('minPrice')!) : undefined,
      maxPrice: searchParams.get('maxPrice') ? parseFloat(searchParams.get('maxPrice')!) : undefined,
      minLumens: searchParams.get('minLumens') ? parseInt(searchParams.get('minLumens')!) : undefined,
      featured: searchParams.get('featured') === 'true' ? true : undefined,
      active: true,
    };

    const products = await productService.getProducts(filters);

    return NextResponse.json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch products',
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  // This will be implemented in admin panel phase
  return NextResponse.json(
    { error: 'Not implemented yet' },
    { status: 501 }
  );
}
