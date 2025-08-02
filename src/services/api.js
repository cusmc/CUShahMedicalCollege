// api.js

import axios from 'axios';

const BASE_URL = 'https://smc.cusmc.org';
const TOKEN_URL = `${BASE_URL}/token`;

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
        'Authorization': 'Basic ZGVtbzpwYXNzd29yZA==', // Replace with actual base64-encoded client credentials if required
        'Cookie': 'CompName=C.U.Shah Medical College & Hospital; Inst=CUSMC; Inst_id=1; __RequestVerificationToken=your_token_here',
      };

      console.log('🔵 Sending login request...');
      const response = await axios.post(TOKEN_URL, formBody.toString(), { headers });

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
}

export default Api;
