import { PostCardSkeleton } from "@/components/common/Skeleton";

export default function BlogLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12 animate-pulse">
        <div className="h-12 w-64 bg-gray-200 dark:bg-gray-700 rounded mx-auto mb-4"></div>
        <div className="h-6 w-96 bg-gray-200 dark:bg-gray-700 rounded mx-auto"></div>
      </div>
      
      <div className="mb-8 max-w-xl mx-auto animate-pulse">
         <div className="h-14 w-full bg-gray-200 dark:bg-gray-700 rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <PostCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
