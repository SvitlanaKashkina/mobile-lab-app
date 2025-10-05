import React, { useState, useEffect  } from "react";
import { ImageBackground, View, StatusBar, Platform, Alert, KeyboardAvoidingView, TextInput, Keyboard, Pressable, TouchableOpacity, Dimensions, Text, InteractionManager } from 'react-native';
import { Box, Heading, VStack, FormControl, Button } from 'native-base';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from "../../styles/registration/PassForgotStyles";

const { width, height } = Dimensions.get('window');
const wp = (percentage) => (width * parseFloat(percentage)) / 100;
const hp = (percentage) => (height * parseFloat(percentage)) / 100;

const backgroundImage = require("../../assets/fotoLogin.jpg");

export default function PassForgotScreen() {

  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState('');

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handlePasswordRequest = async () => {
    if (!email || !pin) {
      Alert.alert('Error', 'Please enter both email and PIN');
      return;
    }
    try {
      const response = await axios.post('https://*********.com:****/api/forgot-password', {
        email,
        pin,
      });
      console.log("response.status:", response.status);

      if (response.status === 200) {
          const password = response.data?.password;

          if (!password) {
            Alert.alert('Error', 'No password received!');
            return;
          }

          // Ensure that Alert runs on the UI thread
          Alert.alert(
          'Your password:',
          `${password}`,
          [
            {
              text: 'OK',
              onPress: () => {
                setEmail("");
                setPin("");
                Keyboard.dismiss();

                InteractionManager.runAfterInteractions(() => {

                   try {
                     if (!navigation || typeof navigation.navigate !== 'function') {
                       throw new Error("Navigation is not available");
                     }

                     navigation.navigate("LogInScreen");
                   } catch (navError) {
                     console.error('❌ Navigation error:', navError);
                     Alert.alert("Navigation error", navError.message);
                   }
                 });
              }
            }
          ],
          { cancelable: false }
        );
      }
    } catch (error) {
      if (!error.response) {
        // Error with no response from server
        InteractionManager.runAfterInteractions(() => {
          Alert.alert(
            'No internet connection',
            'Check your network and try again'
          );
        });
      } else {
        // Other errors, e.g. 4xx or 5xx from the server
          InteractionManager.runAfterInteractions(() => {
            Alert.alert('Error', 'Please check your entries.');
          });
      }
    }
  };

  return (
    <Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss} accessible={false}>
    <View style={styles.container} >
      <StatusBar
              translucent
              backgroundColor="transparent"
              barStyle={Platform.OS === "ios" ? "dark-content" : "light-content"}
      />

      <ImageBackground source={backgroundImage} resizeMode="stretch" style={styles.backgroundImage}  >
          <TouchableOpacity
                  style={styles.backButton}
                  onPress={() => { Keyboard.dismiss(); navigation.replace("LogInScreen")}}
                >
                  <Ionicons name="arrow-back" size={24} color="#FE9900" />
                  <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>

          <View style={{...styles.view, marginTop: isKeyboardVisible ? hp("15%") : hp("30%") }}>
            <Box style={styles.box} safeArea>

              <Heading style={styles.heading} size="lg">Forgot password</Heading>
              <Heading style={styles.subheading}  size="xs">If you have forgotten your password, please enter your registered email address and PIN code</Heading>

              <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'position' : 'height'} >
              <VStack >
                <FormControl>
                  <FormControl.Label _text={ styles.text } >E-mail</FormControl.Label>
                  <TextInput style={styles.input} placeholder="max.mustermann@********.com" value={email} keyboardType="email-address" autoCapitalize="none" onChangeText={(text) => setEmail(text ? text.toLowerCase() : "")} onFocus={() => setKeyboardVisible(true)} />
                </FormControl>

                <FormControl>
                  <FormControl.Label _text={ styles.text } >PIN-Code</FormControl.Label>
                  <TextInput style={styles.input} placeholder="****" value={pin} onChangeText={(text) => setPin(text ?? "")} onFocus={() => setKeyboardVisible(true)} keyboardType="numeric" maxLength={4} />
                </FormControl>

                <Button style={styles.button} colorScheme="indigo" onPress={handlePasswordRequest} >Request password</Button>

              </VStack>
              </KeyboardAvoidingView>
            </Box>
          </View>
      </ImageBackground>
      </View>
      </Pressable>
  );
}
