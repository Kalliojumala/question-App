import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/login';
import HomeScreen from './screens/home';
import PlayScreen from './screens/play';
import { SafeAreaProvider } from 'react-native-safe-area-context';

//Init stacks
const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName='HomeScreen'>
      <Stack.Screen name="HomeScreen" component={HomeScreen}/>
      <Stack.Screen name="PlayScreen" component={PlayScreen}/>
    </Stack.Navigator>
  )
}

function App() {
  return (
    <SafeAreaProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeStack} />
        
      </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;


