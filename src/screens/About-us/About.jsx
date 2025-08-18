import React from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../../components/Header';

const About = () => {
  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView>
          <Header
            title="📅  Attendance"
            showBackButton={true}
            // onBackPress={() => navigation.goBack()}
          />
        </SafeAreaView>
      </SafeAreaProvider>
    </>
  );
};

export default About;
