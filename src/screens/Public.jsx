import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Header from '../components/Header';
import { Colors } from '../constants/Colors';
import { Metrics } from '../constants/Metrics';

const Public = ({ navigation }) => {
  const announcements = [
    {
      title: 'College Reopening',
      content:
        'The college will reopen on 15th August 2024 for the new academic year.',
      date: '2024-08-01',
      priority: 'high',
    },
    {
      title: 'Annual Sports Meet',
      content: 'Annual sports meet will be held on 25th December 2024.',
      date: '2024-12-20',
      priority: 'medium',
    },
    {
      title: 'Library Hours Update',
      content:
        'Library will remain open till 8 PM during exam preparation period.',
      date: '2024-11-15',
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
        title="🌐 Public"
        showMenu={true}
        onMenuPress={() => navigation.openDrawer()}
        showList={true}
      />

      <ScrollView style={styles.content}>
        <Text style={styles.pageTitle}>Public Information</Text>
        <Text style={styles.pageSubtitle}>
          Stay updated with the latest announcements and information
        </Text>

        {announcements.map((announcement, index) => (
          <View key={index} style={styles.announcementCard}>
            <View style={styles.announcementHeader}>
              <Text style={styles.announcementTitle}>{announcement.title}</Text>
              <View
                style={[
                  styles.priorityBadge,
                  { backgroundColor: getPriorityColor(announcement.priority) },
                ]}
              >
                <Text style={styles.priorityText}>
                  {announcement.priority.toUpperCase()}
                </Text>
              </View>
            </View>
            <Text style={styles.announcementContent}>
              {announcement.content}
            </Text>
            <Text style={styles.announcementDate}>{announcement.date}</Text>
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
  announcementCard: {
    backgroundColor: Colors.white,
    padding: Metrics.lg,
    borderRadius: Metrics.borderRadius.lg,
    marginBottom: Metrics.lg,
    ...Metrics.shadow.medium,
  },
  announcementHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Metrics.md,
  },
  announcementTitle: {
    fontSize: Metrics.fontSize.lg,
    fontWeight: 'bold',
    color: Colors.text,
    flex: 1,
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
  announcementContent: {
    fontSize: Metrics.fontSize.md,
    color: Colors.text,
    lineHeight: 22,
    marginBottom: Metrics.md,
  },
  announcementDate: {
    fontSize: Metrics.fontSize.sm,
    color: Colors.gray,
  },
});

export default Public;
