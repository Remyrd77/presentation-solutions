import { db } from '../index';

export interface InquiryFilters {
  status?: string;
  type?: string;
  priority?: string;
  productId?: string;
}

export class InquiryRepository {
  async findAll(filters?: InquiryFilters) {
    const where: any = {};

    if (filters?.status) where.status = filters.status;
    if (filters?.type) where.type = filters.type;
    if (filters?.priority) where.priority = filters.priority;
    if (filters?.productId) where.productId = filters.productId;

    return db.inquiry.findMany({
      where,
      include: {
        product: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: string) {
    return db.inquiry.findUnique({
      where: { id },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            slug: true,
            thumbnail: true,
          },
        },
      },
    });
  }

  async create(data: {
    name: string;
    email: string;
    phone: string;
    company?: string;
    type: string;
    productId?: string;
    message: string;
  }) {
    return db.inquiry.create({
      data,
    });
  }

  async update(id: string, data: {
    status?: string;
    priority?: string;
    adminNotes?: string;
  }) {
    return db.inquiry.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return db.inquiry.delete({
      where: { id },
    });
  }

  async getRecent(limit: number = 10) {
    return db.inquiry.findMany({
      take: limit,
      include: {
        product: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getStats() {
    const total = await db.inquiry.count();
    const byStatus = await db.inquiry.groupBy({
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
    return db.inquiry.count({
      where: { status },
    });
  }
}

export const inquiryRepository = new InquiryRepository();
