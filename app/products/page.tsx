import { Suspense } from 'react';
import ProductFilter from '@/components/products/ProductFilter';
import ProductGrid from '@/components/products/ProductGrid';
import { productService } from '@/lib/services/product.service';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projectors for Sale & Rent | Presentation Solutions',
  description: 'Browse our wide range of refurbished and new projectors. Purchase or rent with flexible terms. Epson, BenQ, Sony, Panasonic projectors in Yamunanagar.',
};

interface PageProps {
  searchParams: Promise<{
    category?: string;
    brand?: string;
    condition?: string;
    minPrice?: string;
    maxPrice?: string;
    minLumens?: string;
  }>;
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const params = await searchParams;

  // Build filter object from search params
  const filters = {
    category: params.category,
    brand: params.brand,
    condition: params.condition,
    minPrice: params.minPrice ? parseFloat(params.minPrice) : undefined,
    maxPrice: params.maxPrice ? parseFloat(params.maxPrice) : undefined,
    minLumens: params.minLumens ? parseInt(params.minLumens) : undefined,
    active: true,
  };

  // Fetch products and filter options
  const [products, brands, categories] = await Promise.all([
    productService.getProducts(filters),
    productService.getAvailableBrands(),
    productService.getAvailableCategories(),
  ]);

  // Count active filters
  const activeFilterCount = Object.entries(params).filter(([_, value]) => value).length;

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Our Products
          </h1>
          <p className="text-lg text-gray-600">
            Browse our collection of {products.length} projectors
            {activeFilterCount > 0 && ` (${activeFilterCount} filter${activeFilterCount > 1 ? 's' : ''} applied)`}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Filters */}
          <aside className="lg:w-64 flex-shrink-0">
            <Suspense fallback={<div className="bg-white rounded-lg border border-gray-200 p-6 h-96 animate-pulse" />}>
              <ProductFilter brands={brands} categories={categories} />
            </Suspense>
          </aside>

          {/* Main Content - Products */}
          <main className="flex-1">
            {/* Sort & View Options */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-sm text-gray-600">
                Showing <span className="font-semibold">{products.length}</span> results
              </p>
              {/* Future: Add sort dropdown */}
            </div>

            {/* Product Grid */}
            <Suspense fallback={
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-lg border border-gray-200 h-96 animate-pulse" />
                ))}
              </div>
            }>
              <ProductGrid products={products} />
            </Suspense>

            {/* Pagination (Future) */}
            {products.length > 12 && (
              <div className="mt-12 flex justify-center">
                <p className="text-sm text-gray-500">Showing all {products.length} products</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
