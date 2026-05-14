import { all, fork } from 'redux-saga/effects';
import { watchAuthSaga } from './authSaga';
import { watchPostsSaga } from './postsSaga';
import { watchCommentsSaga } from './commentsSaga';

export default function* rootSaga() {
  yield all([
    fork(watchAuthSaga),
    fork(watchPostsSaga),
    fork(watchCommentsSaga),
  ]);
}
