import { NextRequest, NextResponse } from 'next/server';
import { serviceRequestRepository } from '@/lib/db/repositories/service-request.repository';
import { serviceRequestSchema } from '@/lib/validations';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    const validatedData = serviceRequestSchema.parse(body);

    // Generate unique ticket number
    const ticketNo = await serviceRequestRepository.generateTicketNo();

    // Create service request
    const serviceRequest = await serviceRequestRepository.create({
      ticketNo,
      name: validatedData.name,
      email: validatedData.email,
      phone: validatedData.phone,
      company: validatedData.company,
      address: validatedData.address,
      serviceType: validatedData.serviceType,
      projectorBrand: validatedData.projectorBrand,
      projectorModel: validatedData.projectorModel,
      issueDescription: validatedData.issueDescription,
      urgency: validatedData.urgency || 'NORMAL',
      preferredDate: validatedData.preferredDate
        ? new Date(validatedData.preferredDate)
        : undefined,
    });

    return NextResponse.json(
      {
        message: 'Service request submitted successfully',
        ticketNo: serviceRequest.ticketNo,
        serviceRequest,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating service request:', error);

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
      { error: 'Failed to submit service request' },
      { status: 500 }
    );
  }
}
