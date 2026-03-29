export const siteConfig = {
  name: 'Presentation Solutions',
  description:
    'Leading provider of refurbished projectors, rentals, smart room setup, and servicing in Yamunanagar, Haryana.',
  url: 'https://presentationsolutions.in', // Update with actual domain
  ogImage: '/og-image.jpg', // Add OG image to public folder
  links: {
    facebook: '#',
    twitter: '#',
    linkedin: '#',
  },
};

export const businessInfo = {
  name: 'Presentation Solutions',
  legalName: 'Presentation Solutions',
  address: {
    streetAddress: 'Yamunanagar',
    addressLocality: 'Yamunanagar',
    addressRegion: 'Haryana',
    postalCode: '135001',
    addressCountry: 'IN',
  },
  geo: {
    latitude: 30.1290,
    longitude: 77.2674,
  },
  telephone: process.env.NEXT_PUBLIC_PHONE || '+91-XXXXXXXXXX',
  email: process.env.NEXT_PUBLIC_EMAIL || 'info@presentationsolutions.in',
  priceRange: '₹₹',
  openingHours: ['Mo-Fr 09:00-19:00', 'Sa 10:00-17:00'],
};

// LocalBusiness Schema for Homepage
export function getLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: businessInfo.name,
    legalName: businessInfo.legalName,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: businessInfo.telephone,
    email: businessInfo.email,
    priceRange: businessInfo.priceRange,
    address: {
      '@type': 'PostalAddress',
      ...businessInfo.address,
    },
    geo: {
      '@type': 'GeoCoordinates',
      ...businessInfo.geo,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '19:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '10:00',
        closes: '17:00',
      },
    ],
  };
}

// Product Schema
export function getProductSchema(product: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    brand: {
      '@type': 'Brand',
      name: product.brand,
    },
    model: product.model,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'INR',
      price: product.price,
      availability: product.stock > 0
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      itemCondition: getConditionUrl(product.condition),
      seller: {
        '@type': 'Organization',
        name: businessInfo.name,
      },
    },
  };
}

// Service Schema
export function getServiceSchema(serviceName: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: serviceName,
    provider: {
      '@type': 'LocalBusiness',
      name: businessInfo.name,
    },
    description,
    areaServed: {
      '@type': 'City',
      name: 'Yamunanagar',
    },
  };
}

// Helper function
function getConditionUrl(condition: string): string {
  const conditionMap: Record<string, string> = {
    NEW: 'https://schema.org/NewCondition',
    LIKE_NEW: 'https://schema.org/RefurbishedCondition',
    EXCELLENT: 'https://schema.org/RefurbishedCondition',
    GOOD: 'https://schema.org/UsedCondition',
  };
  return conditionMap[condition] || 'https://schema.org/UsedCondition';
}
