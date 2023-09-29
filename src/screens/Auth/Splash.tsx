import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../constants';
import Auth from '@react-native-firebase/auth';

const SPLASH_TIMEOUT = 3000;
const ADMIN_EMAIL = 'admin@gmail.com';

const determineInitialScreen = (user:any) => {
  if (user) {
    return ADMIN_EMAIL === user.email ? 'Employees' : 'Home';
  }
  return 'Login';
};

const Splash = ({ navigation }: any) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      Auth().onAuthStateChanged((user: any) => {
        const initialScreen = determineInitialScreen(user);
        navigation.replace(initialScreen);
      });
    }, SPLASH_TIMEOUT);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Splash</Text>
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
  text: {
    color: Colors.DEFAULT_BLACK,
    fontSize: 35,
  },
});

export default Splash;
