import React from 'react';
import { View, Text, ScrollView, StyleSheet, Switch } from 'react-native';
import Header from '../components/Header';
import { Colors } from '../constants/Colors';
import { Metrics } from '../constants/Metrics';

const Settings = ({ navigation }) => {
  // Dummy state for toggles (replace with real state management as needed)
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(false);

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
});

export default Settings;
