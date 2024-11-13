import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function SignUpScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = () => {
    // Handle sign-up logic here
    navigation.navigate('Login');  // Go back to login after signup
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rutgers Research</Text>
      <Text style={styles.subtitle}>Account Signup</Text>

      {/* Full Name */}
      <TextInput
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      {/* Email Address */}
      <TextInput
        placeholder="Email Address"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={styles.input}
      />

      {/* Date of Birth */}
      <TextInput
        placeholder="Date of Birth (YYYY-MM-DD)"
        value={dob}
        onChangeText={setDob}
        style={styles.input}
      />

      {/* Password */}
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      {/* Confirm Password */}
      <TextInput
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        style={styles.input}
      />

      {/* Create Account Button */}
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>

      {/* Link to Login */}
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.linkText}>Already have an account? Login here</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 30,  // Increased for better visibility
    fontWeight: 'bold',
    marginBottom: 25,
  },
  subtitle: {
    fontSize: 20,  // Increased for readability
    marginBottom: 35,
  },
  input: {
    width: '80%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
  },
  button: {
    backgroundColor: 'red',
    paddingVertical: 20,  // Increased padding
    paddingHorizontal: 60,  // Increased width
    borderRadius: 5,
    marginVertical: 15,  // More spacing
  },
  buttonText: {
    fontSize: 20,  // Increased from 18
    textAlign: 'center',
  },
  linkText: {
    color: 'blue',
    marginTop: 20,
  },
});