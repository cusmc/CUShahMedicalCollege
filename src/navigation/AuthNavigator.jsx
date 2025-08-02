import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Import auth screens
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      {/* Add more auth screens here like Register, ForgotPassword, etc. */}
    </Stack.Navigator>
  );
};

export default AuthNavigator; 