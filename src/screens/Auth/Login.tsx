import React, {useEffect, useRef, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {logInScreenInputSchema} from '../../validations/Login';
import {Colors} from '../../constants';
import {AnimatedInput, LargeButton} from '../../components';
import auth from '@react-native-firebase/auth';

const SignInScreen = ({navigation}: any) => {
  const [disabled, setDisabled] = useState(false);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(logInScreenInputSchema),
  });

  const goToSignUpScreen = () => {
    navigation.navigate('Register');
  };

  const HandleSignIn = async (data: any) => {
    setDisabled(true);
    const adminEmail = 'admin@gmail.com';
    try {
      const {email, password} = data;
      const userCredential = await auth().signInWithEmailAndPassword(
        email,
        password,
      );

      if (userCredential.user) {
        const validateAdmin = userCredential.user.email == adminEmail ? "Employees" :"Home"
        navigation.replace(validateAdmin);
      }
    } catch (error: any) {
      setDisabled(false);
      console.error('Login error:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          color: Colors.DEFAULT_BLACK,
          fontSize: 35,
        }}>
        Log In
      </Text>
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

      <TouchableOpacity style={styles.signInButton}>
        <LargeButton
          disabled={disabled}
          onPress={handleSubmit(HandleSignIn)}
          text={'Sign In'}
        />
      </TouchableOpacity>

      <View style={styles.footerTextContainer}>
        <Text style={styles.footerText}>Don’t have an account?</Text>
        <TouchableOpacity onPress={goToSignUpScreen}>
          <Text style={styles.footerSignUpText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
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
  footerTextContainer: {
    flexDirection: 'row',
    marginTop: 60,
  },
  footerText: {
    color: Colors.DEFAULT_BLACK,
   
  },
  footerSignUpText: {
    marginLeft: 3,
    color: Colors.DEFAULT_BLACK
  },
  image: {
    width: 250,
    height: 250,
    marginRight: 16,
    borderRadius: 150,
    marginBottom: 20,
  },
});

export default SignInScreen;
