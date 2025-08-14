import React from 'react';
import { StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { SafeAreaView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Header from '../components/Header';

const ForgetPassword = () => {
  return (
    <SafeAreaProvider>
      <Header
        title="💸 ForgetPassword"
        showMenu={true}
        // onMenuPress={handleMenuPress}
        showList={true}
      />
      <SafeAreaView style={styles.container}>
        <WebView
          source={{ uri: 'https://smc.cusmc.org/Account/ForgotPasswordUser' }} // Replace with your desired URL
          style={styles.webview}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  webview: {
    flex: 1,
    marginTop: 50,
  },
});

export default ForgetPassword;
