import { all, fork } from 'redux-saga/effects';

// Temporary stubs for child sagas
function* authSaga() {
  // auth saga stub
}

function* postsSaga() {
  // posts saga stub
}

function* commentsSaga() {
  // comments saga stub
}

export default function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(postsSaga),
    fork(commentsSaga),
  ]);
}
