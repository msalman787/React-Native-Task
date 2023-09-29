import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Splash, Login, Register, Home, UpdateProfile, Employees } from '../screens';

const Stack = createNativeStackNavigator();

const screens = [
  { name: 'Splash', component: Splash },
  { name: 'Login', component: Login },
  { name: 'Register', component: Register },
  { name: 'Home', component: Home },
  { name: 'UpdateProfile', component: UpdateProfile },
  { name: 'Employees', component: Employees },
];

const StackNavigation = () => {
  return (
    <Stack.Navigator>
      {screens.map((screen, index) => (
        <Stack.Screen
          key={index}
          name={screen.name}
          options={{ headerShown: false }}
          component={screen.component}
        />
      ))}
    </Stack.Navigator>
  );
};

export default StackNavigation
