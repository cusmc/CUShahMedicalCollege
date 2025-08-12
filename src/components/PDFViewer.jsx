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

  // Request storage permission for Android
  const requestStoragePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        // Check Android version and request appropriate permissions
        const androidVersion = Platform.Version;
        
        if (androidVersion >= 33) {
          // Android 13+ (API 33+) - Request media permissions
          const granted = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO,
          ]);
          return Object.values(granted).every(
            permission => permission === PermissionsAndroid.RESULTS.GRANTED
          );
        } else if (androidVersion >= 30) {
          // Android 11+ (API 30+) - Request MANAGE_EXTERNAL_STORAGE
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.MANAGE_EXTERNAL_STORAGE,
            {
              title: 'Storage Permission Required',
              message: 'This app needs access to storage to save PDF files',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            }
          );
          return granted === PermissionsAndroid.RESULTS.GRANTED;
        } else {
          // Android 10 and below - Use legacy storage permission
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
          return granted === PermissionsAndroid.RESULTS.GRANTED;
        }
      } catch (err) {
        console.warn('Permission error:', err);
        return false;
      }
    }
    return true;
  };

  // Get appropriate file path based on platform
  const getFilePath = () => {
    const fileName = `salary-slip-${Date.now()}.pdf`;
    
    if (Platform.OS === 'android') {
      // Use Downloads directory for Android
      return `${RNFS.DownloadDirectoryPath}/${fileName}`;
    } else {
      // Use Documents directory for iOS
      return `${RNFS.DocumentDirectoryPath}/${fileName}`;
    }
  };

  const savePDF = async () => {
    try {
      const fileName = `salary-slip-${Date.now()}.pdf`;
      
      if (Platform.OS === 'android') {
        // Use RNBlobUtil's MediaCollection for Android 10+ compatibility
        const androidVersion = Platform.Version;
        
        if (androidVersion >= 29) {
          // Android 10+ - Try MediaCollection first, fallback to cache directory
          try {
            const result = await RNBlobUtil.MediaCollection.copyToMediaStore(
              {
                name: fileName,
                parentFolder: 'Download',
                mimeType: 'application/pdf',
              },
              'Download',
              `data:application/pdf;base64,${base64Data}`
            );
            
            Alert.alert(
              'Success',
              'PDF saved successfully to Downloads folder!',
              [
                {
                  text: 'OK',
                  onPress: () => console.log('PDF saved via MediaCollection')
                }
              ]
            );
          } catch (mediaError) {
            console.log('MediaCollection failed, using cache directory:', mediaError);
            // Fallback: Save to cache directory and let user know
            const cachePath = `${RNFS.CachesDirectoryPath}/${fileName}`;
            await RNFS.writeFile(cachePath, base64Data, 'base64');
            
            Alert.alert(
              'PDF Saved',
              'PDF saved to app cache. You can share it using the Share button.',
              [
                {
                  text: 'OK',
                  onPress: () => console.log('PDF saved to cache:', cachePath)
                },
                {
                  text: 'Share Now',
                  onPress: () => sharePDF()
                }
              ]
            );
          }
        } else {
          // Android 9 and below - Use traditional file system with permissions
          const hasPermission = await requestStoragePermission();
          if (!hasPermission) {
            Alert.alert('Permission Denied', 'Storage permission is required to save PDF files.');
            return;
          }

          const filePath = `${RNFS.DownloadDirectoryPath}/${fileName}`;
          await RNBlobUtil.fs.writeFile(filePath, base64Data, 'base64');
          
          Alert.alert(
            'Success',
            'PDF saved successfully to Downloads folder!',
            [
              {
                text: 'OK',
                onPress: () => console.log('PDF saved to:', filePath)
              },
              {
                text: 'Open',
                onPress: () => openPDF(filePath)
              }
            ]
          );
        }
      } else {
        // iOS - Use Documents directory
        const filePath = `${RNFS.DocumentDirectoryPath}/${fileName}`;
        await RNFS.writeFile(filePath, base64Data, 'base64');
        
        Alert.alert(
          'Success',
          'PDF saved successfully!',
          [
            {
              text: 'OK',
              onPress: () => console.log('PDF saved to:', filePath)
            },
            {
              text: 'Open',
              onPress: () => openPDF(filePath)
            }
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
