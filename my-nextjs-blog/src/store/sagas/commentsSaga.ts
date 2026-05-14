import { takeLatest, call, put } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { commentsService } from '@/lib/commentsService';
import {
  setComments,
  addComment,
  setError,
  fetchCommentsRequest,
  addCommentRequest,
} from '../slices/commentsSlice';
import { addNotification } from '../slices/uiSlice';

import { CACHE_KEYS } from '@/utils/constants';
import { getCacheItem, setCacheItem } from '@/utils/helpers';

function* fetchCommentsSaga(action: PayloadAction<number>): Generator<any, void, any> {
  try {
    const postId = action.payload;
    const cacheKey = CACHE_KEYS.COMMENTS(postId);
    
    const cachedData = getCacheItem<any[]>(cacheKey);
    if (cachedData) {
      yield put(setComments(cachedData));
      return;
    }
    
    const response = yield call(commentsService.getCommentsByPost, postId);
    yield put(setComments(response.comments));
    setCacheItem(cacheKey, response.comments);
  } catch (error: any) {
    yield put(setError(error.message || 'Failed to fetch comments'));
  }
}

function* addCommentSaga(action: PayloadAction<{postId: number, body: string, userId: number, username: string}>): Generator<any, void, any> {
  try {
    const { postId, body, userId, username } = action.payload;
    
    // Optimistic update
    const newComment = {
      id: Date.now(), // Generate a temporary ID
      body,
      postId,
      user: {
        id: userId,
        username,
      }
    };
    
    yield put(addComment(newComment));
    yield put(addNotification({ message: 'Comment added successfully', type: 'success' }));
  } catch (error: any) {
    yield put(setError(error.message || 'Failed to add comment'));
    yield put(addNotification({ message: 'Failed to add comment', type: 'error' }));
  }
}

export function* watchCommentsSaga() {
  yield takeLatest(fetchCommentsRequest.type, fetchCommentsSaga);
  yield takeLatest(addCommentRequest.type, addCommentSaga);
}
