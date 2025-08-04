import React, { useState } from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { Strings } from '../../constants/Strings';
import CustomInput from '../../components/CustomInput';
import Button from '../../components/Button';
import styles from './styles';

const LoginScreen = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert(Strings.error, Strings.fillAllFields);
      return;
    }

    setIsLoading(true);

    try {
      console.log('🔐 Attempting login with:', username);
      const result = await login({ username, password });

      if (result.success) {
        console.log('✅ Login successful, navigating to Dashboard...');
        // The navigation should happen automatically due to isAuthenticated state change
      } else {
        console.log('❌ Login failed:', result.error);
        Alert.alert(
          Strings.loginError,
          result.error || Strings.loginErrorMessage,
        );
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert(Strings.loginError, Strings.loginErrorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    Alert.alert(Strings.forgotPassword, Strings.forgotPasswordMessage);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        style={styles.scrollView}
      >
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Image
                source={require('../../../assets/images/cusmc_logo.png')}
                style={styles.logoImage}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.welcomeText}>{Strings.loginWelcome}</Text>
            <Text style={styles.subtitle}>{Strings.loginSubtitle}</Text>
          </View>

          {/* Login Form */}
          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>{Strings.loginTitle}</Text>

            {/* Username Input */}
            <CustomInput
              label={Strings.usernameLabel}
              value={username}
              onChangeText={setUsername}
              placeholder={Strings.usernamePlaceholder}
              autoCapitalize="none"
              autoCorrect={false}
              editable={!isLoading}
            />

            {/* Password Input */}
            <CustomInput
              label={Strings.passwordLabel}
              value={password}
              onChangeText={setPassword}
              placeholder={Strings.passwordPlaceholder}
              secureTextEntry={true}
              autoCapitalize="none"
              editable={!isLoading}
            />

            {/* Forgot Password */}
            <Button
              title={Strings.forgotPassword}
              variant="ghost"
              size="small"
              onPress={handleForgotPassword}
              disabled={isLoading}
              style={styles.forgotPassword}
            />

            {/* Login Button */}
            <Button
              title={isLoading ? 'Signing In...' : Strings.loginButton}
              onPress={handleLogin}
              loading={isLoading}
              disabled={isLoading}
              fullWidth
              style={styles.loginButton}
            />
          </View>

          Sign Up Link
          {/* <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>
              Don't have an account?{' '}
              <Text style={styles.signUpLink}>Sign Up</Text>
            </Text>
          </View> */}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
