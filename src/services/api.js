// api.js

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'https://smc.cusmc.org';
const TOKEN_URL = `${BASE_URL}/token`;

// Storage keys
const STORAGE_KEYS = {
  TOKEN: '@auth_token',
  USER: '@auth_user',
  IS_AUTHENTICATED: '@auth_is_authenticated',
};

class Api {
  static async createToken(username, password) {
    try {
      // Create form body
      const formBody = new URLSearchParams();
      formBody.append('grant_type', 'password');
      formBody.append('username', username.trim());
      formBody.append('password', password.trim());

      // Optional: Add your exact Authorization and Cookie values from your working curl request
      const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ZGVtbzpwYXNzd29yZA==', // Replace with actual base64-encoded client credentials if required
        Cookie:
          'CompName=C.U.Shah Medical College & Hospital; Inst=CUSMC; Inst_id=1; __RequestVerificationToken=your_token_here',
      };

      console.log('🔵 Sending login request...');
      const response = await axios.post(TOKEN_URL, formBody.toString(), {
        headers,
      });

      console.log('✅ Token fetched successfully:', response.data);
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error('❌ Server responded with error:', error.response.data);
        throw new Error(`Token error: ${JSON.stringify(error.response.data)}`);
      } else if (error.request) {
        console.error('⚠️ No response received:', error.request);
        throw new Error('No response from server');
      } else {
        console.error('🔴 Error setting up request:', error.message);
        throw new Error(error.message);
      }
    }
  }

  // Get stored token
  static async getStoredToken() {
    try {
      return await AsyncStorage.getItem(STORAGE_KEYS.TOKEN);
    } catch (error) {
      console.error('❌ Error getting stored token:', error);
      return null;
    }
  }

  // Create authenticated axios instance
  static async createAuthenticatedInstance() {
    const token = await this.getStoredToken();
    
    const instance = axios.create({
      baseURL: BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add token to requests if available
    if (token) {
      instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    // Add request interceptor to include token
    instance.interceptors.request.use(
      async (config) => {
        const currentToken = await this.getStoredToken();
        if (currentToken) {
          config.headers.Authorization = `Bearer ${currentToken}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Add response interceptor to handle token expiration
    instance.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        if (error.response?.status === 401) {
          console.log('🔄 Token expired, clearing auth data...');
          // Clear stored auth data on token expiration
          await this.clearAuthData();
          // You might want to redirect to login here
        }
        return Promise.reject(error);
      }
    );

    return instance;
  }

  // Clear auth data
  static async clearAuthData() {
    try {
      await Promise.all([
        AsyncStorage.removeItem(STORAGE_KEYS.TOKEN),
        AsyncStorage.removeItem(STORAGE_KEYS.USER),
        AsyncStorage.removeItem(STORAGE_KEYS.IS_AUTHENTICATED),
      ]);
      console.log('🗑️ Auth data cleared from API service');
    } catch (error) {
      console.error('❌ Error clearing auth data:', error);
    }
  }

  // Example authenticated API call
  static async getProtectedData() {
    try {
      const api = await this.createAuthenticatedInstance();
      const response = await api.get('/api/protected-endpoint');
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching protected data:', error);
      throw error;
    }
  }
}

export default Api;
