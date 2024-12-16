// HomeScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Rutgers logo */}
      <Image source={require('../assets/rutgers_logo.png')} style={styles.logo} />

      {/* Welcome message */}
      <Text style={styles.welcomeText}>Welcome to Rutgers Research!</Text>

      {/* "Are you a patient or researcher?" prompt */}
      <Text style={styles.title}>Are you a patient or researcher?</Text>

      {/* Patient Button */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login', { userType: 'patient' })}>
        <Text style={styles.buttonText}>PATIENT</Text>
      </TouchableOpacity>

      {/* Researcher Button */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login', { userType: 'researcher' })}>
        <Text style={styles.buttonText}>RESEARCHER</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  logo: {
    width: 100, // Increased size for better visibility
    height: 100,
    resizeMode: 'contain',
    marginBottom: 40,
  },
  welcomeText: {
    fontSize: 30, // Increased font size
    fontWeight: 'bold',
    color: 'red',
    marginBottom: 20,
    textAlign: 'center',
  },
  title: {
    fontSize: 24, // Increased font size
    fontWeight: '600',
    color: '#333',
    marginBottom: 35,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#cc0033',
    paddingVertical: 20, // Increased padding for larger buttons
    paddingHorizontal: 60,
    borderRadius: 8,
    marginVertical: 12,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 22, // Increased font size
    fontWeight: '600',
  },
});