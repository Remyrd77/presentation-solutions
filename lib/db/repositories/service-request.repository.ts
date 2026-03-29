import { db } from '../index';

export interface ServiceRequestFilters {
  status?: string;
  serviceType?: string;
  urgency?: string;
}

export class ServiceRequestRepository {
  async findAll(filters?: ServiceRequestFilters) {
    const where: any = {};

    if (filters?.status) where.status = filters.status;
    if (filters?.serviceType) where.serviceType = filters.serviceType;
    if (filters?.urgency) where.urgency = filters.urgency;

    return db.serviceRequest.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: string) {
    return db.serviceRequest.findUnique({
      where: { id },
    });
  }

  async findByTicketNo(ticketNo: string) {
    return db.serviceRequest.findUnique({
      where: { ticketNo },
    });
  }

  async create(data: {
    ticketNo: string;
    name: string;
    email: string;
    phone: string;
    company?: string;
    address: string;
    serviceType: string;
    projectorBrand: string;
    projectorModel: string;
    issueDescription: string;
    urgency?: string;
    preferredDate?: Date;
  }) {
    return db.serviceRequest.create({
      data,
    });
  }

  async update(id: string, data: {
    status?: string;
    urgency?: string;
    scheduledDate?: Date;
    completedDate?: Date;
    technicianNotes?: string;
    estimatedCost?: number;
    finalCost?: number;
  }) {
    return db.serviceRequest.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return db.serviceRequest.delete({
      where: { id },
    });
  }

  async getRecent(limit: number = 10) {
    return db.serviceRequest.findMany({
      take: limit,
      orderBy: { createdAt: 'desc' },
    });
  }

  async getStats() {
    const total = await db.serviceRequest.count();
    const byStatus = await db.serviceRequest.groupBy({
      by: ['status'],
      _count: true,
    });

    return {
      total,
      byStatus: byStatus.reduce((acc, item) => {
        acc[item.status] = item._count;
        return acc;
      }, {} as Record<string, number>),
    };
  }

  async countByStatus(status: string) {
    return db.serviceRequest.count({
      where: { status },
    });
  }

  async generateTicketNo(): Promise<string> {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');

    // Get count of service requests created this month
    const startOfMonth = new Date(year, date.getMonth(), 1);
    const count = await db.serviceRequest.count({
      where: {
        createdAt: {
          gte: startOfMonth,
        },
      },
    });

    const sequence = String(count + 1).padStart(4, '0');
    return `SR${year}${month}${sequence}`;
  }
}

export const serviceRequestRepository = new ServiceRequestRepository();
