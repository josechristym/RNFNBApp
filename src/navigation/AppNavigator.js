// navigation/AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../components/login';
import LandingScreen from '../components/landing';
import TabNavigator from './TabNavigator';
// import HomeScreen from '../components/home';
// import DineInScreen from '../components/dinein';
// import OrderScreen from '../components/order';
// import TablesScreen from '../components/tables';
// import FoodCategoryScreen from '../components/foodcategory';
// import FoodListScreen from '../components/foodlist';
// import FoodAddOnScreen from '../components/foodAddons';
// import CartScreen from '../components/cart';
// Screens
// Import your screens here

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MainTab" component={TabNavigator} options={{headerShown:false}}/>
        <Stack.Screen name="LandingPage" component={LandingScreen} options={{headerShown:false}}/>
        {/* <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name='Dinein' component={DineInScreen} options={{ headerShown: false }} />
        <Stack.Screen name='Order' component={OrderScreen} options={{ headerShown: false }} />
        <Stack.Screen name='Tables' component={TablesScreen} options={{ headerShown: false }} />
        <Stack.Screen name='FoodCategory' component={FoodCategoryScreen} options={{ headerShown: false }} />
        <Stack.Screen name='FoodList' component={FoodListScreen} options={{ headerShown: false }} />
        <Stack.Screen name='FoodAddons' component={FoodAddOnScreen} options={{ headerShown: false }} />
        <Stack.Screen name='Cart' component={CartScreen} options={{ headerShown: false }} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
