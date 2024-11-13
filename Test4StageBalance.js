import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Test4StageBalance() {
  const [stage, setStage] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null); // No timer initially
  const [started, setStarted] = useState(false);

  const stages = ['Feet Together', 'Semi-Tandem', 'Tandem', 'One Leg Stand'];

  const startStage = () => {
    setStarted(true);
    setTimeLeft(10); // Start 10-second countdown for each stage
  };

  const nextStage = useCallback(() => {
    if (stage < stages.length - 1) {
      setStage(stage + 1);
      setTimeLeft(10); // Reset countdown for the next stage
    } else {
      setCompleted(true);
      alert('Test completed! You successfully held all positions.');
      setStarted(false); // Stop the test
    }
  }, [stage, stages.length]);

  useEffect(() => {
    let timer;
    if (timeLeft > 0 && started) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0 && started) {
      // Timer reaches 0, but we wait for the user to press the button to continue
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [timeLeft, started]);

  return (
    <View style={styles.container}>
      <Text style={styles.instructions}>
        Hold each position for 10 seconds. Press "Next Stage" to continue.
      </Text>
      <Text style={styles.stage}>Current Stage: {stages[stage]}</Text>
      {timeLeft !== null && <Text style={styles.timer}>Time Remaining: {timeLeft}s</Text>}

      {!completed ? (
        !started ? (
          <TouchableOpacity style={styles.button} onPress={startStage}>
            <Text style={styles.buttonText}>Start</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button} onPress={nextStage}>
            <Text style={styles.buttonText}>Next Stage</Text>
          </TouchableOpacity>
        )
      ) : (
        <Text style={styles.completedText}>All Stages Completed!</Text>
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
  stage: {
    fontSize: 26,
    marginBottom: 15,
  },
  timer: {
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
  completedText: {
    fontSize: 24,
    color: 'green',
    marginTop: 20,
  },
});