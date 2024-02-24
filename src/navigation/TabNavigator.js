// TabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DineinNavigation from './DineinNavigation';
import TakeAwayScreen from '../components/takeaway';
import DeliveryScreen from '../components/delivery';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUtensils, faTruck, faPersonBiking  } from '@fortawesome/free-solid-svg-icons';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{tabBarStyle: {height: 70}}}>
        <Tab.Screen name="Dine In" 
        component={DineinNavigation} 
        options={{ headerShown: false,tabBarLabel: 'Dine In', tabBarLabelStyle:{fontSize:14},
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={faUtensils } size={30} color={color}/>
          ), }} />
        <Tab.Screen name="Take Away" 
        component={TakeAwayScreen} 
        options={{ headerShown: false,tabBarLabel: 'Take Away', tabBarLabelStyle:{fontSize:14},
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={faTruck } size={30} color={color}/>
          ), }} />
        <Tab.Screen name="Delivery" 
        component={DeliveryScreen} 
        options={{ headerShown: false,tabBarLabel: 'Delivery', tabBarLabelStyle:{fontSize:14},
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={faPersonBiking } size={30} color={color}/>
          ), }} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
