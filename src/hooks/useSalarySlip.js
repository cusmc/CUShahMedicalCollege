// hooks/useSalarySlip.js

import { useState } from 'react';
import { ToastAndroid } from 'react-native';

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

      for (let month = 0; month <= currentMonth; month++) {
        const date = new Date(currentYear, month, 1);
        months.push({
          label: date.toLocaleString('default', { month: 'long', year: 'numeric' }),
          value: formatYearMonth(date),
        });
      }

      if (months.length < 12) {
        const remainingMonths = 12 - months.length;
        for (let i = 1; i <= remainingMonths; i++) {
          const date = new Date(currentYear - 1, 12 - i, 1);
          months.unshift({
            label: date.toLocaleString('default', { month: 'long', year: 'numeric' }),
            value: formatYearMonth(date),
          });
        }
      }

      setAvailableMonths(months);
      return months;
    } catch (error) {
      // console.error('❌ Error fetching available months:', error);
      // ToastAndroid.show('Error: Could not fetch Selected months', ToastAndroid.SHORT);
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
        },
      });

      if (!response.ok) {
        throw new Error(`Status: ${response.status}`);
      }

      const arrayBuffer = await response.arrayBuffer();
      const base64 = Buffer.from(arrayBuffer).toString('base64');

      setPdfData(base64);
      setVisible(true);
    } catch (err) {
      // console.error('❌ SalarySlip Error:', err);
      // ToastAndroid.show('Error: Payslip is not Generated!', ToastAndroid.SHORT);
      setPdfData(null);

      let message = 'Error: Payslip is not Generated!';

      if (err.message.includes('401')) message = 'Session expired. Please login again.';
      else if (err.message.includes('403')) message = 'Access denied. Please check your permissions.';
      // else if (err.message.includes('404')) message = 'Payslip not available for this month.';
      else if (err.message.includes('500')) message = 'Server error. Please try again later.';
      else if (err.message.includes('Network')) message = 'Network error. Please check your connection.';

      ToastAndroid.show(message, ToastAndroid.SHORT);
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
