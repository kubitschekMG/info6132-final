import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import styles from "./Onboardstyles";

const Onboard1 = () => {
  const navigation = useNavigation();

  const handleNext = () => {
    navigation.navigate("OnBoard2"); // ou Login, dependendo do fluxo
  };

  const handleSkip = () => {
    navigation.replace("Login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.skip} onPress={handleSkip}>
        Skip
      </Text>

      <Image source={require("../../assets/ltcbus.png")} style={styles.image} />

      <Text style={styles.title}>
        Welcome to {"\n"} <Text style={styles.titleHighlight}>London Transit App!</Text>
      </Text>

      <Text style={styles.subtitle}>
        Getting your day-to-day bus travel{"\n"}updates is now just a matter of new clicks!
      </Text>

      <View style={styles.dotsContainer}>
        <View style={styles.dotActive} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>

      <TouchableOpacity style={styles.buttonCircle} onPress={handleNext}>
        <FontAwesome name="chevron-right" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};




export default Onboard1;