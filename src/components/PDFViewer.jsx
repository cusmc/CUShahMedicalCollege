import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
  SafeAreaView,
  Alert,
  Platform,
  Linking,
} from 'react-native';
import Pdf from 'react-native-pdf';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import Icon from 'react-native-vector-icons/Feather';

const PDFViewer = ({ base64Data, onClose }) => {
  if (!base64Data) {
    return (
      <View style={styles.centered}>
        <Text style={styles.emptyText}>No PDF data available.</Text>
      </View>
    );
  }

  const source = {
    uri: `data:application/pdf;base64,${base64Data}`,
    cache: true,
  };

  // Save path in app private directory (no permission needed)
  const getFilePath = () => {
    return `${RNFS.DocumentDirectoryPath}/salary-slip.pdf`;
  };

  const savePDF = async () => {
    try {
      const filePath = getFilePath();
      await RNFS.writeFile(filePath, base64Data, 'base64');
      Alert.alert(
        'Download Complete',
        `PDF saved successfully to:\n${filePath}`,
      );
      openPDF(filePath);
    } catch (err) {
      console.log('Save Error:', err);
      Alert.alert('Error', 'Failed to save PDF');
    }
  };

  const openPDF = path => {
    const fileUri = Platform.OS === 'android' ? `file://${path}` : path;
    Linking.canOpenURL(fileUri)
      .then(supported => {
        if (supported) {
          Linking.openURL(fileUri);
        } else {
          Alert.alert('Error', 'Cannot open saved PDF file.');
        }
      })
      .catch(err => {
        console.log('Open file error:', err);
        Alert.alert('Error', 'Failed to open PDF file.');
      });
  };

  const sharePDF = async () => {
    try {
      const filePath = getFilePath();
      // Save the file before sharing
      await RNFS.writeFile(filePath, base64Data, 'base64');

      await Share.open({
        url: Platform.OS === 'android' ? `file://${filePath}` : filePath,
        type: 'application/pdf',
        title: 'Share Salary Slip',
        failOnCancel: false,
      });
    } catch (error) {
      console.log('Share Error:', error);
    }
  };

  const showInfo = message => {
    Alert.alert('Info', message);
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.header}>
        <Text style={styles.title}>Salary Slip</Text>
        <View style={styles.actions}>
          <TouchableOpacity
            onPress={() => {
              showInfo('Download PDF');
              savePDF();
            }}
            style={styles.iconButton}
            activeOpacity={0.6}
          >
            <Icon name="save" size={24} color="#000" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              showInfo('Share PDF');
              sharePDF();
            }}
            style={styles.iconButton}
            activeOpacity={0.6}
          >
            <Icon name="share-2" size={24} color="#333" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              showInfo('Close Viewer');
              onClose();
            }}
            style={styles.iconButton}
            activeOpacity={0.6}
          >
            <Icon name="x" size={24} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      <Pdf
        source={source}
        style={styles.pdf}
        trustAllCerts={false}
        onError={error => {
          console.log('PDF Error:', error);
          Alert.alert('Error', 'Failed to load PDF.');
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderBottomWidth: 1,
    borderBottomColor: '#dee2e6',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: 8,
    marginLeft: 8,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default PDFViewer;
