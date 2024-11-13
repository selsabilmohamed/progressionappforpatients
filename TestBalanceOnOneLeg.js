import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function TestBalanceOnOneLeg() {
  const [times, setTimes] = useState([null, null, null, null]);
  const [currentLeg, setCurrentLeg] = useState(null);
  const [started, setStarted] = useState(false);
  const [timer, setTimer] = useState(15);

  // Memoized stopTest function to avoid dependency issues
  const stopTest = useCallback(() => {
    const duration = timer === 0 ? 15 : 15 - timer; // Automatically set duration to 15 seconds if timer runs out
    const newTimes = [...times];

    if (currentLeg === 'left' && times[0] === null) {
      newTimes[0] = duration;
    } else if (currentLeg === 'left') {
      newTimes[1] = duration;
    } else if (currentLeg === 'right' && times[2] === null) {
      newTimes[2] = duration;
    } else {
      newTimes[3] = duration;
    }

    setTimes(newTimes);
    setStarted(false);
    setCurrentLeg(null);
  }, [currentLeg, timer, times]);

  useEffect(() => {
    let countdown;
    if (started && timer > 0) {
      countdown = setTimeout(() => setTimer(timer - 1), 1000);
    } else if (timer === 0 && started) {
      stopTest();
    }
    return () => clearTimeout(countdown);
  }, [started, timer, stopTest]);

  const startTest = (leg) => {
    setCurrentLeg(leg);
    setStarted(true);
    setTimer(15);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.instructions}>
        Balance on one leg for as long as possible. Repeat for each leg twice.
      </Text>
      <Text style={styles.timer}>Time Remaining: {timer}s</Text>

      <View style={styles.row}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => startTest('left')}
          disabled={started || times[1] !== null}
        >
          <Text style={styles.buttonText}>Start Left Leg</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => startTest('right')}
          disabled={started || times[3] !== null}
        >
          <Text style={styles.buttonText}>Start Right Leg</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.stopButton} onPress={stopTest} disabled={!started}>
        <Text style={styles.buttonText}>Stop</Text>
      </TouchableOpacity>

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
