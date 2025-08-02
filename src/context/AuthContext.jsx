import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { Alert } from 'react-native';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

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

      setToken(accessToken);
      setUser(userData);
      setIsAuthenticated(true);
      setIsLoading(false);

      console.log('✅ Login successful:', response.data);
      return { success: true, token: accessToken, user: userData };
    } catch (error) {
      setIsLoading(false);
      console.error('🔴 Login failed:', error.response?.data || error.message);

      const errorDescription =
        error.response?.data?.error_description ||
        'Something went wrong. Please try again.';

      return { success: false, error: errorDescription };
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setToken(null);
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
