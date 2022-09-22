import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import Image from 'react-native-fast-image';
import {ContactListType} from '../contactList.api';

const ContactListItem = ({
  firstName,
  lastName,
  photo,
}: Omit<ContactListType, 'id' | 'age'>) => {
  return (
    <TouchableOpacity>
      <Image
        source={{uri: photo}}
        style={{width: 16, height: 16, borderRadius: 16}}
      />
      <Text>{`${firstName} ${lastName}`}</Text>
    </TouchableOpacity>
  );
};

export default React.memo(ContactListItem);
