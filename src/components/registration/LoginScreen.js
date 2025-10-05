import React, { useState, useEffect, useRef } from "react";
import { ImageBackground, Text, View, StatusBar, Platform,  KeyboardAvoidingView, TextInput, Alert, Keyboard, Pressable, Dimensions } from 'react-native';
import { Box, Heading, VStack, FormControl, Link, Button, HStack, ScrollView } from 'native-base';
import { MaterialIcons } from "@expo/vector-icons";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { InteractionManager } from 'react-native';
import { styles } from "../../styles/registration/LogInStyles";


const { width, height } = Dimensions.get('window');
const wp = (percentage) => (width * parseFloat(percentage)) / 100;
const hp = (percentage) => (height * parseFloat(percentage)) / 100;
const isTablet = Math.min(width, height) >= 600;

const backgroundImage = require("../../assets/fotoLogin.jpg");

export default function LogInScreen() {

  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
      setIsShowKeyboard(true);
    });
    const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
      setIsShowKeyboard(false);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleLogin = async () => {
    if (isLoading) return;
    Keyboard.dismiss();

    if (!email.trim() || !password) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }

    setIsLoading(true);
    const controller = new AbortController();

    try {
      console.log('Start login with:', email, password);
      const response = await axios.post(
        'https://********.com:****/api/login',
        { email, password },
        {
          timeout: 10000,
          signal: controller.signal,
        }
      );

      if (response.status === 200 && response.data.userId) {
        const userId = response.data.userId ?? null;
        console.log("✅ userId from DB: ", userId);

        if (!userId) {
          console.error("❌ userId is empty or invalid");
          return;
        }

        await AsyncStorage.setItem("userId", String(userId));
        console.log("✅ AsyncStorage.setItem finished");

        InteractionManager.runAfterInteractions(() => {
          try {
            if (!navigation || typeof navigation.navigate !== 'function') {
              console.error("❌ Navigation is not available or navigate is not a function");
              return;
            }

            const state = navigation.getState();
            const routeNames = state?.routeNames || [];

            if (!routeNames.includes("MainTabs")) {
              console.error("❌ MainTabs is not registered");
              return;
            }

            console.log("➡️ Navigate to MainTabs...");
            navigation.replace("MainTabs");

          } catch (navError) {
            console.error('❌ Navigation error:', navError);
          }
        });

      } else {
        console.log('⚠️ Unexpected server response:', response.status);
        Alert.alert('Login failed', 'Invalid server response');
      }

    } catch (error) {
      console.error("❌ Netzwerk- odeNetwork or server error:", error);
      console.log("🧠 Error name:", error.name);

      if (error.name === 'AbortError') {
        Alert.alert('Canceled', 'The request was canceled');
      } else if (!error.response) {
        Alert.alert('No internet connection', 'Please check your network connection');
      } else {
        Alert.alert('Login failed', 'Email or password is invalid');
      }

    } finally {
      controller.abort();
      setEmail("");
      setPassword("");
      Keyboard.dismiss();
      setIsLoading(false);
    }
  };

  // Handler functions: check for undefind and null
  const handleEmailChange = (text) => {
    setEmail(text ?? "");
  };
  const handlePasswordChange = (text) => {
    setPassword(text ?? "");
  };

  return (
     <Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss} accessible={false}>
      <ImageBackground
        source={backgroundImage}
        resizeMode="stretch"
        style={styles.backgroundImage}
      >
        <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 20 : 0}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
          >
            <Box style={styles.box} safeArea>
              <Heading size="lg" style={styles.heading} >
                Welcome!
              </Heading>
              <Heading size="xs" style={styles.subheading} >
                Sign in to continue!
              </Heading>

              <VStack space={hp("2%")} mt={hp("2%")}>
                <FormControl>
                   <FormControl.Label _text={styles.labelText}>E-Mail</FormControl.Label>
                  <TextInput
                    style={styles.input}
                    placeholder="max.mustermann@*******.com"
                    value={email}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onChangeText={handleEmailChange}
                    autoComplete="off"
                    textContentType="none"
                    autoCorrect={false}
                  />
                </FormControl>

                <FormControl>
                   <FormControl.Label _text={styles.labelText}>Password</FormControl.Label>
                  <View
                    style={styles.inputContainer} >
                    <TextInput
                      style={styles.inputInner}
                      placeholder="Password"
                      value={password}
                      onChangeText={handlePasswordChange}
                      secureTextEntry={!showPassword}
                      autoCapitalize="none"
                      autoComplete="off"
                      textContentType="none"
                      autoCorrect={false}
                    />
                    <Pressable style={styles.icon} onPress={() => setShowPassword(!showPassword)}>
                      <MaterialIcons
                        name={showPassword ? "visibility" : "visibility-off"}
                        size={wp("6.5%")}
                        color="gray"
                      />
                    </Pressable>
                  </View>
                  <Link
                    _text={styles.linkText}
                    alignSelf="flex-end"
                    mt={1}
                    onPress={() => navigation.navigate("PassForgotScreen")}
                  >
                    Forgot your password?
                  </Link>
                </FormControl>

                <Button
                  style={styles.button}
                  colorScheme="indigo"
                  onPress={handleLogin}  >
                  <Text style={styles.buttonText}>Log in</Text>
                </Button>

                <HStack style={styles.hStack}>
                  <Text style={styles.smallText}>Don't have an account yet? </Text>
                  <Pressable onPress={() => navigation.navigate("SignUpScreen")}>
                    <Text style={styles.signUpLink}>
                      Create user account
                    </Text>
                  </Pressable>
                </HStack>
              </VStack>
            </Box>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </Pressable>
  );
}
