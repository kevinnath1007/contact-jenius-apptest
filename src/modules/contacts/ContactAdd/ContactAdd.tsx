/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {
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
import {usePostContactMutation} from './contactAdd.api';
import {RootStackParams} from '../../../navigation/screen';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type NavigationContactDetailProps = NativeStackScreenProps<
  RootStackParams,
  'ContactAdd'
>;

const ContactAdd: React.FC<NavigationContactDetailProps> = ({navigation}) => {
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [age, setAge] = React.useState(0);
  const [errorAge, setErrorAge] = React.useState('');

  const [postContact, result] = usePostContactMutation();

  React.useEffect(() => {
    if (result.isSuccess) {
      Snackbar.show({
        text: 'Already saved',
        duration: Snackbar.LENGTH_SHORT,
      });

      navigation.goBack();
    } else if (result.isError) {
      Snackbar.show({
        text: 'Error, plz try again later',
        duration: Snackbar.LENGTH_SHORT,
      });
    }
  }, [result]);

  const postContactFn = () => {
    postContact({
      firstName,
      lastName,
      age,
      photo:
        'http://vignette1.wikia.nocookie.net/lotr/images/6/68/Bilbo_baggins.jpg/revision/latest?cb=20130202022550',
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.topSection}>
          <Image
            source={require('../../../../assets/icons/img_162044.png')}
            style={styles.profilePicture}
          />
          <View style={styles.containerInput}>
            <Text style={styles.title}>First Name</Text>
            <TextInput
              value={firstName}
              onChangeText={value => setFirstName(value)}
            />
          </View>
          <View style={styles.containerInput}>
            <Text style={styles.title}>Last Name</Text>
            <TextInput
              value={lastName}
              onChangeText={value => setLastName(value)}
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
              keyboardType="numeric"
            />
          </View>
          {errorAge !== '' ? (
            <Text style={styles.errorMessage}>{errorAge}</Text>
          ) : null}
        </View>
      </ScrollView>
      <View style={styles.bottomSection}>
        <TouchableOpacity onPress={postContactFn} style={styles.saveButton}>
          <Text style={styles.saveText}>SAVE</Text>
        </TouchableOpacity>
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

export default ContactAdd;
