import React, { useState } from "react";
import { View, StyleSheet, Alert, Image } from "react-native";
import { Text, Button } from "react-native-paper";
import { CreditCardInput } from "react-native-credit-card-input";
import styles from "./styles";
import { db } from "../data/firebase";
import { addDoc, collection } from "firebase/firestore";

const Payments = () => {
  const [cardData, setCardData] = useState({
    values: {
      number: "",
      expiry: "",
      cvc: "",
      name: "",
    },
  });

  const [formKey, setFormKey] = useState(0); // chave para resetar o form

  const handleCardChange = (formData) => {
    setCardData(formData);
  };

  const handlePayment = async () => {
    const { number, expiry, cvc, name } = cardData?.values || {};

    if (!number || !expiry || !cvc ) {
      Alert.alert("Error", "Please fill in all the fields.");
      return;
    }

    try {
      await addDoc(collection(db, "Payment"), {
        cardNumber: number,
        expiry,
        cvc,
        createdAt: new Date(),
      });

      Alert.alert("Success", "Payment details added successfully!");

      // resetar os campos visualmente
      setCardData({
        values: {
          number: "",
          expiry: "",
          cvc: "",
        },
      });
      setFormKey(prev => prev + 1); // força a recriação do componente
    } catch (error) {
      console.error("Error saving payment details: ", error);
      Alert.alert("Error", "There was an issue adding your payment details.");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/ltclogo.png")} style={styles.logo} />
      <Text style={styles.title}>Enter Your Payment Details</Text>

      <CreditCardInput
        key={formKey} // força a recriação para limpar
        onChange={handleCardChange}
        requiresName
        requiresCVC
        values={cardData.values}
      />

      <Button mode="contained" onPress={handlePayment} style={styles.button}>
        Add Payment Method
      </Button>
    </View>
  );
};

export default Payments;

