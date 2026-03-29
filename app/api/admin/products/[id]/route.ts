import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import slugify from 'slugify';

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await context.params;

    const product = await db.product.findUnique({
      where: { id },
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, context: RouteContext) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await context.params;
    const body = await request.json();

    // Check if product exists
    const existingProduct = await db.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Generate new slug if name changed
    let slug = existingProduct.slug;
    if (body.name && body.name !== existingProduct.name) {
      slug = slugify(body.name, { lower: true, strict: true });

      // Check if new slug conflicts with another product
      const slugConflict = await db.product.findFirst({
        where: {
          slug,
          id: { not: id },
        },
      });

      if (slugConflict) {
        return NextResponse.json(
          { error: 'A product with this name already exists' },
          { status: 400 }
        );
      }
    }

    // Update product
    const product = await db.product.update({
      where: { id },
      data: {
        name: body.name,
        slug,
        description: body.description,
        category: body.category,
        brand: body.brand,
        model: body.model,
        lumens: body.lumens ? parseInt(body.lumens) : null,
        resolution: body.resolution || null,
        technology: body.technology || null,
        throwRatio: body.throwRatio || null,
        price: parseFloat(body.price),
        rentalPrice: body.rentalPrice ? parseFloat(body.rentalPrice) : null,
        images: body.images || existingProduct.images,
        thumbnail: body.thumbnail || existingProduct.thumbnail,
        condition: body.condition,
        stock: parseInt(body.stock) || 0,
        featured: body.featured === true,
        active: body.active !== false,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await context.params;

    // Check if product exists
    const product = await db.product.findUnique({
      where: { id },
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Delete product
    await db.product.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}
