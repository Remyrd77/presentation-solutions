import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import ProductCard from '@/components/products/ProductCard';
import InquiryForm from '@/components/forms/InquiryForm';
import { productService } from '@/lib/services/product.service';
import { formatPrice } from '@/lib/utils';
import { PRODUCT_CATEGORIES, PRODUCT_CONDITIONS, WHATSAPP_NUMBER } from '@/config/constants';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const { slug } = await params;
    const product = await productService.getProductBySlug(slug);

    return {
      title: `${product.name} - ${product.brand} | Presentation Solutions`,
      description: product.description,
      openGraph: {
        title: `${product.name} - ${product.brand}`,
        description: product.description,
        type: 'website',
      },
    };
  } catch {
    return {
      title: 'Product Not Found',
    };
  }
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  let product;

  try {
    product = await productService.getProductBySlug(slug);
  } catch {
    notFound();
  }

  // Get related products
  const relatedProducts = await productService.getRelatedProducts(product.id, 4);

  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=Hi, I'm interested in ${encodeURIComponent(product.name)} (${formatPrice(product.price)})`;

  // Parse images array
  let images: string[] = [];
  try {
    images = JSON.parse(product.images);
  } catch {
    images = [product.thumbnail];
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-primary-600">Home</Link>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/>
            </svg>
            <Link href="/products" className="hover:text-primary-600">Products</Link>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/>
            </svg>
            <span className="text-gray-900 font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Image Gallery */}
          <div>
            <Card>
              <CardContent className="p-0">
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-t-lg aspect-video flex items-center justify-center">
                  <svg className="w-32 h-32 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"/>
                  </svg>
                </div>
                {images.length > 1 && (
                  <div className="grid grid-cols-4 gap-2 p-4">
                    {images.slice(0, 4).map((_, index) => (
                      <div key={index} className="aspect-video bg-gray-100 rounded-lg" />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Product Info */}
          <div>
            {/* Badges */}
            <div className="flex gap-2 mb-4">
              <Badge variant={product.category === 'REFURBISHED' ? 'success' : product.category === 'NEW' ? 'info' : 'warning'}>
                {PRODUCT_CATEGORIES[product.category as keyof typeof PRODUCT_CATEGORIES]}
              </Badge>
              <Badge variant="secondary">
                {PRODUCT_CONDITIONS[product.condition as keyof typeof PRODUCT_CONDITIONS]}
              </Badge>
              {product.stock === 0 && (
                <Badge variant="danger">Out of Stock</Badge>
              )}
              {product.stock > 0 && product.stock <= 3 && (
                <Badge variant="warning">Only {product.stock} left</Badge>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>

            <div className="flex items-center gap-4 mb-6 text-gray-600">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
                </svg>
                Brand: <span className="font-semibold text-gray-900">{product.brand}</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                </svg>
                Model: <span className="font-semibold text-gray-900">{product.model}</span>
              </div>
            </div>

            {/* Price */}
            <div className="bg-blue-50 rounded-lg p-6 mb-6">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-4xl font-bold text-gray-900">{formatPrice(product.price)}</span>
                {product.category === 'REFURBISHED' && (
                  <span className="text-sm text-green-600 font-semibold">Save up to 50%</span>
                )}
              </div>
              {product.rentalPrice && (
                <p className="text-lg text-gray-700">
                  or <span className="font-semibold">{formatPrice(product.rentalPrice)}/month</span> rental
                </p>
              )}
              {product.category === 'REFURBISHED' && (
                <p className="text-sm text-gray-600 mt-2 flex items-center">
                  <svg className="w-4 h-4 mr-1 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  6 Months Warranty Included
                </p>
              )}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex-1">
                <Button size="lg" className="w-full" disabled={product.stock === 0}>
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  {product.stock === 0 ? 'Out of Stock' : 'WhatsApp to Buy'}
                </Button>
              </a>
              <Link href="#inquiry" className="flex-1">
                <Button size="lg" variant="outline" className="w-full" disabled={product.stock === 0}>
                  Request Quote
                </Button>
              </Link>
            </div>

            {/* Quick Specs */}
            <Card className="bg-white">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">Key Specifications</h3>
                <dl className="grid grid-cols-2 gap-4 text-sm">
                  {product.lumens && (
                    <>
                      <dt className="text-gray-600">Brightness</dt>
                      <dd className="font-semibold text-gray-900">{product.lumens.toLocaleString()} Lumens</dd>
                    </>
                  )}
                  {product.resolution && (
                    <>
                      <dt className="text-gray-600">Resolution</dt>
                      <dd className="font-semibold text-gray-900">{product.resolution}</dd>
                    </>
                  )}
                  {product.technology && (
                    <>
                      <dt className="text-gray-600">Technology</dt>
                      <dd className="font-semibold text-gray-900">{product.technology}</dd>
                    </>
                  )}
                  {product.throwRatio && (
                    <>
                      <dt className="text-gray-600">Throw Ratio</dt>
                      <dd className="font-semibold text-gray-900">{product.throwRatio}</dd>
                    </>
                  )}
                  <dt className="text-gray-600">Condition</dt>
                  <dd className="font-semibold text-gray-900">
                    {PRODUCT_CONDITIONS[product.condition as keyof typeof PRODUCT_CONDITIONS]}
                  </dd>
                  <dt className="text-gray-600">Availability</dt>
                  <dd className="font-semibold text-gray-900">
                    {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                  </dd>
                </dl>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Description & Full Specs */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
                <div className="prose max-w-none text-gray-700">
                  <p>{product.description}</p>
                </div>

                {product.category === 'REFURBISHED' && (
                  <div className="mt-6 p-4 bg-green-50 rounded-lg">
                    <h3 className="font-semibold text-green-900 mb-2 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                      Refurbished Quality Guarantee
                    </h3>
                    <ul className="text-sm text-green-900 space-y-1">
                      <li>• Thoroughly tested and inspected</li>
                      <li>• Genuine parts replaced if needed</li>
                      <li>• Professional cleaning and calibration</li>
                      <li>• 6 months warranty included</li>
                      <li>• Works like new at 50% savings</li>
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">Why Buy From Us?</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 mr-2 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    <span>15+ years of experience</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 mr-2 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    <span>Free installation support</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 mr-2 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    <span>After-sales service</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 mr-2 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    <span>Trusted by 500+ clients</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 mr-2 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    <span>Flexible rental options</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Similar Products</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}

        {/* Inquiry Form */}
        <div id="inquiry" className="mt-12">
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Request a Quote</h2>
              <p className="text-gray-600 mb-6">
                Fill out the form below and we'll get back to you within 24 hours
              </p>
              <InquiryForm productId={product.id} productName={product.name} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
