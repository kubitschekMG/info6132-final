import React, { useState } from "react";
import { View, StyleSheet, Image, KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { auth } from '../data/firebase';
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log("Logged in with: ", user.email); // Exibe o e-mail do usuário logado
        navigation.navigate("Hometab"); // Navega para a tela principal após login bem-sucedido
      } catch (error) {
        console.error(error.message);
      }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image source={require("../assets/ltclogo.png")} style={styles.logo} />
          <Image source={require("../assets/Login.png")} style={styles.secondImage} />

          <Text style={styles.title}>
         <Text style={styles.titleHighlight}>Login</Text>
      </Text>
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          mode="outlined"
          style={styles.input}
        />
        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          mode="outlined"
          style={styles.input}
        />
        <Button mode="contained" onPress={handleLogin} style={styles.button}>
          Login
        </Button>
        <Text style={styles.link} onPress={() => navigation.navigate("Signup")}>
          Don't have an account? Sign up
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "flex-start", 
    padding: 20,
  },
  logo: {
    width: 450,
    height: 150,
    alignSelf: "center",
    marginBottom: 20,
    marginTop: 20,
  },
  secondImage: {
    width: 400,
    height: 200,
    alignSelf: "center",
    marginBottom: 20,
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
    backgroundColor: "#007AC1",
    width: 370,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  link: {
    marginTop: 20,
    textAlign: "center",
    color: "#007BFF",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  titleHighlight: {
    color: "#007AC1",
    fontWeight: 'bold',
  },
});

export default LoginScreen;
