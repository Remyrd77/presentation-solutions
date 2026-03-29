import { NextRequest, NextResponse } from 'next/server';
import { inquiryRepository } from '@/lib/db/repositories/inquiry.repository';
import { inquirySchema } from '@/lib/validations';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    const validatedData = inquirySchema.parse(body);

    // Create inquiry
    const inquiry = await inquiryRepository.create({
      name: validatedData.name,
      email: validatedData.email,
      phone: validatedData.phone,
      company: validatedData.company,
      type: validatedData.type,
      productId: validatedData.productId,
      message: validatedData.message,
    });

    return NextResponse.json(
      {
        message: 'Inquiry submitted successfully',
        inquiry,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating inquiry:', error);

    // Handle validation errors
    if (error.name === 'ZodError') {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: error.errors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to submit inquiry' },
      { status: 500 }
    );
  }
}
