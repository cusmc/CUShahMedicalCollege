import React, { useState } from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  Image,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { Strings } from '../../constants/Strings';
import CustomInput from '../../components/CustomInput';
import Button from '../../components/Button';
import styles from './styles';

const LoginScreen = ({ navigation }) => {
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
        console.log('✅ Login successful, navigating to Home...');
        // Navigation handled by isAuthenticated change
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
      ToastAndroid ("Hi I'm HItarth")
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    navigation.navigate('Auth', { screen: 'ForgetPassword' });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'android' ? 'height' : 'padding'}
      keyboardVerticalOffset={Platform.OS === 'android' ? -80 : 0}
      style={[styles.container, { flex: 1 }]}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        style={styles.scrollView}
        keyboardShouldPersistTaps="handled"
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

            <CustomInput
              // label={Strings.usernameLabel}
              value={username}
              onChangeText={setUsername}
              placeholder={Strings.usernamePlaceholder}
              autoCapitalize="none"
              autoCorrect={false}
              editable={!isLoading}
            />

            <CustomInput
              // label={Strings.passwordLabel}
              value={password}
              onChangeText={setPassword}
              placeholder={Strings.passwordPlaceholder}
              secureTextEntry={true}
              autoCapitalize="none"
              editable={!isLoading}
            />

            <Button
              title={Strings.forgotPassword}
              variant="ghost"
              size="small"
              onPress={handleForgotPassword}
              disabled={isLoading}
              style={styles.forgotPassword}
            />

            <Button
              title={isLoading ? 'Signing In...' : Strings.loginButton}
              onPress={handleLogin}
              loading={isLoading}
              disabled={isLoading}
              fullWidth
              style={styles.loginButton}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
