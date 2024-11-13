import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function Test30SecondSitToStand() {
  const [timer, setTimer] = useState(30);
  const [started, setStarted] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);
  const [reps, setReps] = useState('');

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
    setTimer(30);
    setTestCompleted(false);
  };

  const submitTest = () => {
    alert(`You entered ${reps} reps. Test completed.`);
    setReps('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.instructions}>Stand up and sit down from a chair as many times as you can in 30 seconds.</Text>
      <Text style={styles.timer}>Time Remaining: {timer}s</Text>

      {!started ? (
        <TouchableOpacity style={styles.button} onPress={startTest}>
          <Text style={styles.buttonText}>Start Test</Text>
        </TouchableOpacity>
      ) : (
        <Text>Test in Progress...</Text>
      )}

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
  instructions: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 20,
  },
  timer: {
    fontSize: 26,
    marginBottom: 20,
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