import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function Test1MinuteSitUp() {
  const [timer, setTimer] = useState(60); // Countdown starts at 60 seconds
  const [started, setStarted] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);
  const [reps, setReps] = useState(''); // Input for reps

  useEffect(() => {
    let countdown;
    if (started && timer > 0) {
      countdown = setTimeout(() => setTimer(timer - 1), 1000);
    } else if (timer === 0) {
      alert("Time's up! Enter your reps.");
      setTestCompleted(true);
      setStarted(false);
      clearTimeout(countdown);
    }
    return () => clearTimeout(countdown);
  }, [timer, started]);

  const startTest = () => {
    setStarted(true);
    setTimer(60); // Reset timer to 60 seconds
    setTestCompleted(false);
    setReps(''); // Reset reps input
  };

  const submitTest = () => {
    alert(`You entered ${reps} reps. Test completed.`);
    setReps('');
  };

  return (
    <View style={styles.container}>
      {/* Sit-Up Image */}
      <Image source={require('../assets/situp.png')} style={styles.image} />
      
      {/* Instructions */}
      <Text style={styles.instructions}>
        1. Lie down with knees bent. {'\n'}
        2. Cross arms over chest. {'\n'}
        3. Sit up and touch knees with your elbows. {'\n'}
        4. Repeat as many times as you can for 1 minute.
      </Text>

      {/* Timer */}
      <Text style={styles.timer}>Time Remaining: {timer}s</Text>

      {/* Start Test or In-Progress Message */}
      {!started ? (
        <TouchableOpacity style={styles.button} onPress={startTest}>
          <Text style={styles.buttonText}>Start Test</Text>
        </TouchableOpacity>
      ) : (
        <Text>Test in Progress...</Text>
      )}

      {/* Input for Reps after Test Completion */}
      {testCompleted && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Enter reps"
            keyboardType="numeric"
            value={reps}
            onChangeText={(text) => setReps(text.replace(/[^0-9]/g, ''))}
          />
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
