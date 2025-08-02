import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { Strings } from '../../constants/Strings';
import Header from '../../components/Header';
import Button from '../../components/Button';
import styles from './styles';

const Dashboard = () => {
  const { user, logout } = useAuth();

  // Get display name from user data
  const getDisplayName = () => {
    if (user?.username) return user.username;
    return 'User';
  };

  const handleLogout = async () => {
    await logout();
  };

  const quickActions = [
    { title: Strings.courses, icon: '📚', color: '#3B82F6' },
    { title: Strings.schedule, icon: '📅', color: '#10B981' },
    { title: Strings.grades, icon: '📊', color: '#8B5CF6' },
    { title: Strings.library, icon: '📖', color: '#F59E0B' },
  ];

  const recentActivities = [
    Strings.anatomyLab,
    Strings.biochemistryQuiz,
    Strings.clinicalRotation,
    Strings.researchPaper,
  ];

  const upcomingEvents = [
    { event: Strings.medicalConference, date: Strings.tomorrow },
    { event: Strings.finalExams, date: Strings.nextWeek },
    { event: Strings.graduationCeremony, date: Strings.graduationDate },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header
        title={`${Strings.dashboardWelcome}, ${getDisplayName()}!`}
        rightIcon={
          <Button
            title={Strings.logoutButton}
            variant="outline"
            size="small"
            onPress={handleLogout}
            textStyle={styles.logoutButtonText}
          />
        }
        backgroundColor="#2563EB"
        textColor="white"
      />

      {/* Content */}
      <ScrollView style={styles.content}>
        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{Strings.quickActions}</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((item, index) => (
              <Button
                key={index}
                title={item.title}
                variant="primary"
                onPress={() => {}}
                style={[
                  styles.quickActionCard,
                  { backgroundColor: item.color },
                ]}
                textStyle={styles.quickActionText}
              >
                <Text style={styles.quickActionIcon}>{item.icon}</Text>
              </Button>
            ))}
          </View>
        </View>

        {/* Recent Activities */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{Strings.recentActivities}</Text>
          <View style={styles.card}>
            {recentActivities.map((activity, index) => (
              <View
                key={index}
                style={[
                  styles.activityItem,
                  index !== recentActivities.length - 1 &&
                    styles.activityItemBorder,
                ]}
              >
                <Text style={styles.activityText}>{activity}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Upcoming Events */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{Strings.upcomingEvents}</Text>
          <View style={styles.card}>
            {upcomingEvents.map((event, index) => (
              <View
                key={index}
                style={[
                  styles.eventItem,
                  index !== upcomingEvents.length - 1 && styles.eventItemBorder,
                ]}
              >
                <Text style={styles.eventTitle}>{event.event}</Text>
                <Text style={styles.eventDate}>{event.date}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Dashboard;
