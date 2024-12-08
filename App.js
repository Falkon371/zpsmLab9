import { StyleSheet, Text, View, Button, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import React, { useCallback, useEffect, useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { Slider } from "@mui/material";
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { FlatList } from 'react-native-gesture-handler';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const WelcomeScreen = ({ onAccept }) => {
  return (
    <View style={styles.welcCont}>
      <Text style={styles.welTitle}>Regulamin</Text>
      <Text style={styles.welCon}>
        1. Używając aplikacji, zgadzasz się na warunki regulaminu.{"\n"}
        2. Twoje dane są chronione.{"\n"}
        ...
        10. Użytkownik zobowiązuje się do oddania własnej duszy twórcom
      </Text>
      <Button title="Akceptuję i kontynuuję" onPress={onAccept} />
    </View>
  );
};

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
                <Text style={{color: white}}>{answer.content}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}

function DrawerNavigator() {

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
    </Drawer.Navigator>
  );
}

function Results() {
  const [refreshing, setRefreshing] = useState(false);

  const tableData = [
    {id: 1 ,nick: "asds", point: 18, total: 20 , type: "test1", date: "21-10-2016"},
    {id: 2 ,nick: "klsf", point: 3,  total: 20 , type: "test1", date: "12-01-2014"},
    {id: 3 ,nick: "vxod", point: 13, total: 20 , type: "test1", date: "01-07-2022"},
    {id: 4 ,nick: "fenl", point: 12, total: 20 , type: "test1", date: "30-11-2019"},
  ]

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const Item = ({ nick, point, total, type, date }) => (
    <View style={[styles.row, styles.evenRow]}>
      <Text style={styles.cell}>{nick}</Text>
      <Text style={styles.cell}>{point}</Text>
      <Text style={styles.cell}>{total}</Text>
      <Text style={styles.cell}>{type}</Text>
      <Text style={styles.cell}>{date}</Text>
    </View>
  );

  return (
    <SafeAreaProvider style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <SafeAreaView>
        <ScrollView horizontal>
          <FlatList
            data={tableData}
            renderItem={({ item }) => (
              <Item nick={item.nick} point={item.point} total={item.total} type={item.type} date={item.date} />
            )}
            keyExtractor={(item) => item.id.toString()}
            ListHeaderComponent={() => (
              <View style={[styles.row, styles.header]}>
                <Text style={[styles.cell, styles.headerText]}>Nick</Text>
                <Text style={[styles.cell, styles.headerText]}>Point</Text>
                ...
              </View>
            )}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          />
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

function StackNavigator({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTitleAlign: 'center',
        headerLeft: () => (
          <Button onPress={() => navigation.openDrawer()} title="Menu" color="#000" />
        ),
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Results" component={Results} />
    </Stack.Navigator>
  );
}

export default function App() {
  const [firstLaunch, setFirstLaunch] = useState(null);

  useEffect(() => {
    SplashScreen.hide();
    const checkFirstLaunch = async () => {
      try {
        const hasLaunched = await AsyncStorage.getItem('hasLaunched');
        if (hasLaunched === null) {
          setFirstLaunch(true);
          await AsyncStorage.setItem('hasLaunched', 'true');
        } else {
          setFirstLaunch(false);
        }
      } catch (error) {
        console.error('Error checking first launch:', error);
      }
    };
    checkFirstLaunch();
  }, []);

  if (firstLaunch === null) {
    return (
      <View style={styles.cont}>
        <Text>Ładowanie...</Text>
      </View>
    );
  }

  if (firstLaunch) {
    return <WelcomeScreen onAccept={() => setFirstLaunch(false)} />;
  }

  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
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
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    
  },
  detailsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  }, row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  }, 
  header: {
    backgroundColor: '#4CAF50',
    width: "500px"
  },
  headerText: {
    fontWeight: 'bold',
    color: 'white',
  },
  cell: {
    flex: 1,
    padding: 10,
    textAlign: 'align'
  }, evenRow: {
    backgroundColor: '#f9f9f9',
  },
  oddRow: {
    backgroundColor: '#fff',
  },
  cont:{
    width: "700px",
    height: "500px",
    borderWidth: 1,
    borderColor: 'black',
  },
  answers: {
    width: "450px",
    height: "250px",
    flexDirection: "row",
    flexWrap: "wrap",
    borderWidth: 1,
    paddingHorizontal: 50,
    borderColor: "black",
    gap: 50,
    justifyContent: "space-around", 
    alignItems: "center", 
  },
  buttonWrapper: {
    width: 100, 
    backgroundColor: "blue",
    marginVertical: 10, 
  },
  idk:{
    width: "700px",
    height: "300px",
    justifyContent: "flex-end",
    alignItems: "center"
  }, teksty: {
    flexDirection: "row",
    justifyContent: "space-between"
  }, 
  h1:{
    textAlign: "center",
    fontSize: "25px",
    fontWeight: "bold"
  },
  slid:{
    width: "500px",
    alignItems: "center"
  },
  fgt:{
    width: "700px",
    alignItems: "center"
  }, 
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
