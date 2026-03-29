import { Card, CardContent } from '@/components/ui/Card';
import ServiceRequestForm from '@/components/forms/ServiceRequestForm';

export const metadata = {
  title: 'Projector Repair & Maintenance Services - Presentation Solutions',
  description:
    'Expert projector repair and maintenance services in Yamunanagar. All brands, quick turnaround, genuine parts, and warranty.',
};

export default function RepairServicePage() {
  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Projector Repair & Maintenance
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Professional repair services for all projector brands with quick
            turnaround and genuine parts
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Service Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* What We Fix */}
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  What We Fix
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    'No power / Won\'t turn on',
                    'No image / Blank screen',
                    'Dim or flickering image',
                    'Color issues',
                    'Overheating problems',
                    'Lamp/bulb replacement',
                    'Lens damage or misalignment',
                    'Remote control issues',
                    'Fan noise problems',
                    'Connection port issues',
                    'Software/firmware updates',
                    'Complete cleaning & servicing',
                  ].map((issue) => (
                    <div key={issue} className="flex items-center">
                      <svg
                        className="w-5 h-5 mr-3 text-green-600 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-700">{issue}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Brands We Service */}
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Brands We Service
                </h2>
                <div className="grid grid-cols-3 md:grid-cols-5 gap-4 text-center">
                  {[
                    'Epson',
                    'BenQ',
                    'Sony',
                    'Panasonic',
                    'Hitachi',
                    'ViewSonic',
                    'Optoma',
                    'NEC',
                    'Barco',
                    'Christie',
                  ].map((brand) => (
                    <div
                      key={brand}
                      className="p-3 bg-gray-50 rounded-lg font-semibold text-gray-900"
                    >
                      {brand}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-4 text-center">
                  And many more! Contact us for other brands.
                </p>
              </CardContent>
            </Card>

            {/* Service Process */}
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Our Service Process
                </h2>
                <div className="space-y-6">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center font-bold text-primary-600">
                        1
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="font-semibold text-gray-900 mb-1">
                        Submit Service Request
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Fill out the form below with your projector details and
                        issue description
                      </p>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center font-bold text-primary-600">
                        2
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="font-semibold text-gray-900 mb-1">
                        Free Diagnosis
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Our technician will diagnose the issue and provide a cost
                        estimate
                      </p>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center font-bold text-primary-600">
                        3
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="font-semibold text-gray-900 mb-1">
                        Expert Repair
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Professional repair using genuine parts with quality testing
                      </p>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center font-bold text-primary-600">
                        4
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="font-semibold text-gray-900 mb-1">
                        Delivery & Warranty
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Free delivery with warranty on all repairs performed
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Info Sidebar */}
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-primary-600 to-primary-700 text-white">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Turnaround Time</h3>
                <div className="space-y-3">
                  <div>
                    <div className="text-2xl font-bold mb-1">24-48 hrs</div>
                    <div className="text-primary-100 text-sm">
                      Standard repairs
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold mb-1">Same Day</div>
                    <div className="text-primary-100 text-sm">
                      Urgent service available
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Service Features
                </h3>
                <ul className="space-y-3">
                  {[
                    'Free diagnosis',
                    'Genuine parts only',
                    '90-day repair warranty',
                    'No fix, no fee policy',
                    'Free pickup & delivery',
                    'Post-service support',
                  ].map((feature) => (
                    <li key={feature} className="flex items-center text-sm">
                      <svg
                        className="w-5 h-5 mr-2 text-green-600 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-6 text-center">
                <svg
                  className="w-12 h-12 text-green-600 mx-auto mb-3"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Need Urgent Help?
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Chat with us on WhatsApp for immediate assistance
                </p>
                <a
                  href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP}?text=Hi, I need urgent projector repair`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                >
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Chat Now
                </a>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Service Request Form */}
        <div>
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Request Service
              </h2>
              <p className="text-gray-600 mb-6">
                Fill out the form below and we'll get back to you within 24 hours
              </p>
              <ServiceRequestForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
