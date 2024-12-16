// Import required libraries from React and React Native
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// Main functional component for the 6-Minute Walk Test
export default function Test6MinuteWalk() {
  // State variables
  const [laps, setLaps] = useState(0); // Tracks number of laps completed
  const [timeLeft, setTimeLeft] = useState(360); // Timer set to 6 minutes (360 seconds)
  const [started, setStarted] = useState(false); // Tracks if the test has started

  // Countdown timer effect
  useEffect(() => {
    let timer;

    if (started && timeLeft > 0) {
      // Start the timer when the test is running and time hasn't run out
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1); // Decrease the timer by 1 second
      }, 1000);
    } else if (timeLeft === 0) {
      // When time runs out, stop the timer and show the completed laps
      clearInterval(timer);
      alert(`Time's up! You completed ${laps} laps.`);
    }

    // Cleanup function to clear timer when the component unmounts
    return () => clearInterval(timer);
  }, [started, timeLeft, laps]); // Re-run useEffect if these variables change

  // Function to start the test
  const startTest = () => {
    setStarted(true); // Mark the test as started
    setLaps(0); // Reset lap count
    setTimeLeft(360); // Reset timer to 6 minutes
  };

  // Function to add a lap when the button is pressed
  const addLap = () => {
    if (started) {
      setLaps(laps + 1); // Increase the lap count
    }
  };

  return (
    <View style={styles.container}>
      {/* Display test instructions */}
      <Text style={styles.instructions}>
        Walk for 6 minutes. Press "Add Lap" each time you complete one.
      </Text>

      {/* Display remaining time in minutes and seconds */}
      <Text style={styles.timer}>
        Time Remaining: {Math.floor(timeLeft / 60)}:
        {timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60}
      </Text>

      {/* Display current lap count */}
      <Text style={styles.laps}>Laps: {laps}</Text>

      {/* Start Test button, disabled if the test is already started */}
      <TouchableOpacity style={styles.button} onPress={startTest} disabled={started}>
        <Text style={styles.buttonText}>Start Test</Text>
      </TouchableOpacity>

      {/* Add Lap button, enabled only when the test is running */}
      <TouchableOpacity style={styles.button} onPress={addLap} disabled={!started}>
        <Text style={styles.buttonText}>Add Lap</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  // Main container style
  container: {
    flex: 1, // Fill the screen
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
    padding: 20, // Add padding
    backgroundColor: '#fff', // White background
  },
  // Test instructions style
  instructions: {
    fontSize: 22,  // Large text for clarity
    marginBottom: 25, // Add margin below
    textAlign: 'center', // Center the text
  },
  // Timer display style
  timer: {
    fontSize: 26, // Large font for visibility
    marginBottom: 20, // Margin below timer
  },
  // Lap count display style
  laps: {
    fontSize: 24, // Large font for emphasis
    marginBottom: 20, // Margin below lap count
  },
  // Button style for Start Test and Add Lap
  button: {
    backgroundColor: '#cc0033', // Red background
    paddingVertical: 18, // Vertical padding for button height
    paddingHorizontal: 55, // Horizontal padding for button width
    borderRadius: 5, // Rounded corners
    marginVertical: 12, // Margin above and below button
  },
  // Button text style
  buttonText: {
    color: '#fff', // White text
    fontSize: 20, // Large font for readability
    textAlign: 'center', // Center text inside the button
  },
});
