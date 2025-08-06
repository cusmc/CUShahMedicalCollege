import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
  SafeAreaView,
  Alert,
} from 'react-native';
import Pdf from 'react-native-pdf';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import Ionicons from 'react-native-vector-icons/Ionicons';

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

  const filePath = `${RNFS.DocumentDirectoryPath}/salary-slip.pdf`;

  const savePDF = async () => {
    try {
      await RNFS.writeFile(filePath, base64Data, 'base64');
      Alert.alert('Download Complete', 'PDF saved successfully!');
    } catch (err) {
      Alert.alert('Error', 'Failed to save PDF');
      console.log('Save Error:', err);
    }
  };

  const sharePDF = async () => {
    try {
      await RNFS.writeFile(filePath, base64Data, 'base64');
      await Share.open({
        url: `file://${filePath}`,
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
            <Ionicons name="download-outline" size={22} color="#333" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              showInfo('Share PDF');
              sharePDF();
            }}
            style={styles.iconButton}
            activeOpacity={0.6}
          >
            <Ionicons name="share-social-outline" size={22} color="#333" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              showInfo('Close Viewer');
              onClose();
            }}
            style={styles.iconButton}
            activeOpacity={0.6}
          >
            <Ionicons name="close" size={22} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      <Pdf
        source={source}
        style={styles.pdf}
        trustAllCerts={false}
        onError={error => {
          console.log('PDF Error:', error);
        }}
      />
    </SafeAreaView>
  );
};

export default PDFViewer;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    padding: 16,
    backgroundColor: '#f8f9fa',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 16,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: '#f2f2f2',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
});
