import React, { useState } from 'react';
import { View, TextInput, Text, ImageBackground, ScrollView, Alert, Keyboard, ActivityIndicator } from 'react-native';
import { Button } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { styles } from "../../styles/news/DeleteNewsStyles";
import MenuComponent from "../../components/menu/MenuComponent";


const backgroundImage = require("../../assets/fotonews.png");

export default function DeleteNewsScreen() {
  const navigation = useNavigation();

  const [artikel, setArtikel] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteNews = async () => {

    if (!artikel) {
      Alert.alert("⚠️ Please enter article number");
      return;
    }
    if (isNaN(artikel)) {
      Alert.alert("⚠️ Only numbers allowed");
      return;
    }

    setIsLoading(true);

    try {
      const url = `https://*********.com:****/api/news/${artikel}`;

      const response = await axios.delete(url);

      if (response.status === 200) {
        Keyboard.dismiss();
        Alert.alert(
          "✅ Message deleted",
          `Artikel-Nr. ${artikel} was successfully deleted`,
          [{ text: "OK" }]
        );
        setArtikel("");
      } else {
        Alert.alert("❌ Error", "Deletion not successful");
        console.log("⚠️ Unexpected status code:", response.status);
      }
    } catch (error) {
       const status = error?.response?.status;

      if (status === 404) {
        Alert.alert(
          "Error",
          `Artikel-Nr. ${artikel}  does not exist. Please check the number`
        );
      } else if (axios.isCancel(error)) {
        console.log("Request canceled");
      } else if (error.code === 'ECONNABORTED') {
        Alert.alert('Timeout', 'The request took too long');
      } else if (!error.response) {
        Alert.alert('Network error', 'No connection to the server');
      } else {
        Alert.alert('Error', error.message || error.toString());
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleArtikelChange = (text) => {
    setArtikel(text ?? "");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ImageBackground
        source={backgroundImage}
        resizeMode="stretch"
        style={styles.backgroundImage}  >
          <View style={{top: 10, alignSelf: 'flex-start', left: 10, borderColor: '#06019D', borderWidth: 1, borderRadius: 5,  padding: 2,  backgroundColor: 'white', zIndex: 10,}} >
                    <MenuComponent navigation={navigation} />
          </View>
          <View style={styles.formContainer}>
            <Text style={styles.text}>Please enter the article number of the message</Text>

            <TextInput
              style={styles.input}
              value={artikel}
              onChangeText={handleArtikelChange}
              placeholder="Artikel-Nr.:" keyboardType="numeric" />

            <Button
              style={styles.button}
              colorScheme="indigo"
              onPress={handleDeleteNews}
              isDisabled={isLoading}
              >
                <Text style={styles.buttonText}>
                  {isLoading ? "Delete..." : "Delete Article"}
                </Text>
            </Button>

            {isLoading && (
              <ActivityIndicator
                size="large"
                color="blue"
                style={{ marginTop: 20 }}
              />
            )}
        </View>
      </ImageBackground>
    </ScrollView>
  );
};