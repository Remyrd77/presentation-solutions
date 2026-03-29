import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get product stats
    const totalProducts = await db.product.count();
    const activeProducts = await db.product.count({ where: { active: true } });
    const featuredProducts = await db.product.count({ where: { featured: true } });

    // Get inquiry stats
    const totalInquiries = await db.inquiry.count();
    const inquiriesByStatus = await db.inquiry.groupBy({
      by: ['status'],
      _count: true,
    });
    const newInquiries = await db.inquiry.count({ where: { status: 'NEW' } });

    // Get service request stats
    const totalServiceRequests = await db.serviceRequest.count();
    const serviceRequestsByStatus = await db.serviceRequest.groupBy({
      by: ['status'],
      _count: true,
    });
    const pendingServiceRequests = await db.serviceRequest.count({
      where: { status: 'PENDING' },
    });

    // Get recent data
    const recentInquiries = await db.inquiry.findMany({
      take: 5,
      include: {
        product: {
          select: {
            name: true,
            slug: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    const recentServiceRequests = await db.serviceRequest.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({
      products: {
        total: totalProducts,
        active: activeProducts,
        featured: featuredProducts,
      },
      inquiries: {
        total: totalInquiries,
        new: newInquiries,
        byStatus: inquiriesByStatus.reduce((acc, item) => {
          acc[item.status] = item._count;
          return acc;
        }, {} as Record<string, number>),
      },
      serviceRequests: {
        total: totalServiceRequests,
        pending: pendingServiceRequests,
        byStatus: serviceRequestsByStatus.reduce((acc, item) => {
          acc[item.status] = item._count;
          return acc;
        }, {} as Record<string, number>),
      },
      recent: {
        inquiries: recentInquiries,
        serviceRequests: recentServiceRequests,
      },
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch statistics' },
      { status: 500 }
    );
  }
}
