import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';

const services = [
  {
    title: 'Refurbished Projectors',
    description: 'Premium quality refurbished projectors with warranty. Tested and certified to perform like new.',
    icon: '🔄',
    link: '/services/refurbished',
    features: ['6 Months Warranty', 'Quality Tested', 'Up to 50% Savings'],
    highlight: true,
  },
  {
    title: 'Projector Rentals',
    description: 'Flexible rental plans for events, conferences, and temporary setups. Daily, weekly, or monthly rates.',
    icon: '📽️',
    link: '/services/rentals',
    features: ['Flexible Plans', 'Setup Support', 'Latest Models'],
    highlight: false,
  },
  {
    title: 'Smart Room Setup',
    description: 'Complete smart classroom and conference room solutions with projectors, screens, and audio systems.',
    icon: '🏫',
    link: '/services/smart-setup',
    features: ['Complete Solution', 'Professional Install', 'Training Included'],
    highlight: false,
  },
  {
    title: 'Repair & Service',
    description: 'Expert repair and maintenance services for all projector brands. Quick turnaround time.',
    icon: '🔧',
    link: '/services/repair',
    features: ['All Brands', 'Quick Service', 'Genuine Parts'],
    highlight: false,
  },
];

export default function ServicesShowcase() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-lg text-gray-600">
            Complete projector solutions for businesses, schools, and events in Yamunanagar and across Haryana
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <Link key={service.title} href={service.link}>
              <Card className={`h-full transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer ${
                service.highlight ? 'border-primary-600 border-2 bg-primary-50' : ''
              }`}>
                <CardHeader>
                  <div className="text-4xl mb-3">{service.icon}</div>
                  <CardTitle className="text-xl">
                    {service.title}
                    {service.highlight && (
                      <span className="ml-2 text-xs bg-primary-600 text-white px-2 py-1 rounded">
                        Popular
                      </span>
                    )}
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center text-sm text-gray-700">
                        <svg className="w-4 h-4 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 text-primary-600 font-medium text-sm flex items-center">
                    Learn More
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                    </svg>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
