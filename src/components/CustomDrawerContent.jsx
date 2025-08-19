import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import Api from '../services/api';

const CustomDrawerContent = props => {
  const { user, logout } = useAuth();
  const [menuData, setMenuData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMenu = async () => {
    try {
      const data = await Api.getMenuData();
      // console.log('RAW API DATA ===>', JSON.stringify(data, null, 2));
      setMenuData(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching menu data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const handleLogout = async () => {
    await logout();
    props.navigation.navigate('LoginScreen');
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="blue" />
        <Text>Loading menu...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Profile */}
      <View style={styles.profileSection}>
        <Image
          source={
            user?.profileImage
              ? { uri: user.profileImage }
              : require('../../assets/images/cusmc_logo.png')
          }
          style={styles.profileImage}
        />
        <Text style={styles.userName}>{user?.name || 'Welcome'}</Text>
        <Text style={styles.userRole}>C.U. Shah Medical College</Text>
      </View>

      {/* Debug Menu */}
      <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
        {menuData.map((item, index) => (
          <View key={index} style={styles.debugBox}>
            <Text style={styles.title}>
              {item.Module_id || `Item ${index + 1}`}
              {''} {item.Module_nm || `Item ${index - 1}`}
            </Text>
          </View>
        ))}
      </ScrollView>

      {/* Logout */}
      <View style={styles.logoutSection}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>🚪 Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  profileSection: {
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'blue',
  },
  profileImage: { width: 80, height: 80, borderRadius: 40, marginBottom: 10 },
  userName: { fontSize: 18, fontWeight: 'bold' },
  userRole: { fontSize: 14, color: 'gray' },
  debugBox: {
    borderBottomWidth: 1,
    borderBottomColor: 'blue',
    padding: 10,
    alignItems: 'start',
  },
  title: { fontSize: 16, fontWeight: 'bold', marginBottom: 5, color: 'blue' },
  debugText: { fontSize: 14, color: 'red' },
  logoutSection: { padding: 20, borderTopWidth: 1, borderTopColor: '#ddd' },
  logoutButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
});

export default CustomDrawerContent;
