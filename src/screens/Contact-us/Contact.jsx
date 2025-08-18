import React from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../../components/Header';
import { View } from 'react-native-reanimated/lib/typescript/Animated';

const Contact = () => {
  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView>
          <Header
            title="📅  Attendance"
            showBackButton={true}
            // onBackPress={() => navigation.goBack()}
          />

          <View>
            <h1>Hi I'm Hitarth Shah</h1>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </>
  );
};

export default Contact;
