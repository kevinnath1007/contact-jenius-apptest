import {BaseAction, actionIds} from '../common';

export type ContactListState = number[];

export const contactListReducer = (
  state: ContactListState = [0],
  action: BaseAction,
) => {
  switch (action.type) {
    case actionIds.GET_CONTACT_LIST:
      return [...state, action.payload];
  }
  return state;
};
