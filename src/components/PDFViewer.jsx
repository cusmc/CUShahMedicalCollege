import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Linking,
} from 'react-native';
import { Colors } from '../constants/Colors';
import { Metrics } from '../constants/Metrics';

const PDFViewer = ({ pdfData, onDownload, payslipData }) => {
  const handleDownload = async () => {
    try {
      if (onDownload) {
        onDownload();
      } else {
        // Create a simple HTML-based PDF viewer URL
        const htmlContent = `
          <!DOCTYPE html>
          <html>
          <head>
            <title>Pay Slip - ${payslipData?.month || 'Current Month'}</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              .header { text-align: center; border-bottom: 2px solid #8B0000; padding-bottom: 10px; margin-bottom: 20px; }
              .section { margin-bottom: 20px; }
              .row { display: flex; justify-content: space-between; margin: 5px 0; }
              .total { font-weight: bold; border-top: 1px solid #ccc; padding-top: 10px; }
              .amount { color: #8B0000; }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>C.U.Shah Medical College</h1>
              <h2>Pay Slip - ${payslipData?.month || 'Current Month'}</h2>
            </div>
            
            <div class="section">
              <h3>Employee Information</h3>
              <div class="row">
                <span>Name:</span>
                <span>${payslipData?.employeeName || 'Dr. John Doe'}</span>
              </div>
              <div class="row">
                <span>Employee ID:</span>
                <span>${payslipData?.employeeId || 'EMP001'}</span>
              </div>
              <div class="row">
                <span>Department:</span>
                <span>${payslipData?.department || 'Medical College'}</span>
              </div>
            </div>
            
            <div class="section">
              <h3>Salary Details</h3>
              <div class="row">
                <span>Basic Salary:</span>
                <span class="amount">₹${
                  payslipData?.basicSalary || '45,000'
                }</span>
              </div>
              <div class="row">
                <span>HRA:</span>
                <span class="amount">₹${payslipData?.hra || '18,000'}</span>
              </div>
              <div class="row">
                <span>DA:</span>
                <span class="amount">₹${payslipData?.da || '9,000'}</span>
              </div>
              <div class="row">
                <span>Medical Allowance:</span>
                <span class="amount">₹${
                  payslipData?.medicalAllowance || '5,000'
                }</span>
              </div>
            </div>
            
            <div class="section">
              <h3>Deductions</h3>
              <div class="row">
                <span>PF:</span>
                <span class="amount">₹${payslipData?.pf || '5,400'}</span>
              </div>
              <div class="row">
                <span>Tax:</span>
                <span class="amount">₹${payslipData?.tax || '8,500'}</span>
              </div>
            </div>
            
            <div class="section total">
              <div class="row">
                <span>Gross Salary:</span>
                <span class="amount">₹${
                  payslipData?.grossSalary || '77,000'
                }</span>
              </div>
              <div class="row">
                <span>Net Salary:</span>
                <span class="amount">₹${
                  payslipData?.netSalary || '63,100'
                }</span>
              </div>
            </div>
          </body>
          </html>
        `;

        // Create a data URL for the HTML content
        const dataUrl = `data:text/html;charset=utf-8,${encodeURIComponent(
          htmlContent,
        )}`;

        // Try to open in browser
        const supported = await Linking.canOpenURL(dataUrl);
        if (supported) {
          await Linking.openURL(dataUrl);
        } else {
          // Fallback: show instructions
          Alert.alert(
            'PDF Download',
            'Your device cannot open PDF files directly. Please copy the following URL and open it in a web browser:\n\n' +
              dataUrl,
            [
              {
                text: 'Copy URL',
                onPress: () => {
                  // You could add clipboard functionality here
                  Alert.alert(
                    'URL Copied',
                    'Please paste this URL in your web browser to view the payslip.',
                  );
                },
              },
              { text: 'Cancel', style: 'cancel' },
            ],
          );
        }
      }
    } catch (error) {
      console.error('PDF download error:', error);
      Alert.alert('Error', 'Failed to generate PDF. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.pdfPlaceholder}>
        <Text style={styles.pdfIcon}>📄</Text>
        <Text style={styles.pdfTitle}>PDF Document</Text>
        <Text style={styles.pdfSubtitle}>Salary Slip</Text>
      </View>

      <TouchableOpacity style={styles.downloadButton} onPress={handleDownload}>
        <Text style={styles.downloadButtonText}>Download PDF</Text>
      </TouchableOpacity>

      <Text style={styles.infoText}>
        Tap to download and view the PDF document
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Metrics.lg,
    backgroundColor: '#f8f9fa',
  },
  pdfPlaceholder: {
    alignItems: 'center',
    marginBottom: Metrics.lg,
  },
  pdfIcon: {
    fontSize: 64,
    marginBottom: Metrics.sm,
  },
  pdfTitle: {
    fontSize: Metrics.fontSize.lg,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: Metrics.xs,
  },
  pdfSubtitle: {
    fontSize: Metrics.fontSize.md,
    color: Colors.textSecondary,
  },
  downloadButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Metrics.lg,
    paddingVertical: Metrics.md,
    borderRadius: Metrics.borderRadius.md,
    marginBottom: Metrics.md,
  },
  downloadButtonText: {
    color: Colors.white,
    fontSize: Metrics.fontSize.md,
    fontWeight: 'bold',
  },
  infoText: {
    fontSize: Metrics.fontSize.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
});

export default PDFViewer;
