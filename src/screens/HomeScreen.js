import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ route, navigation }) => {
  const { token } = route.params;
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Gunakan token untuk permintaan API di sini
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.202.249:8080/rest/user/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserData(response.data);
        console.log('Data from API:', response.data);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, [token]);

  const handleLogout = async () => {
    // Hapus token dari AsyncStorage
    await AsyncStorage.removeItem('token');

    // Navigasi kembali ke halaman login
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
      
      {userData && (
        <View>
          <Text>{`Welcome, ${userData.username}!`}</Text>
          {/* Tampilkan data pengguna lainnya sesuai kebutuhan */}
        </View>
      )}

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  logoutButton: {
    backgroundColor: '#FF5733',
    padding: 10,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default HomeScreen;
