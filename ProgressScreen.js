import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ProgressionScreen({ route }) {
  const progressionData = {
    "1-Minute Sit-Up Test": [
      { reps: 20, date: '2024-01-15' },
      { reps: 25, date: '2024-01-22' },
      { reps: 23, date: '2024-02-01' },
    ],
    "Wall Push-Up Test": [
      { reps: 15, date: '2024-01-18' },
      { reps: 18, date: '2024-01-25' },
      { reps: 20, date: '2024-02-03' },
    ],
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Progression for Alice Johnson</Text>
      {Object.entries(progressionData).map(([test, records]) => (
        <View key={test} style={styles.testContainer}>
          <Text style={styles.testName}>{test}</Text>
          {records.map((record, index) => (
            <Text key={index} style={styles.record}>
              Attempt {index + 1}: {record.reps} reps on {record.date}
            </Text>
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  testContainer: {
    marginBottom: 20,
  },
  testName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  record: {
    fontSize: 18,
    marginBottom: 5,
  },
});
