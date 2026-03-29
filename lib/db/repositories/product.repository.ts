import { db } from '../index';

export interface ProductFilters {
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  minLumens?: number;
  resolution?: string;
  condition?: string;
  featured?: boolean;
  active?: boolean;
}

export class ProductRepository {
  async findAll(filters?: ProductFilters) {
    const where: any = {
      active: filters?.active ?? true,
    };

    if (filters?.category) where.category = filters.category;
    if (filters?.brand) where.brand = filters.brand;
    if (filters?.condition) where.condition = filters.condition;
    if (filters?.featured !== undefined) where.featured = filters.featured;
    if (filters?.resolution) where.resolution = filters.resolution;

    return db.product.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: string) {
    return db.product.findUnique({ where: { id } });
  }

  async findBySlug(slug: string) {
    return db.product.findUnique({ where: { slug } });
  }

  async getFeatured(limit: number = 6) {
    return db.product.findMany({
      where: { featured: true, active: true },
      take: limit,
      orderBy: { createdAt: 'desc' },
    });
  }

  async getBrands() {
    const products = await db.product.findMany({
      select: { brand: true },
      where: { active: true },
    });
    // Get unique brands
    const uniqueBrands = [...new Set(products.map(p => p.brand))];
    return uniqueBrands;
  }

  async getCategories() {
    const products = await db.product.findMany({
      select: { category: true },
      where: { active: true },
    });
    // Get unique categories
    const uniqueCategories = [...new Set(products.map(p => p.category))];
    return uniqueCategories;
  }
}

export const productRepository = new ProductRepository();
