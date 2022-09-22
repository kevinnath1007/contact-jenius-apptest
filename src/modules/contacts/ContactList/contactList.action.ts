import {actionIds, BaseAction} from '../../../common';
import {ContactListType} from './contactList.api';

export const getContactListAction = (contactList: ContactListType): BaseAction => ({
  type: actionIds.GET_CONTACT_LIST,
  payload: contactList,
});
