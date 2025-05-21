// components/skeletons/StatisticsCardSkeleton.tsx
import { Skeleton } from "@/components/ui/skeleton";

export const StatisticsCardSkeleton = () => {
  return (
    <div className="grid gap-2 lg:gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="bg-white dark:bg-gray-900 w-full rounded-lg p-4 shadow-md flex items-center">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="ml-4 flex flex-col space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
      ))}
    </div>
  );
};
