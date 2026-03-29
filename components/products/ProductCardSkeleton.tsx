import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/Card';

export default function ProductCardSkeleton() {
  return (
    <Card className="flex flex-col animate-pulse">
      <CardHeader>
        {/* Image Skeleton */}
        <div className="bg-gray-200 rounded-lg h-48 mb-4" />

        {/* Badges Skeleton */}
        <div className="flex gap-2 mb-2">
          <div className="h-6 w-24 bg-gray-200 rounded-full" />
          <div className="h-6 w-20 bg-gray-200 rounded-full" />
        </div>

        {/* Title Skeleton */}
        <div className="h-7 bg-gray-200 rounded mb-2" />

        {/* Description Skeleton */}
        <div className="h-4 bg-gray-200 rounded w-3/4" />
      </CardHeader>

      <CardContent className="flex-grow">
        {/* Specs Skeleton */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-5/6" />
          <div className="h-4 bg-gray-200 rounded w-4/6" />
        </div>

        {/* Price Skeleton */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="h-8 bg-gray-200 rounded w-32 mb-2" />
          <div className="h-4 bg-gray-200 rounded w-40" />
        </div>
      </CardContent>

      <CardFooter className="flex gap-2">
        <div className="flex-1 h-10 bg-gray-200 rounded" />
        <div className="h-10 w-10 bg-gray-200 rounded" />
      </CardFooter>
    </Card>
  );
}
