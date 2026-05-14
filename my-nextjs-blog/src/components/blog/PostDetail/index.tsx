"use client";

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { fetchPostRequest } from '@/store/slices/postsSlice';
import { selectCurrentPost, selectPostsLoading } from '@/store/selectors/postsSelectors';
import { PostDetailSkeleton } from '@/components/common/Skeleton';
import Link from 'next/link';

interface PostDetailClientProps {
  id: number;
}

export default function PostDetailClient({ id }: PostDetailClientProps) {
  const dispatch = useAppDispatch();
  const post = useAppSelector(selectCurrentPost);
  const isLoading = useAppSelector(selectPostsLoading);

  useEffect(() => {
    dispatch(fetchPostRequest(id));
  }, [dispatch, id]);

  if (isLoading || !post) {
    return <PostDetailSkeleton />;
  }

  return (
    <article className="max-w-4xl mx-auto px-4 py-8 md:py-12">
      <Link href="/blog" className="text-blue-600 dark:text-blue-400 hover:underline mb-8 inline-flex items-center">
        &larr; Back to all posts
      </Link>
      
      <div className="mb-8">
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags?.map(tag => (
            <span key={tag} className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
              {tag}
            </span>
          ))}
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight mb-4">
          {post.title}
        </h1>
        <div className="flex items-center text-gray-600 dark:text-gray-400 space-x-4 text-sm">
          <span className="flex items-center">
            <span className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center font-bold text-gray-600 dark:text-gray-300 mr-2">
              A
            </span>
            Author ID: {post.userId}
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"/></svg>
            {post.reactions?.likes || 0} Likes
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
            {post.views || 0} Views
          </span>
        </div>
      </div>
      
      <div className="prose prose-lg dark:prose-invert max-w-none text-gray-800 dark:text-gray-200 leading-relaxed font-serif">
        {post.body?.split('\n').map((paragraph, i) => (
          <p key={i} className="mb-6">{paragraph}</p>
        ))}
      </div>
      
      <hr className="my-12 border-gray-200 dark:border-gray-800" />
      
      <div id="comments">
        <h3 className="text-2xl font-bold mb-6">Comments</h3>
        <p className="text-gray-500 italic">Comments will be loaded here...</p>
      </div>
    </article>
  );
}
