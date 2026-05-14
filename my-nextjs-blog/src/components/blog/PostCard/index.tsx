import Link from 'next/link';
import { Post } from '@/store/slices/postsSlice';
import { truncateText } from '@/utils/helpers';
import React from 'react';

interface PostCardProps {
  post: Post;
}

const PostCard = React.memo(({ post }: PostCardProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 flex flex-col h-full transform hover:-translate-y-1">
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex gap-2 flex-wrap mb-3">
          {post.tags.map(tag => (
            <span key={tag} className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
              {tag}
            </span>
          ))}
        </div>
        <Link href={`/blog/${post.id}`} className="group block mb-3">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
            {post.title}
          </h3>
        </Link>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 flex-grow line-clamp-3">
          {truncateText(post.body, 120)}
        </p>
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400 mt-auto">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"/></svg>
              {post.reactions?.likes || 0}
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
              {post.views || 0}
            </span>
          </div>
          <Link href={`/blog/${post.id}`} className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
            Read more &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
});

PostCard.displayName = 'PostCard';
export default PostCard;
