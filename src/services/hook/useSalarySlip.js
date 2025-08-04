import { useState } from 'react';
import { Alert } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob'; // Use RNFetchBlob for base64

export const useSalarySlip = () => {
  const [loading, setLoading] = useState(false);
  const [pdfData, setPdfData] = useState(null);
  const [visible, setVisible] = useState(false);

  const getSalarySlip = async (accessToken, yearMonth) => {
    try {
      setLoading(true);
      const url = `https://your-domain.com/api/GetSalarySlip?Yearmn=${yearMonth}`;

      const response = await RNFetchBlob.config({ fileCache: false }).fetch(
        'GET',
        url,
        {
          Authorization: `Bearer ${accessToken}`,
        },
      );

      const base64Data = await response.base64(); // get base64 content
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
