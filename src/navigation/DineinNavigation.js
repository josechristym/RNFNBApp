// navigation/AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DineInTabScreen from '../components/dineinTab';
import OrderScreen from '../components/order';
import TablesScreen from '../components/tables';
import FoodCategoryScreen from '../components/foodcategory';
import FoodListScreen from '../components/foodlist';
import FoodAddOnScreen from '../components/foodAddons';
import CartScreen from '../components/cart';
// Screens
// Import your screens here

const Stack = createNativeStackNavigator();

function DineinNavigation() {
  return (
      <Stack.Navigator>
        <Stack.Screen name='DineInTab' component={DineInTabScreen} options={{ headerShown: false }} />
        <Stack.Screen name='Order' component={OrderScreen} options={{ headerShown: false }} />
        <Stack.Screen name='Tables' component={TablesScreen} options={{ headerShown: false }} />
        <Stack.Screen name='FoodCategory' component={FoodCategoryScreen} options={{ headerShown: false }} />
        <Stack.Screen name='FoodList' component={FoodListScreen} options={{ headerShown: false }} />
        <Stack.Screen name='FoodAddons' component={FoodAddOnScreen} options={{ headerShown: false }} />
        <Stack.Screen name='Cart' component={CartScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
  );
}

export default DineinNavigation;
