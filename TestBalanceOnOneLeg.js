// Import necessary libraries from React and React Native
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// Main functional component for the Balance on One Leg Test
export default function TestBalanceOnOneLeg() {
  // State variables
  const [times, setTimes] = useState([null, null, null, null]); // Stores times for each attempt
  const [currentLeg, setCurrentLeg] = useState(null); // Tracks the currently active leg
  const [started, setStarted] = useState(false); // Tracks if the test is started
  const [timer, setTimer] = useState(15); // Countdown timer set to 15 seconds

  // Memoized function to stop the test
  const stopTest = useCallback(() => {
    // Calculate the time duration based on the timer
    const duration = timer === 0 ? 15 : 15 - timer; 
    const newTimes = [...times]; // Create a copy of the times array

    // Store the time based on the current leg and attempt
    if (currentLeg === 'left' && times[0] === null) {
      newTimes[0] = duration; // First attempt for left leg
    } else if (currentLeg === 'left') {
      newTimes[1] = duration; // Second attempt for left leg
    } else if (currentLeg === 'right' && times[2] === null) {
      newTimes[2] = duration; // First attempt for right leg
    } else {
      newTimes[3] = duration; // Second attempt for right leg
    }

    // Update state and reset test
    setTimes(newTimes); 
    setStarted(false); 
    setCurrentLeg(null); 
  }, [currentLeg, timer, times]); // Dependency array for memoization

  // Countdown timer effect
  useEffect(() => {
    let countdown;

    if (started && timer > 0) {
      // Decrease timer every second if the test is running
      countdown = setTimeout(() => setTimer(timer - 1), 1000);
    } else if (timer === 0 && started) {
      // Stop test automatically if timer reaches zero
      stopTest();
    }

    // Cleanup function to clear the timer when the component unmounts
    return () => clearTimeout(countdown);
  }, [started, timer, stopTest]); // Re-run if these variables change

  // Function to start the test for a specific leg
  const startTest = (leg) => {
    setCurrentLeg(leg); // Set the current leg being tested
    setStarted(true); // Start the test
    setTimer(15); // Reset timer to 15 seconds
  };

  return (
    <View style={styles.container}>
      {/* Test Instructions */}
      <Text style={styles.instructions}>
        Balance on one leg for as long as possible. Repeat for each leg twice.
      </Text>

      {/* Display remaining time */}
      <Text style={styles.timer}>Time Remaining: {timer}s</Text>

      {/* Test control buttons */}
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => startTest('left')}
          disabled={started || times[1] !== null} // Disable if already started or completed both left-leg tests
        >
          <Text style={styles.buttonText}>Start Left Leg</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => startTest('right')}
          disabled={started || times[3] !== null} // Disable if already started or completed both right-leg tests
        >
          <Text style={styles.buttonText}>Start Right Leg</Text>
        </TouchableOpacity>
      </View>

      {/* Stop Button */}
      <TouchableOpacity style={styles.stopButton} onPress={stopTest} disabled={!started}>
        <Text style={styles.buttonText}>Stop</Text>
      </TouchableOpacity>

      {/* Display test results */}
      <View style={styles.timesContainer}>
        <Text style={styles.timeText}>Left Leg 1: {times[0] ? `${times[0]}s` : '--'}</Text>
        <Text style={styles.timeText}>Left Leg 2: {times[1] ? `${times[1]}s` : '--'}</Text>
        <Text style={styles.timeText}>Right Leg 1: {times[2] ? `${times[2]}s` : '--'}</Text>
        <Text style={styles.timeText}>Right Leg 2: {times[3] ? `${times[3]}s` : '--'}</Text>
      </View>
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
  instructions: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 25,
  },
  button: {
    backgroundColor: '#cc0033',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 15,
  },
  stopButton: {
    backgroundColor: '#cc0033',
    paddingVertical: 12,
    paddingHorizontal: 60,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
  },
  timesContainer: {
    marginTop: 25,
  },
  timeText: {
    fontSize: 22,
    marginBottom: 5,
  },
  timer: {
    fontSize: 26,
    marginBottom: 20,
  },
});
