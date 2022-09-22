import {
  combineReducers,
  configureStore,
  applyMiddleware,
} from '@reduxjs/toolkit';

import {contactListReducer, ContactListState} from './contactList.reducer';
import {api} from '../libraries/network';

export interface State {
  contactList: ContactListState;
}

export const store = configureStore({
  reducer: {
    contactList: contactListReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: gDM => gDM().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
