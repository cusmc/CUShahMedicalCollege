import { StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors';
import { Metrics } from '../../constants/Metrics';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundDark,
  },
  content: {
    flex: 1,
    paddingHorizontal: Metrics.lg,
    paddingVertical: Metrics.lg,
  },
  section: {
    marginBottom: Metrics.lg,
  },
  sectionTitle: {
    color: Colors.textPrimary,
    fontSize: Metrics.fontSize.xxl,
    fontWeight: 'bold',
    marginBottom: Metrics.lg,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: Metrics.borderRadius.md,
    padding: Metrics.lg,
    ...Metrics.shadow.large,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    width: '48%',
    padding: Metrics.md,
    borderRadius: Metrics.borderRadius.md,
    marginBottom: Metrics.sm,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 80,
  },
  quickActionIcon: {
    fontSize: Metrics.fontSize.xxl,
    marginBottom: Metrics.xs,
  },
  quickActionText: {
    color: Colors.white,
    fontWeight: '600',
    textAlign: 'center',
  },
  activityItem: {
    paddingVertical: Metrics.sm,
  },
  activityItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  activityText: {
    color: Colors.textSecondary,
  },
  eventItem: {
    paddingVertical: Metrics.sm,
  },
  eventItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  eventTitle: {
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  eventDate: {
    color: Colors.gray,
    fontSize: Metrics.fontSize.sm,
  },
  logoutButtonText: {
    color: Colors.white,
  },
});
