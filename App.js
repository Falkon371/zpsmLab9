import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WelcomeScreen from './components/Welcome';
import {Text, View, Button} from 'react-native';
import DrawerNavigator from './components/DrawerNavigator';

export default function App() {
  const [firstLaunch, setFirstLaunch] = useState(null);

  useEffect(() => {
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
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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