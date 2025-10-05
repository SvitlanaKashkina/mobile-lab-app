import React, { useState } from 'react';
import axios from 'axios';
import { View, TextInput, ImageBackground, ScrollView, Alert , Image, TouchableOpacity, KeyboardAvoidingView, Platform, Pressable, Keyboard, ActivityIndicator } from 'react-native';
import { Button, FormControl , Box, Text} from 'native-base';
import { Dimensions } from 'react-native';
import * as ImagePicker from "expo-image-picker";
import Entypo from '@expo/vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MenuComponent from "../../components/menu/MenuComponent";
import { styles } from "../../styles/news/CreateNewsStyles";


const { width, height } = Dimensions.get('window');
const wp = (percentage) => (width * parseFloat(percentage)) / 100;
const hp = (percentage) => (height * parseFloat(percentage)) / 100;
const isTablet = Math.min(width, height) >= 600;

const backgroundImage = require("../../assets/fotonews.png");

export default function CreateNewsScreen() {
  const navigation = useNavigation();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [isShowKeyBoard, setShowKeyboard] = useState(false);
  const [titleHeight, setTitleHeight] = useState(50);
  const [contentHeight, setContentHeight] = useState(140);
  const [authorHeight, setAuthorHeight] = useState(50);
  const [isLoading, setIsLoading] = useState(false);

  // Image upload function
  const pickImage = async () => {
    // Request permission for media library
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission denied', 'Access to the gallery was not permitted');
      return;
    }

    try {
      // Open gallery
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.image,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      // Check image selection
      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedImageUri = result.assets[0].uri;
        setImageUri(selectedImageUri);
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred while selecting the image");
      console.error(error);
    }
  };

  // Function to process the news and add image
  const handleCreateNews = async () => {
    if (!title || !content || !author) {
      Alert.alert("Error", "Please fill in all fields!");
      return;
    }

     setIsLoading(true);
    try {
      // Create FormData object for multipart formdata
      const userId = await AsyncStorage.getItem('userId');
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('author', author);
      formData.append('userId', userId);

      if (imageUri) {
        // Add image file
        const filename = imageUri.split('/').pop();
        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : `image`;

        formData.append('foto', {
          uri: imageUri,
          name: filename,
          type,
        });
      }

      // POST request with FormData
      await axios.post('https://*********.com:****/api/news', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      Alert.alert("Success", "Message created!");
      setTitle("");
      setContent("");
      setAuthor("");
      setIsLoading(false);
      Keyboard.dismiss();
      navigation.navigate('NewsManagementScreen');
    } catch (error) {
      console.error("Error sending:", error);
      Alert.alert("Error", "Message could not be saved");
    }
  };

  const handleTitleSizeChange = (event) => {
    const h = event?.nativeEvent?.contentSize?.height;
    if (h) setTitleHeight(h);
  };

  const handleContentSizeChange = (event) => {
    const h = event?.nativeEvent?.contentSize?.height;
    if (h) setContentHeight(h);
  };

  const handleAuthorSizeChange = (event) => {
    const h = event?.nativeEvent?.contentSize?.height;
    if (h) setAuthorHeight(h);
  };

  const handleTitleChange = (text) => {
    setTitle(text ?? "");
  };

  const handleContentChange = (text) => {
    setContent(text ?? "");
  };

  const handleAuthorChange = (text) => {
    setAuthor(text ?? "");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container} >
      <Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss}>

      <ImageBackground source={backgroundImage} resizeMode="stretch" style={styles.backgroundImage}  >
      <View style={{top: 10, alignSelf: 'flex-start', left: 10, borderColor: '#06019D', borderWidth: 1, borderRadius: 5,  padding: 2,  backgroundColor: 'white', zIndex: 10,}} >
            <MenuComponent navigation={navigation} />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={{
          ...styles.view,
          marginTop: isShowKeyBoard ? hp("3%") : isTablet ? hp("15%") : hp("4%"),
        }}>
        <Box style={styles.box}>

          <FormControl>
            <FormControl.Label _text={styles.label} >
              Enter a heading:
            </FormControl.Label>
            <TextInput
              style={styles.inputTitle}
              value={title}
              onChangeText={handleTitleChange}
              multiline
              onFocus={() => setShowKeyboard(true)}
              onContentSizeChange={handleTitleSizeChange}  />
          </FormControl>

          <FormControl>
            <FormControl.Label _text={styles.label} >Enter the text:</FormControl.Label>
            <TextInput
                style={styles.inputContent}
                value={content}
                onChangeText={handleContentChange}
                multiline
                onFocus={() => setShowKeyboard(true)}
                onContentSizeChange={handleContentSizeChange} />
          </FormControl>

          <FormControl>
            <FormControl.Label _text={styles.label} >
              Enter the name of the message author:
            </FormControl.Label>
            <TextInput
              style={styles.inputAuthor}
              value={author}
              onChangeText={handleAuthorChange}
              multiline onFocus={() => setShowKeyboard(true)} onContentSizeChange={handleAuthorSizeChange} />
          </FormControl>

          <FormControl>
            <FormControl.Label _text={styles.label} >
              Upload a photo if you have one:
            </FormControl.Label>

            <TouchableOpacity style={styles.fotoButton} onPress={pickImage} >
            <Entypo name="camera"  size={isTablet ? wp("3.5%") : wp("5.5%")}  color="darkblue" />
            <Text style={styles.fotoButtonText}>Upload a photo if you have one:</Text>
            </TouchableOpacity>
            {imageUri && (
            <View >
            <Image
                style={styles.image}
                source={{ uri: imageUri }}
                accessibilityLabel="Preview of the uploaded photo" />
            </View>
            )}
          </FormControl>

          {isLoading ? (
            <ActivityIndicator size="large" color="blue" />
          ) : (
              <Button
                  style={styles.button}
                  colorScheme="indigo"
                  onPress={() => { handleCreateNews() }} >
                <Text style={styles.buttonText}>Create</Text>
              </Button>
          )}
        </Box>
        </View>
        </ScrollView>
      </ImageBackground>
      </Pressable>
      </KeyboardAvoidingView>
  );
};