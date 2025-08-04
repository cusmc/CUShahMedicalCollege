import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Switch,
  Alert,
} from 'react-native';
import Header from '../components/Header';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { Colors } from '../constants/Colors';
import { Metrics } from '../constants/Metrics';

const Settings = ({ navigation }) => {
  const { logout, user } = useAuth();
  // Dummy state for toggles (replace with real state management as needed)
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(false);

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          await logout();
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Header
        title="⚙️ Settings"
        showMenu={true}
        onMenuPress={() => navigation.openDrawer()}
        showList={true}
      />

      <ScrollView style={styles.content}>
        <Text style={styles.pageTitle}>Settings</Text>
        <Text style={styles.pageSubtitle}>
          Manage your preferences and app settings
        </Text>

        {/* User Info Card */}
        <View style={styles.userCard}>
          <Text style={styles.userLabel}>Logged in as</Text>
          <Text style={styles.userName}>
            {user?.name || user?.username || 'User'}
          </Text>
        </View>

        <View style={styles.settingCard}>
          <Text style={styles.settingLabel}>Enable Notifications</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ false: Colors.gray, true: Colors.primary }}
            thumbColor={notificationsEnabled ? Colors.primary : '#f4f3f4'}
          />
        </View>

        <View style={styles.settingCard}>
          <Text style={styles.settingLabel}>Dark Mode</Text>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            trackColor={{ false: Colors.gray, true: Colors.primary }}
            thumbColor={darkMode ? Colors.primary : '#f4f3f4'}
          />
        </View>

        <View style={styles.settingCard}>
          <Text style={styles.settingLabel}>App Version</Text>
          <Text style={styles.settingValue}>1.0.0</Text>
        </View>

        {/* Logout Button */}
        <View style={styles.logoutContainer}>
          <Button
            title="Logout"
            variant="outline"
            onPress={handleLogout}
            fullWidth
            style={styles.logoutButton}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    flex: 1,
    padding: Metrics.lg,
  },
  pageTitle: {
    fontSize: Metrics.fontSize.xxxl,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: Metrics.xs,
  },
  pageSubtitle: {
    fontSize: Metrics.fontSize.lg,
    color: Colors.gray,
    marginBottom: Metrics.xl,
  },
  userCard: {
    backgroundColor: Colors.primary,
    padding: Metrics.lg,
    borderRadius: Metrics.borderRadius.lg,
    marginBottom: Metrics.lg,
    ...Metrics.shadow.medium,
  },
  userLabel: {
    fontSize: Metrics.fontSize.sm,
    color: Colors.white,
    opacity: 0.8,
    marginBottom: Metrics.xs,
  },
  userName: {
    fontSize: Metrics.fontSize.lg,
    color: Colors.white,
    fontWeight: 'bold',
  },
  settingCard: {
    backgroundColor: Colors.white,
    padding: Metrics.lg,
    borderRadius: Metrics.borderRadius.lg,
    marginBottom: Metrics.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...Metrics.shadow.medium,
  },
  settingLabel: {
    fontSize: Metrics.fontSize.md,
    color: Colors.text,
    fontWeight: '500',
  },
  settingValue: {
    fontSize: Metrics.fontSize.md,
    color: Colors.gray,
    fontWeight: '400',
  },
  logoutContainer: {
    marginTop: Metrics.xl,
    marginBottom: Metrics.xl,
  },
  logoutButton: {
    borderColor: Colors.error,
    borderWidth: 2,
  },
});

export default Settings;
