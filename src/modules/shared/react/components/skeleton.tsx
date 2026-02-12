type SkeletonProps = {
  className?: string;
};

export const Skeleton: React.FC<SkeletonProps> = ({ className = "" }) => (
  <div className={`animate-pulse rounded-lg bg-gray-100 ${className}`} />
);

export const CardSkeleton: React.FC = () => (
  <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white">
    <Skeleton className="h-24 rounded-none" />
    <div className="space-y-3 p-4">
      <Skeleton className="h-5 w-2/3" />
      <Skeleton className="h-7 w-1/3" />
      <div className="flex gap-2">
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-5 w-20" />
      </div>
    </div>
  </div>
);

export const CardGridSkeleton: React.FC = () => (
  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {Array.from({ length: 6 }).map((_, i) => (
      <CardSkeleton key={i} />
    ))}
  </div>
);

export const DetailSkeleton: React.FC = () => (
  <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white">
    <Skeleton className="h-32 rounded-none" />
    <div className="space-y-4 p-8">
      <Skeleton className="h-8 w-1/2" />
      <Skeleton className="h-10 w-1/4" />
      <div className="flex gap-2">
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-6 w-16" />
      </div>
      <Skeleton className="h-px w-full" />
      <div className="flex gap-3">
        <Skeleton className="h-10 w-28" />
        <Skeleton className="h-10 w-28" />
      </div>
    </div>
  </div>
);
