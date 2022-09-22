import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import Image from 'react-native-fast-image';
import {ContactListType} from '../contactList.api';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParams} from '../../../../navigation/screen';

type RootStackNavigateType = NavigationProp<RootStackParams>;

const ContactListItem = ({
  id,
  firstName,
  lastName,
  photo,
}: Omit<ContactListType, 'age'>) => {
  const {navigate} = useNavigation<RootStackNavigateType>();

  const onPress = () => {
    navigate('ContactDetail', {id});
  };

  return (
    <TouchableOpacity key={id} onPress={onPress} style={styles.container}>
      <Image
        source={
          photo !== 'N/A'
            ? {uri: photo}
            : require('../../../../../assets/icons/img_162044.png')
        }
        style={styles.imageProfile}
      />
      <Text style={styles.nameText}>{`${firstName} ${lastName}`}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 4,
    paddingVertical: 4,
    alignItems: 'center',
  },
  nameText: {
    fontSize: 24,
    marginHorizontal: 8,
  },
  imageProfile: {
    width: 36,
    height: 36,
    borderRadius: 16,
    marginHorizontal: 8,
  },
});

export default React.memo(ContactListItem);
