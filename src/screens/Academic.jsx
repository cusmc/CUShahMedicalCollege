import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Header from '../components/Header';
import { Colors } from '../constants/Colors';
import { Metrics } from '../constants/Metrics';

const Academic = ({ navigation }) => {
  const academicInfo = [
    {
      title: 'Course Schedule',
      description: 'View current semester course schedules',
      icon: '📅',
    },
    {
      title: 'Exam Schedule',
      description: 'Check upcoming examination dates',
      icon: '📝',
    },
    {
      title: 'Results',
      description: 'Access academic results and grades',
      icon: '📊',
    },
    {
      title: 'Faculty Directory',
      description: 'Contact information for faculty members',
      icon: '👨‍🏫',
    },
  ];

  return (
    <View style={styles.container}>
      <Header
        title="📚 Academic"
        showMenu={true}
        onMenuPress={() => navigation.openDrawer()}
        showList={true}
      />

      <ScrollView style={styles.content}>
        <Text style={styles.pageTitle}>Academic Services</Text>
        <Text style={styles.pageSubtitle}>
          Access academic resources and information
        </Text>

        {academicInfo.map((item, index) => (
          <View key={index} style={styles.academicCard}>
            <Text style={styles.academicIcon}>{item.icon}</Text>
            <View style={styles.academicContent}>
              <Text style={styles.academicTitle}>{item.title}</Text>
              <Text style={styles.academicDescription}>{item.description}</Text>
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
  academicCard: {
    backgroundColor: Colors.white,
    padding: Metrics.lg,
    borderRadius: Metrics.borderRadius.lg,
    marginBottom: Metrics.lg,
    flexDirection: 'row',
    alignItems: 'center',
    ...Metrics.shadow.medium,
  },
  academicIcon: {
    fontSize: Metrics.fontSize.xxxl,
    marginRight: Metrics.lg,
  },
  academicContent: {
    flex: 1,
  },
  academicTitle: {
    fontSize: Metrics.fontSize.lg,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: Metrics.xs,
  },
  academicDescription: {
    fontSize: Metrics.fontSize.md,
    color: Colors.gray,
  },
});

export default Academic;
