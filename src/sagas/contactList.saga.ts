import {call, put, takeEvery, all, take} from 'redux-saga/effects';
import {numberRequestCompletedAction} from '../actions';
import {actionIds} from '../common';
import {getContactList} from '../modules/contacts/ContactList/contactList.api';
import {ContactListType} from '../modules/contacts/ContactList/contactList.api';
import {getContactListAction} from '../modules/contacts/ContactList/contactList.action';

export function* watchContactListRequestStart() {
  yield takeEvery(actionIds.GET_CONTACT_LIST, getContactListSaga);
}

function* getContactListSaga() {
  // @ts-ignore
  const response = yield call<ContactListType>(getContactList);
  yield put(getContactListAction(response));
}
