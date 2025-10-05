import React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { Button } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { styles } from "../../styles/news/NewsManagementStyles";
import MenuComponent from "../../components/menu/MenuComponent.js";


const backgroundImage = require("../../assets/fotonews.png");

export default function NewsManagement() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ImageBackground source={backgroundImage} resizeMode="stretch" style={styles.backgroundImage}  >
        <View style={{top: 10, alignSelf: 'flex-start', left: 10, borderColor: '#06019D', borderWidth: 1, borderRadius: 5,  padding: 2,  backgroundColor: 'white', zIndex: 10,}} >
              <MenuComponent navigation={navigation} />
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.text}>Here you can create a new message {"\n"} or delete an old message {"\n"}. {"\n"} To do so, use the navigation buttons</Text>

          <View style={styles.buttonContainer}>
            <Button style={styles.button} colorScheme="indigo" onPress={() => navigation.navigate("CreateNewsScreen")}>
            <Text  style={styles.buttonText}>Create message</Text>
            </Button>

            <Button style={styles.button} colorScheme="indigo" onPress={() => navigation.navigate("DeleteNewsScreen")}>
            <Text style={styles.buttonText}>Delete message</Text>
            </Button>
          </View>

      </View>
      </ImageBackground>
    </View>
  );
};