import {
  combineReducers,
  configureStore,
  applyMiddleware,
} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import {contactListReducer, ContactListState} from './contactList.reducer';

export interface State {
  contactList: ContactListState;
}

const rootReducers = combineReducers<State>({
  contactList: contactListReducer,
});

export type RootState = ReturnType<typeof rootReducers>;

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: rootReducers,
});

export type AppDispatch = typeof store.dispatch;
