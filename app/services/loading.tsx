export default function ServicesLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Skeleton */}
      <div className="bg-gradient-to-br from-primary-900 to-primary-700 text-white py-20 animate-pulse">
        <div className="container mx-auto px-4 text-center">
          <div className="h-12 bg-white/20 rounded w-2/3 mx-auto mb-6" />
          <div className="h-6 bg-white/20 rounded w-1/2 mx-auto" />
        </div>
      </div>

      {/* Services Grid Skeleton */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-lg overflow-hidden animate-pulse">
                <div className="bg-gray-200 h-48" />
                <div className="p-8">
                  <div className="h-8 bg-gray-200 rounded mb-4" />
                  <div className="space-y-2 mb-6">
                    <div className="h-4 bg-gray-200 rounded" />
                    <div className="h-4 bg-gray-200 rounded w-5/6" />
                  </div>
                  <div className="h-10 bg-gray-200 rounded w-32" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
