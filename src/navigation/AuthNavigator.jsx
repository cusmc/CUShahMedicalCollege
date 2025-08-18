import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; // Import Tab Navigator

// Import auth screens
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import ForgetPassword from '../screens/ForgetPassword/ForgetPassword';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator(); // Create a Tab navigator instance

// Define the Tab Navigator for authentication screens
const AuthTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
    </Tab.Navigator>
  );
};

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
