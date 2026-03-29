export default function ProductDetailLoading() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm p-8 animate-pulse">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image Gallery Skeleton */}
            <div>
              {/* Main Image */}
              <div className="bg-gray-200 rounded-lg h-96 mb-4" />

              {/* Thumbnail Strip */}
              <div className="flex gap-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="bg-gray-200 rounded h-20 w-20" />
                ))}
              </div>
            </div>

            {/* Product Info Skeleton */}
            <div>
              {/* Badges */}
              <div className="flex gap-2 mb-4">
                <div className="h-6 w-24 bg-gray-200 rounded-full" />
                <div className="h-6 w-20 bg-gray-200 rounded-full" />
              </div>

              {/* Title */}
              <div className="h-10 bg-gray-200 rounded mb-4" />

              {/* Brand */}
              <div className="h-6 bg-gray-200 rounded w-48 mb-6" />

              {/* Price */}
              <div className="border-t border-b border-gray-200 py-4 mb-6">
                <div className="h-10 bg-gray-200 rounded w-40 mb-2" />
                <div className="h-5 bg-gray-200 rounded w-56" />
              </div>

              {/* Specs Table */}
              <div className="mb-6 space-y-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="flex justify-between py-2">
                    <div className="h-4 bg-gray-200 rounded w-32" />
                    <div className="h-4 bg-gray-200 rounded w-40" />
                  </div>
                ))}
              </div>

              {/* Buttons */}
              <div className="flex gap-3 mb-6">
                <div className="h-12 bg-gray-200 rounded flex-1" />
                <div className="h-12 bg-gray-200 rounded w-32" />
              </div>
            </div>
          </div>

          {/* Description Skeleton */}
          <div className="mt-12 space-y-3">
            <div className="h-7 bg-gray-200 rounded w-48 mb-4" />
            <div className="h-4 bg-gray-200 rounded" />
            <div className="h-4 bg-gray-200 rounded" />
            <div className="h-4 bg-gray-200 rounded w-5/6" />
          </div>
        </div>
      </div>
    </div>
  );
}
