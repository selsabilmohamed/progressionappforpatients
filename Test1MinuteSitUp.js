// Import required libraries from React and React Native
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

// Define the main functional component
export default function Test1MinuteSitUp() {
  // State management for timer, test start, completion status, and reps count
  const [timer, setTimer] = useState(60); // Countdown timer starting at 60 seconds
  const [started, setStarted] = useState(false); // Tracks if the test has started
  const [testCompleted, setTestCompleted] = useState(false); // Tracks if the test is completed
  const [reps, setReps] = useState(''); // Stores the number of sit-up repetitions entered by the user

  // Manage the countdown timer using useEffect
  useEffect(() => {
    let countdown;
    if (started && timer > 0) {
      // Start the countdown if the test has started and timer is not zero
      countdown = setTimeout(() => setTimer(timer - 1), 1000); // Decrease timer every second
    } else if (timer === 0) {
      // When timer reaches zero, notify the user and end the test
      alert("Time's up! Enter your reps.");
      setTestCompleted(true); // Mark the test as completed
      setStarted(false); // Stop the test
      clearTimeout(countdown); // Clear the countdown timer
    }
    // Cleanup function to clear timer when component unmounts
    return () => clearTimeout(countdown);
  }, [timer, started]); // Re-run useEffect when timer or started state changes

  // Function to start the test
  const startTest = () => {
    setStarted(true); // Mark the test as started
    setTimer(60); // Reset timer to 60 seconds
    setTestCompleted(false); // Reset test completion status
    setReps(''); // Clear reps input field
  };

  // Function to handle test submission
  const submitTest = () => {
    alert(`You entered ${reps} reps. Test completed.`); // Display the entered reps
    setReps(''); // Clear reps input after submission
  };

  return (
    <View style={styles.container}>
      {/* Display sit-up image */}
      <Image source={require('../assets/situp.png')} style={styles.image} />
      
      {/* Display test instructions */}
      <Text style={styles.instructions}>
        1. Lie down with knees bent. {'\n'}
        2. Cross arms over chest. {'\n'}
        3. Sit up and touch knees with your elbows. {'\n'}
        4. Repeat as many times as you can for 1 minute.
      </Text>

      {/* Display remaining time */}
      <Text style={styles.timer}>Time Remaining: {timer}s</Text>

      {/* Show start button if test hasn't started, otherwise show progress message */}
      {!started ? (
        <TouchableOpacity style={styles.button} onPress={startTest}>
          <Text style={styles.buttonText}>Start Test</Text>
        </TouchableOpacity>
      ) : (
        <Text>Test in Progress...</Text>
      )}

      {/* Show reps input field if the test is completed */}
      {testCompleted && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Enter reps" // Placeholder text in input field
            keyboardType="numeric" // Allow only numeric input
            value={reps} // Bind value to reps state
            onChangeText={(text) => setReps(text.replace(/[^0-9]/g, ''))} // Allow only numbers
          />
          
          {/* Show submit button only when reps are entered */}
          {reps.length > 0 && (
            <TouchableOpacity style={styles.submitButton} onPress={submitTest}>
              <Text style={styles.buttonText}>Submit Test</Text>
            </TouchableOpacity>
          )}
        </>
      )}
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
  image: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  instructions: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 25,
  },
  timer: {
    fontSize: 22,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#cc0033',
    paddingVertical: 18,
    paddingHorizontal: 55,
    borderRadius: 5,
    marginVertical: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    width: '80%',
    fontSize: 18,
    borderRadius: 8,
    marginTop: 20,
    textAlign: 'center',
  },
  submitButton: {
    backgroundColor: '#cc0033',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginTop: 20,
  },
});
