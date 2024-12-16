// Import necessary libraries from React and React Native
import React, { useState } from 'react'; 
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Modal } from 'react-native';

// Define a list of available tests
const allTests = [
  "5 Times Sit to Stand",
  "1-Minute Sit-Up Test",
  "30-Second Sit to Stand",
  "Wall Push-Up Test",
  "Balance on One Leg",
  "6-Minute Walk Test",
  "2-Minute Step Test",
  "4-Stage Balance Test",
]; 

// Define sample patient data for display
const samplePatients = [
  { id: '1', name: 'Alice Johnson', yearOfBirth: 1985, dateAdded: '2023-01-15' },
  { id: '2', name: 'Bob Smith', yearOfBirth: 1990, dateAdded: '2023-02-20' },
  { id: '3', name: 'Charlie Brown', yearOfBirth: 1975, dateAdded: '2023-01-10' },
];

// Define the main component for the Researcher Dashboard
export default function ResearcherScreen({ navigation }) {
  // State to hold patients data
  const [patients, setPatients] = useState(samplePatients);
  // State to hold the search query text
  const [searchQuery, setSearchQuery] = useState('');
  // State to manage sorting option ('name' or 'yearOfBirth')
  const [sortOption, setSortOption] = useState('name');
  // State to keep track of the currently selected patient
  const [selectedPatient, setSelectedPatient] = useState(null);
  // State to control modal visibility
  const [modalVisible, setModalVisible] = useState(false);

  // Function to open the modal for suggested tests
  const openSuggestedTestsModal = (patient) => {
    setSelectedPatient(patient); // Set the selected patient
    setModalVisible(true); // Show the modal
  };

  // Function to navigate to the progression screen
  const openProgressionScreen = (patient) => {
    if (patient.name === "Alice Johnson") {
      // Navigate to ProgressionScreen if the patient is Alice
      navigation.navigate('ProgressionScreen', { name: patient.name });
    } else {
      // Show alert if no progression data is available
      alert("No progression data available for this patient.");
    }
  };

  // Filter and sort the list of patients based on search query and sorting option
  const filteredPatients = patients
    .filter((patient) => 
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) // Case-insensitive search
    )
    .sort((a, b) => {
      if (sortOption === 'name') {
        return a.name.localeCompare(b.name); // Sort alphabetically by name
      } else if (sortOption === 'yearOfBirth') {
        return a.yearOfBirth - b.yearOfBirth; // Sort numerically by birth year
      }
      return 0; // No sorting if no valid option
    });

  return (
    <View style={styles.container}>
      {/* Title for the screen */}
      <Text style={styles.title}>Researcher Dashboard</Text>

      {/* Search input for filtering patients */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search patients by name..."
        value={searchQuery} 
        onChangeText={(text) => setSearchQuery(text)} // Update search query state
      />

      {/* Sorting buttons */}
      <View style={styles.sortButtons}>
        <TouchableOpacity style={styles.sortButton} onPress={() => setSortOption('name')}>
          <Text style={styles.sortButtonText}>Sort by Name</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sortButton} onPress={() => setSortOption('yearOfBirth')}>
          <Text style={styles.sortButtonText}>Sort by Year of Birth</Text>
        </TouchableOpacity>
      </View>

      {/* Display the list of patients */}
      <FlatList
        data={filteredPatients} // Pass filtered and sorted patient data
        keyExtractor={(item) => item.id} // Use unique ID as key
        renderItem={({ item }) => (
          <View style={styles.patientItem}>
            <TouchableOpacity 
              onPress={() => setSelectedPatient(selectedPatient === item ? null : item)}
            >
              <Text style={styles.patientName}>{item.name}</Text>
              <Text style={styles.patientDate}>Year of Birth: {item.yearOfBirth}</Text>
            </TouchableOpacity>

            {/* Display action buttons if the patient is selected */}
            {selectedPatient === item && (
              <>
                <TouchableOpacity 
                  style={styles.actionButton} 
                  onPress={() => openSuggestedTestsModal(item)}
                >
                  <Text style={styles.actionButtonText}>Suggested Tests</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.actionButton} 
                  onPress={() => openProgressionScreen(item)}
                >
                  <Text style={styles.actionButtonText}>Progression</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        )}
      />

      {/* Modal for displaying suggested tests */}
      {selectedPatient && modalVisible && (
        <Modal
          animationType="slide" // Slide-in animation for modal
          transparent={true} // Dim background
          visible={modalVisible} // Show modal if true
          onRequestClose={() => setModalVisible(false)} // Close on back button press
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>
                Suggested Tests for {selectedPatient.name}
              </Text>

              {/* List of suggested tests */}
              <FlatList
                data={allTests} // Use all available tests as data
                keyExtractor={(item, index) => index.toString()} // Use index as key
                renderItem={({ item }) => (
                  <TouchableOpacity style={styles.testButton}>
                    <Text style={styles.testButtonText}>{item}</Text>
                  </TouchableOpacity>
                )}
                style={{ maxHeight: 300 }} // Limit modal height
                showsVerticalScrollIndicator={true} // Show scroll indicator
              />
              
              {/* Close button for modal */}
              <TouchableOpacity 
                style={styles.closeButton} 
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}

      {/* Button for downloading results */}
      <TouchableOpacity style={styles.downloadButton}>
        <Text style={styles.buttonText}>Download Results</Text>
      </TouchableOpacity>
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
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 8,
    fontSize: 18,
    marginBottom: 20,
  },
  sortButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  sortButton: {
    backgroundColor: '#cc0033',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  sortButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  patientItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  patientName: {
    fontSize: 20,
    fontWeight: '500',
  },
  patientDate: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  actionButton: {
    backgroundColor: '#cc0033',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginVertical: 5,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  testButton: {
    backgroundColor: '#cc0033',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 8,
    width: '100%',
    alignItems: 'center',
  },
  testButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  closeButton: {
    backgroundColor: '#cc0033',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  downloadButton: {
    backgroundColor: '#cc0033',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: '25%',
    right: '25%',
  },
});
