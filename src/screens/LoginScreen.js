import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://192.168.202.249:8080/rest/auth/login', {
        username: username,
        password: password,
      });
  
      const token = response.data.token;
  
      // Simpan token di AsyncStorage
      await AsyncStorage.setItem('token', token);
  
      console.log(`Welcome back, ${username}!`);
      console.log('Token:', token);
  
      // Navigasi ke halaman beranda dengan menyertakan token
      navigation.navigate('Home', { token });
    } catch (error) {
      if (error.response) {
        // Respons dari server dengan status selain 2xx
        console.error('Server responded with an error:', error.response.data);
        Alert.alert('Login Failed', 'Invalid username or password.');
      } else if (error.request) {
        // Tidak ada respons dari server
        console.error('No response received:', error.request);
        Alert.alert('Login Failed', 'No response from the server. Please try again later.');
      } else {
        // Kesalahan lainnya
        console.error('Error during the request:', error.message);
        Alert.alert('Login Failed', 'An unexpected error occurred. Please try again later.');
      }
    }
  };

  const handleRegisterNow = () => {
    navigation.navigate('Register');
  };

  const validateUsername = (username) => {
    // Validasi sederhana untuk format username
    // Anda dapat menyesuaikan validasi sesuai kebutuhan
    return username.length > 0;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back!</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={(text) => setUsername(text)}
        value={username}
        keyboardType="default"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      <View style={styles.separator} />
      <TouchableOpacity style={styles.registerButton} onPress={handleRegisterNow}>
        <Text style={styles.buttonText}>Register Now</Text>
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
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    width: '100%',
    borderRadius: 8,
  },
  loginButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  registerButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  separator: {
    height: 16,
  },
});

export default LoginScreen;
