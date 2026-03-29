import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { formatPrice } from '@/lib/utils';
import { PRODUCT_CATEGORIES, PRODUCT_CONDITIONS } from '@/config/constants';

interface Product {
  id: string;
  name: string;
  slug: string;
  brand: string;
  category: string;
  condition: string;
  price: number;
  rentalPrice: number | null;
  lumens: number | null;
  resolution: string | null;
  thumbnail: string;
}

interface FeaturedProductsProps {
  products: Product[];
}

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Projectors
          </h2>
          <p className="text-lg text-gray-600">
            Handpicked selection of our best refurbished and new projectors with warranty
          </p>
        </div>

        {/* Empty State */}
        {products.length === 0 ? (
          <div className="text-center py-12">
            <svg
              className="w-24 h-24 mx-auto text-gray-300 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No Products Available
            </h3>
            <p className="text-gray-600 mb-6">
              We're currently updating our inventory. Please check back soon!
            </p>
            <Link href="/contact">
              <Button variant="primary">Contact Us</Button>
            </Link>
          </div>
        ) : (
          <>
            {/* Products Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="flex flex-col hover:shadow-lg transition-shadow">
              <CardHeader>
                {/* Image Placeholder */}
                <div className="bg-gray-100 rounded-lg h-48 mb-4 flex items-center justify-center">
                  <svg className="w-24 h-24 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"/>
                  </svg>
                </div>

                {/* Badges */}
                <div className="flex gap-2 mb-2">
                  <Badge variant={product.category === 'REFURBISHED' ? 'success' : 'info'}>
                    {PRODUCT_CATEGORIES[product.category as keyof typeof PRODUCT_CATEGORIES] || product.category}
                  </Badge>
                  <Badge variant="secondary">
                    {PRODUCT_CONDITIONS[product.condition as keyof typeof PRODUCT_CONDITIONS] || product.condition}
                  </Badge>
                </div>

                <CardTitle className="text-xl">{product.name}</CardTitle>
                <CardDescription>
                  {product.brand} • {product.resolution || 'HD'}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex-grow">
                <div className="space-y-2 text-sm text-gray-600">
                  {product.lumens && (
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z"/>
                      </svg>
                      <span>{product.lumens} Lumens</span>
                    </div>
                  )}
                  {product.resolution && (
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"/>
                      </svg>
                      <span>{product.resolution}</span>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-gray-900">{formatPrice(product.price)}</span>
                    {product.rentalPrice && (
                      <span className="text-sm text-gray-600">or {formatPrice(product.rentalPrice)}/month</span>
                    )}
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex gap-2">
                <Link href={`/products/${product.slug}`} className="flex-1">
                  <Button variant="primary" className="w-full">
                    View Details
                  </Button>
                </Link>
                <Link href={`/products/${product.slug}#inquiry`}>
                  <Button variant="outline">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                    </svg>
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
            </div>

            {/* View All Button */}
            <div className="text-center mt-12">
              <Link href="/products">
                <Button size="lg" variant="outline">
                  View All Products
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                  </svg>
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
