"use client";

import { useEffect, useState, useMemo, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { fetchPostsRequest, searchPostsRequest, setPage } from '@/store/slices/postsSlice';
import { selectAllPosts, selectPostsLoading, selectTotalPosts, selectCurrentPage } from '@/store/selectors/postsSelectors';
import PostList from '../PostList';
import Pagination from '@/components/common/Pagination';
import { POSTS_PER_PAGE } from '@/utils/constants';

export default function BlogListClient() {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectAllPosts);
  const isLoading = useAppSelector(selectPostsLoading);
  const totalPosts = useAppSelector(selectTotalPosts);
  const currentPage = useAppSelector(selectCurrentPage);
  
  const [searchQuery, setSearchQuery] = useState('');
  
  const totalPages = useMemo(() => Math.ceil(totalPosts / POSTS_PER_PAGE), [totalPosts]);

  useEffect(() => {
    if (!searchQuery) {
      dispatch(fetchPostsRequest({ page: currentPage }));
    }
  }, [dispatch, currentPage, searchQuery]);

  const handlePageChange = useCallback((page: number) => {
    dispatch(setPage(page));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [dispatch]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const executeSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      dispatch(searchPostsRequest(searchQuery));
    } else {
      dispatch(fetchPostsRequest({ page: 1 }));
    }
  };

  return (
    <>
      <div className="mb-8 max-w-xl mx-auto">
        <form onSubmit={executeSearch} className="relative">
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
            <button type="button" onClick={() => { setSearchQuery(''); dispatch(fetchPostsRequest({ page: 1 })); }} className="absolute right-4 top-4 text-gray-400 hover:text-gray-600">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          )}
        </form>
      </div>

      <PostList posts={posts} isLoading={isLoading} />
      
      {!searchQuery && !isLoading && (
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      )}
    </>
  );
}
