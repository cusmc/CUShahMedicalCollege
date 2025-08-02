import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Header from '../components/Header';
import { Colors } from '../constants/Colors';
import { Metrics } from '../constants/Metrics';

const HR = ({ navigation }) => {
  const hrInfo = [
    {
      title: 'Employee Directory',
      description: 'Access contact information for all staff members',
      icon: '👥',
    },
    {
      title: 'Leave Management',
      description: 'Submit and track leave requests',
      icon: '📅',
    },
    {
      title: 'Payroll Information',
      description: 'View salary and payment details',
      icon: '💰',
    },
    {
      title: 'Training Programs',
      description: 'Available training and development opportunities',
      icon: '🎓',
    },
  ];

  return (
    <View style={styles.container}>
      <Header
        title="👥 HR"
        showMenu={true}
        onMenuPress={() => navigation.openDrawer()}
        showList={true}
      />

      <ScrollView style={styles.content}>
        <Text style={styles.pageTitle}>Human Resources</Text>
        <Text style={styles.pageSubtitle}>
          Access HR services and information
        </Text>

        {hrInfo.map((item, index) => (
          <View key={index} style={styles.hrCard}>
            <Text style={styles.hrIcon}>{item.icon}</Text>
            <View style={styles.hrContent}>
              <Text style={styles.hrTitle}>{item.title}</Text>
              <Text style={styles.hrDescription}>{item.description}</Text>
            </View>
          </View>
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
    color: Colors.text,
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
    color: Colors.text,
    marginBottom: Metrics.xs,
  },
  hrDescription: {
    fontSize: Metrics.fontSize.md,
    color: Colors.gray,
  },
});

export default HR;
