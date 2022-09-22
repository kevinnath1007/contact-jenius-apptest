import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigatorScreenParams} from '@react-navigation/native';
import ContactList from '../modules/contacts/ContactList/ContactList';

//region Root Stack
export type RootStackParams = {
  ContactList: NavigatorScreenParams<null>;
};

const RootStack = createNativeStackNavigator<RootStackParams>();

export const RootNavigator = () => {
  return (
    <RootStack.Navigator screenOptions={{headerShown: false}}>
      <RootStack.Screen name="ContactList" component={ContactList} />
    </RootStack.Navigator>
  );
};
//endregion
