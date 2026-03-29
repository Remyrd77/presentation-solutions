import HeroSection from '@/components/home/HeroSection';
import ServicesShowcase from '@/components/home/ServicesShowcase';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import CTASection from '@/components/home/CTASection';
import { productRepository } from '@/lib/db/repositories/product.repository';
import { getLocalBusinessSchema } from '@/config/seo';

export default async function Home() {
  // Fetch featured products
  const featuredProducts = await productRepository.getFeatured(6);

  // JSON-LD structured data
  const jsonLd = getLocalBusinessSchema();

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div>
        <HeroSection />
        <ServicesShowcase />
        <FeaturedProducts products={featuredProducts} />
        <TestimonialsSection />
        <CTASection />
      </div>
    </>
  );
}
