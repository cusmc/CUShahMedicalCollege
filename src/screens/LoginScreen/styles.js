import { StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors';
import { Metrics } from '../../constants/Metrics';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    backgroundColor: Colors.primary,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: Metrics.xl,
  },
  header: {
    alignItems: 'center',
    marginBottom: Metrics.xxl,
  },
  logoContainer: {
    width: 80,
    height: 80,
    backgroundColor: Colors.white,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Metrics.lg,
  },
  logoImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  welcomeText: {
    color: Colors.white,
    fontSize: Metrics.fontSize.title,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: Metrics.sm,
  },
  subtitle: {
    color: Colors.primaryLight,
    textAlign: 'center',
  },
  formContainer: {
    backgroundColor: Colors.white,
    borderRadius: Metrics.borderRadius.lg,
    padding: Metrics.lg,
    ...Metrics.shadow.medium,
  },
  formTitle: {
    // color: Colors.textPrimary,
    fontSize: Metrics.fontSize.xxl,
    fontWeight: 'bold',
    marginBottom: Metrics.lg,
    textAlign: 'center',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: Metrics.lg,
  },
  loginButton: {
    marginBottom: Metrics.lg,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Metrics.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border,
  },
  dividerText: {
    marginHorizontal: Metrics.md,
    color: Colors.gray,
  },
  socialButton: {
    marginBottom: Metrics.sm,
  },
  signUpContainer: {
    marginTop: Metrics.lg,
    alignItems: 'center',
  },
  signUpText: {
    color: Colors.white,
    textAlign: 'center',
  },
  signUpLink: {
    color: Colors.primaryLight,
    fontWeight: '600',
  },
});
