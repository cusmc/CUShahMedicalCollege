// hooks/useSalarySlip.js

import { useState } from 'react';
import { Alert } from 'react-native';

export const useSalarySlip = () => {
  const [loading, setLoading] = useState(false);
  const [pdfData, setPdfData] = useState(null);
  const [visible, setVisible] = useState(false);

  const getSalarySlip = async (accessToken, yearMonth) => {
    setLoading(true);
    setPdfData(null);

    const apiUrl = `https://smc.cusmc.org/api/AttandAPI/getPaySlip?Yearmn=202506`;

    console.log('📡 API URL:', apiUrl);
    console.log('🔐 AccessToken:', accessToken);

    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      });

      if (!response.ok) {
        throw new Error(`Status: ${response.status}`);
      }

      const arrayBuffer = await response.arrayBuffer();
      const base64 = Buffer.from(arrayBuffer).toString('base64');

      setPdfData(base64);
      setVisible(true);
    } catch (err) {
      console.error('❌ SalarySlip Error:', err);
      Alert.alert('Payslip Not Found', 'Could not find payslip for selected month.');
    } finally {
      setLoading(false);
    }
  };

  return {
    getSalarySlip,
    pdfData,
    loading,
    visible,
    setVisible,
  };
};
