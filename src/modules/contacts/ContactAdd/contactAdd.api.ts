import {api} from '../../../libraries/network';

export type ContactListType = {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  photo: string;
};

export const {usePostContactMutation} = api;
