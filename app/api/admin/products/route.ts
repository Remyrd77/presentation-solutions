import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import slugify from 'slugify';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';

    const where: any = {};

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { brand: { contains: search } },
        { model: { contains: search } },
      ];
    }

    if (category) {
      where.category = category;
    }

    const products = await db.product.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    // Generate slug from name
    const slug = slugify(body.name, { lower: true, strict: true });

    // Check if slug already exists
    const existingProduct = await db.product.findUnique({
      where: { slug },
    });

    if (existingProduct) {
      return NextResponse.json(
        { error: 'A product with this name already exists' },
        { status: 400 }
      );
    }

    // Create product
    const product = await db.product.create({
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
        images: body.images || '[]',
        thumbnail: body.thumbnail || '',
        condition: body.condition,
        stock: parseInt(body.stock) || 0,
        featured: body.featured === true,
        active: body.active !== false,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}
