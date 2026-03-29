export default function HomeLoading() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Skeleton */}
      <div className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 text-white py-20 animate-pulse">
        <div className="container mx-auto px-4 text-center">
          <div className="h-12 bg-white/20 rounded w-2/3 mx-auto mb-6" />
          <div className="h-6 bg-white/20 rounded w-1/2 mx-auto mb-8" />
          <div className="flex gap-4 justify-center">
            <div className="h-12 w-40 bg-white/20 rounded" />
            <div className="h-12 w-40 bg-white/20 rounded" />
          </div>
        </div>
      </div>

      {/* Services Skeleton */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="h-10 bg-gray-200 rounded w-64 mx-auto mb-12 animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
                <div className="h-12 w-12 bg-gray-200 rounded-full mb-4" />
                <div className="h-6 bg-gray-200 rounded mb-3" />
                <div className="h-4 bg-gray-200 rounded mb-2" />
                <div className="h-4 bg-gray-200 rounded w-5/6" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Skeleton */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="h-10 bg-gray-200 rounded w-80 mx-auto mb-12 animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
                <div className="bg-gray-200 rounded h-48 mb-4" />
                <div className="h-6 bg-gray-200 rounded mb-2" />
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4" />
                <div className="h-8 bg-gray-200 rounded w-32" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
