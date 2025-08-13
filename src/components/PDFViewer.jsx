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
  PermissionsAndroid,
} from 'react-native';
import Pdf from 'react-native-pdf';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import Icon from 'react-native-vector-icons/Feather';
import RNBlobUtil from 'react-native-blob-util';

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

  const savePDF = async () => {
    try {
      const fileName = `salary-slip-${Date.now()}.pdf`;
      const filePath = `${RNFS.DocumentDirectoryPath}/${fileName}`; // Default for iOS

      if (Platform.OS === 'android') {
        const androidVersion = Platform.Version;
        if (androidVersion >= 29) {
          // Android 10 (API 29) and above: Use DownloadManager via RNBlobUtil
          const path = RNFS.DownloadDirectoryPath + '/' + fileName;
          const base64Pdf = base64Data;

          const configOptions = {
            fileCache: true,
            path: path,
            addAndroidDownloads: {
              useDownloadManager: true,
              notification: true,
              path: path,
              description: 'Salary Slip PDF',
              mime: 'application/pdf',
              mediaScannable: true,
            },
          };

          RNBlobUtil.fs.writeFile(path, base64Pdf, 'base64')
            .then(() => {
              RNBlobUtil.android.actionViewIntent(path, 'application/pdf')
                .then(() => {
                  Alert.alert(
                    'Success',
                    'PDF saved and opened successfully in Downloads folder!',
                    [{ text: 'OK' }]
                  );
                })
                .catch(e => {
                  console.error('Failed to open PDF:', e);
                  Alert.alert('Error', 'PDF saved to Downloads, but failed to open.');
                });
            })
            .catch(e => {
              console.error('Failed to save PDF:', e);
              Alert.alert('Error', `Failed to save PDF: ${e.message}`);
            });

        } else {
          // Android 9 and below: Request WRITE_EXTERNAL_STORAGE permission
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
              title: 'Storage Permission Required',
              message: 'This app needs access to storage to save PDF files',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            const androidFilePath = `${RNFS.DownloadDirectoryPath}/${fileName}`;
            await RNFS.writeFile(androidFilePath, base64Data, 'base64');
            Alert.alert(
              'Success',
              'PDF saved successfully to Downloads folder!',
              [
                {
                  text: 'OK',
                  onPress: () => openPDF(androidFilePath),
                },
              ]
            );
          } else {
            Alert.alert('Permission Denied', 'Storage permission is required to save PDF files.');
          }
        }
      } else {
        // iOS: Save to Documents directory
        await RNFS.writeFile(filePath, base64Data, 'base64');
        Alert.alert(
          'Success',
          'PDF saved successfully to Documents folder!',
          [
            {
              text: 'OK',
              onPress: () => openPDF(filePath),
            },
          ]
        );
      }
    } catch (err) {
      console.error('Save Error:', err);
      Alert.alert('Error', `Failed to save PDF: ${err.message}`);
    }
  };

  const openPDF = async (path) => {
    try {
      if (Platform.OS === 'android') {
        // Use RNBlobUtil to open PDF on Android
        await RNBlobUtil.android.actionViewIntent(path, 'application/pdf');
      } else {
        // Use Linking for iOS
        const fileUri = `file://${path}`;
        const supported = await Linking.canOpenURL(fileUri);
        if (supported) {
          await Linking.openURL(fileUri);
        } else {
          Alert.alert('Error', 'Cannot open PDF file. Please install a PDF viewer app.');
        }
      }
    } catch (err) {
      console.error('Open file error:', err);
      Alert.alert('Error', 'Failed to open PDF file.');
    }
  };

  const sharePDF = async () => {
    try {
      // Create a temporary file for sharing
      const tempFileName = `salary-slip-${Date.now()}.pdf`;
      const tempPath = `${RNFS.CachesDirectoryPath}/${tempFileName}`;
      
      // Write file to cache directory (no permissions needed)
      await RNFS.writeFile(tempPath, base64Data, 'base64');
      
      const shareOptions = {
        title: 'Share Salary Slip',
        message: 'Here is your salary slip',
        url: Platform.OS === 'android' ? `file://${tempPath}` : tempPath,
        type: 'application/pdf',
        filename: tempFileName,
        failOnCancel: false,
      };

      const result = await Share.open(shareOptions);
      console.log('Share result:', result);
      
      // Clean up temp file after sharing
      setTimeout(() => {
        RNFS.unlink(tempPath).catch(err => console.log('Cleanup error:', err));
      }, 5000);
      
    } catch (error) {
      if (error.message !== 'User did not share') {
        console.error('Share Error:', error);
        Alert.alert('Error', 'Failed to share PDF. Please try again.');
      }
    }
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.header}>
        <Text style={styles.title}>Salary Slip</Text>
        <View style={styles.actions}>
          <TouchableOpacity
            onPress={savePDF}
            style={[styles.iconButton, styles.saveButton]}
            activeOpacity={0.7}
          >
            <Icon name="download" size={20} color="#fff" />
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={sharePDF}
            style={[styles.iconButton, styles.shareButton]}
            activeOpacity={0.7}
          >
            <Icon name="share-2" size={20} color="#fff" />
            <Text style={styles.buttonText}>Share</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onClose}
            style={[styles.iconButton, styles.closeButton]}
            activeOpacity={0.7}
          >
            <Icon name="x" size={20} color="#fff" />
            <Text style={styles.buttonText}>Close</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginLeft: 8,
    borderRadius: 6,
    minWidth: 70,
    justifyContent: 'center',
  },
  saveButton: {
    backgroundColor: '#28a745',
  },
  shareButton: {
    backgroundColor: '#007bff',
  },
  closeButton: {
    backgroundColor: '#dc3545',
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  pdf: {
    flex: 1,
    padding:10,
    width: 360,
    height: 490,
    justifyContent:"space-evenly",
    alignItems:"center"
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
