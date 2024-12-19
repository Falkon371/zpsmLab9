import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

const WelcomeScreen = ({ onAccept }) => {
  return (
    <View style={styles.welcCont}>
      <Text style={styles.welTitle}>Regulamin</Text>
      <Text style={styles.welCon}>
        1. Używając aplikacji, zgadzasz się na warunki regulaminu.{"\n"}
        2. Twoje dane są chronione.{"\n"}
        ...{"\n"}
        10. Użytkownik zobowiązuje się do oddania własnej duszy twórcom
      </Text>
      <Button title="Akceptuję i kontynuuję" onPress={onAccept} />
    </View>
  );
};

const styles = StyleSheet.create({
  welcCont: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  welTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  welCon: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center'
  }
});

export default WelcomeScreen;
