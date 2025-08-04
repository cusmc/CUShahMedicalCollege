import AsyncStorage from '@react-native-async-storage/async-storage';

// Storage keys
const STORAGE_KEYS = {
  TOKEN: '@auth_token',
  USER: '@auth_user',
  IS_AUTHENTICATED: '@auth_is_authenticated',
};

export const authUtils = {
  // Check if user is authenticated
  async isAuthenticated() {
    try {
      const [token, user, isAuth] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.TOKEN),
        AsyncStorage.getItem(STORAGE_KEYS.USER),
        AsyncStorage.getItem(STORAGE_KEYS.IS_AUTHENTICATED),
      ]);
      
      return !!(token && user && isAuth === 'true');
    } catch (error) {
      console.error('❌ Error checking authentication:', error);
      return false;
    }
  },

  // Get stored user data
  async getUserData() {
    try {
      const userData = await AsyncStorage.getItem(STORAGE_KEYS.USER);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('❌ Error getting user data:', error);
      return null;
    }
  },

  // Get stored token
  async getToken() {
    try {
      return await AsyncStorage.getItem(STORAGE_KEYS.TOKEN);
    } catch (error) {
      console.error('❌ Error getting token:', error);
      return null;
    }
  },

  // Validate token (basic validation - you might want to add server-side validation)
  async validateToken() {
    try {
      const token = await this.getToken();
      if (!token) {
        return false;
      }

      // Basic token validation - check if it exists and has a reasonable length
      // In a real app, you might want to decode the JWT and check expiration
      return token.length > 10; // Basic check
    } catch (error) {
      console.error('❌ Error validating token:', error);
      return false;
    }
  },

  // Clear all auth data
  async clearAuthData() {
    try {
      await Promise.all([
        AsyncStorage.removeItem(STORAGE_KEYS.TOKEN),
        AsyncStorage.removeItem(STORAGE_KEYS.USER),
        AsyncStorage.removeItem(STORAGE_KEYS.IS_AUTHENTICATED),
      ]);
      console.log('🗑️ Auth data cleared');
      return true;
    } catch (error) {
      console.error('❌ Error clearing auth data:', error);
      return false;
    }
  },

  // Save auth data
  async saveAuthData(token, userData) {
    try {
      await Promise.all([
        AsyncStorage.setItem(STORAGE_KEYS.TOKEN, token),
        AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData)),
        AsyncStorage.setItem(STORAGE_KEYS.IS_AUTHENTICATED, 'true'),
      ]);
      console.log('💾 Auth data saved');
      return true;
    } catch (error) {
      console.error('❌ Error saving auth data:', error);
      return false;
    }
  },
};

export default authUtils; 