import { StyleSheet, SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Header from '../../components/Header';
import { useAuth } from '../../context/AuthContext';

const Attendance = ({ navigation }) => {
  const { user, password } = useAuth();

  // Build Attendance URL with Empid and password
  const attendanceUrl = `https://smc.cusmc.org/Attandance/Attandance?Empid=${user?.empId}&password=${password}`;

  return (
    <SafeAreaProvider>
      <Header
        title="📅  Attendance"
        showBackButton={true}
        onBackPress={() => navigation.goBack()}
      />

      <SafeAreaView style={styles.container}>
        <WebView
          source={{
            uri: attendanceUrl,
          }}
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

export default Attendance;
