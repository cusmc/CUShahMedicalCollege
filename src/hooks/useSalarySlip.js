// hooks/useSalarySlip.js

import { useState } from 'react';
import { Alert } from 'react-native';

export const useSalarySlip = () => {
  const [loading, setLoading] = useState(false);
  const [pdfData, setPdfData] = useState(null);
  const [visible, setVisible] = useState(false);
  const [availableMonths, setAvailableMonths] = useState([]);

  const formatYearMonth = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${year}${month}`;
  };

  const getAvailableMonths = async (accessToken) => {
    try {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth();
      const months = [];

      // Get all months up to current month for current year
      for (let month = 0; month <= currentMonth; month++) {
        const date = new Date(currentYear, month, 1);
        months.push({
          label: date.toLocaleString('default', { month: 'long', year: 'numeric' }),
          value: formatYearMonth(date)
        });
      }

      // Add remaining months from previous year to make it 12 months total
      if (months.length < 12) {
        const remainingMonths = 12 - months.length;
        for (let i = 1; i <= remainingMonths; i++) {
          const date = new Date(currentYear - 1, 12 - i, 1);
          months.unshift({
            label: date.toLocaleString('default', { month: 'long', year: 'numeric' }),
            value: formatYearMonth(date)
          });
        }
      }

      setAvailableMonths(months);
      return months;
    } catch (error) {
      console.error('❌ Error fetching available months:', error);
      Alert.alert('Error', 'Could not fetch available months');
      return [];
    }
  };

  const getSalarySlip = async (accessToken, yearMonth) => {
    setLoading(true);
    setPdfData(null);

    const apiUrl = `https://smc.cusmc.org/api/AttandAPI/getPaySlip?Yearmn=${yearMonth}`;

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
      setPdfData(null);
      if (err.message.includes('401')) {
        throw new Error('Session expired. Please login again.');
      } else if (err.message.includes('404')) {
        throw new Error('Payslip not available for this month.');
      } else {
        throw new Error('Unable to fetch payslip. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    getSalarySlip,
    getAvailableMonths,
    pdfData,
    loading,
    visible,
    setVisible,
    availableMonths,
  };
};
