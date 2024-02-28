// navigation/AppNavigator.js
import React from 'react';
import { Appearance } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../components/login';
import LandingScreen from '../components/landing';
import TabNavigator from './TabNavigator';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  Appearance.setColorScheme('light')

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MainTab" component={TabNavigator} options={{headerShown:false}}/>
        <Stack.Screen name="LandingPage" component={LandingScreen} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
