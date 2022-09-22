import {all, fork} from 'redux-saga/effects';
import {watchContactListRequestStart} from './contactList.saga';

export const rootSaga = function* root() {
  yield all([fork(watchContactListRequestStart)]);
};
