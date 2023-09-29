import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {RegisterInputSchema} from '../../validations/Register';
import {Colors} from '../../constants';
import {AnimatedInput, LargeButton} from '../../components';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
const Register = ({navigation}: any) => {
  const [disabled, setDisabled] = useState(false);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(RegisterInputSchema),
  });

  const HandleRegister = async (data: any) => {
    setDisabled(true);
    try {
      const {email, password, firstName, lastName} = data;

      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );

      const user = userCredential.user;
      const userData = {
        firstName,
        lastName,
        email,
      };

      await firestore().collection('users').doc(user.uid).set(userData);

      if (user.uid) {
        navigation.navigate('Login');
      }
    } catch (error: any) {
      setDisabled(false);
      console.error('Registration error:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          color: Colors.DEFAULT_BLACK,
          fontSize: 30,
        }}>
        Create Account
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
              value={value}
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
              value={value}
              onChangeText={onChange}
              errorMsg={errors.lastName?.message}
            />
          )}
          name="lastName"
          defaultValue=""
        />
      </View>
      <View style={styles.input}>
        <Controller
          control={control}
          rules={{
            required: true,
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: 'Invalid email address',
            },
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <AnimatedInput
              keyboardType={'email-address'}
              label="Email"
              leftIcon={'email'}
              value={value}
              onChangeText={onChange}
              errorMsg={errors.email?.message}
            />
          )}
          name="email"
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
              label="Password"
              keyboardType={'default'}
              value={value}
              leftIcon={'lock'}
              onChangeText={onChange}
              secureTextEntry={true}
              errorMsg={errors.password?.message}
            />
          )}
          name="password"
          defaultValue=""
        />
      </View>

      <TouchableOpacity style={styles.registerButton}>
        <LargeButton
          disabled={disabled}
          onPress={handleSubmit(HandleRegister)}
          text={'Register'}
        />
      </TouchableOpacity>
    </View>
  );
};

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
  registerButton: {
    width: '100%',
    marginTop: 25,
  }
});

export default Register;
