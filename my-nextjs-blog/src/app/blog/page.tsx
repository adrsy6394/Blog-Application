import { Metadata } from 'next';
import { Suspense } from 'react';
import BlogListClient from '@/components/blog/BlogListClient';
import { PostCardSkeleton } from '@/components/common/Skeleton';
import { postsService } from '@/lib/postsService';

export const metadata: Metadata = {
  title: 'All Posts | BlogApp',
  description: 'Browse all blog posts',
};

export const dynamic = 'force-dynamic';

export default async function BlogPage() {
  let initialData = null;
  try {
    // SSR: Fetch first page of posts on server
    initialData = await postsService.getAllPosts(10, 0);
  } catch (error) {
    console.error("Failed to fetch initial blog posts:", error);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl">The Blog</h1>
        <p className="mt-4 text-xl text-gray-500 dark:text-gray-400">Discover the latest articles, insights, and stories.</p>
      </div>
      
      <Suspense fallback={<div className="grid grid-cols-1 md:grid-cols-3 gap-6"><PostCardSkeleton /><PostCardSkeleton /><PostCardSkeleton /></div>}>
        <BlogListClient initialData={initialData} />
      </Suspense>
    </div>
  );
}
