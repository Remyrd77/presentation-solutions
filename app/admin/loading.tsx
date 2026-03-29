export default function AdminDashboardLoading() {
  return (
    <div className="p-8">
      <div className="mb-8 animate-pulse">
        <div className="h-10 bg-gray-200 rounded w-64 mb-2" />
        <div className="h-5 bg-gray-200 rounded w-96" />
      </div>

      {/* Stats Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow p-6 animate-pulse">
            <div className="flex items-center justify-between mb-4">
              <div className="h-4 bg-gray-200 rounded w-24" />
              <div className="h-10 w-10 bg-gray-200 rounded-full" />
            </div>
            <div className="h-8 bg-gray-200 rounded w-16 mb-2" />
            <div className="h-3 bg-gray-200 rounded w-32" />
          </div>
        ))}
      </div>

      {/* Tables Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200 animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-48" />
            </div>
            <div className="p-6 space-y-4">
              {Array.from({ length: 5 }).map((_, j) => (
                <div key={j} className="flex items-center gap-4 animate-pulse">
                  <div className="h-12 w-12 bg-gray-200 rounded" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
