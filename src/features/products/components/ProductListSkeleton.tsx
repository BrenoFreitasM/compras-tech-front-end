const SKELETON_ITEMS = 6;

export function ProductListSkeleton() {
  return (
    <div aria-hidden className="animate-pulse">
      <div className="mb-4 space-y-2">
        <div className="h-5 w-40 rounded bg-gray-200 dark:bg-gray-800" />
        <div className="h-4 w-28 rounded bg-gray-200 dark:bg-gray-800" />
      </div>
      <div className="flex flex-col gap-3">
        {Array.from({ length: SKELETON_ITEMS }, (_, index) => (
          <div
            key={index}
            className="rounded-2xl border border-brand-border flex flex-col sm:flex-row gap-4 p-4"
          >
            <div className="w-full h-24 sm:w-28 sm:h-28 rounded-xl flex-shrink-0 bg-gray-200 dark:bg-gray-800" />
            <div className="flex flex-1 flex-col justify-between py-1 space-y-3">
              <div className="space-y-2">
                <div className="h-3 w-16 rounded bg-gray-200 dark:bg-gray-800" />
                <div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-800" />
              </div>
              <div className="flex justify-between items-end mt-auto">
                <div className="h-5 w-24 rounded bg-gray-200 dark:bg-gray-800" />
                <div className="h-8 w-48 rounded-lg bg-gray-200 dark:bg-gray-800" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
