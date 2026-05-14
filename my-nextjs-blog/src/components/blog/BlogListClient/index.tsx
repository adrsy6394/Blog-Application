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
      <div className="mb-20">
        <form onSubmit={(e) => e.preventDefault()} className="relative max-w-2xl mx-auto">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Type to search..."
            className="w-full py-5 px-8 pl-14 glass rounded-none text-white placeholder:text-white/20 focus:border-blue-500 outline-none transition-all text-lg font-light tracking-wide"
          />
          <svg className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          {searchQuery && (
            <button 
              type="button" 
              onClick={() => { setSearchQuery(''); dispatch(fetchPostsRequest({ page: 1 })); }} 
              className="absolute right-6 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          )}
        </form>
        {debouncedSearchQuery && (
          <p className="mt-6 text-center text-white/40 uppercase tracking-[0.2em] text-[10px] font-bold">
            {isLoading ? 'Searching...' : `${totalPosts} Matches found`}
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
