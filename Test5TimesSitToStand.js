import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function Test5TimesSitToStand() {
  const [reps, setReps] = useState(0);
  const [started, setStarted] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);

  const startTest = () => {
    setStarted(true);
    setReps(0);
  };

  const addRep = () => {
    if (!testCompleted && started && reps < 5) {
      setReps(reps + 1);
      if (reps + 1 === 5) {
        setTestCompleted(true);
        alert(`Test completed! You performed 5 reps.`);
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* Chair Stand Image */}
      <Image source={require('../assets/chairstand.png')} style={styles.image} />

      {/* Instructions */}
      <Text style={styles.instructions}>
        1. Sit with feet flat and arms crossed in front of a chair. {'\n'}
        2. Stand up and sit down 5 times, each time pressing the Add Rep button.
      </Text>

      {!started ? (
        <TouchableOpacity style={styles.button} onPress={startTest}>
          <Text style={styles.buttonText}>Start Test</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.button} onPress={addRep}>
          <Text style={styles.buttonText}>Add Rep ({reps}/5)</Text>
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
  image: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  instructions: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 25,
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