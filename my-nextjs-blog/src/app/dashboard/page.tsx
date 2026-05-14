"use client";

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import Card from '@/components/common/Card';
import Loader from '@/components/common/Loader';
import { postsService } from '@/lib/postsService';
import { Post } from '@/store/slices/postsSlice';
import Link from 'next/link';
import { truncateText } from '@/utils/helpers';

export default function DashboardPage() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);

  useEffect(() => {
    // If not authenticated and not loading, redirect to login
    if (!authLoading && !isAuthenticated) {
      router.push('/login?redirect=/dashboard');
    }
  }, [isAuthenticated, authLoading, router]);

  useEffect(() => {
    const fetchUserPosts = async () => {
      if (user?.id) {
        try {
          const data = await postsService.getPostsByUser(user.id);
          setUserPosts(data.posts || []);
        } catch (error) {
          console.error("Failed to fetch user posts:", error);
        } finally {
          setLoadingPosts(false);
        }
      }
    };

    if (user?.id) {
      fetchUserPosts();
    }
  }, [user]);

  if (authLoading || (!isAuthenticated && !authLoading)) {
    return <Loader size="lg" text="Authenticating..." />;
  }

  if (!user) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Hello, {user.firstName}!
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            Welcome to your Admin Dashboard
          </p>
        </div>
        <div>
          <button className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition-colors flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
            Create New Post
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <Card className="col-span-1 md:col-span-4 lg:col-span-1 flex flex-col items-center justify-center text-center p-8">
          <div className="w-24 h-24 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400 flex items-center justify-center font-bold text-4xl mb-4 uppercase ring-4 ring-white dark:ring-gray-800 shadow-md">
            {user.username.charAt(0)}
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">{user.firstName} {user.lastName}</h2>
          <p className="text-blue-600 dark:text-blue-400 font-medium mt-1">@{user.username}</p>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{user.email}</p>
        </Card>

        <div className="col-span-1 md:col-span-4 lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Card className="flex flex-col justify-center border-l-4 border-l-blue-500">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Total Posts</p>
            <p className="mt-2 text-4xl font-extrabold text-gray-900 dark:text-white">{userPosts.length || 0}</p>
          </Card>
          <Card className="flex flex-col justify-center border-l-4 border-l-green-500">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Total Comments</p>
            <p className="mt-2 text-4xl font-extrabold text-gray-900 dark:text-white">128</p>
          </Card>
          <Card className="flex flex-col justify-center border-l-4 border-l-purple-500">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Total Views</p>
            <p className="mt-2 text-4xl font-extrabold text-gray-900 dark:text-white">
              {userPosts.reduce((acc, post) => acc + (post.views || 0), 0) + 1042}
            </p>
          </Card>
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Your Posts</h3>
        
        {loadingPosts ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </Card>
            ))}
          </div>
        ) : userPosts.length > 0 ? (
          <div className="bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden">
            <ul className="divide-y divide-gray-100 dark:divide-gray-700">
              {userPosts.map((post) => (
                <li key={post.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                    <div className="flex-grow">
                      <Link href={`/blog/${post.id}`} className="block">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                          {post.title}
                        </h4>
                      </Link>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                        {truncateText(post.body, 100)}
                      </p>
                      <div className="mt-3 flex items-center gap-4 text-xs font-medium text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"/></svg>
                          {post.reactions?.likes || 0}
                        </span>
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                          {post.views || 0}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-gray-400 hover:text-blue-600 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded shadow-sm transition-colors">
                        <span className="sr-only">Edit</span>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-600 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded shadow-sm transition-colors">
                        <span className="sr-only">Delete</span>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <Card className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l6 6v10a2 2 0 01-2 2z" />
            </svg>
            <p className="text-lg font-medium text-gray-900 dark:text-white">No posts yet</p>
            <p className="text-gray-500 dark:text-gray-400 mb-6">You haven't published any posts.</p>
            <button className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
              Create First Post
            </button>
          </Card>
        )}
      </div>
    </div>
  );
}
