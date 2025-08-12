import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Alert } from 'react-native';

const AuthContext = createContext();

// Storage keys
const STORAGE_KEYS = {
  TOKEN: '@auth_token',
  USER: '@auth_user',
  IS_AUTHENTICATED: '@auth_is_authenticated',
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Start with loading true for initial check
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Load stored authentication data on app startup
  useEffect(() => {
    loadStoredAuthData();
  }, []);

  const loadStoredAuthData = async () => {
    try {
      const [storedToken, storedUser, storedIsAuthenticated] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.TOKEN),
        AsyncStorage.getItem(STORAGE_KEYS.USER),
        AsyncStorage.getItem(STORAGE_KEYS.IS_AUTHENTICATED),
      ]);

      if (storedToken && storedUser && storedIsAuthenticated === 'true') {
        const userData = JSON.parse(storedUser);
        setToken(storedToken);
        setUser(userData);
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

  const saveAuthData = async (token, userData) => {
    try {
      await Promise.all([
        AsyncStorage.setItem(STORAGE_KEYS.TOKEN, token),
        AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData)),
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
          // Add below if server expects specific cookie/header (check Postman headers)
          // 'Authorization': 'Basic YOUR_BASIC_AUTH',
          // 'Cookie': 'CompName=C.U.Shah Medical College & Hospital; Inst=CUSMC; Inst_id=1'
        },
      });

      const accessToken = response.data.access_token;
      const userData = {
        id: '1',
        username: username,
        name: username,
      };

      // Save to state and storage
      setToken(accessToken);
      setUser(userData);
      setIsAuthenticated(true);
      await saveAuthData(accessToken, userData);

      setIsLoading(false);
      console.log('✅ Login successful:', response.data);
      return { success: true, token: accessToken, user: userData };
    } catch (error) {
      setIsLoading(false);
      // console.error('🔴 Login failed:', error.response?.data || error.message);

      const errorDescription =
        error.response?.data?.error_description ||
        'Something went wrong. Please try again.';

      return { success: false, error: errorDescription };
    }
  };

  const validateToken = async (tokenToValidate) => {
    if (!tokenToValidate) {
      return false;
    }

    try {
      // Basic token validation - check if it's not empty and has reasonable length
      if (tokenToValidate.length < 10) {
        return false;
      }

      // You could add more sophisticated validation here, such as:
      // - JWT token expiration check
      // - Server-side token validation
      // For now, we'll do basic validation
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
