import React, { useState, useEffect, useRef } from "react";
import { ScrollView, View, Text, TextInput, ImageBackground, Alert, Platform, Keyboard, KeyboardAvoidingView, TouchableOpacity, Pressable, Dimensions } from 'react-native';
import { Box, Heading, VStack, FormControl, StatusBar, Button } from "native-base";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { InteractionManager } from 'react-native';
import * as ImagePicker from "expo-image-picker";
import { styles } from "../../styles/registration/SignUpStyles";
import registerForPushNotificationsAsync from "../../utils/pushNotifications";

const { width, height } = Dimensions.get('window');
const wp = (percentage) => (width * parseFloat(percentage)) / 100;
const hp = (percentage) => (height * parseFloat(percentage)) / 100;
const { width: screenWidth } = Dimensions.get('window');
const isTablet = screenWidth >= 768;

const backgroundImage = require("../../assets/fotoLogin.jpg");

export default function SignUpScreen() {
  const navigation = useNavigation();

  const [userData, setUserData] = useState({
    firstname: '',
    lastname: '',
    position: '',
    email: '',
    password: '',
    pin: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(true);

  const handleRegister = async () => {
    if (isLoading) return;
    setIsLoading(true);

    const cleanEmail = userData.email.trim().toLowerCase();

    // Check mandatory fields
    if (!userData.firstname || !userData.lastname || !userData.position || !userData.email || !userData.password || !confirmPassword || !userData.pin) {
      Alert.alert("Error", "Please fill in all fields!");
      setIsLoading(false);
      return;
    }

    // Password check
    if (userData.password !== confirmPassword) {
      Alert.alert("Error", "The passwords do not match");
      setIsLoading(false);
      return;
    }

    // Email validation
    if (!/^[a-zA-Z0-9._%+-]+@company\.com$/.test(cleanEmail)) {
      Alert.alert("Error", "Please enter a valid @********.com email.");
      setIsLoading(false);
      return;
    }

    // Check PIN format (4 digits)
    if (!/^\d{4}$/.test(userData.pin)) {
      Alert.alert('Fehler', 'The PIN must consist of exactly 4 digits');
      setIsLoading(false);
      return;
    }

    const pinInt = parseInt(userData.pin, 10);
    const payload = { ...userData, email: cleanEmail, pin: pinInt, foto: null, pushtoken: "" };

    try {
      // Register user
      const response = await axios.post(
        'https://*********.com:****/api/users',
        payload,
        { timeout: 20000 }
      );

      if (response.status === 201 && response.data.userId) {
        const userId = response.data.userId ?? null;

        //  Register user
        try {
          await AsyncStorage.setItem('userId', String(userId));
          console.log('✅ userId stored:', userId);
        } catch (error) {
          console.log('⚠️ Error saving userId:', error);
        }

        // Register push token
        try {
          const pushToken = await registerForPushNotificationsAsync(userId);
          if (pushToken) {
            console.log('✅ Push token registered:', pushToken);
          } else {
            console.log('⚠️ No push token received');
          }
        } catch (error) {
          console.log('⚠️ Error during push token registration:', error);
        }

        // Media access survey
        try {
          const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status !== 'granted') {
            Alert.alert('Permission denied', 'Access to the gallery was not permitted');
            return;
          }
        } catch (error) {
          console.error('Error during authorization query:', error);
          Alert.alert('Error', 'Authorization could not be queried');
          return;
        }

        // User was created successfully
        Alert.alert('Success', 'User created!', [
          {
            text: "OK",
            onPress: () => {
              // Felder leeren
              setUserData({
                firstname: '',
                lastname: '',
                position: '',
                email: '',
                password: '',
                pin: ''
              });
              setConfirmPassword('');
              Keyboard.dismiss();

              // Navigation after user creation
              InteractionManager.runAfterInteractions(() => {
                try {
                  if (!navigation || typeof navigation.navigate !== 'function') {
                    console.log("❌ Navigation is not available or navigate is not a function");
                    return;
                  }

                  const state = navigation.getState();
                  const routeNames = state?.routeNames || [];

                  if (!routeNames.includes("MainTabs")) {
                    console.log("❌ MainTabs is not registered");
                    return;
                  }

                  navigation.replace("MainTabs");

                } catch (navError) {
                  console.error('❌ Navigation error:', navError);
                }
              });
            }
          }
        ]);

      } else {
        console.log('❌ No userId in the response');
        Alert.alert('Error', 'No user ID in the response');
      }

    } catch (error) {
      console.log('Error:', JSON.stringify(error, null, 2));
      Alert.alert('Error', error.response?.data?.error || error.message || 'Unknown error');
    } finally {
      if (isMounted?.current ?? true) {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
      setShowKeyboard(true);
    });
    const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
      setShowKeyboard(false);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  // Check for null or undefined in textinput at onChangeText
  const handleChange = (setter, key) => (text) => {
    if (text === undefined || text === null) {
      setter(prev => ({ ...prev, [key]: "" }));
    } else {
      setter(prev => ({ ...prev, [key]: text }));
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "padding"}
      keyboardVerticalOffset={Platform.OS === "ios" ? hp("5%") : 0}
    >
      <Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss} accessible={false}>

        <View style={styles.container}>
          <StatusBar
                  translucent
                  backgroundColor="transparent"
                  barStyle={Platform.OS === "ios" ? "dark-content" : "light-content"}
          />
          <ImageBackground source={backgroundImage} resizeMode="stretch" style={styles.backgroundImage}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              Keyboard.dismiss();
              navigation.replace('LogInScreen');
            }}
          >
            <Ionicons name="arrow-back" size={24} color="#FE9900" />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>

            <ScrollView
              contentContainerStyle={{
                flexGrow: 1,
                justifyContent: 'flex-start',
                alignItems: 'center',
                paddingBottom: hp("10%"),
                marginTop: showKeyboard ? hp("5%") : hp("17%"),
              }}
              keyboardShouldPersistTaps="handled"
            >
            <Box style={styles.box} safeArea>
              <Heading style={styles.heading}>Create user account</Heading>

                <VStack >
                  {/* First name */}
                  <FormControl>
                    <FormControl.Label>
                      <Text style={styles.label}>First name</Text>
                    </FormControl.Label>
                    <TextInput  style={styles.input}
                                value={userData.firstname ?? ""}
                                onChangeText={handleChange(setUserData, "firstname")}
                                onFocus={() => setShowKeyboard(true)}
                                autoComplete="off"
                                textContentType="none"
                                autoCorrect={false} />
                  </FormControl>

                  {/* Last name */}
                  <FormControl>
                    <FormControl.Label>
                      <Text style={styles.label}>Last name</Text>
                    </FormControl.Label>
                    <TextInput  style={styles.input}
                                value={userData.lastname ?? ""}
                                onChangeText={handleChange(setUserData, "lastname")}
                                onFocus={() => setShowKeyboard(true)}
                                autoComplete="off"
                                textContentType="none"
                                autoCorrect={false} />
                  </FormControl>

                  {/* Position */}
                  <FormControl>
                    <FormControl.Label>
                      <Text style={styles.label}>Job title</Text>
                    </FormControl.Label>
                    <TextInput  style={styles.input}
                                value={userData.position ?? ""}
                                onChangeText={handleChange(setUserData, "position")}
                                onFocus={() => setShowKeyboard(true)}
                                autoComplete="off"
                                textContentType="none"
                                autoCorrect={false}/>
                  </FormControl>

                  {/* E-Mail */}
                  <FormControl>
                    <FormControl.Label>
                      <Text style={styles.label}>E-Mail</Text>
                    </FormControl.Label>
                    <TextInput  style={styles.input}
                                value={userData.email ?? ""}
                                placeholder="Max.Mustermann@*******.com"
                                onChangeText={handleChange(setUserData, "email")}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                onFocus={() => setShowKeyboard(true)}
                                autoComplete="off"
                                textContentType="none"
                                autoCorrect={false} />
                  </FormControl>

                  {/* Password */}
                  <FormControl>
                    <FormControl.Label>
                      <Text style={styles.label}>Password</Text>
                    </FormControl.Label>
                    <View style={styles.inputContainer}>
                      <TextInput  style={styles.input}
                                  value={userData.password ?? ""}
                                  placeholder="Password"
                                  onChangeText={handleChange(setUserData, "password")}
                                  secureTextEntry={!showPassword}
                                  onFocus={() => setShowKeyboard(true)}
                                  autoComplete="off"
                                  textContentType="none"
                                  autoCorrect={false} />

                      <Pressable onPress={() => setShowPassword(!showPassword)} style={styles.icon}>
                      <MaterialIcons name={showPassword ? "visibility" : "visibility-off"}  size={hp("3%")} color="gray" />
                      </Pressable>
                    </View>
                  </FormControl>

                  {/* Confirm password */}
                  <FormControl>
                    <FormControl.Label>
                      <Text style={styles.label}>Confirm password</Text>
                    </FormControl.Label>
                    <View style={styles.inputContainer}>
                    <TextInput  style={styles.input}
                                value={confirmPassword ?? ""}
                                placeholder="Confirm password"
                                secureTextEntry={!showConfirmPassword}
                                onChangeText={(text) => setConfirmPassword(text ?? "")}
                                onFocus={() => setShowKeyboard(true)}
                                autoComplete="off"
                                textContentType="none"
                                autoCorrect={false} />

                    <Pressable onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.icon}>
                    <MaterialIcons name={showConfirmPassword ? "visibility" : "visibility-off"}  size={hp("3%")} color="gray" />
                    </Pressable>
                    </View>
                  </FormControl>

                   {/* PIN */}
                  <FormControl>
                    <FormControl.Label _text={ styles.label } >PIN-Code</FormControl.Label>
                    <TextInput  style={styles.input}
                                value={userData.pin ?? ""}
                                placeholder="****"
                                onChangeText={handleChange(setUserData, "pin")}
                                onFocus={() => setShowKeyboard(true)}
                                keyboardType="numeric" maxLength={4}
                                autoComplete="off"
                                textContentType="none"
                                autoCorrect={false} />
                  </FormControl>

                  {/* Register button */}
                  <Button style={styles.button}  colorScheme="blue" onPress={handleRegister} >
                  <Text style={{ fontSize: wp("4%"), color: "white" }}>Register</Text>
                  </Button>
              </VStack>
            </Box>
          </ScrollView>
        </ImageBackground>
      </View>
    </Pressable>
    </KeyboardAvoidingView>
  );
}