import React, { useEffect } from "react";
import { View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "../stylesIntro";

const Intro2 = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("OnBoard1"); // ou "Intro2", ou qualquer outra
    }, 1500); // 3 segundos

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/Branding.png")} style={styles.image} />
      <Image source={require("../../assets/bottomimage .png")} style={styles.image2} />
    </View>
  );
};

export default Intro2;