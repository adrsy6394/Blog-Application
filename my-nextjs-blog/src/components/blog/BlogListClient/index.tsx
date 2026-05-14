"use client";

import { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { fetchPostsRequest, searchPostsRequest, setPage, setPosts } from '@/store/slices/postsSlice';
import { selectAllPosts, selectPostsLoading, selectTotalPosts, selectCurrentPage } from '@/store/selectors/postsSelectors';
import PostList from '../PostList';
import Pagination from '@/components/common/Pagination';
import { POSTS_PER_PAGE } from '@/utils/constants';
import { useDebounce } from '@/hooks/useDebounce';

interface BlogListClientProps {
  initialData?: any;
}

export default function BlogListClient({ initialData }: BlogListClientProps) {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectAllPosts);
  const isLoading = useAppSelector(selectPostsLoading);
  const totalPosts = useAppSelector(selectTotalPosts);
  const currentPage = useAppSelector(selectCurrentPage);
  const isHydrated = useRef(false);
  
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  
  // Hydrate store with initial data on mount
  useEffect(() => {
    if (initialData && posts.length === 0 && !isHydrated.current) {
      dispatch(setPosts({
        posts: initialData.posts,
        total: initialData.total
      }));
      isHydrated.current = true;
    }
  }, [initialData, dispatch, posts.length]);

  const totalPages = useMemo(() => Math.ceil(totalPosts / POSTS_PER_PAGE), [totalPosts]);

  useEffect(() => {
    if (debouncedSearchQuery.trim()) {
      dispatch(searchPostsRequest(debouncedSearchQuery));
    } else if (!searchQuery && (!initialData || currentPage > 1 || (posts.length === 0 && !isHydrated.current))) {
      dispatch(fetchPostsRequest({ page: currentPage }));
    }
  }, [dispatch, currentPage, debouncedSearchQuery, initialData, posts.length, searchQuery]);

  const handlePageChange = useCallback((page: number) => {
    dispatch(setPage(page));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [dispatch]);

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  return (
    <>
      <div className="mb-8 max-w-xl mx-auto">
        <form onSubmit={(e) => e.preventDefault()} className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search articles..."
            className="w-full p-4 pl-12 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <svg className="absolute left-4 top-4 h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          {searchQuery && (
            <button 
              type="button" 
              onClick={() => { setSearchQuery(''); dispatch(fetchPostsRequest({ page: 1 })); }} 
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          )}
        </form>
        {debouncedSearchQuery && (
          <p className="mt-4 text-center text-gray-500 dark:text-gray-400">
            {isLoading ? 'Searching...' : `Found ${totalPosts} results for "${debouncedSearchQuery}"`}
          </p>
        )}
      </div>

      <PostList posts={posts} isLoading={isLoading} />
      
      {!searchQuery && !isLoading && (
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      )}
    </>
  );
}
