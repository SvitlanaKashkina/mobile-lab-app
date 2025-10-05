import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, Alert,TouchableOpacity, KeyboardAvoidingView, Platform, Pressable, Keyboard, ImageBackground, ScrollView, Dimensions } from "react-native";
import { useNavigation } from '@react-navigation/native';
import {  Image } from "native-base";
import { styles } from "../../styles/feedBack/FeedbackStyles.js";
import MenuComponent from "../../components/menu/MenuComponent.js";


const { width, height } = Dimensions.get('window');
const wp = (percentage) => (width * parseFloat(percentage)) / 100;
const hp = (percentage) => (height * parseFloat(percentage)) / 100;
const isTablet = width >= 768;

const backgroundImage = require("../../assets/feedbackbackground.png");

export default function FeedbackScreen() {
  const navigation = useNavigation();
  const [betreff, setBetreff] = useState("");
  const [feedback, setFeedback] = useState("");
  const [showKeyboard, setShowKeyboard] = useState(false);
  const scrollRef = useRef(null);

  // Send feedback data (subject, feedback) to server
  const sendFeedback = async () => {
      console.log("betreff: ", betreff);
      console.log("feedback: ", feedback);

    //  Checking if subject and feedback are not empty
    if (!betreff.trim() || !feedback.trim()) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    try {
      //  Send a POST request to backend with subject and feedback in JSON format
      const response = await fetch("https://*********.com:****/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
        betreff: betreff,
        feedback: feedback
      })
      });

      const text = await response.text(); // for debugging
      console.log("Server response:", text);

      //  Check if the response from the server was successful (status 200-299)
      if (response.ok) {
        Alert.alert("Thank you!", "Your feedback has been sent");
        setBetreff("");
        setFeedback("");
      } else {
        Alert.alert("Error", "Feedback could not be sent");
        console.log("Error", "Feedback could not be sent");
      }
    } catch (error) {
      Alert.alert("Network error", "No connection to the server");
      console.error(error);
    }
  };

  // Keyboard setup
  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", () => setShowKeyboard(true));
    const hideSub = Keyboard.addListener("keyboardDidHide", () => setShowKeyboard(false));

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const handleChangeBetreff = (text) => {
    setBetreff(text ?? "");
  };

  const handleChangeFeedback = (text) => {
    setFeedback(text ?? "");
  };

  return (
    <KeyboardAvoidingView style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0} >
    <Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss} accessible={false} >
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}  >
      <View style={{top: 10, alignSelf: 'flex-start', left: 10, borderColor: '#06019D', borderWidth: 1, borderRadius: 5,  padding: 2,  backgroundColor: 'white', zIndex: 10,}} >
          <MenuComponent navigation={navigation} />
      </View>
      <ScrollView  ref={scrollRef} contentContainerStyle={[styles.scrollContainer, { paddingBottom: hp("20%") }]} keyboardShouldPersistTaps="handled" >
        <View style={[styles.box, { marginTop: showKeyboard ? hp("0%") : hp("2%") }]} >
        <Image  source={require("../../assets/feedbackimage.png")} style={styles.feedbackImage}/>
            <Text style={styles.label} >Add subject:</Text>
            <TextInput
                style={styles.input}
                multiline
                placeholder="Enter subject..."
                value={betreff}
                onChangeText={handleChangeBetreff}
                textAlignVertical="top"
            />

            <Text style={styles.label} >Please leave your feedback:</Text>
            <TextInput
                 style={[styles.input, { height: isTablet ? 180 : hp("18%") }]}
                multiline
                placeholder="Enter text..."
                value={feedback}
                onChangeText={handleChangeFeedback}
                textAlignVertical="top"
                onFocus={() =>
                  scrollRef.current?.scrollToEnd({ animated: true })
                }
            />
            <Text style={styles.text}>*You can leave your feedback here anonymously and confidentially</Text>
            <TouchableOpacity style={styles.button} onPress={sendFeedback}>
              <Text style={styles.textButton}>Send feedback</Text>
            </TouchableOpacity>
        </View>
      </ScrollView>
      </ImageBackground>
    </Pressable>
    </KeyboardAvoidingView>
  );
}
