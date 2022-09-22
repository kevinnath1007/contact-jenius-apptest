import {coreAPI} from '../../../libraries/network';
import {CoreClientResponse} from '../../../libraries/network/instance/core/responseInterceptor';

export type ContactListType = {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  photo: string;
};

export const getContactList = async () => {
  const response = await coreAPI.get<
    null,
    CoreClientResponse<ContactListType[]>
  >('/contact');

  if (response.ok) {
    return response.data;
  } else if (__DEV__) {
    console.log(response.message);
  }
};
