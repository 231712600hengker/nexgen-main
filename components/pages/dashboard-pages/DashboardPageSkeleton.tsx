// components/pages/dashboard-pages/DashboardPageSkeleton.tsx
"use client";

import { Skeleton } from "@/components/ui/skeleton";

const DashboardPageSkeleton = () => {
  return (
    <section className="max-w-screen-xl mx-auto py-4 space-y-6">
      {/* Cards */}
      <div className="grid gap-2 lg:gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="p-4 rounded-md shadow bg-white dark:bg-gray-800 space-y-2">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-6 w-6 rounded-full" />
          </div>
        ))}
      </div>

      {/* Homepage Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <Skeleton className="h-6 w-32 mb-4" />
        <Skeleton className="h-[250px] w-full" />
      </div>

      {/* Recent Orders */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <Skeleton className="h-6 w-40 mb-4" />
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex justify-between items-center py-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-16" />
          </div>
        ))}
      </div>

      {/* Product Overview */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <Skeleton className="h-6 w-40 mb-4" />
        <Skeleton className="h-[250px] w-full" />
      </div>
    </section>
  );
};

export default DashboardPageSkeleton;
