"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Post } from '@/store/slices/postsSlice';
import { truncateText } from '@/utils/helpers';
import React from 'react';

interface PostCardProps {
  post: Post;
}

const PostCard = React.memo(({ post }: PostCardProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="h-full"
    >
      <div className="glass group relative overflow-hidden transition-all duration-500 h-full flex flex-col p-8 rounded-none border-l-2 border-slate-200 dark:border-white/5 hover:border-blue-500 dark:hover:border-white/20">
        <div className="flex-grow">
          <div className="flex gap-4 mb-6">
            {post.tags.slice(0, 2).map(tag => (
              <span key={tag} className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-white/30 group-hover:text-blue-600 dark:group-hover:text-white/60 transition-colors">
                {tag}
              </span>
            ))}
          </div>
          
          <Link href={`/blog/${post.id}`} className="block mb-6">
            <h3 className="text-2xl font-black uppercase tracking-tighter text-slate-900 dark:text-white leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
              {post.title}
            </h3>
          </Link>
          
          <p className="text-slate-500 dark:text-white/40 text-sm leading-relaxed line-clamp-3 mb-8 italic">
            {truncateText(post.body, 140)}
          </p>
        </div>

        <div className="flex items-center justify-between pt-8 border-t border-slate-100 dark:border-white/5">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-300 dark:text-white/20">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
              {post.views || 0}
            </span>
          </div>
          <Link href={`/blog/${post.id}`} className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 dark:text-white/40 group-hover:text-blue-600 dark:group-hover:text-white group-hover:translate-x-2 transition-all">
            View &rarr;
          </Link>
        </div>
      </div>
    </motion.div>
  );
});

PostCard.displayName = 'PostCard';
export default PostCard;
