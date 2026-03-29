export default function ContactLoading() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-pulse">
          <div className="h-10 bg-gray-200 rounded w-64 mx-auto mb-4" />
          <div className="h-6 bg-gray-200 rounded w-96 mx-auto" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form Skeleton */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-8 animate-pulse">
              <div className="h-7 bg-gray-200 rounded w-48 mb-6" />
              <div className="space-y-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-24" />
                    <div className="h-10 bg-gray-200 rounded" />
                  </div>
                ))}
                <div className="h-32 bg-gray-200 rounded" />
                <div className="h-12 bg-gray-200 rounded w-40" />
              </div>
            </div>
          </div>

          {/* Contact Info Skeleton */}
          <div className="space-y-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
                <div className="h-10 w-10 bg-gray-200 rounded-full mb-4" />
                <div className="h-5 bg-gray-200 rounded w-32 mb-2" />
                <div className="h-4 bg-gray-200 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
