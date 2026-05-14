import { all, fork } from 'redux-saga/effects';
import { watchAuthSaga } from './authSaga';

// Temporary stubs for child sagas
function* postsSaga() {
  // posts saga stub
}

function* commentsSaga() {
  // comments saga stub
}

export default function* rootSaga() {
  yield all([
    fork(watchAuthSaga),
    fork(postsSaga),
    fork(commentsSaga),
  ]);
}
