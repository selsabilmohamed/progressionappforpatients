import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function PatientScreen({ navigation }) {
  const handleTestClick = (testName) => {
    navigation.navigate(testName);
  };

  return (
    <View style={styles.container}>
      {/* Section Title */}
      <Text style={styles.title}>Tests you need to take</Text>

      {/* Test Buttons */}
      <TouchableOpacity style={styles.testButton} onPress={() => handleTestClick('Test5TimesSitToStand')}>
        <Text style={styles.testText}>5 Times Sit to Stand</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.testButton} onPress={() => handleTestClick('Test1MinuteSitUp')}>
        <Text style={styles.testText}>1-Minute Sit-Up Test</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.testButton} onPress={() => handleTestClick('Test30SecondSitToStand')}>
        <Text style={styles.testText}>30-Second Sit to Stand</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.testButton} onPress={() => handleTestClick('TestWallPushUp')}>
        <Text style={styles.testText}>Wall Push-Up Test</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.testButton} onPress={() => handleTestClick('TestBalanceOnOneLeg')}>
        <Text style={styles.testText}>Balance on One Leg</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.testButton} onPress={() => handleTestClick('Test6MinuteWalk')}>
        <Text style={styles.testText}>6 Minute Walk Test</Text>
      </TouchableOpacity>

      {/* New Test Buttons */}
      <TouchableOpacity style={styles.testButton} onPress={() => handleTestClick('Test4StageBalance')}>
        <Text style={styles.testText}>4-Stage Balance Test</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.testButton} onPress={() => handleTestClick('Test2MinuteStep')}>
        <Text style={styles.testText}>2-Minute Step Test</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'flex-start', // Align items to the top of the screen
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  testButton: {
    width: '90%',
    backgroundColor: '#f8f8f8',
    paddingVertical: 15, // Consistent padding
    borderRadius: 8,
    marginBottom: 12,
    borderColor: '#ddd',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  testText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
  },
});
