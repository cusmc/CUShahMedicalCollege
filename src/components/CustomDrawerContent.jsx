import React, { useState } from 'react';
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
  const [expandedMenu, setExpandedMenu] = useState(null);

  const handleLogout = async () => {
    await logout();
    props.navigation.navigate('LoginScreen');
  };

  const handleNavigation = screenName => {
    props.navigation.navigate(screenName);
    props.navigation.closeDrawer();
  };

  // Navigation Items (with optional submenus)
  const navigationItems = [
    { name: 'Home', label: '🏠 Home', screen: 'Home' },
    { name: 'Public', label: '🌐 Public', screen: 'Public' },
    {
      name: 'HR',
      label: '👥 HR',
      submenu: [
        { label: '💰 PaySlip', screen: 'PaySlip' },
        { label: '📅 Attendance', screen: 'Attendance' },
      ],
    },
    {
      name: 'Academic',
      label: '📚 Academic',
      submenu: [
        { label: '📝 Courses', screen: 'Courses' },
        { label: '🎓 Students', screen: 'Students' },
      ],
    },
    { name: 'Library', label: '📖 Library', screen: 'Library' },
    { name: 'Hospital', label: '🏥 Hospital', screen: 'Hospital' },
    {
      name: 'ImportantInfo',
      label: 'ℹ️ Important Info',
      screen: 'ImportantInfo',
    },
    { name: 'Settings', label: '⚙️ Settings', screen: 'Settings' },
  ];

  const toggleMenu = menuName => {
    setExpandedMenu(expandedMenu === menuName ? null : menuName);
  };

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
          <View key={index}>
            <TouchableOpacity
              style={styles.navItem}
              onPress={() =>
                item.submenu
                  ? toggleMenu(item.name)
                  : handleNavigation(item.screen)
              }
            >
              <Text style={styles.navLabel}>
                {item.label}{' '}
                {item.submenu && (expandedMenu === item.name ? '▲' : '▼')}
              </Text>
            </TouchableOpacity>

            {/* Submenu Items */}
            {item.submenu && expandedMenu === item.name && (
              <View style={styles.submenu}>
                {item.submenu.map((sub, subIndex) => (
                  <TouchableOpacity
                    key={subIndex}
                    style={styles.submenuItem}
                    onPress={() => handleNavigation(sub.screen)}
                  >
                    <Text style={styles.submenuLabel}>{sub.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
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
  container: { flex: 1, backgroundColor: '#fff' },
  profileSection: {
    padding: Metrics.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 180,
    marginBottom: Metrics.md,
  },
  userName: {
    fontSize: Metrics.fontSize.lg,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: Metrics.sm,
  },
  userRole: {
    fontSize: Metrics.fontSize.sm,
    color: Colors.gray,
    textAlign: 'center',
  },
  navigationSection: { flex: 1, paddingTop: Metrics.lg },
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
  submenu: {
    paddingLeft: 30,
    backgroundColor: '#f9f9f9',
  },
  submenuItem: {
    paddingVertical: Metrics.sm,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.border,
  },
  submenuLabel: {
    fontSize: Metrics.fontSize.sm,
    color: Colors.textSecondary,
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
