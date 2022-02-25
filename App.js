import * as React from "react";
import { useEffect } from "react";
import { View, Text, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/login";
import HomeScreen from "./screens/home";
import PlayScreen from "./screens/play";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { LogBox } from "react-native";

//Ignore firebase old AsyncStorage warning, fix/migrate if planning to update react native version.
LogBox.ignoreLogs([
  "AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. See https://github.com/react-native-async-storage/async-storage",
]);

//Init stacks
const Stack = createNativeStackNavigator();

//Home navigator, replaces the login screen when user authenticates.
const HomeStack = () => {
  return (
    
    <Stack.Navigator initialRouteName="HomeScreen" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="PlayScreen" component={PlayScreen} />
    </Stack.Navigator>
    
  );
};

function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomeStack} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
