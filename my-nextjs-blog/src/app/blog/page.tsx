import { Metadata } from 'next';
import { Suspense } from 'react';
import NextDynamic from 'next/dynamic';
import { PostCardSkeleton } from '@/components/common/Skeleton';

const BlogListClient = NextDynamic(() => import('@/components/blog/BlogListClient'), {
  loading: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <PostCardSkeleton />
      <PostCardSkeleton />
      <PostCardSkeleton />
    </div>
  ),
  ssr: true
});
import { postsService } from '@/lib/postsService';

export const metadata: Metadata = {
  title: 'All Posts | BlogApp',
  description: 'Browse all blog posts',
};

export const dynamic = 'force-dynamic';

import Image from 'next/image';
import AnimatedSection from '@/components/common/AnimatedSection';

export default async function BlogPage() {
  let initialData = null;
  try {
    // SSR: Fetch first page of posts on server
    initialData = await postsService.getAllPosts(10, 0);
  } catch (error) {
    console.error("Failed to fetch initial blog posts:", error);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
        <div>
          <AnimatedSection direction="right" duration={1}>
            <h1 className="text-7xl md:text-9xl font-black uppercase tracking-tighter text-white leading-[0.8] mb-8">
              The <br /> Journal
            </h1>
          </AnimatedSection>
          
          <AnimatedSection delay={0.3} direction="up">
            <p className="text-white/40 uppercase tracking-[0.3em] text-[10px] font-bold mb-12">
              Curated stories for the modern mind
            </p>
          </AnimatedSection>
          
          <AnimatedSection delay={0.5} direction="up">
            <p className="max-w-sm text-white/60 text-sm leading-relaxed border-l border-white/10 pl-6 italic">
              Exploring the intersection of technology, design, and human experience through weekly editorial pieces.
            </p>
          </AnimatedSection>
        </div>
        
        <AnimatedSection delay={0.7} direction="none" className="relative aspect-[4/5] lg:aspect-square overflow-hidden">
           <Image 
             src="/images/blog_hero.png" 
             alt="Journal Aesthetic" 
             fill 
             className="object-cover brightness-75 hover:scale-105 transition-transform duration-1000"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent opacity-60" />
        </AnimatedSection>
      </div>
      
      <AnimatedSection delay={1.0} direction="up">
        <Suspense fallback={<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"><PostCardSkeleton /><PostCardSkeleton /><PostCardSkeleton /></div>}>
          <BlogListClient initialData={initialData} />
        </Suspense>
      </AnimatedSection>
    </div>
  );
}
