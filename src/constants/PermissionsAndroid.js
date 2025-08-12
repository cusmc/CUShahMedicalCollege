import { PermissionsAndroid, Platform } from 'react-native';

export const requestStoragePermission = async () => {
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
                        message: 'This app needs access to storage to save files',
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
                        message: 'This app needs access to storage to save files',
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
