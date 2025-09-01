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

const CustomDrawerContent = ({ navigation }) => {
  const { user, logout } = useAuth();
  const [menuData, setMenuData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch menu data from API
  const fetchMenu = async () => {
    try {
      const data = await Api.getMenuData();
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

  // Logout handler
  const handleLogout = async () => {
    await logout();
    navigation.navigate('LoginScreen');
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
      {/* Profile Section */}
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

      {/* Menu Items */}
      <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
        {menuData.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.debugBox}
            onPress={() => {
              // Navigate to screen if screenName exists
              if (item.screenName) {
                navigation.navigate(item.screenName);
              } else {
                console.log('No screen mapped for this item:', item.Module_nm);
              }
            }}
          >
            <Text style={styles.title}>
              {item.Module_nm || `Item ${index + 1}`}
            </Text>
          </TouchableOpacity>
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
    alignItems: 'flex-start',
  },
  title: { fontSize: 16, fontWeight: 'bold', color: 'blue' },
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
