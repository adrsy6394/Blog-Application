import { takeLatest, call, put, select } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { postsService, CreatePostDto, UpdatePostDto, PostsResponse } from '@/lib/postsService';
import {
  setPosts,
  setCurrentPost,
  setError,
  addPost,
  updatePost,
  removePost,
  fetchPostsRequest,
  fetchPostRequest,
  createPostRequest,
  updatePostRequest,
  deletePostRequest,
  searchPostsRequest,
  Post,
} from '../slices/postsSlice';
import { addNotification } from '../slices/uiSlice';
import { POSTS_PER_PAGE, CACHE_KEYS } from '@/utils/constants';
import { getCacheItem, setCacheItem } from '@/utils/helpers';
import { RootState } from '../index';

function* fetchAllPostsSaga(action: PayloadAction<{page: number}>): Generator<any, void, any> {
  try {
    const { page } = action.payload;
    const skip = (page - 1) * POSTS_PER_PAGE;
    const cacheKey = CACHE_KEYS.POSTS_LIST(page);
    
    const cachedData = getCacheItem<PostsResponse>(cacheKey);
    if (cachedData) {
      yield put(setPosts({ posts: cachedData.posts, total: cachedData.total }));
      return;
    }
    
    const response: PostsResponse = yield call(postsService.getAllPosts, POSTS_PER_PAGE, skip);
    yield put(setPosts({ posts: response.posts, total: response.total }));
    setCacheItem(cacheKey, response);
  } catch (error: any) {
    yield put(setError(error.message || 'Failed to fetch posts'));
  }
}

function* fetchPostByIdSaga(action: PayloadAction<number>): Generator<any, void, any> {
  try {
    const id = action.payload;
    const cacheKey = CACHE_KEYS.POST_DETAIL(id);
    
    const cachedData = getCacheItem<Post>(cacheKey);
    if (cachedData) {
      yield put(setCurrentPost(cachedData));
      return;
    }
    
    const post: Post = yield call(postsService.getPostById, id);
    yield put(setCurrentPost(post));
    setCacheItem(cacheKey, post);
  } catch (error: any) {
    yield put(setError(error.message || 'Failed to fetch post details'));
  }
}

function* createPostSaga(action: PayloadAction<CreatePostDto>): Generator<any, void, any> {
  try {
    const user = yield select((state: RootState) => state.auth.user);
    if (!user) throw new Error('Not authenticated');
    
    const newPost: Post = yield call(postsService.createPost, { ...action.payload, userId: user.id });
    yield put(addPost(newPost));
    yield put(addNotification({ message: 'Post created successfully!', type: 'success' }));
  } catch (error: any) {
    yield put(setError(error.message || 'Failed to create post'));
    yield put(addNotification({ message: 'Failed to create post', type: 'error' }));
  }
}

function* updatePostSaga(action: PayloadAction<{id: number, data: UpdatePostDto}>): Generator<any, void, any> {
  try {
    const { id, data } = action.payload;
    const updatedPost: Post = yield call(postsService.updatePost, id, data);
    yield put(updatePost(updatedPost));
    yield put(addNotification({ message: 'Post updated successfully!', type: 'success' }));
  } catch (error: any) {
    yield put(setError(error.message || 'Failed to update post'));
    yield put(addNotification({ message: 'Failed to update post', type: 'error' }));
  }
}

function* deletePostSaga(action: PayloadAction<number>): Generator<any, void, any> {
  try {
    const id = action.payload;
    yield call(postsService.deletePost, id);
    yield put(removePost(id));
    yield put(addNotification({ message: 'Post deleted successfully!', type: 'success' }));
  } catch (error: any) {
    yield put(setError(error.message || 'Failed to delete post'));
    yield put(addNotification({ message: 'Failed to delete post', type: 'error' }));
  }
}

function* searchPostsSaga(action: PayloadAction<string>): Generator<any, void, any> {
  try {
    const query = action.payload;
    const response: PostsResponse = yield call(postsService.searchPosts, query);
    yield put(setPosts({ posts: response.posts, total: response.total }));
  } catch (error: any) {
    yield put(setError(error.message || 'Failed to search posts'));
  }
}

export function* watchPostsSaga() {
  yield takeLatest(fetchPostsRequest.type, fetchAllPostsSaga);
  yield takeLatest(fetchPostRequest.type, fetchPostByIdSaga);
  yield takeLatest(createPostRequest.type, createPostSaga);
  yield takeLatest(updatePostRequest.type, updatePostSaga);
  yield takeLatest(deletePostRequest.type, deletePostSaga);
  yield takeLatest(searchPostsRequest.type, searchPostsSaga);
}
