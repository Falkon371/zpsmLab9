import React from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';

export default function SummaryScreen({ route, navigation }) {
  const { nick = "Jan", score, total, type = "historia" } = route.params;

  const handleSendResults = async () => {
    const payload = {
      nick,
      score,
      total,
      type,
    };

    try {
      const response = await fetch('http://tgryl.pl/quiz/result', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        Alert.alert('Sukces', 'Wynik został przesłany pomyślnie!');
        navigation.navigate('Results');
      } else {
        Alert.alert('Błąd', 'Nie udało się przesłać wyników. Spróbuj ponownie.');
      }
    } catch (error) {
      console.error('Error sending results:', error);
      Alert.alert('Błąd', 'Wystąpił problem z przesyłaniem wyników.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.summaryTitle}>Podsumowanie testu</Text>
      <Text>Nick: {nick}</Text>
      <Text>Wynik: {score}/{total}</Text>
      <Text>Kategoria: {type}</Text>
      <Button title="Wyślij wynik" onPress={handleSendResults} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  summaryTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
