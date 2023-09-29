import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Auth from '@react-native-firebase/auth';
import {AnimatedInput, LargeButton} from '../../components';
import {Colors} from '../../constants';
import {yupResolver} from '@hookform/resolvers/yup';
import {Controller, useForm} from 'react-hook-form';
import {UpdateProfileInputSchema} from '../../validations/Register';
import firestore from '@react-native-firebase/firestore';

const UpdateProfile = ({navigation}: any) => {
  const [disabled, setDisabled] = useState(false);
  const [userDetails, setUserDetails]: any = useState(null);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(UpdateProfileInputSchema),
  });

  useEffect(() => {
    getUserDetails();
  }, [Auth]);

  const getUserDetails = async () => {
    try {
      const userData = firestore()
        .collection('users')
        .doc(Auth()?.currentUser?.uid);
      const userSnapshot = await userData.get();
      const userResponse = userSnapshot.data();
      setUserDetails(userResponse);
      
      return userResponse;
    } catch (error: any) {
      console.error(error.message);
      return null; 
    }
  };
  

  const HandleUpdateProfile = async (data: any) => {
    setDisabled(true);
    try {
      const userRef = firestore()
        .collection('users')
        .doc(Auth()?.currentUser?.uid);
      await userRef.update(data);
      navigation.navigate('Home');
      return;
    } catch (error: any) {
      console.error('Error:', error.message);
      return;
    }
  };

  const HandlelogOut = async () => {
    await Auth().signOut();
    await navigation.replace("Login");
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          color: Colors.DEFAULT_BLACK,
          fontSize: 30,
        }}>
        Update Profile
      </Text>
      <View style={styles.input}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <AnimatedInput
              keyboardType={'default'}
              label="First Name"
              value={value || userDetails?.firstName}
              onChangeText={onChange}
              errorMsg={errors.firstName?.message}
            />
          )}
          name="firstName"
          defaultValue=""
        />
      </View>
      <View style={styles.input}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <AnimatedInput
              keyboardType={'default'}
              label="Last Name"
              value={value || userDetails?.lastName}
              onChangeText={onChange}
              errorMsg={errors.lastName?.message}
            />
          )}
          name="lastName"
          defaultValue=""
        />
      </View>

      <TouchableOpacity style={styles.signInButton}>
        <LargeButton
          disabled={disabled}
          onPress={handleSubmit(HandleUpdateProfile)}
          text={'Update Profile'}
        />
      </TouchableOpacity>
      <TouchableOpacity style={[styles.signInButton, {marginTop: 60}]}>
        <LargeButton onPress={HandlelogOut} text={'Log Out'} />
      </TouchableOpacity>
    </View>
  );
};

export default UpdateProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: Colors.DEFAULT_WHITE,
  },
  input: {
    marginBottom: 8,
    width: '100%',
  },
  forgotContainer: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotText: {
    color: Colors.DEFAULT_BLACK,
  },
  signInButton: {
    width: '100%',
    marginTop: 25,
  },
});
