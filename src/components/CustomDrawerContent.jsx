import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { Colors } from '../constants/Colors';
import { Metrics } from '../constants/Metrics';

const CustomDrawerContent = props => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    props.navigation.LoginScreen();
  };

  const handleNavigation = screenName => {
    props.navigation.navigate(screenName);
    props.navigation.closeDrawer();
  };

  const navigationItems = [
    { name: 'Home', label: '🏠 Home', screen: 'Home' },
    { name: 'Public', label: '🌐 Public', screen: 'Public' },
    { name: 'HR', label: '👥 HR', screen: 'HR' },
    { name: 'Academic', label: '📚 Academic', screen: 'Academic' },
    { name: 'Library', label: '📖 Library', screen: 'Library' },
    { name: 'Hospital', label: '🏥 Hospital', screen: 'Hospital' },
    {
      name: 'ImportantInfo',
      label: 'ℹ️ Important Info',
      screen: 'ImportantInfo',
    },
    { name: 'Settings', label: '⚙️ Settings', screen: 'Settings' },
  ];

  return (
    <View style={styles.container}>
      {/* User Profile Section */}
      <View style={styles.profileSection}>
        <Image
          source={require('../../assets/images/cusmc_logo.png')}
          style={styles.profileImage}
        />
        <Text style={styles.userName}>{user?.name || 'Welcome'}</Text>
        <Text style={styles.userRole}>C.U. Shah Medical College</Text>
      </View>

      {/* Navigation Items */}
      <ScrollView style={styles.navigationSection}>
        {navigationItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.navItem}
            onPress={() => handleNavigation(item.screen)}
          >
            <Text style={styles.navLabel}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Logout Section */}
      <View style={styles.logoutSection}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>🚪 Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profileSection: {
    padding: Metrics.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    alignItems: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: Metrics.md,
  },
  userName: {
    fontSize: Metrics.fontSize.lg,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: Metrics.xs,
  },
  userRole: {
    fontSize: Metrics.fontSize.sm,
    color: Colors.gray,
    textAlign: 'center',
  },
  navigationSection: {
    flex: 1,
    paddingTop: Metrics.md,
  },
  navItem: {
    paddingVertical: Metrics.md,
    paddingHorizontal: Metrics.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  navLabel: {
    fontSize: Metrics.fontSize.md,
    color: Colors.textPrimary,
    fontWeight: '500',
  },
  logoutSection: {
    padding: Metrics.lg,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  logoutButton: {
    backgroundColor: Colors.error,
    padding: Metrics.md,
    borderRadius: Metrics.borderRadius.md,
    alignItems: 'center',
  },
  logoutText: {
    color: Colors.white,
    fontSize: Metrics.fontSize.md,
    fontWeight: '600',
  },
});

export default CustomDrawerContent;
