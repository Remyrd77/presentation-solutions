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
  stock: number;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const getBadgeVariant = (category: string) => {
    switch (category) {
      case 'REFURBISHED':
        return 'success';
      case 'NEW':
        return 'info';
      case 'RENTAL':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <Card className="flex flex-col hover:shadow-lg transition-all hover:-translate-y-1">
      <CardHeader>
        {/* Image Placeholder */}
        <Link href={`/products/${product.slug}`}>
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg h-48 mb-4 flex items-center justify-center overflow-hidden cursor-pointer hover:from-gray-100 hover:to-gray-200 transition-colors">
            <svg className="w-24 h-24 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"/>
            </svg>
          </div>
        </Link>

        {/* Badges */}
        <div className="flex gap-2 mb-2 flex-wrap">
          <Badge variant={getBadgeVariant(product.category)}>
            {PRODUCT_CATEGORIES[product.category as keyof typeof PRODUCT_CATEGORIES] || product.category}
          </Badge>
          <Badge variant="secondary">
            {PRODUCT_CONDITIONS[product.condition as keyof typeof PRODUCT_CONDITIONS] || product.condition}
          </Badge>
          {product.stock === 0 && (
            <Badge variant="danger">Out of Stock</Badge>
          )}
        </div>

        <Link href={`/products/${product.slug}`}>
          <CardTitle className="text-xl hover:text-primary-600 transition-colors cursor-pointer">
            {product.name}
          </CardTitle>
        </Link>
        <CardDescription>
          {product.brand} • {product.resolution || 'HD'}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-grow">
        <div className="space-y-2 text-sm text-gray-600">
          {product.lumens && (
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2 text-yellow-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z"/>
              </svg>
              <span>{product.lumens.toLocaleString()} Lumens</span>
            </div>
          )}
          {product.resolution && (
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2 text-blue-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"/>
              </svg>
              <span>{product.resolution}</span>
            </div>
          )}
          {product.stock > 0 && (
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
              <span>{product.stock} in stock</span>
            </div>
          )}
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-gray-900">{formatPrice(product.price)}</span>
          </div>
          {product.rentalPrice && (
            <div className="text-sm text-gray-600 mt-1">
              or {formatPrice(product.rentalPrice)}/month rental
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex gap-2">
        <Link href={`/products/${product.slug}`} className="flex-1">
          <Button variant="primary" className="w-full" disabled={product.stock === 0}>
            View Details
          </Button>
        </Link>
        <Link href={`/products/${product.slug}#inquiry`}>
          <Button variant="outline" disabled={product.stock === 0}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
            </svg>
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
