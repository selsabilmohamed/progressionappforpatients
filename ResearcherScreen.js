import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Modal } from 'react-native';

const samplePatients = [
  { id: '1', name: 'Alice Johnson', yearOfBirth: 1985, dateAdded: '2023-01-15', suggestedTests: ['1-Minute Sit-Up', 'Wall Push-Up', '6-Minute Walk Test', 'Balance on One Leg'], progression: { "1-Minute Sit-Up": "Completed", "Wall Push-Up": "In Progress", "6-Minute Walk Test": "Not Started", "Balance on One Leg": "Completed" } },
  { id: '2', name: 'Bob Smith', yearOfBirth: 1990, dateAdded: '2023-02-20', suggestedTests: ['30-Second Sit-to-Stand', 'Balance on One Leg', '5 Times Sit-to-Stand', '1-Minute Sit-Up'], progression: { "30-Second Sit-to-Stand": "Not Started", "Balance on One Leg": "In Progress", "5 Times Sit-to-Stand": "Completed", "1-Minute Sit-Up": "Completed" } },
  { id: '3', name: 'Charlie Brown', yearOfBirth: 1975, dateAdded: '2023-01-10', suggestedTests: ['5 Times Sit-to-Stand', '6-Minute Walk Test', 'Wall Push-Up', '30-Second Sit-to-Stand'], progression: { "5 Times Sit-to-Stand": "Completed", "6-Minute Walk Test": "Not Started", "Wall Push-Up": "In Progress", "30-Second Sit-to-Stand": "Completed" } },
];

export default function ResearcherScreen() {
  const [patients, setPatients] = useState(samplePatients);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('name');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [progressionModalVisible, setProgressionModalVisible] = useState(false);

  const openSuggestedTestsModal = (patient) => {
    setSelectedPatient(patient);
    setModalVisible(true);
  };

  const openProgressionModal = (patient) => {
    setSelectedPatient(patient);
    setProgressionModalVisible(true);
  };

  const filteredPatients = patients
    .filter((patient) => patient.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortOption === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortOption === 'yearOfBirth') {
        return a.yearOfBirth - b.yearOfBirth;
      }
      return 0;
    });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Researcher Dashboard</Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Search patients by name..."
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />

      <View style={styles.sortButtons}>
        <TouchableOpacity style={styles.sortButton} onPress={() => setSortOption('name')}>
          <Text style={styles.sortButtonText}>Sort by Name</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sortButton} onPress={() => setSortOption('yearOfBirth')}>
          <Text style={styles.sortButtonText}>Sort by Year of Birth</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredPatients}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.patientItem}>
            <TouchableOpacity onPress={() => setSelectedPatient(selectedPatient === item ? null : item)}>
              <Text style={styles.patientName}>{item.name}</Text>
              <Text style={styles.patientDate}>Year of Birth: {item.yearOfBirth}</Text>
            </TouchableOpacity>

            {/* Show buttons only if the patient is selected */}
            {selectedPatient === item && (
              <>
                <TouchableOpacity style={styles.actionButton} onPress={() => openSuggestedTestsModal(item)}>
                  <Text style={styles.actionButtonText}>Suggested Tests</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionButton} onPress={() => openProgressionModal(item)}>
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
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Suggested Tests for {selectedPatient.name}</Text>
              <FlatList
                data={selectedPatient.suggestedTests}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity style={styles.testButton}>
                    <Text style={styles.testButtonText}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
              <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}

      <TouchableOpacity style={styles.downloadButton}>
        <Text style={styles.buttonText}>Download Results</Text>
      </TouchableOpacity>

      {/* Modal for displaying progression */}
      {selectedPatient && progressionModalVisible && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={progressionModalVisible}
          onRequestClose={() => setProgressionModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Progression for {selectedPatient.name}</Text>
              <FlatList
                data={Object.entries(selectedPatient.progression)}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <Text style={styles.detailsText}>{item[0]}: {item[1]}</Text>
                )}
              />
              <TouchableOpacity style={styles.closeButton} onPress={() => setProgressionModalVisible(false)}>
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
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
  detailsText: {
    fontSize: 16,
    color: '#333',
    marginVertical: 5,
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
});
