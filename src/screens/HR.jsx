import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Header from '../components/Header';
import { Colors } from '../constants/Colors';
import { Metrics } from '../constants/Metrics';

const HR = ({ navigation }) => {
  const hrInfo = [
    {
      title: 'Employee Directory',
      description: 'Access contact information for all staff members',
      icon: '👥',
      screen: 'EmployeeDirectory',
    },
    {
      title: 'Leave Management',
      description: 'Submit and track leave requests',
      icon: '📅',
      screen: 'LeaveManagement',
    },
    {
      title: 'Payroll Information',
      description: 'View salary and payment details',
      icon: '💸',
      screen: 'PaySlip',
    },
    {
      title: 'Training Programs',
      description: 'Available training and development opportunities',
      icon: '🎓',
      screen: 'TrainingPrograms',
    },
  ];

  const handleCardPress = screenName => {
    try {
      navigation.navigate(screenName);
    } catch (error) {
      console.log('Navigation error:', error);
    }
  };

  const handleMenuPress = () => {
    try {
      if (navigation?.openDrawer) {
        navigation.openDrawer();
      } else if (navigation?.getParent()?.openDrawer) {
        navigation.getParent().openDrawer();
      } else {
        console.log('Drawer navigation not available');
      }
    } catch (error) {
      console.log('Navigation error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Header
        title="👥 HR"
        showMenu={true}
        onMenuPress={handleMenuPress}
        showList={true}
      />

      <ScrollView style={styles.content}>
        <Text style={styles.pageTitle}>Human Resources</Text>
        <Text style={styles.pageSubtitle}>
          Access HR services and information
        </Text>

        {hrInfo.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.hrCard}
            onPress={() => handleCardPress(item.screen)}
            activeOpacity={0.7}
          >
            <Text style={styles.hrIcon}>{item.icon}</Text>
            <View style={styles.hrContent}>
              <Text style={styles.hrTitle}>{item.title}</Text>
              <Text style={styles.hrDescription}>{item.description}</Text>
            </View>
            <Text style={styles.arrowIcon}>→</Text>
          </TouchableOpacity>
        ))}
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
    color: Colors.textPrimary,
    marginBottom: Metrics.xs,
  },
  pageSubtitle: {
    fontSize: Metrics.fontSize.lg,
    color: Colors.gray,
    marginBottom: Metrics.xl,
  },
  hrCard: {
    backgroundColor: Colors.white,
    padding: Metrics.lg,
    borderRadius: Metrics.borderRadius.lg,
    marginBottom: Metrics.lg,
    flexDirection: 'row',
    alignItems: 'center',
    ...Metrics.shadow.medium,
  },
  hrIcon: {
    fontSize: Metrics.fontSize.xxxl,
    marginRight: Metrics.lg,
  },
  hrContent: {
    flex: 1,
  },
  hrTitle: {
    fontSize: Metrics.fontSize.lg,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: Metrics.xs,
  },
  hrDescription: {
    fontSize: Metrics.fontSize.md,
    color: Colors.gray,
  },
  arrowIcon: {
    fontSize: Metrics.fontSize.lg,
    color: Colors.primary,
    fontWeight: 'bold',
  },
});

export default HR;
