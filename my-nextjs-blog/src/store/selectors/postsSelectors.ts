import { createSelector } from 'reselect';
import { RootState } from '../index';

const selectPostsState = (state: RootState) => state.posts;

export const selectAllPosts = createSelector(
  [selectPostsState],
  (posts) => posts.posts
);

export const selectCurrentPost = createSelector(
  [selectPostsState],
  (posts) => posts.currentPost
);

export const selectPostsLoading = createSelector(
  [selectPostsState],
  (posts) => posts.isLoading
);

export const selectTotalPosts = createSelector(
  [selectPostsState],
  (posts) => posts.totalPosts
);

export const selectCurrentPage = createSelector(
  [selectPostsState],
  (posts) => posts.currentPage
);

export const selectPaginatedInfo = createSelector(
  [selectPostsState],
  (posts) => ({
    currentPage: posts.currentPage,
    totalPosts: posts.totalPosts,
    postsPerPage: posts.postsPerPage,
  })
);
