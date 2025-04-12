import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./Screens/Login";
import SignupScreen from "./Screens/Signup";
import TabNavigator from "./Config/TabNavigator"; // Importa a navegação de abas
import { PaperProvider } from "react-native-paper";
import Intro1 from './Screens/Intro/Intro';
import Intro2 from './Screens/Intro/Intro2';
import Onboard1 from "./Screens/Onboarding/Onboard1";
import Onboard2 from "./Screens/Onboarding/Onboard2";
import Onboard3 from "./Screens/Onboarding/Onboard3";

const Stack = createStackNavigator();

export default function App() {
  return (
    <PaperProvider>
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Intro1" screenOptions={{ headerShown: false }}>
  <Stack.Screen name="Intro1" component={Intro1} />
  <Stack.Screen name="Intro2" component={Intro2} />
  <Stack.Screen name="OnBoard1" component={Onboard1} />
  <Stack.Screen name="OnBoard2" component={Onboard2} />
  <Stack.Screen name="OnBoard3" component={Onboard3} />
  <Stack.Screen name="Login" component={LoginScreen} />
  <Stack.Screen name="Signup" component={SignupScreen} />
  <Stack.Screen name="Hometab" component={TabNavigator} screenOptions={{ headerShown: false }}/>
</Stack.Navigator>
    </NavigationContainer>
    </PaperProvider>
  );
}
