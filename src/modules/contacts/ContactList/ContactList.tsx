import React from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text} from 'react-native';

import ContactListItem from './fragments/ContactListItem';
import {useGetContactListQuery, ContactListType} from './contactList.api';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParams} from '../../../navigation/screen';

type NavigationContactListProps = NativeStackScreenProps<
  RootStackParams,
  'ContactList'
>;

const ContactList: React.FC<NavigationContactListProps> = ({navigation}) => {
  const {data, isFetching, refetch} = useGetContactListQuery({});

  const onPressAddContact = React.useCallback(() => {
    navigation.navigate('ContactAdd');
  }, [navigation]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Text style={styles.addText} onPress={onPressAddContact}>
          Add
        </Text>
      ),
    });
  }, [navigation]);

  const renderItem = ({item}: {item: ContactListType}) => {
    return (
      <ContactListItem
        key={item.id}
        id={item.id}
        firstName={item?.firstName}
        lastName={item?.lastName}
        photo={item?.photo}
      />
    );
  };

  const onEndReached = () => {
    //@todo: if there is pagination system happening in this list
  };

  const keyExtractor = (item: ContactListType) => item.id;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        keyExtractor={keyExtractor}
        data={data}
        refreshing={isFetching}
        onRefresh={refetch}
        renderItem={renderItem}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: 'white',
    flex: 1,
  },
  addText: {
    color: '#87A2FB',
  },
});

export default ContactList;
