import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { serviceRequestRepository } from '@/lib/db/repositories/service-request.repository';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status') || '';
    const serviceType = searchParams.get('serviceType') || '';
    const urgency = searchParams.get('urgency') || '';

    const filters: any = {};
    if (status) filters.status = status;
    if (serviceType) filters.serviceType = serviceType;
    if (urgency) filters.urgency = urgency;

    const serviceRequests = await serviceRequestRepository.findAll(filters);

    return NextResponse.json(serviceRequests);
  } catch (error) {
    console.error('Error fetching service requests:', error);
    return NextResponse.json(
      { error: 'Failed to fetch service requests' },
      { status: 500 }
    );
  }
}
