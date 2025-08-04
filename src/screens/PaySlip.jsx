/* eslint-disable react-native/no-inline-styles */
 
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Header from '../components/Header';
import { Colors } from '../constants/Colors';
import { Metrics } from '../constants/Metrics';
import { useSalarySlip } from '../../src/services/hook/useSalarySlip';
import PDFViewer from '../components/PDFViewer';

const PaySlip = ({ navigation }) => {
  // Generate months from joining date to current month
  const generateMonths = () => {
    const months = [];
    const joiningDate = new Date(2023, 0, 1); // January 2023 - adjust as needed
    const currentDate = new Date();

    let currentMonth = new Date(joiningDate);

    while (currentMonth <= currentDate) {
      const monthName = currentMonth.toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
      });
      const monthValue = currentMonth.toISOString().slice(0, 7); // YYYY-MM format
      months.push({ label: monthName, value: monthValue });

      // Move to next month
      currentMonth.setMonth(currentMonth.getMonth() + 1);
    }

    return months;
  };

  const monthOptions = generateMonths();
  const [selectedMonth, setSelectedMonth] = useState(
    monthOptions[monthOptions.length - 1]?.label || '',
  );
  const [selectedMonthValue, setSelectedMonthValue] = useState(
    monthOptions[monthOptions.length - 1]?.value || '',
  );

  const handleMenuPress = () => {
    try {
      if (navigation?.openDrawer) {
        navigation.openDrawer();
      } else if (navigation?.getParent()?.openDrawer) {
        navigation.getParent().openDrawer();
      }
    } catch (error) {
      console.log('Navigation error:', error);
    }
  };

  const handleMonthChange = itemValue => {
    const selectedOption = monthOptions.find(
      option => option.label === itemValue,
    );
    setSelectedMonth(itemValue);
    setSelectedMonthValue(selectedOption.value);
  };

  // Simplified salary data
  const getSalaryData = () => {
    const baseSalary = 45000;
    const monthIndex = monthOptions.findIndex(
      option => option.label === selectedMonth,
    );

    // Simple salary progression
    const salaryIncrease = monthIndex * 1000; // ₹1000 increase per month
    const adjustedSalary = baseSalary + salaryIncrease;

    return {
      basicSalary: adjustedSalary,
      hra: Math.round(adjustedSalary * 0.4),
      da: Math.round(adjustedSalary * 0.2),
      medicalAllowance: 5000,
      pf: Math.round(adjustedSalary * 0.12),
      tax: Math.round(adjustedSalary * 0.15),
    };
  };

  const salaryData = getSalaryData();
  const grossSalary =
    salaryData.basicSalary +
    salaryData.hra +
    salaryData.da +
    salaryData.medicalAllowance;
  const totalDeductions = salaryData.pf + salaryData.tax;
  const netSalary = grossSalary - totalDeductions;

  // Simple employee data
  const employeeData = {
    name: 'Dr. John Doe',
    employeeId: 'EMP001',
    department: 'Medical College',
  };

  const accessToken = 'your_access_token_here';

  // Generate payslip date
  const getPayslipDate = () => {
    const selectedDate = new Date(selectedMonthValue + '-01');
    const lastDay = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth() + 1,
      0,
    );
    return {
      month: selectedDate.toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
      }),
      issueDate: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }),
      period: `${selectedDate.toLocaleDateString('en-US', {
        day: '2-digit',
        month: '2-digit',
      })} - ${lastDay.toLocaleDateString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })}`,
    };
  };

  const payslipDate = getPayslipDate();
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
                  onValueChange={handleMonthChange}
                  style={styles.picker}
                >
                  {monthOptions.map(option => (
                    <Picker.Item
                      key={option.value}
                      label={option.label}
                      value={option.label}
                    />
                  ))}
                </Picker>
              </View>
              <View style={{ flex: 1, padding: 20 }}>
                <TouchableOpacity
                  style={styles.viewButton}
                  onPress={() => getSalarySlip(accessToken, selectedMonthValue)}
                >
                  <Text style={styles.viewButtonText}>Download Pay Slip</Text>
                </TouchableOpacity>

                {loading && (
                  <ActivityIndicator
                    size="large"
                    color="#0000ff"
                    style={{ marginTop: 20 }}
                  />
                )}

                {visible && pdfData && (
                  <PDFViewer
                    pdfData={pdfData}
                    payslipData={{
                      month: payslipDate.month,
                      employeeName: employeeData.name,
                      employeeId: employeeData.employeeId,
                      department: employeeData.department,
                      basicSalary: salaryData.basicSalary.toLocaleString(),
                      hra: salaryData.hra.toLocaleString(),
                      da: salaryData.da.toLocaleString(),
                      medicalAllowance:
                        salaryData.medicalAllowance.toLocaleString(),
                      pf: salaryData.pf.toLocaleString(),
                      tax: salaryData.tax.toLocaleString(),
                      grossSalary: grossSalary.toLocaleString(),
                      netSalary: netSalary.toLocaleString(),
                    }}
                  />
                )}
              </View>
            </View>
          </View>

          <Text style={styles.cardTitle}>Pay Slip - {payslipDate.month}</Text>

          {/* Payslip Details */}
          <View style={styles.payslipDetails}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Issue Date:</Text>
              <Text style={styles.detailValue}>{payslipDate.issueDate}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Pay Period:</Text>
              <Text style={styles.detailValue}>{payslipDate.period}</Text>
            </View>
          </View>

          {/* Employee Information */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Employee Information</Text>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Name:</Text>
              <Text style={styles.value}>{employeeData.name}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Employee ID:</Text>
              <Text style={styles.value}>{employeeData.employeeId}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Department:</Text>
              <Text style={styles.value}>{employeeData.department}</Text>
            </View>
          </View>

          {/* Salary Details */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Salary Details</Text>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Basic Salary:</Text>
              <Text style={styles.value}>
                ₹{salaryData.basicSalary.toLocaleString()}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>HRA:</Text>
              <Text style={styles.value}>
                ₹{salaryData.hra.toLocaleString()}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>DA:</Text>
              <Text style={styles.value}>
                ₹{salaryData.da.toLocaleString()}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Medical Allowance:</Text>
              <Text style={styles.value}>
                ₹{salaryData.medicalAllowance.toLocaleString()}
              </Text>
            </View>
          </View>

          {/* Deductions */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Deductions</Text>
            <View style={styles.infoRow}>
              <Text style={styles.label}>PF:</Text>
              <Text style={styles.value}>
                ₹{salaryData.pf.toLocaleString()}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Tax:</Text>
              <Text style={styles.value}>
                ₹{salaryData.tax.toLocaleString()}
              </Text>
            </View>
          </View>

          {/* Totals */}
          <View style={styles.totalSection}>
            <View style={styles.infoRow}>
              <Text style={styles.totalLabel}>Gross Salary:</Text>
              <Text style={styles.totalValue}>
                ₹{grossSalary.toLocaleString()}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.totalLabel}>Net Salary:</Text>
              <Text style={styles.netValue}>₹{netSalary.toLocaleString()}</Text>
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
  payslipDetails: {
    backgroundColor: Colors.background,
    padding: Metrics.md,
    borderRadius: Metrics.borderRadius.md,
    marginBottom: Metrics.lg,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Metrics.xs,
  },
  detailLabel: {
    fontSize: Metrics.fontSize.sm,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  detailValue: {
    fontSize: Metrics.fontSize.sm,
    color: Colors.textPrimary,
    fontWeight: '600',
  },
});

export default PaySlip;
