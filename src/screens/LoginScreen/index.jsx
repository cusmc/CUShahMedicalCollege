import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { Strings } from '../../constants/Strings';
import CustomInput from '../../components/CustomInput';
import Button from '../../components/Button';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../../constants/StorageKeys'; // ✅ Make sure this file exports TOKEN key

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
        console.log('✅ Login successful');

        // ✅ Save token to AsyncStorage
        if (result.token) {
          await AsyncStorage.setItem(STORAGE_KEYS.TOKEN, result.token);
          console.log('📦 Token saved to AsyncStorage:', result.token);
        } else {
          console.warn('⚠️ Login response did not contain a token');
        }

        // Navigation happens due to isAuthenticated change
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

  // const handleForgotPassword = () => {
  //   Alert.alert(Strings.forgotPassword, Strings.forgotPasswordMessage);
  // };

  return (
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

          <CustomInput
            value={username}
            onChangeText={setUsername}
            placeholder={Strings.usernamePlaceholder}
            autoCorrect={false}
            editable={!isLoading}
          />

          <CustomInput
            value={password}
            onChangeText={setPassword}
            placeholder={Strings.passwordPlaceholder}
            secureTextEntry
            autoCapitalize="none"
            editable={!isLoading}
          />

          {/* <Button
            title={Strings.forgotPassword}
            variant="ghost"
            size="small"
            onPress={handleForgotPassword}
            disabled={isLoading}
            style={styles.forgotPassword}
          /> */}

          <Button
            title={isLoading ? 'Signing In...' : Strings.loginButton}
            onPress={handleLogin}
            loading={isLoading}
            // disabled={isLoading}
            fullWidth
            style={styles.loginButton}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default LoginScreen;
