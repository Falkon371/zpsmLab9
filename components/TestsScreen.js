import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import TestService from './data';

export default function TestsScreen({ navigation }) {
  const [tests, setTests] = useState([]);
  const [selectedTest, setSelectedTest] = useState(null);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const testsData = await TestService.fetchAllTests();
        setTests(testsData);
      } catch (error) {
        console.error('Error loading tests:', error);
      }
    };

    fetchTests();
  }, []);

  const handleTestPress = async (testId) => {
    try {
      const testDetails = await TestService.fetchTestDetails(testId);
      setSelectedTest(testDetails);
    } catch (error) {
      console.error('Error fetching test details:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista testów</Text>
      <FlatList
        data={tests}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.testItem}>
            <Text style={styles.testName}>{item.name}</Text>
            <Button
              title="Zobacz szczegóły"
              onPress={() => handleTestPress(item.id)}
            />
          </View>
        )}
      />
      {selectedTest && (
        <View style={styles.detailsContainer}>
          <Text style={styles.detailsTitle}>Szczegóły testu:</Text>
          <Text>Nazwa: {selectedTest.name}</Text>
          <Text>Opis: {selectedTest.description}</Text>
          <Text>Poziom: {selectedTest.level}</Text>
          <Text>Zadania: {selectedTest.numberOfTasks}</Text>
          <Text>Tagi: {selectedTest.tags.join(', ')}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  testItem: {
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  testName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  detailsContainer: {
    marginTop: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
  },
  detailsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
