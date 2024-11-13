import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Test2MinuteStep() {
  const [steps, setSteps] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120);
  const [started, setStarted] = useState(false);

  const startTest = useCallback(() => {
    setStarted(true);
    setSteps(0);
    setTimeLeft(120);
  }, []);

  const addStep = useCallback(() => {
    if (started) {
      setSteps((prevSteps) => prevSteps + 1);
    }
  }, [started]);

  useEffect(() => {
    let timer;
    if (started && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && started) {
      clearInterval(timer);
      alert(`Time's up! You performed ${steps} steps.`);
      setStarted(false); // Reset started state after completion
    }
    return () => clearInterval(timer);
  }, [started, timeLeft, steps]); // Include all necessary dependencies

  return (
    <View style={styles.container}>
      <Text style={styles.instructions}>
        March in place for 2 minutes. Press "Add Step" each time your knee reaches hip height.
      </Text>
      <Text style={styles.timer}>Time Remaining: {timeLeft}s</Text>
      <Text style={styles.steps}>Steps: {steps}</Text>

      {!started ? (
        <TouchableOpacity style={styles.button} onPress={startTest}>
          <Text style={styles.buttonText}>Start Test</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.button} onPress={addStep}>
          <Text style={styles.buttonText}>Add Step</Text>
        </TouchableOpacity>
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
    marginBottom: 20,
    textAlign: 'center',
  },
  timer: {
    fontSize: 26,
    marginBottom: 15,
  },
  steps: {
    fontSize: 24,
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
});
