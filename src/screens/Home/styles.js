import { StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors';
import { Metrics } from '../../constants/Metrics';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingTop: 0,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: Metrics.md,
    paddingBottom: Metrics.xxl,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: Metrics.lg,
    marginTop: Metrics.md,
  },
  mainTitle: {
    fontSize: Metrics.fontSize.xxxl,
    fontWeight: 'bold',
    color: Colors.primary,
    textAlign: 'center',
    marginBottom: Metrics.xs,
  },
  subtitle: {
    fontSize: Metrics.fontSize.lg,
    color: Colors.gray,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: Metrics.xl,
    marginTop: Metrics.lg,
    padding: Metrics.xl,
    backgroundColor: Colors.white,
    borderRadius: Metrics.borderRadius.xl,
    marginHorizontal: Metrics.sm,
    ...Metrics.shadow.large,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  profileImage: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: Colors.lightGray,
    borderWidth: 4,
    borderColor: Colors.white,
    ...Metrics.shadow.large,
  },
  textContainer: {
    paddingHorizontal: Metrics.sm,
    backgroundColor: Colors.white,
    borderRadius: Metrics.borderRadius.xl,
    padding: Metrics.xl,
    marginHorizontal: Metrics.sm,
    ...Metrics.shadow.large,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  paragraph: {
    fontSize: Metrics.fontSize.lg,
    lineHeight: 28,
    color: Colors.text,
    marginBottom: Metrics.xl,
    textAlign: 'left',
    fontWeight: '400',
  },
  centeredText: {
    fontSize: Metrics.fontSize.xxxl,
    fontWeight: 'bold',
    color: Colors.primary,
    textAlign: 'center',
    marginTop: Metrics.xl,
    fontStyle: 'italic',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});
