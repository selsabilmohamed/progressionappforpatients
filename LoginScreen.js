// LoginScreen.js
import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function LoginScreen({ route, navigation }) {
  const { userType } = route.params;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (userType === 'patient') {
      navigation.navigate('Patient');
    } else {
      navigation.navigate('Researcher');
    }
  };

  const handleSignUp = () => {
    navigation.navigate('SignUp');
  };

  return (
    <View style={styles.container}>
      {/* Rutgers Logo */}
      <Image source={require('../assets/rutgers_logo.png')} style={styles.logo} />

      <Text style={styles.title}>Login as {userType}</Text>

      {/* Email Input */}
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />

      {/* Password Input */}
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      {/* Login Button */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Sign Up Link */}
      <TouchableOpacity onPress={handleSignUp}>
        <Text style={styles.linkText}>Don't have an account? Sign up now</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  logo: {
    width: 100, // Increased size for better visibility
    height: 100,
    resizeMode: 'contain',
    marginBottom: 25,
  },
  title: {
    fontSize: 28, // Increased font size
    fontWeight: 'bold',
    marginBottom: 35,
    color: '#333',
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 20, // Increased padding for better readability
    borderRadius: 8,
    marginBottom: 18,
    fontSize: 18, // Increased font size
    borderColor: '#ddd',
    borderWidth: 1,
  },
  button: {
    backgroundColor: '#cc0033',
    paddingVertical: 20, // Increased padding
    paddingHorizontal: 55,
    borderRadius: 8,
    marginVertical: 12,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 22, // Increased font size
    fontWeight: '600',
  },
  linkText: {
    color: 'blue',
    textDecorationLine: 'underline',
    fontSize: 18, // Increased font size
    marginTop: 25,
  },
});
