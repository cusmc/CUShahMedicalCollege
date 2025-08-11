import { StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors';
import { Metrics } from '../../constants/Metrics';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    width: 105,
    height: 105,
    backgroundColor: Colors.white,
    borderRadius: 64,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Metrics.lg,
    ...Metrics.shadow.medium,
  },
  logoImage: {
    width: 96,
    height: 96,
    borderRadius: 48,
  },
  appName: {
    color: Colors.white,
    fontSize: Metrics.fontSize.title,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: Metrics.sm,
  },
  tagline: {
    color: Colors.white,
    fontSize: Metrics.fontSize.xl,
    textAlign: 'center',
    fontWeight: "Bold",
    marginBottom: Metrics.xl,
  },
  loadingContainer: {
    flexDirection: 'row',
    marginTop: Metrics.xxl,
  },
});
