import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../data/firebase";

const SignUpScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigation = useNavigation();

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match!");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("User created:", user.email);
      setErrorMsg("");
      navigation.navigate("Login");
    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image source={require("../assets/ltclogo.png")} style={styles.logo} />
         <Text style={styles.title}>
                 <Text style={styles.titleHighlight}>Sign up</Text>
              </Text>

        {errorMsg ? <Text style={styles.errorText}>{errorMsg}</Text> : null}

        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          mode="outlined"
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
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
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
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

export default SignUpScreen;
