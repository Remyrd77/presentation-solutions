import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export const metadata = {
  title: 'Smart Room Setup - Conference & Classroom Solutions | Presentation Solutions',
  description:
    'Complete smart conference room and classroom setup with projectors, screens, audio systems, and automation. Yamunanagar, Haryana.',
};

export default function SmartSetupPage() {
  const solutions = [
    {
      title: 'Conference Room',
      description:
        'Professional meeting spaces with projector, screen, video conferencing, and wireless presentation',
      features: [
        'Wireless presentation system',
        'Video conferencing setup',
        'Audio system integration',
        'Smart control panel',
        'Cable management',
      ],
      image: '🏢',
    },
    {
      title: 'Smart Classroom',
      description:
        'Interactive learning environment with projector, interactive display, and audio for engaging lessons',
      features: [
        'Interactive projector/display',
        'Document camera',
        'Wireless content sharing',
        'Sound reinforcement',
        'Teacher control panel',
      ],
      image: '🎓',
    },
    {
      title: 'Training Center',
      description:
        'Multi-screen setup for training sessions with recording capabilities and remote participation',
      features: [
        'Multiple display zones',
        'Recording system',
        'Remote participation',
        'Participant feedback system',
        'Content distribution',
      ],
      image: '👥',
    },
    {
      title: 'Auditorium',
      description:
        'Large venue setup with high-brightness projectors, professional audio, and stage lighting control',
      features: [
        'High-brightness projectors',
        'Professional audio system',
        'Stage lighting',
        'Streaming capabilities',
        'Central control system',
      ],
      image: '🎭',
    },
  ];

  const setupProcess = [
    {
      step: '1',
      title: 'Consultation',
      description:
        'We visit your space to understand your requirements and take measurements',
    },
    {
      step: '2',
      title: 'Design',
      description:
        'Custom design tailored to your needs with equipment selection and layout planning',
    },
    {
      step: '3',
      title: 'Installation',
      description:
        'Professional installation by certified technicians with clean cable management',
    },
    {
      step: '4',
      title: 'Training',
      description:
        'Comprehensive training for your team on how to use all systems effectively',
    },
  ];

  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-4">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
            Custom Design & Installation
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Smart Room Setup
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Transform your conference rooms and classrooms into modern, efficient
            spaces with our complete smart setup solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg">Schedule Consultation</Button>
            </Link>
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP}?text=Hi, I'd like to discuss smart room setup`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" variant="outline">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Chat Now
              </Button>
            </a>
          </div>
        </div>

        {/* Solutions */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {solutions.map((solution) => (
            <Card key={solution.title}>
              <CardContent className="p-8">
                <div className="text-6xl mb-4">{solution.image}</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  {solution.title}
                </h2>
                <p className="text-gray-600 mb-6">{solution.description}</p>
                <h3 className="font-semibold text-gray-900 mb-3">Key Features:</h3>
                <ul className="space-y-2">
                  {solution.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <svg
                        className="w-5 h-5 mr-3 text-green-600 flex-shrink-0 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Process */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Our Setup Process
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {setupProcess.map((item) => (
              <Card key={item.step}>
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Equipment & Services */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Equipment We Provide
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: 'Projectors', icon: '📽️' },
                  { name: 'Screens', icon: '🖼️' },
                  { name: 'Audio Systems', icon: '🔊' },
                  { name: 'Microphones', icon: '🎤' },
                  { name: 'Video Conferencing', icon: '📹' },
                  { name: 'Control Panels', icon: '🎛️' },
                  { name: 'Wireless Systems', icon: '📡' },
                  { name: 'Lighting', icon: '💡' },
                ].map((equipment) => (
                  <div
                    key={equipment.name}
                    className="flex items-center p-3 bg-gray-50 rounded-lg"
                  >
                    <span className="text-2xl mr-3">{equipment.icon}</span>
                    <span className="font-medium text-gray-900">
                      {equipment.name}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Services Included
              </h2>
              <ul className="space-y-4">
                {[
                  'Site survey and assessment',
                  'Custom system design',
                  'Equipment selection',
                  'Professional installation',
                  'Cable management & concealment',
                  'System programming',
                  'User training',
                  'Documentation',
                  'Warranty & support',
                  'Annual maintenance',
                ].map((service) => (
                  <li key={service} className="flex items-start">
                    <svg
                      className="w-6 h-6 mr-3 text-green-600 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-700">{service}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Benefits */}
        <Card className="bg-gradient-to-br from-primary-50 to-blue-50 mb-16">
          <CardContent className="p-12">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
              Why Invest in a Smart Room?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-primary-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path
                      fillRule="evenodd"
                      d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Boost Productivity
                </h3>
                <p className="text-gray-600">
                  Streamlined workflows and efficient meetings save time and improve
                  collaboration
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-primary-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Better Engagement
                </h3>
                <p className="text-gray-600">
                  Interactive tools and clear presentations keep audiences engaged
                  and focused
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-primary-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                    <path
                      fillRule="evenodd"
                      d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Professional Image
                </h3>
                <p className="text-gray-600">
                  Modern facilities impress clients and attract top talent to your
                  organization
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <Card className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Transform Your Space?
            </h2>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              Schedule a free consultation and we'll create a custom solution for
              your conference room or classroom.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" variant="outline" className="bg-white text-green-600 hover:bg-gray-100">
                  Schedule Consultation
                </Button>
              </Link>
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP}?text=Hi, I'd like to discuss smart room setup`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp Us
                </Button>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
