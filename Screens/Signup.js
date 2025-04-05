import React, { useState } from "react";
import { View, StyleSheet, Image, KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword } from "firebase/auth";  // Importa a função de criar usuário
import { auth } from "../data/firebase";  // Instância do Firebase Auth

const SignUpScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");  // Para confirmação da senha
  const navigation = useNavigation();

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("User created:", user.email); // Exibe o e-mail do novo usuário
      navigation.navigate("Login"); // Redireciona para a tela de login após cadastro
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image source={require("../assets/ltclogo.png")} style={styles.logo} />
      

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
        <TextInput
          label="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          mode="outlined"
          style={styles.input}
        />
        <Button mode="contained" onPress={handleSignUp} style={styles.button}>
          Sign Up
        </Button>
        <Text style={styles.link} onPress={() => navigation.navigate("Login")}>
          Already have an account? Login
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
  },
  link: {
    marginTop: 20,
    textAlign: "center",
    color: "#007BFF",
  },
});

export default SignUpScreen;
