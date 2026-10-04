const SKELETON_ITEMS = 8;

export function ProductListSkeleton() {
  return (
    <div aria-hidden className="animate-pulse">
      <div className="mb-4 space-y-2">
        <div className="h-5 w-40 rounded bg-gray-200 dark:bg-gray-800" />
        <div className="h-4 w-28 rounded bg-gray-200 dark:bg-gray-800" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        {Array.from({ length: SKELETON_ITEMS }, (_, index) => (
          <div
            key={index}
            className="rounded-2xl border border-brand-border dark:border-brand-border-strong overflow-hidden"
          >
            <div className="aspect-[4/3] bg-gray-200 dark:bg-gray-800" />
            <div className="p-3 space-y-2">
              <div className="h-3 w-16 rounded bg-gray-200 dark:bg-gray-800" />
              <div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-800" />
              <div className="h-5 w-24 rounded bg-gray-200 dark:bg-gray-800" />
              <div className="h-8 w-full rounded-lg bg-gray-200 dark:bg-gray-800" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
