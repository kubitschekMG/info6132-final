import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import styles from "./Onboardstyles";

const Onboard3 = () => {
  const navigation = useNavigation();

  const handleNext = () => {
    navigation.navigate("Login"); // ou Login, dependendo do fluxo
  };

  const handleSkip = () => {
    navigation.replace("Login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.skip} onPress={handleSkip}>
        Skip
      </Text>

      <Image source={require("../../assets/Payment.png")} style={styles.image} />

      <Text style={styles.title}>
       Effortless<Text style={styles.titleHighlight}> Recharges</Text>
      </Text>

      <Text style={styles.subtitle}>
        Our integrated digital payment{"\n"}options will make your bus ride easier. {"\n"} Recharging your bus pass is now simpler than ever
      </Text>

      <View style={styles.dotsContainer}>
      <View style={styles.dot} />
        
        <View style={styles.dot} />
        <View style={styles.dotActive} />
        
      </View>

      <TouchableOpacity style={styles.buttonCircle} onPress={handleNext}>
        <FontAwesome name="chevron-right" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};




export default Onboard3;