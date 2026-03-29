import { db } from '../index';

export class AdminRepository {
  async findByEmail(email: string) {
    return db.admin.findUnique({
      where: { email },
    });
  }

  async findById(id: string) {
    return db.admin.findUnique({
      where: { id },
    });
  }

  async findAll() {
    return db.admin.findMany({
      where: { active: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(data: {
    email: string;
    password: string;
    name: string;
    role?: string;
  }) {
    return db.admin.create({
      data: {
        email: data.email,
        password: data.password,
        name: data.name,
        role: data.role || 'ADMIN',
        active: true,
      },
    });
  }

  async update(id: string, data: {
    name?: string;
    email?: string;
    password?: string;
    role?: string;
    active?: boolean;
  }) {
    return db.admin.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return db.admin.update({
      where: { id },
      data: { active: false },
    });
  }
}

export const adminRepository = new AdminRepository();
