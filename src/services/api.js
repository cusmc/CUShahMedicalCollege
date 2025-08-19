// src/api/api.js

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const STORAGE_KEYS = {
  TOKEN: '@auth_token',
  USER: '@auth_user',
  IS_AUTHENTICATED: '@auth_is_authenticated',
};

const BASE_URL = 'https://smc.cusmc.org';
const TOKEN_URL = `${BASE_URL}/token`;
export const GET_MENU_DATA = `${BASE_URL}/api/ModuDatasApi`;

class Api {
  static async getMenuData() {
    try {
      const instance = await this.createAuthenticatedInstance();
      const response = await instance.get(GET_MENU_DATA);
      console.log('Menu data fetched successfully:', response.data); // Add this line
      return response.data;
    } catch (error) {
      console.error('Error fetching menu data:', error.response?.data || error.message); // Enhance error logging
      throw error;
    }
  }

  static async createToken(username, password) {
    try {
      const formBody = new URLSearchParams();
      formBody.append('grant_type', 'password');
      formBody.append('username', username.trim());
      formBody.append('password', password.trim());

      const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ZGVtbzpwYXNzd29yZA==',
        Cookie:
          'CompName=C.U.Shah Medical College & Hospital; Inst=CUSMC; Inst_id=1',
      };

      const response = await axios.post(TOKEN_URL, formBody.toString(), {
        headers,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getStoredToken() {
    return await AsyncStorage.getItem(STORAGE_KEYS.TOKEN);
  }

  static async createAuthenticatedInstance() {
    const token = await this.getStoredToken();
    const instance = axios.create({
      baseURL: BASE_URL,
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : undefined,
      },
    });

    instance.interceptors.request.use(
      async (config) => {
        const currentToken = await this.getStoredToken();
        if (currentToken) {
          config.headers.Authorization = `Bearer ${currentToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          await this.clearAuthData();
        }
        return Promise.reject(error);
      }
    );

    return instance;
  }

  static async clearAuthData() {
    await Promise.all([
      AsyncStorage.removeItem(STORAGE_KEYS.TOKEN),
      AsyncStorage.removeItem(STORAGE_KEYS.USER),
      AsyncStorage.removeItem(STORAGE_KEYS.IS_AUTHENTICATED),
    ]);
  }
}

export default Api;
