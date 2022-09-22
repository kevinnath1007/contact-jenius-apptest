import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ContactList from '../modules/contacts/ContactList/ContactList';
import ContactDetail from '../modules/contacts/ContactDetail/ContactDetail';
import ContactAdd from '../modules/contacts/ContactAdd/ContactAdd';

//region Root Stack
export type RootStackParams = {
  ContactList: undefined;
  ContactDetail: {id: string};
  ContactAdd: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParams>();

export const RootNavigator = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name="ContactList"
        component={ContactList}
        options={{
          title: 'Contact List',
        }}
      />
      <RootStack.Screen
        name="ContactDetail"
        component={ContactDetail}
        options={{
          title: 'Contact Detail',
        }}
      />
      <RootStack.Screen
        name="ContactAdd"
        component={ContactAdd}
        options={{
          title: 'Contact Detail',
        }}
      />
    </RootStack.Navigator>
  );
};
//endregion
