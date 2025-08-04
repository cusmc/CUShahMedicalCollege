/* eslint-disable no-bitwise */
import axios from 'axios';
import { useState } from 'react';
import { Alert } from 'react-native';

// Simple base64 encoding function
const base64Encode = str => {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  let result = '';
  let i = 0;
  while (i < str.length) {
    const chr1 = str.charCodeAt(i++);
    const chr2 = str.charCodeAt(i++);
    const chr3 = str.charCodeAt(i++);

    const enc1 = chr1 >> 2;
    const enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
    let enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
    let enc4 = chr3 & 63;

    if (isNaN(chr2)) {
      enc3 = 64;
      enc4 = 64;
    } else if (isNaN(chr3)) {
      enc4 = 64;
    }

    result =
      result +
      chars.charAt(enc1) +
      chars.charAt(enc2) +
      chars.charAt(enc3) +
      chars.charAt(enc4);
  }
  return result;
};

export const useSalarySlip = () => {
  const [loading, setLoading] = useState(false);
  const [pdfData, setPdfData] = useState(null);
  const [visible, setVisible] = useState(false);

  const getSalarySlip = async (accessToken, yearMonth) => {
    try {
      setLoading(true);

      const url = `https://your-domain.com/api/GetSalarySlip?Yearmn=${yearMonth}`;

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        responseType: 'arraybuffer',
      });
      // Convert array buffer to base64
      const uint8Array = new Uint8Array(response.data);
      let binaryString = '';
      for (let i = 0; i < uint8Array.length; i++) {
        binaryString += String.fromCharCode(uint8Array[i]);
      }
      // Use our custom base64 encoding function
      const base64Data = base64Encode(binaryString);
      setPdfData(base64Data);
      setVisible(true);
    } catch (error) {
      console.error('Salary slip fetch error:', error);
      Alert.alert('Error', 'File not found. Contact Account Section.');
      setVisible(false);
    } finally {
      setLoading(false);
    }
  };

  return {
    getSalarySlip,
    pdfData,
    visible,
    loading,
  };
};
