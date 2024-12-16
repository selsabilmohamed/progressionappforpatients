import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function PatientTests() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Tests you need to take</Text>

      {/* All Test Buttons, including New Tests */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Test5TimesSitToStand')}>
        <Text style={styles.buttonText} numberOfLines={1}>5 Times Sit to Stand</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Test1MinuteSitUp')}>
        <Text style={styles.buttonText} numberOfLines={1}>1-Minute Sit-Up Test</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Test30SecondSitToStand')}>
        <Text style={styles.buttonText} numberOfLines={1}>30-Second Sit to Stand</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('TestWallPushUp')}>
        <Text style={styles.buttonText} numberOfLines={1}>Wall Push-Up Test</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('TestBalanceOnOneLeg')}>
        <Text style={styles.buttonText} numberOfLines={1}>Balance on One Leg</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Test6MinuteWalk')}>
        <Text style={styles.buttonText} numberOfLines={1}>6 Minute Walk Test</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Test4StageBalance')}>
        <Text style={styles.buttonText} numberOfLines={1}>4-Stage Balance Test</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Test2MinuteStep')}>
        <Text style={styles.buttonText} numberOfLines={1}>2-Minute Step Test</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',       // Centers items horizontally
    paddingTop: 15,             // Reduced padding at the top to move items up
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,           // Slightly reduce margin below header
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#f8f8f8',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginVertical: 8,
    width: '90%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
  },
});
