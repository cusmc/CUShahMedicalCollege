import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import PDFViewer from './PDFViewer';
import { useSalarySlip } from '../hooks/useSalarySlip';
import Header from '../components/Header';
import { Colors } from '../constants/Colors';
import { Metrics } from '../constants/Metrics';
import { STORAGE_KEYS } from '../constants/StorageKeys';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PaySlip = ({ navigation }) => {
  const [selectedMonth, setSelectedMonth] = useState('');
  const [token, setToken] = useState('');
  const { getSalarySlip, pdfData, loading, visible, setVisible } =
    useSalarySlip();

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const fetchToken = async () => {
    try {
      const storedToken = await AsyncStorage.getItem(STORAGE_KEYS.TOKEN);
      console.log('📥 Fetched Token:', storedToken);
      if (storedToken) setToken(storedToken);
    } catch (e) {
      // console.log('❌ Error fetching token:', e);
    }
  };

  useEffect(() => {
    const currentMonth = new Date().toLocaleString('default', {
      month: 'long',
    });
    setSelectedMonth(currentMonth);
    fetchToken();
  }, []);

  const handleSubmit = async () => {
    // console.log('📤 Selected Month:', selectedMonth);
    // console.log('🔐 Token:', token);

    if (!selectedMonth) {
      Alert.alert('Error', 'Select a month first.');
      return;
    }

    if (!token) {
      Alert.alert('Error', 'Token not found. Please login again.');
      return;
    }

    const monthIndex = months.indexOf(selectedMonth);
    if (monthIndex === -1) {
      Alert.alert('Invalid Month', 'The selected month is not valid.');
      return;
    }

    const currentYear = new Date().getFullYear();
    const formattedMonth = (monthIndex + 1).toString().padStart(2, '0');
    const yearMonth = `${currentYear}${formattedMonth}`;
    console.log('💸 Requesting payslip for:', yearMonth);

    try {
      await getSalarySlip(token, yearMonth);
    } catch (error) {
      Alert.alert('Notice', error.message);
      setVisible(false);
    }
  };

  const handleMenuPress = () => {
    try {
      if (navigation?.openDrawer) {
        navigation.openDrawer();
      } else if (navigation?.getParent()?.openDrawer) {
        navigation.getParent().openDrawer();
      } else {
        console.log('Drawer navigation not available');
      }
    } catch (error) {
      console.log('Navigation error:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Header
        title="💸 PaySlip"
        showMenu={true}
        onMenuPress={handleMenuPress}
        showList={true}
      />
      <View style={styles.mainContent}>
        <Text style={styles.heading}>Select Month</Text>

        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={selectedMonth}
            onValueChange={itemValue => {
              // console.log('📅 Month Selected:', itemValue);
              setSelectedMonth(itemValue);
            }}
          >
            <Picker.Item style={styles.picker} label="-- Select Month --" value="" />
            {months.map((month, index) => (
              <Picker.Item style={styles.pickeritems} key={index} label={month} value={month} />
            ))}
          </Picker>
        </View>

        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>View Payslip</Text>
        </TouchableOpacity>

        {loading && (
          <ActivityIndicator
            size="large"
            color="blue"
            style={{ marginTop: 20 }}
          />
        )}

        {visible && pdfData && (
          <PDFViewer base64Data={pdfData} onClose={() => setVisible(false)} />
        )}
      </View>
    </ScrollView>
  );
};

export default PaySlip;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mainContent: {
    flexGrow: 1,
    padding: Metrics?.lg || 20,
  },
  heading: {
    fontSize: 20,
    marginBottom: 15,
    fontWeight: 'bold',
  },
  pickerWrapper: {
    borderWidth: 3,
    borderColor: 'red',
    borderRadius: 15,
    marginBottom: 20,
    // color: '#333',
    backgroundColor: '#2e86de',
  },
  button: {
    backgroundColor: Colors?.primary || '#2e86de',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  picker:{
    color:'#fff',
    backgroundColor:'#2e86de'
  },
  pickeritems:{
    color:'#fff',
    backgroundColor:'#2e86de'
  }
});
