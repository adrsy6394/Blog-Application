import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { postsService } from '@/lib/postsService';
import PostCard from '@/components/blog/PostCard';
import { Post } from '@/store/slices/postsSlice';

export const metadata: Metadata = {
  title: "BlogApp — Modern Blogging Platform",
  description: "A production-grade blog application built with Next.js",
};

export const revalidate = 1800;

import AnimatedSection from '@/components/common/AnimatedSection';

export default async function HomePage() {
  let posts: Post[] = [];
  try {
    const data = await postsService.getAllPosts(6, 0);
    posts = data.posts;
  } catch (error) {
    console.error("Failed to fetch featured posts:", error);
  }

  return (
    <div className="flex flex-col min-h-screen bg-theme text-theme">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[700px] flex items-center overflow-hidden bg-[#0f172a]">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/hero.png" 
            alt="Hero Blogging" 
            fill 
            className="object-cover brightness-[0.4]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-[#0f172a]/40" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-20">
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8">
              <AnimatedSection direction="right" duration={1.2}>
                <h1 className="heading-hero mb-8 text-white drop-shadow-2xl">
                  The Infinite <br />
                  <span className="text-white/80">Power of</span> <br />
                  Words
                </h1>
              </AnimatedSection>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-8 justify-end h-full py-12">
              <AnimatedSection delay={0.4} direction="up">
                <div className="glass p-8 rounded-2xl max-w-sm ml-auto">
                  <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/50 mb-4">Thoughts & Insights</p>
                  <p className="text-lg leading-relaxed text-white/90 text-balance">
                    A platform where ideas transcend boundaries, where storytelling meets precision to inspire, educate, and connect minds across the globe.
                  </p>
                </div>
              </AnimatedSection>
              
              <AnimatedSection delay={0.6} direction="up">
                <div className="flex gap-4 justify-end">
                   <Link href="/blog" className="px-8 py-4 bg-white text-[#0f172a] font-bold uppercase tracking-widest hover:bg-gray-200 transition-all rounded-sm text-sm">
                     Explore Feed
                   </Link>
                   <Link href="/about" className="px-8 py-4 border border-white/30 text-white font-bold uppercase tracking-widest hover:bg-white/10 transition-all rounded-sm text-sm">
                     Our Mission
                   </Link>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>

        {/* Bottom Detail Bar (Updated for Blogging) */}
        <div className="absolute bottom-0 left-0 right-0 z-20 py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-end justify-between gap-12 text-white">
               <div className="flex items-center gap-8">
                  <AnimatedSection delay={0.8} direction="up" className="border-l-2 border-white/20 pl-6">
                    <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Total Stories</p>
                    <p className="text-4xl font-black uppercase tracking-tighter">1.2K+</p>
                  </AnimatedSection>
                  <AnimatedSection delay={1.0} direction="up" className="border-l-2 border-white/20 pl-6">
                    <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Weekly Readers</p>
                    <p className="text-4xl font-black uppercase tracking-tighter">50K+</p>
                  </AnimatedSection>
               </div>
               
               <AnimatedSection delay={1.2} direction="none" className="hidden md:block">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-white/30 text-right">Creative Expression • Digital Journalism</p>
               </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts Section (Modernized) */}
      <section className="py-32 bg-theme relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="flex flex-col md:flex-row justify-between items-baseline mb-16 gap-4">
            <div>
              <h2 className="text-5xl font-black uppercase tracking-tighter text-theme">Journal</h2>
              <p className="mt-2 text-theme/40 uppercase tracking-[0.3em] text-xs">Explore the latest insights</p>
            </div>
            <Link href="/blog" className="text-sm font-bold uppercase tracking-widest border-b border-theme pb-1 hover:border-blue-600 transition-all">
              View All Stories
            </Link>
          </AnimatedSection>

          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {posts.map((post, index) => (
                <AnimatedSection key={post.id} delay={index * 0.1}>
                  <PostCard post={post} />
                </AnimatedSection>
              ))}
            </div>
          ) : (
            <AnimatedSection className="text-center py-20 glass rounded-3xl">
               <p className="text-theme/40 font-medium tracking-widest uppercase text-sm">Waiting for inspiration...</p>
            </AnimatedSection>
          )}
        </div>
      </section>
    </div>
  );
}
