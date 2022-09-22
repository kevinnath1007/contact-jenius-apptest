/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Image from 'react-native-fast-image';
import Snackbar from 'react-native-snackbar';
import {
  useDeleteContactMutation,
  useGetContactByIdQuery,
  useUpdateContactMutation,
} from './contactDetail.api';
import {RootStackParams} from '../../../navigation/screen';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type NavigationContactDetailProps = NativeStackScreenProps<
  RootStackParams,
  'ContactDetail'
>;

const ContactDetail: React.FC<NavigationContactDetailProps> = ({
  route,
  navigation,
}) => {
  const [editable, setEditable] = React.useState(false);
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [age, setAge] = React.useState(0);
  const [errorAge, setErrorAge] = React.useState('');

  const {params} = route;
  const {data: contactDetail, isLoading} = useGetContactByIdQuery(params.id);
  const [updateContact, result] = useUpdateContactMutation();
  const [deleteContact, deleteResult] = useDeleteContactMutation();

  React.useEffect(() => {
    if (contactDetail) {
      setFirstName(contactDetail.firstName);
      setLastName(contactDetail.lastName);
      setAge(contactDetail.age);
    }
  }, [contactDetail]);

  React.useEffect(() => {
    if (deleteResult.isSuccess) {
      Snackbar.show({
        text: 'Data deleted',
        duration: Snackbar.LENGTH_SHORT,
      });
      navigation.goBack();
    }

    if (deleteResult.isError) {
      const {error} = deleteResult;
      Snackbar.show({
        // @ts-ignore
        text: error.data,
        duration: Snackbar.LENGTH_SHORT,
      });
    }
  }, [deleteResult]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Text style={styles.editText} onPress={() => setEditable(true)}>
          Edit
        </Text>
      ),
    });
  }, [navigation]);

  React.useEffect(() => {
    if (result.isSuccess) {
      Snackbar.show({
        text: 'Already saved',
        duration: Snackbar.LENGTH_SHORT,
      });
    } else if (result.isError) {
      Snackbar.show({
        text: 'Error, plz try again later',
        duration: Snackbar.LENGTH_SHORT,
      });
    }
  }, [result]);

  const changeToEditMode = React.useCallback(() => {
    setEditable(false);
    updateContact({
      photo: contactDetail.photo,
      id: params.id,
      firstName,
      lastName,
      age,
    });
  }, [contactDetail, firstName, lastName, age]);

  const deleteContactButton = () => {
    deleteContact(params.id);
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.containerLoading}>
        <ActivityIndicator size={36} style={styles.loadingIndicator} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.topSection}>
          <Image
            source={
              contactDetail?.photo !== 'N/A'
                ? {uri: contactDetail.photo}
                : require('../../../../assets/icons/img_162044.png')
            }
            style={styles.profilePicture}
          />
          <View style={styles.containerInput}>
            <Text style={styles.title}>First Name</Text>
            <TextInput
              value={firstName}
              onChangeText={value => setFirstName(value)}
              editable={editable}
            />
          </View>
          <View style={styles.containerInput}>
            <Text style={styles.title}>Last Name</Text>
            <TextInput
              value={lastName}
              onChangeText={value => setLastName(value)}
              editable={editable}
            />
          </View>
          <View style={styles.containerInput}>
            <Text style={styles.title}>age</Text>
            <TextInput
              value={age.toString()}
              onChangeText={value => {
                const intAge = value === '' ? 0 : parseInt(value);
                if (intAge <= 100) {
                  setAge(intAge);
                  setErrorAge('');
                } else {
                  setErrorAge('age must be under or equal 100');
                }
              }}
              editable={editable}
              keyboardType="numeric"
            />
          </View>
          {errorAge !== '' ? (
            <Text style={styles.errorMessage}>{errorAge}</Text>
          ) : null}
        </View>
      </ScrollView>
      <View style={styles.bottomSection}>
        {editable ? (
          <TouchableOpacity
            onPress={changeToEditMode}
            style={styles.saveButton}>
            <Text style={styles.saveText}>SAVE</Text>
          </TouchableOpacity>
        ) : (
          <Text onPress={deleteContactButton} style={styles.deleteText}>
            DELETE
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  containerLoading: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  topSection: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: 'white',
    flex: 1,
  },
  bottomSection: {
    paddingVertical: 16,
    backgroundColor: 'white',
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    width: '100%',
  },
  profilePicture: {
    marginVertical: 36,
    alignSelf: 'center',
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  loadingIndicator: {
    alignSelf: 'center',
  },
  containerInput: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    elevation: 4,
    borderRadius: 10,
    marginVertical: 8,
    backgroundColor: 'white',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  deleteText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#D11A2A',
    textAlign: 'center',
  },
  saveButton: {
    backgroundColor: '#87A2FB',
    paddingVertical: 16,
    marginHorizontal: 16,
    alignItems: 'center',
    borderRadius: 16,
    marginVertical: 16,
  },
  saveText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  editText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#87A2FB',
  },
  errorMessage: {
    color: 'red',
  },
});

export default ContactDetail;
