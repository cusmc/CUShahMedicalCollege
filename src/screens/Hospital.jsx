import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Header from '../components/Header';
import { Colors } from '../constants/Colors';
import { Metrics } from '../constants/Metrics';

const Hospital = ({ navigation }) => {
  const hospitalServices = [
    {
      title: 'Patient Care',
      description: 'Access patient care services and information',
      icon: '🏥',
    },
    {
      title: 'Appointments',
      description: 'Schedule and manage medical appointments',
      icon: '📅',
    },
    {
      title: 'Emergency Services',
      description: '24/7 emergency medical services',
      icon: '🚨',
    },
    {
      title: 'Medical Records',
      description: 'Access patient medical records',
      icon: '📋',
    },
  ];

  return (
    <View style={styles.container}>
      <Header
        title="🏥 Hospital"
        showMenu={true}
        onMenuPress={() => navigation.openDrawer()}
        showList={true}
      />

      <ScrollView style={styles.content}>
        <Text style={styles.pageTitle}>Hospital Services</Text>
        <Text style={styles.pageSubtitle}>
          Access hospital services and patient care
        </Text>

        {hospitalServices.map((service, index) => (
          <View key={index} style={styles.hospitalCard}>
            <Text style={styles.hospitalIcon}>{service.icon}</Text>
            <View style={styles.hospitalContent}>
              <Text style={styles.hospitalTitle}>{service.title}</Text>
              <Text style={styles.hospitalDescription}>
                {service.description}
              </Text>
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
  hospitalCard: {
    backgroundColor: Colors.white,
    padding: Metrics.lg,
    borderRadius: Metrics.borderRadius.lg,
    marginBottom: Metrics.lg,
    flexDirection: 'row',
    alignItems: 'center',
    ...Metrics.shadow.medium,
  },
  hospitalIcon: {
    fontSize: Metrics.fontSize.xxxl,
    marginRight: Metrics.lg,
  },
  hospitalContent: {
    flex: 1,
  },
  hospitalTitle: {
    fontSize: Metrics.fontSize.lg,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: Metrics.xs,
  },
  hospitalDescription: {
    fontSize: Metrics.fontSize.md,
    color: Colors.gray,
  },
});

export default Hospital;
