import React from "react";
import { ImageBackground, View, Text, SafeAreaView } from 'react-native';
import { styles } from "../../styles/home/HomeStyles";


const backgroundImage = require("../../assets/fotohome.png");

export default function HomeScreen() {
  console.log("HomeScreen loaded");
  return (

    <SafeAreaView style={styles.container} >
      <ImageBackground source={backgroundImage} resizeMode="stretch" blurRadius={2} style={styles.backgroundImage} >

      <View style={styles.view}>
      <Text style={styles.title}>Welcome!</Text>
      <Text style={styles.text}>
      Short description...
      </Text>
      </View>

      </ImageBackground>
    </SafeAreaView>
  );
}
