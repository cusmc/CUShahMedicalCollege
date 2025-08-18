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
import { useAuth } from '../context/AuthContext';

const PaySlip = ({ navigation }) => {
  const [selectedMonth, setSelectedMonth] = useState('');
  const { token, isAuthenticated, logout } = useAuth();
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

  useEffect(() => {
    const currentMonth = new Date().toLocaleString('default', {
      month: 'long',
    });
    setSelectedMonth(currentMonth);

    // Check if user is authenticated, if not redirect to login
    if (!isAuthenticated) {
      // Alert.alert(
      //   'Authentication Required',
      //   'Please login to access payslips.',
      //   [
      //     {
      //       text: 'OK',
      //       onPress: () => navigation.navigate('Login'),
      //     },
      //   ],
      // );
    }
  }, [isAuthenticated]);

  const handleSubmit = async () => {
    if (!selectedMonth) {
      Alert.alert('Error', 'Select a month first.');
      return;
    }

    if (!isAuthenticated || !token) {
      Alert.alert(
        'Authentication Error',
        'Token not found. Please login again.',
        [
          {
            text: 'Login',
            onPress: () => {
              logout(); // Clear any invalid auth state
              navigation.navigate('Login');
            },
          },
          {
            text: 'Cancel',
            style: 'cancel',
          },
        ],
      );
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
      // Handle specific error cases
      if (
        error.message.includes('Session expired') ||
        error.message.includes('401')
      ) {
        // Alert.alert(
        //   'Session Expired',
        //   'Your session has expired. Please login again.',
        //   [
        //     {
        //       text: 'Login',
        //       onPress: () => {
        //         logout();
        //         navigation.navigate('Login');
        //       },
        //     },
        //   ],
        // );
      } else {
        // Alert.alert('Notice', error.message);
      }
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
            style={styles.picker}
            itemStyle={styles.pickerItem}
            onValueChange={itemValue => {
              console.log('📅 Month Selected:', itemValue);
              setSelectedMonth(itemValue);
            }}
            mode="dropdown" // Explicitly set mode to dropdown
          >
            <Picker.Item label="-- Select Month --" value="" />
            {months.map((month, index) => (
              <Picker.Item key={index} label={month} value={month} />
            ))}
          </Picker>
        </View>
        {selectedMonth && selectedMonth !== '' && (
          <View style={styles.selectedMonthContainer}>
            <Text style={styles.selectedMonthText}>
              Selected: {selectedMonth} {new Date().getFullYear()}
            </Text>
          </View>
        )}
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
    fontSize: Metrics.fontSize.xxxl,
    marginBottom: Metrics.md,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  pickerWrapper: {
    borderWidth: 2,
    borderColor: '#2e86de',
    borderRadius: 12,
    marginBottom: 15,
    backgroundColor: '#2e86de',
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  picker: {
    // Removed color and backgroundColor to allow native styling
    height: 50,
    color: '#fff',
  },
  pickerItem: {
    // Removed color and backgroundColor to allow native styling
    fontSize: 16,
  },
  selectedMonthContainer: {
    backgroundColor: '#e8f4fd',
    padding: 12,
    color: '#2e86de',
    borderRadius: 8,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#2e86de',
  },
  selectedMonthText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2e86de',
    textAlign: 'center',
  },
  button: {
    backgroundColor: Colors?.primary || '#2e86de',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
