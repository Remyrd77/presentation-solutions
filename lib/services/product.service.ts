import { productRepository, type ProductFilters } from '../db/repositories/product.repository';
import slugify from 'slugify';

export class ProductService {
  async getProducts(filters?: ProductFilters) {
    return productRepository.findAll(filters);
  }

  async getProductById(id: string) {
    const product = await productRepository.findById(id);
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  }

  async getProductBySlug(slug: string) {
    const product = await productRepository.findBySlug(slug);
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  }

  async getFeaturedProducts(limit?: number) {
    return productRepository.getFeatured(limit);
  }

  async getAvailableBrands() {
    return productRepository.getBrands();
  }

  async getAvailableCategories() {
    return productRepository.getCategories();
  }

  // Business logic: Check stock availability
  async checkStockAvailability(productId: string, quantity: number = 1) {
    const product = await this.getProductById(productId);
    return product.stock >= quantity;
  }

  // Business logic: Get related products
  async getRelatedProducts(productId: string, limit: number = 4) {
    const product = await this.getProductById(productId);

    // Get products in same category with similar price range
    const priceMin = product.price * 0.7;
    const priceMax = product.price * 1.3;

    const related = await productRepository.findAll({
      category: product.category,
      minPrice: priceMin,
      maxPrice: priceMax,
      active: true,
    });

    // Filter out current product and limit results
    return related.filter(p => p.id !== productId).slice(0, limit);
  }

  // Generate SEO-friendly slug
  generateSlug(name: string): string {
    return slugify(name, { lower: true, strict: true });
  }
}

export const productService = new ProductService();
