"use client";

import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { fetchCommentsRequest, addCommentRequest } from '@/store/slices/commentsSlice';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';

interface CommentSectionProps {
  postId: number;
}

export default function CommentSection({ postId }: CommentSectionProps) {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAuth();
  const { comments, isLoading, error } = useAppSelector((state) => state.comments);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    dispatch(fetchCommentsRequest(postId));
  }, [dispatch, postId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !user) return;

    dispatch(addCommentRequest({
      postId,
      body: newComment.trim(),
      userId: user.id,
      username: user.username,
    }));
    setNewComment('');
  };

  return (
    <div id="comments" className="mt-12">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
        Comments {comments.length > 0 && <span className="text-gray-500 text-lg font-normal">({comments.length})</span>}
      </h3>

      {/* Comment Form */}
      <div className="mb-10 bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl border border-gray-100 dark:border-gray-700">
        {isAuthenticated && user ? (
          <form onSubmit={handleSubmit}>
            <label htmlFor="comment" className="sr-only">Add your comment</label>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold uppercase shadow-sm">
                  {user.username.charAt(0)}
                </div>
              </div>
              <div className="flex-grow">
                <textarea
                  id="comment"
                  rows={3}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Share your thoughts..."
                  className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none shadow-sm"
                  required
                />
                <div className="mt-3 flex justify-end">
                  <button
                    type="submit"
                    disabled={!newComment.trim() || isLoading}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Post Comment
                  </button>
                </div>
              </div>
            </div>
          </form>
        ) : (
          <div className="text-center py-6">
            <p className="text-gray-600 dark:text-gray-400 mb-4">You must be logged in to leave a comment.</p>
            <Link 
              href="/login" 
              className="inline-flex items-center justify-center px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-sm"
            >
              Log in to comment
            </Link>
          </div>
        )}
      </div>

      {/* Comments List */}
      <div className="space-y-6">
        {isLoading && comments.length === 0 ? (
          <div className="animate-pulse space-y-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex-shrink-0"></div>
                <div className="flex-grow space-y-3 pt-2">
                  <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : error && comments.length === 0 ? (
          <div className="text-red-500 bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-100 dark:border-red-800">
            {error}
          </div>
        ) : comments.length > 0 ? (
          <ul className="space-y-8">
            {comments.map((comment) => (
              <li key={comment.id} className="flex gap-4 group">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-200 font-bold uppercase shadow-sm">
                    {comment.user.username.charAt(0)}
                  </div>
                </div>
                <div className="flex-grow">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl rounded-tl-none border border-gray-100 dark:border-gray-700 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        @{comment.user.username}
                      </h4>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
                      {comment.body}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
            <svg className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <p className="text-gray-500 dark:text-gray-400 font-medium">No comments yet.</p>
            <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">Be the first to share your thoughts!</p>
          </div>
        )}
      </div>
    </div>
  );
}
