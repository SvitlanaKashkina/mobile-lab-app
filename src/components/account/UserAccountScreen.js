import React, { useEffect, useState, useCallback } from "react";
import { View, Text, ImageBackground, TouchableOpacity, Image, Dimensions, Alert, ActivityIndicator } from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from 'axios';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Entypo from '@expo/vector-icons/Entypo';
import { LogBox } from 'react-native';
import { styles } from "../../styles/account/AccountStyles";

const backgroundImage = require("../../assets/feedbackbackground.png");
const defaultImage = require("../../assets/fotouser.png");

const { width, height } = Dimensions.get('window');
const wp = (percentage) => (width * parseFloat(percentage)) / 100;
const hp = (percentage) => (height * parseFloat(percentage)) / 100;

LogBox.ignoreLogs([
  'useInsertionEffect must not schedule updates',
]);

export default function UserAccountScreen() {

  const imageSize = width * 0.37;
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [imageUri, setImageUri] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      let isMounted = true;

      const fetchUserData = async () => {
        try {
          setLoading(true);

          const storedUserId = await AsyncStorage.getItem('userId');
          if (!storedUserId) {
            console.warn('userId is not yet available – request is skipped');
            setLoading(false);
            return;
          }

          const userId = parseInt(storedUserId, 10);
          if (isNaN(userId)) {
            console.warn('userId is not a valid number – request is skipped');
            setLoading(false);
            return;
          }

          const response = await axios.get(`https://**********.com:***/api/account/${userId}`);
          const base64Foto = typeof response.data.foto === 'string' ? response.data.foto : null;

          const photoUri = base64Foto
            ? `data:image/jpeg;base64,${base64Foto}`
            : null;

          if (isMounted) {
            setUser({ ...response.data, photo: photoUri });
            setImageUri(photoUri);
            setLoading(false);
          }
        } catch (error) {
          console.log("Error loading user data:", error);
          if (isMounted) setLoading(false);
        }
      };
      fetchUserData();
      return () => {
        isMounted = false;
      };
    }, [])
  );

  const pickImage = async () => {
    // Check eligibility
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Access to the gallery was denied');
      return;
    }
    // Get user ID from AsyncStorage
    let storedUserId;
    try {
      storedUserId = await AsyncStorage.getItem('userId');
    } catch (err) {
      alert("Error reading user ID");
      return;
    }
    if (!storedUserId) {
      alert('No user ID found.');
      return;
    }
    const userId = parseInt(storedUserId, 10);
    if (isNaN(userId)) {
      alert("Invalid user ID.");
      return;
    }

    // Open gallery
    let result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      mediaTypes: ImagePicker.image,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });

    if (!result.canceled) {
      const selectedAsset = result.assets[0];
      if (!selectedAsset.base64) {
        alert('Error reading the image');
        return;
      }

      const base64Data = selectedAsset.base64;
      if (!base64Data) {
        alert('Error reading the image');
        return;
      }

      try {
        setUploading(true);

        await axios.put(`https://************.com:****/api/account/photo/${userId}`, {
          foto: `data:image/jpeg;base64,${base64Data}`,
        }, {
          headers: { 'Content-Type': 'application/json' }
        });

        const imageUri = `data:image/jpeg;base64,${base64Data}`;
        setImageUri(imageUri);
        setUser(prev => ({ ...prev, photo: imageUri }));
      } catch (error) {
        alert("Error uploading");
        console.log("Upload error:", error);
      } finally {
        setUploading(false);
      }
    }
  };

  const showAlert = () => {
    Alert.alert(
      "Delete user account",
      "Do you really want to delete your user account?",
      [
        { text: "No", style: "cancel" },
        {
          text: "Yes",
          onPress: async () => {
            try {
              const userId = await AsyncStorage.getItem('userId');
              console.log("User ID to delete:", userId);

              const response = await axios.delete(`https://**********.com:****/api/account/delete/${userId}`);
              console.log("Server response:", response.data);

              await AsyncStorage.removeItem('userId');

              navigation.reset({
                index: 0,
                routes: [{ name: 'LogInScreen' }],
              });
            } catch (error) {
              console.error("Error deleting user:", error);
              Alert.alert("Error", "Could not delete user");
            }
          }
        }
      ]
    );
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#000" />
        <Text style={{ marginTop: 10 }}>Loading user data...</Text>
      </View>
    );
  }
  if (!user) return <Text>User not found</Text>;

  return (
    <View style={styles.container}>
       {uploading && (
          <View style={styles.uploadOverlay}>
            <ActivityIndicator size="large" color="#fff" />
            <Text style={styles.uploadText}>Photo is uploaded...</Text>
          </View>
        )}
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}  >
            <View style={styles.viewFoto}>
              <Image
                      source={
                        imageUri
                          ? { uri: imageUri }
                          : defaultImage
                      }
                      style={[styles.image, { width: imageSize, height: imageSize, borderRadius: imageSize / 2 }]}
              />

              {!loading && (
                <TouchableOpacity style={styles.button} onPress={pickImage} >
                  <Entypo name="camera" size={22} color="darkblue" />
                  <Text style={styles.buttonText}>Upload image</Text>
                </TouchableOpacity>
              )}
            </View>

            <View style={styles.viewText} >
                <Text style={styles.label}>First name:</Text>
                <Text style={styles.text}>{user.firstname}</Text>
                <Text style={styles.label}>Last name:</Text>
                <Text style={styles.text}>{user.lastname}</Text>
                <Text style={styles.label}>E-mail:</Text>
                <Text style={styles.text}>{user.email}</Text>
                <Text style={styles.label}>Job title:</Text>
                <Text style={styles.text}>{user.position}</Text>
            </View>
            <View style={styles.viewDelete} >
            <TouchableOpacity onPress={showAlert} >
                <Text style={styles.textDelete} >Delete user account</Text>
            </TouchableOpacity>
            </View>
      </ImageBackground>
    </View>
  );
}