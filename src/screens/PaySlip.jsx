import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Header from '../components/Header';
import { Colors } from '../constants/Colors';
import { Metrics } from '../constants/Metrics';
import Pdf from 'react-native-pdf';
import { useSalarySlip } from '../../src/services/hook/useSalarySlip';

const PaySlip = ({ navigation }) => {
  const [selectedMonth, setSelectedMonth] = useState('August 2025');

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

  const handleViewClick = () => {
    console.log('Selected Month:', selectedMonth);
    // You can add API call or data logic here
  };

  const [month, setMonth] = useState('2025-08');
  const accessToken = 'your_access_token_here';

  const { getSalarySlip, pdfData, loading, visible } = useSalarySlip();
  return (
    <View style={styles.container}>
      <Header
        title="💰 Pay Slip"
        showMenu={true}
        onMenuPress={handleMenuPress}
        showList={true}
      />

      <ScrollView style={styles.content}>
        <View style={styles.card}>
          <View style={styles.dropdownContainer}>
            <Text style={styles.dropdownLabel}>Select Month:</Text>
            <View style={styles.dropdownRow}>
              <View style={styles.pickerWrapper}>
                <Picker
                  selectedValue={selectedMonth}
                  onValueChange={itemValue => setSelectedMonth(itemValue)}
                  style={styles.picker}
                >
                  <Picker.Item label="August 2025" value="August 2025" />
                  <Picker.Item label="July 2025" value="July 2025" />
                  <Picker.Item label="June 2025" value="June 2025" />
                  <Picker.Item label="May 2025" value="May 2025" />
                  <Picker.Item label="April 2025" value="April 2025" />
                </Picker>
              </View>
              <View style={{ flex: 1, padding: 20 }}>
                <Button
                  title="Download Pay Slip"
                  onPress={() => getSalarySlip(accessToken, month)}
                />

                {loading && (
                  <ActivityIndicator
                    size="large"
                    color="#0000ff"
                    style={{ marginTop: 20 }}
                  />
                )}

                {visible && pdfData && (
                  <Pdf
                    source={{ uri: `data:application/pdf;base64,${pdfData}` }}
                    style={{ flex: 1, marginTop: 20 }}
                  />
                )}
              </View>
            </View>
          </View>

          <Text style={styles.cardTitle}>Pay Slip - {selectedMonth}</Text>

          {/* Employee Information */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Employee Information</Text>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Name:</Text>
              <Text style={styles.value}>Dr. John Doe</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Employee ID:</Text>
              <Text style={styles.value}>EMP001</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Department:</Text>
              <Text style={styles.value}>Medical College</Text>
            </View>
          </View>

          {/* Salary Details */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Salary Details</Text>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Basic Salary:</Text>
              <Text style={styles.value}>₹45,000</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>HRA:</Text>
              <Text style={styles.value}>₹18,000</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>DA:</Text>
              <Text style={styles.value}>₹9,000</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Medical Allowance:</Text>
              <Text style={styles.value}>₹5,000</Text>
            </View>
          </View>

          {/* Deductions */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Deductions</Text>
            <View style={styles.infoRow}>
              <Text style={styles.label}>PF:</Text>
              <Text style={styles.value}>₹5,400</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Tax:</Text>
              <Text style={styles.value}>₹8,500</Text>
            </View>
          </View>

          {/* Totals */}
          <View style={styles.totalSection}>
            <View style={styles.infoRow}>
              <Text style={styles.totalLabel}>Gross Salary:</Text>
              <Text style={styles.totalValue}>₹77,000</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.totalLabel}>Net Salary:</Text>
              <Text style={styles.netValue}>₹63,100</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    flex: 1,
    padding: Metrics.lg,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: Metrics.borderRadius.lg,
    padding: Metrics.lg,
    ...Metrics.shadow.medium,
  },
  cardTitle: {
    fontSize: Metrics.fontSize.xl,
    fontWeight: 'bold',
    color: Colors.primary,
    textAlign: 'center',
    marginBottom: Metrics.lg,
  },
  dropdownContainer: {
    marginBottom: Metrics.lg,
  },
  dropdownLabel: {
    fontSize: Metrics.fontSize.md,
    marginBottom: Metrics.sm,
    fontWeight: 'bold',
  },
  dropdownRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pickerWrapper: {
    flex: 1,
    marginRight: Metrics.sm,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Metrics.borderRadius.md,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  viewButton: {
    backgroundColor: Colors.primary,
    paddingVertical: Metrics.sm,
    paddingHorizontal: Metrics.md,
    borderRadius: Metrics.borderRadius.md,
  },
  viewButtonText: {
    color: Colors.white,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: Metrics.lg,
    paddingBottom: Metrics.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  sectionTitle: {
    fontSize: Metrics.fontSize.lg,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: Metrics.md,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Metrics.xs,
  },
  label: {
    fontSize: Metrics.fontSize.md,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  value: {
    fontSize: Metrics.fontSize.md,
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  totalSection: {
    marginTop: Metrics.lg,
    paddingTop: Metrics.md,
    borderTopWidth: 2,
    borderTopColor: Colors.primary,
  },
  totalLabel: {
    fontSize: Metrics.fontSize.lg,
    color: Colors.textPrimary,
    fontWeight: 'bold',
  },
  totalValue: {
    fontSize: Metrics.fontSize.lg,
    color: Colors.primary,
    fontWeight: 'bold',
  },
  netValue: {
    fontSize: Metrics.fontSize.xl,
    color: Colors.success,
    fontWeight: 'bold',
  },
});

export default PaySlip;
