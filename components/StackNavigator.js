import { Button } from "react-native";
import HomeScreen from './HomeScreen';
import Results from './Results'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import TestsScreen from './data'

const Stack = createStackNavigator();

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
      <Stack.Screen name="Tests" component={TestsScreen}/>
    </Stack.Navigator>
  );
}

export default StackNavigator;