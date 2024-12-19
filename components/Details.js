import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';

function DetailsScreen({ route }) {
  const { tytul, task = {} } = route.params || {};
  const [value, setValue] = useState(0);

  const handleValue = (event, newValue) => {
    setValue(newValue);
  };

  if (!task.question) {
    return (
      <View style={styles.centered}>
        <Text>Task not found!</Text>
      </View>
    );
  }

  return (
    <View style={styles.centered}>
      <View style={styles.cont}>
        <Text style={styles.detailsTitle}>{tytul}</Text>
        <View style={styles.teksty}>
          <Text>Question</Text>
          <Text>Time: 24:09</Text>
        </View>
        <View style={styles.fgt}>
          <View style={styles.slid}>
            <Slider
              value={value}
              onChange={handleValue}
              min={0}
              max={100}
              valueLabelDisplay="auto"
              orientation="horizontal"
            />
          </View>
        </View>
        <Text style={styles.h1}>{task.question}</Text>
        <View style={styles.idk}>
          <View style={styles.answers}>
            {task.answers.map((answer, index) => (
              <TouchableOpacity
                key={index}
                style={styles.buttonWrapper}
                onPress={() => console.log(answer.isCorrect)}
              >
                <Text style={{ color: 'white' }}>{answer.content}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },
  cont: {
    width: '700px',
    height: '500px',
    borderWidth: 1,
    borderColor: 'black',
  },
  detailsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  teksty: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fgt: {
    width: '700px',
    alignItems: 'center',
  },
  slid: {
    width: '500px',
    alignItems: 'center',
  },
  h1: {
    textAlign: 'center',
    fontSize: '25px',
    fontWeight: 'bold',
  },
  idk: {
    width: '700px',
    height: '300px',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  answers: {
    width: '450px',
    height: '250px',
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderWidth: 1,
    paddingHorizontal: 50,
    borderColor: 'black',
    gap: 50,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  buttonWrapper: {
    width: 100,
    backgroundColor: 'blue',
    marginVertical: 10,
  },
});

export default DetailsScreen;