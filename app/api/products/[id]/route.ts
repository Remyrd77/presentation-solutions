import { NextRequest, NextResponse } from 'next/server';
import { productService } from '@/lib/services/product.service';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const product = await productService.getProductById(id);

    return NextResponse.json({
      success: true,
      data: product,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Product not found',
      },
      { status: 404 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // This will be implemented in admin panel phase
  return NextResponse.json(
    { error: 'Not implemented yet' },
    { status: 501 }
  );
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // This will be implemented in admin panel phase
  return NextResponse.json(
    { error: 'Not implemented yet' },
    { status: 501 }
  );
}
