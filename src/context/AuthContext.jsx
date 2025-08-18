import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const AuthContext = createContext();

// Storage keys
const STORAGE_KEYS = {
  TOKEN: '@auth_token',
  USER: '@auth_user',
  PASSWORD: '@auth_password',
  IS_AUTHENTICATED: '@auth_is_authenticated',
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [password, setPassword] = useState(null);

  // Load stored authentication data on app startup
  useEffect(() => {
    loadStoredAuthData();
  }, []);

  const loadStoredAuthData = async () => {
    try {
      const [storedToken, storedUser, storedPassword, storedIsAuthenticated] =
        await Promise.all([
          AsyncStorage.getItem(STORAGE_KEYS.TOKEN),
          AsyncStorage.getItem(STORAGE_KEYS.USER),
          AsyncStorage.getItem(STORAGE_KEYS.PASSWORD),
          AsyncStorage.getItem(STORAGE_KEYS.IS_AUTHENTICATED),
        ]);

      if (storedToken && storedUser && storedIsAuthenticated === 'true') {
        const userData = JSON.parse(storedUser);
        setToken(storedToken);
        setUser(userData);
        setPassword(storedPassword);
        setIsAuthenticated(true);
        console.log('✅ Restored authentication from storage');
      } else {
        console.log('ℹ️ No stored authentication data found');
      }
    } catch (error) {
      console.error('❌ Error loading stored auth data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveAuthData = async (token, userData, password) => {
    try {
      await Promise.all([
        AsyncStorage.setItem(STORAGE_KEYS.TOKEN, token),
        AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData)),
        AsyncStorage.setItem(STORAGE_KEYS.PASSWORD, password),
        AsyncStorage.setItem(STORAGE_KEYS.IS_AUTHENTICATED, 'true'),
      ]);
      console.log('💾 Authentication data saved to storage');
    } catch (error) {
      console.error('❌ Error saving auth data:', error);
    }
  };

  const clearAuthData = async () => {
    try {
      await Promise.all([
        AsyncStorage.removeItem(STORAGE_KEYS.TOKEN),
        AsyncStorage.removeItem(STORAGE_KEYS.USER),
        AsyncStorage.removeItem(STORAGE_KEYS.PASSWORD),
        AsyncStorage.removeItem(STORAGE_KEYS.IS_AUTHENTICATED),
      ]);
      console.log('🗑️ Authentication data cleared from storage');
    } catch (error) {
      console.error('❌ Error clearing auth data:', error);
    }
  };

  const login = async ({ username, password }) => {
    setIsLoading(true);
    const TOKEN_URL = 'https://smc.cusmc.org/token';

    try {
      const formBody = new URLSearchParams({
        grant_type: 'password',
        username: username.trim(),
        password: password.trim(),
      }).toString();

      const response = await axios.post(TOKEN_URL, formBody, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      const accessToken = response.data.access_token;

      const userData = {
        id: '1', // replace with actual ID if API returns it
        username: username,
        name: username,
        empId: username, // if your Empid is same as username, adjust if different
      };

      // Save to state and storage
      setToken(accessToken);
      setUser(userData);
      setPassword(password);
      setIsAuthenticated(true);

      await saveAuthData(accessToken, userData, password);

      setIsLoading(false);
      console.log('✅ Login successful:', response.data);
      return { success: true, token: accessToken, user: userData };
    } catch (error) {
      setIsLoading(false);

      const errorDescription =
        error.response?.data?.error_description ||
        'Something went wrong. Please try again.';

      return { success: false, error: errorDescription };
    }
  };

  const validateToken = async tokenToValidate => {
    if (!tokenToValidate) {
      return false;
    }

    try {
      if (tokenToValidate.length < 10) {
        return false;
      }
      return true;
    } catch (error) {
      console.error('❌ Token validation error:', error);
      return false;
    }
  };

  const logout = async () => {
    setIsAuthenticated(false);
    setUser(null);
    setToken(null);
    setPassword(null);
    await clearAuthData();
    console.log('👋 User logged out');
  };

  const refreshAuthState = async () => {
    try {
      const storedToken = await AsyncStorage.getItem(STORAGE_KEYS.TOKEN);
      const isValid = await validateToken(storedToken);

      if (!isValid && isAuthenticated) {
        console.log('⚠️ Invalid token detected, logging out');
        await logout();
      }
    } catch (error) {
      console.error('❌ Error refreshing auth state:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        user,
        token,
        password, // ✅ available everywhere
        login,
        logout,
        validateToken,
        refreshAuthState,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
