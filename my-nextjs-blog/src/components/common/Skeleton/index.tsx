export const PostCardSkeleton = () => (
  <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 h-full flex flex-col animate-pulse">
    <div className="p-6 flex flex-col flex-grow">
      <div className="flex gap-2 mb-4">
        <div className="h-5 w-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
        <div className="h-5 w-20 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
      </div>
      <div className="h-6 w-full bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
      <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-6"></div>
      
      <div className="space-y-2 mb-6 flex-grow">
        <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
        <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
        <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>
      
      <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700 mt-auto">
        <div className="flex gap-4">
          <div className="h-4 w-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-4 w-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
        <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>
    </div>
  </div>
);

export const PostDetailSkeleton = () => (
  <div className="max-w-3xl mx-auto px-4 py-8 animate-pulse">
    <div className="h-10 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-6"></div>
    <div className="flex gap-4 mb-8">
      <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
      <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
    </div>
    <div className="space-y-4">
      <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
      <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
      <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
      <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-700 rounded"></div>
      <div className="h-4 w-4/6 bg-gray-200 dark:bg-gray-700 rounded mt-4"></div>
    </div>
  </div>
);
