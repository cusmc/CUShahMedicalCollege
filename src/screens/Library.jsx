import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Header from '../components/Header';
import { Colors } from '../constants/Colors';
import { Metrics } from '../constants/Metrics';

const Library = ({ navigation }) => {
  const libraryServices = [
    {
      title: 'Book Catalog',
      description: 'Search and browse available books',
      icon: '📚',
    },
    {
      title: 'E-Resources',
      description: 'Access online journals and databases',
      icon: '💻',
    },
    {
      title: 'Study Rooms',
      description: 'Book study rooms and facilities',
      icon: '🏠',
    },
    {
      title: 'Library Hours',
      description: 'Check opening and closing times',
      icon: '🕒',
    },
  ];

  return (
    <View style={styles.container}>
      <Header
        title="📖 Library"
        showMenu={true}
        onMenuPress={() => navigation.openDrawer()}
        showList={true}
      />

      <ScrollView style={styles.content}>
        <Text style={styles.pageTitle}>Library Services</Text>
        <Text style={styles.pageSubtitle}>
          Access library resources and services
        </Text>

        {libraryServices.map((service, index) => (
          <View key={index} style={styles.libraryCard}>
            <Text style={styles.libraryIcon}>{service.icon}</Text>
            <View style={styles.libraryContent}>
              <Text style={styles.libraryTitle}>{service.title}</Text>
              <Text style={styles.libraryDescription}>
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
  libraryCard: {
    backgroundColor: Colors.white,
    padding: Metrics.lg,
    borderRadius: Metrics.borderRadius.lg,
    marginBottom: Metrics.lg,
    flexDirection: 'row',
    alignItems: 'center',
    ...Metrics.shadow.medium,
  },
  libraryIcon: {
    fontSize: Metrics.fontSize.xxxl,
    marginRight: Metrics.lg,
  },
  libraryContent: {
    flex: 1,
  },
  libraryTitle: {
    fontSize: Metrics.fontSize.lg,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: Metrics.xs,
  },
  libraryDescription: {
    fontSize: Metrics.fontSize.md,
    color: Colors.gray,
  },
});

export default Library;
