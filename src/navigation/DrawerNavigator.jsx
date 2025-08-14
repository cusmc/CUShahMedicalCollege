import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from '../components/CustomDrawerContent';

// Import screens
import Home from '../screens/Home';
import Public from '../screens/Public';
import HR from '../screens/HR';
import Academic from '../screens/Academic';
import Library from '../screens/Library';
import Hospital from '../screens/Hospital';
import ImportantInfo from '../screens/ImportantInfo';
import Settings from '../screens/Settings';
import PaySlip from '../components/PaySlip';
import ForgetPassword from '../screens/ForgetPassword/ForgetPassword';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: '#fff',
          width: 280,
        },
        drawerActiveTintColor: '#8B0000',
        drawerInactiveTintColor: '#333',
        drawerLabelStyle: {
          marginLeft: -10,
          fontSize: 16,
          fontWeight: '500',
        },
        drawerType: 'front',
        overlayColor: 'rgba(0, 0, 0, 0.5)',
      }}
    >
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          drawerLabel: '🏠 Home',
        }}
      />
      <Drawer.Screen
        name="Public"
        component={Public}
        options={{
          drawerLabel: '🌐 Public',
        }}
      />
      <Drawer.Screen
        name="HR"
        component={HR}
        options={{
          drawerLabel: '👥 HR',
        }}
      />
      <Drawer.Screen
        name="Academic"
        component={Academic}
        options={{
          drawerLabel: '📚 Academic',
        }}
      />
      <Drawer.Screen
        name="Library"
        component={Library}
        options={{
          drawerLabel: '📖 Library',
        }}
      />
      <Drawer.Screen
        name="Hospital"
        component={Hospital}
        options={{
          drawerLabel: '🏥 Hospital',
        }}
      />
      <Drawer.Screen
        name="ImportantInfo"
        component={ImportantInfo}
        options={{
          drawerLabel: 'ℹ️ Important Info',
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={Settings}
        options={{
          drawerLabel: '⚙️ Settings',
        }}
      />
      <Drawer.Screen
        name="PaySlip"
        component={PaySlip}
        options={{
          drawerLabel: '💸 Pay Slip',
        }}
      />
      <Drawer.Screen
        name="ForgetPassword"
        component={ForgetPassword}
        options={{
          drawerLabel: '💸 ForgetPassword',
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
