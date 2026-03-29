import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { serviceRequestRepository } from '@/lib/db/repositories/service-request.repository';

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

    const serviceRequest = await serviceRequestRepository.findById(id);

    if (!serviceRequest) {
      return NextResponse.json(
        { error: 'Service request not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(serviceRequest);
  } catch (error) {
    console.error('Error fetching service request:', error);
    return NextResponse.json(
      { error: 'Failed to fetch service request' },
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

    const serviceRequest = await serviceRequestRepository.findById(id);

    if (!serviceRequest) {
      return NextResponse.json(
        { error: 'Service request not found' },
        { status: 404 }
      );
    }

    const updateData: any = {
      status: body.status,
      urgency: body.urgency,
      technicianNotes: body.technicianNotes,
    };

    if (body.scheduledDate) {
      updateData.scheduledDate = new Date(body.scheduledDate);
    }

    if (body.completedDate) {
      updateData.completedDate = new Date(body.completedDate);
    }

    if (body.estimatedCost !== undefined) {
      updateData.estimatedCost = parseFloat(body.estimatedCost);
    }

    if (body.finalCost !== undefined) {
      updateData.finalCost = parseFloat(body.finalCost);
    }

    const updatedServiceRequest = await serviceRequestRepository.update(
      id,
      updateData
    );

    return NextResponse.json(updatedServiceRequest);
  } catch (error) {
    console.error('Error updating service request:', error);
    return NextResponse.json(
      { error: 'Failed to update service request' },
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

    const serviceRequest = await serviceRequestRepository.findById(id);

    if (!serviceRequest) {
      return NextResponse.json(
        { error: 'Service request not found' },
        { status: 404 }
      );
    }

    await serviceRequestRepository.delete(id);

    return NextResponse.json({
      message: 'Service request deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting service request:', error);
    return NextResponse.json(
      { error: 'Failed to delete service request' },
      { status: 500 }
    );
  }
}
