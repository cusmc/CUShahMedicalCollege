import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Header from '../components/Header';
import { Colors } from '../constants/Colors';
import { Metrics } from '../constants/Metrics';

const ImportantInfo = ({ navigation }) => {
  const importantItems = [
    {
      title: 'Emergency Contacts',
      description: 'Important emergency contact numbers',
      icon: '🚨',
      priority: 'high',
    },
    {
      title: 'Academic Calendar',
      description: 'Important dates and academic schedule',
      icon: '📅',
      priority: 'medium',
    },
    {
      title: 'Exam Guidelines',
      description: 'Rules and guidelines for examinations',
      icon: '📝',
      priority: 'high',
    },
    {
      title: 'Campus Map',
      description: 'Interactive campus map and directions',
      icon: '🗺️',
      priority: 'low',
    },
  ];

  const getPriorityColor = priority => {
    switch (priority) {
      case 'high':
        return '#EF4444';
      case 'medium':
        return '#F59E0B';
      case 'low':
        return '#10B981';
      default:
        return Colors.gray;
    }
  };

  return (
    <View style={styles.container}>
      <Header
        title="ℹ️ Important Info"
        showMenu={true}
        onMenuPress={() => navigation.openDrawer()}
        showList={true}
      />

      <ScrollView style={styles.content}>
        <Text style={styles.pageTitle}>Important Information</Text>
        <Text style={styles.pageSubtitle}>
          Access important notices and information
        </Text>

        {importantItems.map((item, index) => (
          <View key={index} style={styles.infoCard}>
            <View style={styles.infoHeader}>
              <Text style={styles.infoIcon}>{item.icon}</Text>
              <View
                style={[
                  styles.priorityBadge,
                  { backgroundColor: getPriorityColor(item.priority) },
                ]}
              >
                <Text style={styles.priorityText}>
                  {item.priority.toUpperCase()}
                </Text>
              </View>
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>{item.title}</Text>
              <Text style={styles.infoDescription}>{item.description}</Text>
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
  infoCard: {
    backgroundColor: Colors.white,
    padding: Metrics.lg,
    borderRadius: Metrics.borderRadius.lg,
    marginBottom: Metrics.lg,
    ...Metrics.shadow.medium,
  },
  infoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Metrics.md,
  },
  infoIcon: {
    fontSize: Metrics.fontSize.xxxl,
  },
  priorityBadge: {
    paddingHorizontal: Metrics.sm,
    paddingVertical: Metrics.xs,
    borderRadius: Metrics.borderRadius.sm,
  },
  priorityText: {
    color: Colors.white,
    fontSize: Metrics.fontSize.xs,
    fontWeight: 'bold',
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: Metrics.fontSize.lg,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: Metrics.xs,
  },
  infoDescription: {
    fontSize: Metrics.fontSize.md,
    color: Colors.gray,
  },
});

export default ImportantInfo;
