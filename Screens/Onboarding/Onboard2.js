import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import styles from "./Onboardstyles";

const Onboard2 = () => {
  const navigation = useNavigation();

  const handleNext = () => {
    navigation.navigate("OnBoard3"); // ou Login, dependendo do fluxo
  };

  const handleSkip = () => {
    navigation.replace("Login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.skip} onPress={handleSkip}>
        Skip
      </Text>

      <Image source={require("../../assets/BusStop.png")} style={styles.image2} />

      <Text style={styles.title}>
        Quick And Reliable {"\n"} <Text style={styles.titleHighlight}>Bus tracking</Text>
      </Text>

      <Text style={styles.subtitle}>
        Use our real-time tracking feature to {"\n"}see exactly where your bus is and {"\n"}when it will arrive at your stop.
      </Text>

      <View style={styles.dotsContainer}>
      <View style={styles.dot} />
        <View style={styles.dotActive} />
        <View style={styles.dot} />
        
      </View>

      <TouchableOpacity style={styles.buttonCircle} onPress={handleNext}>
        <FontAwesome name="chevron-right" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};




export default Onboard2;