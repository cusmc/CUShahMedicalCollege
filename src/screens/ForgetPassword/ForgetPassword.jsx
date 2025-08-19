import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Header from '../../components/Header';

const ForgetPassword = ({ navigation }) => {
  return (
    <SafeAreaProvider>
      <Header
        title="🔐 Forget Password"
        showBackButton={true}
        onBackPress={() => navigation.goBack()}
      />

      <SafeAreaView style={styles.container}>
        <WebView
          source={{ uri: 'https://smc.cusmc.org/Account/ForgotPasswordUser' }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ForgetPassword;
