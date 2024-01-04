import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const RegisterScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordValidation, setPasswordValidation] = useState({
    minLength: false,
    hasUpperCase: false,
    hasNumber: false,
  });

  const handleRegister = () => {
  // Validasi panjang password, huruf besar, dan angka
  if (!passwordValidation.minLength || !passwordValidation.hasUpperCase || !passwordValidation.hasNumber) {
    Alert.alert('Invalid Password', 'Please ensure that your password meets the criteria.');
    return;
  }

  if (!firstName || !lastName) {
    Alert.alert('Missing Name', 'Please enter your full name.');
    return;
  }

  if (!validateEmail(email)) {
    Alert.alert('Invalid Email', 'Please enter a valid email address.');
    return;
  }

  // Data pendaftaran
  const registrationData = {
    email,
    password,
    firstName,
    lastName,
  };

  // Fungsi penanganan pendaftaran dapat ditambahkan di sini
  // Sebagai contoh, Anda dapat mencetak data pendaftaran ke konsol
  console.log('Registration Data:', registrationData);
  console.log('Register complete!');

    // Tambahkan logika pendaftaran atau navigasi ke halaman berikutnya di sini
  };

  const handleBackToLogin = () => {
    navigation.navigate('Login');
  };

  const validateEmail = (email) => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  };

  const validatePassword = (text) => {
    setPassword(text);

    // Validasi panjang password
    const minLength = text.length >= 8;

    // Validasi huruf besar
    const hasUpperCase = /[A-Z]/.test(text);

    // Validasi angka
    const hasNumber = /\d/.test(text);

    setPasswordValidation({
      minLength,
      hasUpperCase,
      hasNumber,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create an Account</Text>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        onChangeText={text => setFirstName(text)}
        value={firstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        onChangeText={text => setLastName(text)}
        value={lastName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={text => setEmail(text)}
        value={email}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={validatePassword}
        value={password}
        secureTextEntry
      />
      {password.length > 0 && (
        <View style={styles.validationContainer}>
          <Text style={[styles.validationText, { color: passwordValidation.minLength ? 'green' : 'red' }]}>
            • Minimum 8 characters
          </Text>
          <Text style={[styles.validationText, { color: passwordValidation.hasUpperCase ? 'green' : 'red' }]}>
            • At least 1 uppercase letter
          </Text>
          <Text style={[styles.validationText, { color: passwordValidation.hasNumber ? 'green' : 'red' }]}>
            • At least 1 number
          </Text>
        </View>
      )}
      <TouchableOpacity
        style={styles.registerButton}
        onPress={handleRegister}
      >
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <View style={styles.separator} />
      <TouchableOpacity
        style={styles.backToLoginButton}
        onPress={handleBackToLogin}
      >
        <Text style={styles.buttonText}>Back to Login</Text>
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
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
  validationContainer: {
    alignSelf: 'flex-start',
    marginLeft: 16,
    marginTop: 4,
  },
  validationText: {
    fontSize: 12,
    marginBottom: 4,
  },
  registerButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginTop: 16,
  },
  backToLoginButton: {
    backgroundColor: '#FFC107',
    padding: 10,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginTop: 8,
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

export default RegisterScreen;
