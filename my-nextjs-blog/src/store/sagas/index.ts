import { all, fork } from 'redux-saga/effects';
import { watchAuthSaga } from './authSaga';
import { watchPostsSaga } from './postsSaga';

function* commentsSaga() {
  // comments saga stub
}

export default function* rootSaga() {
  yield all([
    fork(watchAuthSaga),
    fork(watchPostsSaga),
    fork(commentsSaga),
  ]);
}
