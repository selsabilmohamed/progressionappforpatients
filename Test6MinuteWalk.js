import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Test6MinuteWalk() {
  const [laps, setLaps] = useState(0);
  const [timeLeft, setTimeLeft] = useState(360);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    let timer;
    if (started && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(timer);
      alert(`Time's up! You completed ${laps} laps.`);
    }
    return () => clearInterval(timer);
  }, [started, timeLeft, laps]);

  const startTest = () => {
    setStarted(true);
    setLaps(0);
    setTimeLeft(360);
  };

  const addLap = () => {
    if (started) {
      setLaps(laps + 1);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.instructions}>
        Walk for 6 minutes. Press " Add Lap" each time you complete one.
      </Text>

      <Text style={styles.timer}>
        Time Remaining: {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60}
      </Text>
      <Text style={styles.laps}>Laps: {laps}</Text>

      <TouchableOpacity style={styles.button} onPress={startTest} disabled={started}>
        <Text style={styles.buttonText}>Start Test</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={addLap} disabled={!started}>
        <Text style={styles.buttonText}>Add Lap</Text>
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
  instructions: {
    fontSize: 22,  // Larger and concise
    marginBottom: 25,
    textAlign: 'center',
  },
  timer: {
    fontSize: 26,
    marginBottom: 20,
  },
  laps: {
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