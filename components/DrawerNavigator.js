import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import StackNavigator from './StackNavigator';
import Results from './Results';
import DetailsScreen from './Details';
import SummaryScreen from './SummaryScreen'
import TestsScreen from './TestsScreen'

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {

   const tasks = [
    {
      question: "Który wódz po śmierci Gajusza Mariusza, prowadził wojnę domową z Sullą?",
      answers: [
        { content: "LUCJUSZ CYNNA", isCorrect: true },
        { content: "JULIUSZ CEZAR", isCorrect: false },
        { content: "LUCJUSZ MURENA", isCorrect: false },
        { content: "MAREK KRASSUS", isCorrect: false },
      ],
      duration: 30,
    },
    {
      question: "Który cesarz rzymski wprowadził edykt mediolański, legalizujący chrześcijaństwo?",
      answers: [
        { content: "KONSTANTYN WIELKI", isCorrect: true },
        { content: "NERON", isCorrect: false },
        { content: "TRAJAN", isCorrect: false },
        { content: "DIOCLETIAN", isCorrect: false },
      ],
      duration: 30,
    },
    {
      question: "W którym roku miała miejsce bitwa pod Termopilami?",
      answers: [
        { content: "480 p.n.e.", isCorrect: true },
        { content: "490 p.n.e.", isCorrect: false },
        { content: "479 p.n.e.", isCorrect: false },
        { content: "500 p.n.e.", isCorrect: false },
      ],
      duration: 30,
    },
    {
      question: "Który król Polski był inicjatorem unii lubelskiej?",
      answers: [
        { content: "Zygmunt II August", isCorrect: true },
        { content: "Władysław Jagiełło", isCorrect: false },
        { content: "Kazimierz Wielki", isCorrect: false },
        { content: "Stefan Batory", isCorrect: false },
      ],
      duration: 30,
    },
  ];

  return (
    <Drawer.Navigator screenOptions={{ drawerType: 'slide', headerShown: false }}>
      <Drawer.Screen name="Ekran Główny" component={StackNavigator} />
      <Drawer.Screen name="Wyniki" component={Results} />
      {tasks.map((task, index) => (
        <Drawer.Screen
          key={index}
          name={`Test ${index + 1}`}
          component={DetailsScreen}
          initialParams={{ tytul: `Test #${index + 1}`, task }}
        />
      ))}
      <Drawer.Screen name="Podsumowanie" component={SummaryScreen}/>
      <Drawer.Screen name="Test" component={TestsScreen}/>
    </Drawer.Navigator>
  );
}
