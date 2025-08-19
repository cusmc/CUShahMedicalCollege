import React from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { View, Text } from 'react-native';
import { Header } from '../../components/Header';
import Animated from 'react-native-reanimated';

const Contact = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <Header
          title="📅  Attendance"
          showBackButton={true}
          // onBackPress={() => navigation.goBack()}
        />

        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
            Hi I'm Hitarth Shah
          </Text>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Contact;
