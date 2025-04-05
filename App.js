import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./Screens/Login";
import SignupScreen from "./Screens/Signup";
import TabNavigator from "./Config/TabNavigator"; // Importa a navegação de abas
import { PaperProvider } from "react-native-paper";

const Stack = createStackNavigator();

export default function App() {
  return (
    <PaperProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Home" component={TabNavigator} /> 
      </Stack.Navigator>
    </NavigationContainer>
    </PaperProvider>
  );
}
