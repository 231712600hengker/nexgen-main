import { Skeleton } from "@/components/ui/skeleton";

export const OrdersTableSkeleton = () => (
  <div className="w-full my-6">
    <Skeleton className="h-10 w-40 mb-4" />
    <div className="border rounded-lg overflow-hidden">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center justify-between p-4 border-b">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-8 w-16" />
        </div>
      ))}
    </div>
  </div>
);
