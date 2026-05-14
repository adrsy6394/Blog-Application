"use client";

import { Post } from '@/store/slices/postsSlice';
import PostCard from '../PostCard';
import { PostCardSkeleton } from '@/components/common/Skeleton';

interface PostListProps {
  posts: Post[];
  isLoading: boolean;
}

export default function PostList({ posts, isLoading }: PostListProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {[...Array(6)].map((_, i) => (
          <PostCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!posts.length) {
    return (
      <div className="text-center py-20 glass rounded-none border-l-2 border-white/10">
        <h3 className="text-xl font-black uppercase tracking-tighter text-white mb-2">Silence</h3>
        <p className="text-white/40 text-xs uppercase tracking-[0.2em] font-bold">No words match your request</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
