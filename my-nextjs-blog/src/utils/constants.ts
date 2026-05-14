export const POSTS_PER_PAGE = 9;
export const CACHE_EXPIRY_MS = 3600000; // 1 hour
export const AUTH_TOKEN_KEY = 'auth_token';
export const CACHE_PREFIX = 'blog_cache_';

export const CACHE_KEYS = {
  POSTS_LIST: (page: number) => `posts_list_page_${page}`,
  POST_DETAIL: (id: number) => `post_detail_${id}`,
  USER: 'current_user',
  COMMENTS: (postId: number) => `comments_post_${postId}`,
};
