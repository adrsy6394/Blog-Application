import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { postsService } from '@/lib/postsService';
import PostCard from '@/components/blog/PostCard';

export const metadata: Metadata = {
  title: "BlogApp — Modern Blogging Platform",
  description: "A production-grade blog application built with Next.js",
};

export const revalidate = 1800;

export default async function HomePage() {
  let posts = [];
  try {
    const data = await postsService.getAllPosts(6, 0);
    posts = data.posts;
  } catch (error) {
    console.error("Failed to fetch featured posts:", error);
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
        <div className="absolute inset-0 top-0 left-0 right-0 h-full w-full overflow-hidden bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 -z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-2xl">
              <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight mb-6">
                Insights, Stories, and <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">Brilliant Ideas</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Welcome to BlogApp, a modern platform designed for seamless reading and writing experiences. Explore topics ranging from technology to lifestyle.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/blog" className="inline-flex justify-center items-center px-8 py-4 text-base font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-lg hover:shadow-blue-500/30 hover:-translate-y-1">
                  Explore Articles
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </Link>
                <Link href="/about" className="inline-flex justify-center items-center px-8 py-4 text-base font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 dark:text-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-xl transition-all">
                  Learn More
                </Link>
              </div>
            </div>
            <div className="hidden lg:block relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-200 to-indigo-200 dark:from-blue-900/40 dark:to-indigo-900/40 rounded-3xl transform rotate-3 scale-105 opacity-50 blur-lg"></div>
              <Image 
                src="https://picsum.photos/seed/blog/800/600" 
                alt="Hero Illustration" 
                width={800} 
                height={600} 
                className="relative rounded-3xl shadow-2xl object-cover border border-white/20 dark:border-gray-700/50"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900 flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight sm:text-4xl">Featured Posts</h2>
              <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">The latest articles from our top authors.</p>
            </div>
            <Link href="/blog" className="hidden sm:inline-flex items-center text-blue-600 dark:text-blue-400 font-medium hover:underline">
              View all posts &rarr;
            </Link>
          </div>

          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map(post => (
                <PostCard key={post.id} post={post as any} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
               <p className="text-gray-500 dark:text-gray-400">No posts available at the moment.</p>
            </div>
          )}

          <div className="mt-12 sm:hidden text-center">
             <Link href="/blog" className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors w-full">
              View all posts
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
