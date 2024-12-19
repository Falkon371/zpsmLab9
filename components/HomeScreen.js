import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'space-between', padding: 10 }}>
      <View>
        {Array.from({ length: 4 }, (_, index) => (
          <TouchableOpacity
            key={index}
            style={styles.test}
            onPress={() => navigation.navigate(`${index + 1}`, { tytul: `Test #${index + 1}` })}
          >
            <Text style={styles.testTitle}>Test #{index + 1}</Text>
            <Text>#tag1</Text>
            <Text>#tag2</Text>
            <Text>Lorem ipsum dolor sit amet...</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.footer}>
        <Button title="Pokaż wyniki" onPress={() => navigation.navigate('Results')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  test: {
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
  },
  testTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  footer: {
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    alignItems: 'center',
  },
});

export default HomeScreen;