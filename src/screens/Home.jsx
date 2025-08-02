import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import { Colors } from '../constants/Colors';
import { Metrics } from '../constants/Metrics';

const Home = ({ navigation }) => {
  const { user } = useAuth();

  const quickActions = [
    { title: '📚 Academic', icon: '📚', color: '#3B82F6' },
    { title: '🏥 Hospital', icon: '🏥', color: '#10B981' },
    { title: '📖 Library', icon: '📖', color: '#8B5CF6' },
    { title: '👥 HR', icon: '👥', color: '#F59E0B' },
    { title: '🌐 Public', icon: '🌐', color: '#EF4444' },
    { title: 'ℹ️ Info', icon: 'ℹ️', color: '#06B6D4' },
  ];

  const handleQuickAction = action => {
    navigation.navigate(action.title.split(' ')[1]);
  };

  return (
    <View style={styles.container}>
      <Header
        title="C U SHAH MEDICAL COLLEG..."
        showMenu={true}
        onMenuPress={() => navigation.openDrawer()}
        showList={true}
      />

      <ScrollView style={styles.content}>
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>
            Welcome back, {user?.name || 'User'}!
          </Text>
          <Text style={styles.subtitleText}>
            What would you like to do today?
          </Text>
        </View>

        {/* Quick Actions Grid */}
        <View style={styles.quickActionsSection}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.quickActionCard,
                  { backgroundColor: action.color },
                ]}
                onPress={() => handleQuickAction(action)}
              >
                <Text style={styles.actionIcon}>{action.icon}</Text>
                <Text style={styles.actionTitle}>
                  {action.title.split(' ')[1]}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.recentActivitySection}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityCard}>
            <Text style={styles.activityText}>
              📚 Academic calendar updated
            </Text>
            <Text style={styles.activityTime}>2 hours ago</Text>
          </View>
          <View style={styles.activityCard}>
            <Text style={styles.activityText}>
              🏥 Hospital schedule modified
            </Text>
            <Text style={styles.activityTime}>1 day ago</Text>
          </View>
          <View style={styles.activityCard}>
            <Text style={styles.activityText}>📖 Library resources added</Text>
            <Text style={styles.activityTime}>3 days ago</Text>
          </View>
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
  welcomeSection: {
    marginBottom: Metrics.xl,
  },
  welcomeText: {
    fontSize: Metrics.fontSize.xxl,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: Metrics.xs,
  },
  subtitleText: {
    fontSize: Metrics.fontSize.lg,
    color: Colors.gray,
  },
  quickActionsSection: {
    marginBottom: Metrics.xl,
  },
  sectionTitle: {
    fontSize: Metrics.fontSize.xl,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: Metrics.lg,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    width: '48%',
    padding: Metrics.lg,
    borderRadius: Metrics.borderRadius.lg,
    marginBottom: Metrics.md,
    alignItems: 'center',
    ...Metrics.shadow.medium,
  },
  actionIcon: {
    fontSize: Metrics.fontSize.xxxl,
    marginBottom: Metrics.sm,
  },
  actionTitle: {
    color: Colors.white,
    fontSize: Metrics.fontSize.md,
    fontWeight: '600',
    textAlign: 'center',
  },
  recentActivitySection: {
    marginBottom: Metrics.xl,
  },
  activityCard: {
    backgroundColor: Colors.white,
    padding: Metrics.lg,
    borderRadius: Metrics.borderRadius.md,
    marginBottom: Metrics.sm,
    ...Metrics.shadow.small,
  },
  activityText: {
    fontSize: Metrics.fontSize.md,
    color: Colors.text,
    marginBottom: Metrics.xs,
  },
  activityTime: {
    fontSize: Metrics.fontSize.sm,
    color: Colors.gray,
  },
});

export default Home;
