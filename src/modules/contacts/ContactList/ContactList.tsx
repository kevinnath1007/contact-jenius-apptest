import React from 'react';
import {View, FlatList, Text} from 'react-native';

import ContactListItem from './fragments/ContactListItem';
import {ContactListType} from './contactList.api';
import {getContactList} from './contactList.action';
import {useSelector} from 'react-redux';
import useAppDispatch from '../../../hooks/useAppDispatch';

const ContactList: React.FC = () => {
  const contactListData = useSelector(state => state.contactList.value);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(getContactList());
  }, []);
  const renderItem = ({firstName, lastName, photo}: ContactListType) => {
    return (
      <ContactListItem
        firstName={firstName}
        lastName={lastName}
        photo={photo}
      />
    );
  };

  return (
    <View>
      <Text>test</Text>
      <FlatList data={[]} renderItem={renderItem} />
    </View>
  );
};

export default ContactList;
