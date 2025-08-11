import React from 'react';
import { View, Text, Button, PermissionsAndroid, Alert } from 'react-native';

export default function TestPermission() {
  const requestPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert('Permission granted');
      } else {
        Alert.alert('Permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Test PermissionsAndroid</Text>
      <Button title="Request Permission" onPress={requestPermission} />
    </View>
  );
}
