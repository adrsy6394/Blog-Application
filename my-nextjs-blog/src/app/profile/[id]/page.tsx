import { Metadata } from 'next';
import { postsService } from '@/lib/postsService';
import { authService } from '@/lib/authService';
import PostCard from '@/components/blog/PostCard';
import { Suspense } from 'react';
import { PostCardSkeleton } from '@/components/common/Skeleton';

type PageProps = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  try {
    const user = await authService.getUserById(Number(id));
    return {
      title: `${user.firstName} ${user.lastName} | BlogApp`,
      description: `View all posts by ${user.username} on BlogApp.`,
    };
  } catch (error) {
    return { title: 'User Profile | BlogApp' };
  }
}

export default async function ProfilePage({ params }: PageProps) {
  const { id } = await params;
  const userId = Number(id);
  
  let user = null;
  let userPosts = [];

  try {
    user = await authService.getUserById(userId);
    const data = await postsService.getPostsByUser(userId);
    userPosts = data.posts;
  } catch (error) {
    console.error("Failed to fetch profile data:", error);
  }

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">User not found</h1>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 dark:border-gray-700 mb-12 flex flex-col md:flex-row items-center gap-8">
        <div className="relative w-32 h-32 rounded-full overflow-hidden bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400 flex items-center justify-center font-bold text-4xl uppercase ring-4 ring-white dark:ring-gray-800 shadow-lg">
          {user.image ? (
            <img src={user.image} alt={user.username} className="w-full h-full object-cover" />
          ) : (
            user.username.charAt(0)
          )}
        </div>
        <div className="text-center md:text-left">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl tracking-tight">
            {user.firstName} {user.lastName}
          </h1>
          <p className="text-xl text-blue-600 dark:text-blue-400 font-medium mt-1">@{user.username}</p>
          <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-4 text-gray-600 dark:text-gray-400">
            <span className="flex items-center gap-1">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l6 6v10a2 2 0 01-2 2z" /></svg>
              {userPosts.length} Posts
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              {user.email}
            </span>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Posts by {user.firstName}</h2>
      
      {userPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {userPosts.map((post: any) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
          <p className="text-gray-500 dark:text-gray-400">This user hasn't published any posts yet.</p>
        </div>
      )}
    </div>
  );
}
