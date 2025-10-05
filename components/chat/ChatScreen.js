import React, { useState, useEffect, useRef} from "react";
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Keyboard, ImageBackground, FlatList, Pressable, Image, Alert,  ActivityIndicator, Modal, BackHandler, Dimensions } from "react-native";
import { EvilIcons, Feather } from '@expo/vector-icons';
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import io from "socket.io-client";
import { InteractionManager } from 'react-native';
import { format } from "date-fns";
import { de } from "date-fns/locale";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "../../styles/chat/ChatStyles";

const { width, height } = Dimensions.get('window');
const wp = (percentage) => (width * parseFloat(percentage)) / 100;
const hp = (percentage) => (height * parseFloat(percentage)) / 100;

const backgroundImage = require("../../assets/chatbackground.png");
const defaultProfilbild = require("../../assets/fotouser.png");

export default function ChatScreen() {

    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [user, setUser] = useState(null);
    const [foto, setFoto] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isShowKeyboard, setIsShowKeyboard] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [storedUserId, setStoredUserId] = useState(null);
    const flatListRef = useRef(null);
    const timeoutRef = useRef(null);
    const socket = useRef(null);


    // Loading user data and messages
    useEffect(() => {
        let isMounted = true;
        const loadInitialDataAndSetupSocket = async () => {
          setIsLoading(true);
          try {
            const storedId = await AsyncStorage.getItem("userId");
            console.log("📱 userId from AsyncStorage:", storedId);

            if (!storedId) {
              if (isMounted) {
                Alert.alert("Error", "User ID could not be loaded");
                setIsLoading(false);
              }
              return;
            }

            const parsedUserId = parseInt(storedId, 10);
              if (isNaN(parsedUserId)) {
                console.warn("userId is not a valid number");
                if (isMounted) setIsLoading(false);
                return;
            }

            if (isMounted) {
                setStoredUserId(storedId);
                setCurrentUser({ id: parsedUserId });
            }

            // Load all messages from database
            const [res, chatRes] = await Promise.all([
              axios.get(`https://**********.com:****/api/account/${storedId}`),
              axios.get("https://**********.com:****/api/chat"),
            ]);

             if (isMounted) {
              if (res && res.data) {
                setUser(res.data);
              } else {
                setUser(null);
                console.warn("Warn: User data is empty or undefined");
              }
              if (chatRes && Array.isArray(chatRes.data)) {
                setMessages(chatRes.data);
              } else {
                setMessages([]);
                console.warn("Warn: Chat messages data is empty or not an array");
              }
            }
          } catch (err) {
            console.error("Error loading data", err);
          } finally {
             if (isMounted) setIsLoading(false);
          }

          // Initialize socket
          if (!socket.current) {
            socket.current = io("https://******** .com:****");
          }

          // Handling WebSocket messages
          const handleNewMessage = async (newMsg) => {
            if (!newMsg || !newMsg.chatId) return;
            setMessages((prev) => {
              // Remove temporary message with same content or tempChatId
              const filtered = prev.filter((msg) =>
                msg.chatId !== newMsg.chatId && !msg.temp
              );
              const exists = filtered.some((msg) => String(msg.chatId) === String(newMsg.chatId));
              if (exists) return filtered;
              return [...filtered, newMsg];
            });
          };

          socket.current.on("newMessage", handleNewMessage);
          socket.current.on("deleteMessage", deleteMessage);
          socket.current.on("connect", () => {
            console.log("WebSocket connected:", socket.current.id);
          });

          // Cleanup when leaving
          return () => {
              if (socket.current) {
                socket.current.off("newMessage", handleNewMessage);
                socket.current.off("deleteMessage", deleteMessage);
                socket.current.off("connect");
                if (socket.current.connected) socket.current.disconnect();
              }
              isMounted = false;
            };
          };

        // Start loading and setup process
        loadInitialDataAndSetupSocket();
    }, [deleteMessage]);

    // Avoid duplicate messages
    useEffect(() => {
        if (!Array.isArray(messages)) return;
        const ids = messages.map(m => m.chatId);
        const duplicates = ids.filter((id, i) => ids.indexOf(id) !== i);
        if (duplicates.length > 0) {
          console.warn("⚠️ Duplicate chatIds found:", duplicates);
        }
    }, [messages]);

   // Send Message
    const sendMessage = async (base64Foto = null) => {
      const storedId = await AsyncStorage.getItem("userId");
      if (!message.trim() && !base64Foto) return;

      const trimmedMessage = message ? message.trim() : "";

      const tempMsg = {
        chatId: 'temp-' + Date.now(),
        message: trimmedMessage,
        foto: base64Foto || null,
        userId: storedId,
        user: {
          ...user,
          foto: user?.foto || defaultProfilbild,
        },
        temp: true, // Mark as temporary
      };

      setMessages((prev) => [...prev, tempMsg]);
      setMessage("");
      setFoto(null);
      Keyboard.dismiss();
      setIsLoading(true);

      try {
        const res = await axios.post("https://************.com:****/api/chat", {
          message: trimmedMessage,
          userId: storedId,
          foto: base64Foto && typeof base64Foto === "string" && base64Foto.trim().length > 50 ? base64Foto : null,
          user: user,
        });

        const tempId = tempMsg.chatId;

        if (res?.data?.chatId)  {
          const finalMsg = {
            ...res.data,
            temp: false,
            foto:
              typeof res.data.foto === "string" && res.data.foto.length > 0
                ? res.data.foto
                : base64Foto || null,
            user: {
              ...(user || {}),
              foto: user?.foto || defaultProfilbild,
            },
          };

          setMessages((prev) => {
            const filtered = prev.filter(
              (msg) => msg.chatId !== tempMsg.chatId && msg.chatId !== res.data.chatId
            );
            return [...filtered, finalMsg];
          });
        } else {
          console.warn("❌ No valid response from server for sendMessage");
        }

      } catch (err) {
        console.error("Error sending message", err);
      } finally {
        setIsLoading(false);
      }
    };

    // Upload photo to chat
    const pickImage = async () => {
      //  Check eligibility
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Access to the media library is required!');
        return;
      }
        const storedId = await AsyncStorage.getItem("userId");
        if (!storedId) return;

        setIsLoading(true);

        try {
          const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.image,
            base64: true,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.5,
          });

          // Check if the user has selected the image
          if (!result.canceled && result.assets && result.assets[0]?.base64) {
            const base64 = result.assets[0].base64;

            console.log("Base64 image: there is"); // Logging the Base64 value for debugging

            setFoto(base64);
            setMessage("");
            await sendMessage(base64);  // Send message with the Base64 image
          } else {
            console.log("No image selected or user aborted");
          }
        } catch (error) {
          console.error("Error selecting image:");
        } finally {
          setIsLoading(false);
        }
    };

    const deleteMessage = async (chatId) => {
       if (!chatId) return;
        Alert.alert("Delete message", "Do you really want to delete this message?", [
          { text: "Cancel", style: "cancel" },
          {
            text: "Delete",
            style: "destructive",
            onPress: async () => {
              try {
                await axios.delete(`https://*********.com:****/api/chat/${chatId}`);
                console.log("✅ Message deleted with chatId:", chatId);

                //  Remove message even in local state
                setMessages((prevMessages) =>
                  prevMessages.filter((msg) => msg.chatId !== chatId)
                );
              } catch (error) {
                console.error("Deletion error", error);
              }
            },
          },
        ]);
    };

    const RenderMessageItem = ({ item, user, onDeleteMessage, onImagePress }) => {
        if (!item) return null;

        const isOwnMessage = item.userId === user?.id;
        const hasValidFoto = !!item.foto && typeof item.foto === "string" && item.foto.trim().length > 20;

        // Image was loaded successfully
        const handleImageLoad = () => {
          setIsImageLoaded(true);
        };

        // Image loading error
        const handleImageError = () => {
          setIsImageLoaded(false);
          console.warn("❌ Image could not be loaded");
        };

        return (
          <View
          style={[
            styles.messageRow,
            isOwnMessage ? styles.ownMessageRow : styles.otherMessageRow,
          ]}
        >
          {!isOwnMessage && (
            <View style={styles.imageWrapper}>
              {/* User profile picture */}
              {item.user?.foto ? (
                <Image
                  source={{ uri: `data:image/jpeg;base64,${item.user.foto}` }}
                  style={styles.image}
                />
              ) : (
                <Image
                  source={require("../../assets/fotouser.png")}
                  style={styles.image}
                />
              )}
            </View>
          )}

          <View
            style={[
              styles.messageContent,
              isOwnMessage ? styles.ownMessage : styles.otherMessage,
            ]}
          >
            <View style={styles.header}>
              <Text style={styles.userName}>
                {item.user?.firstname || "?"} {item.user?.lastname || ""}
              </Text>
              {isOwnMessage && (
                <TouchableOpacity style={styles.deleteIconContainer} onPress={() => onDeleteMessage(item.chatId)}>
                  <Feather name="trash-2" size={18} color="red" />
                </TouchableOpacity>
              )}
            </View>

            {/* Message text */}
            {item.message ? <Text>{item.message}</Text> : null}

            {hasValidFoto ? (
              <TouchableOpacity onPress={() => onImagePress(`data:image/jpeg;base64,${item.foto}`)}  >
                  <Image
                    source={{ uri: `data:image/jpeg;base64,${item.foto}` }}
                    style={styles.messageImage}
                    resizeMode="cover"
                    onLoad={handleImageLoad} // Successful loading
                    onError={handleImageError} // Error handling
                  />
              </TouchableOpacity>
            ) : item.temp && !hasValidFoto ? (
                <Image
                  source={require("../../assets/imagefollows.png")}
                  style={styles.messageImage}
                  resizeMode="cover"
                />
            ) : null}

            {item.createdAt && (
              <Text style={styles.messageTimestamp}>
                {format(new Date(item.createdAt), "dd.MM.yyyy, HH:mm", { locale: de })}
              </Text>
            )}

          </View>

          {isOwnMessage && (
            <View style={styles.imageWrapper}>
              {item.user?.foto ? (
                <Image
                  source={{ uri: `data:image/jpeg;base64,${item.user.foto}` }}
                  style={styles.image}
                />
              ) : (
                <Image
                  source={require("../../assets/fotouser.png")}
                  style={styles.image}
                />
              )}
            </View>
          )}
        </View>
      );
      };


    useEffect(() => {
        if (messages.length > 0) {
          InteractionManager.runAfterInteractions(() => {
            // Start new timeout and save ID
            timeoutRef.current = setTimeout(() => {
              flatListRef.current?.scrollToEnd({ animated: true });
            }, 1000);
          });
        }
        // 🧹 Cleanup: Stop old timeout when messages change or component unmounts
        return () => {
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
          }
        };
    }, [messages]);

    useEffect(() => {
      const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => setIsShowKeyboard(true));
      const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => setIsShowKeyboard(false));
      return () => {
        keyboardDidShowListener.remove();
        keyboardDidHideListener.remove();
      };
    }, []);

    const closeModal = () => {
      setModalVisible(false);
      setSelectedImage(null);
    };

    const handleChangeMessage = (text) => {
      if (text === undefined || text === null) {
        setMessage("");
      } else {
        setMessage(text);
      }
    };

  return (
    <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : 'height'}
          style={styles.container}  keyboardVerticalOffset={isShowKeyboard ? hp("15%") : 100} >
      <Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss} accessible={false}>
        <View style={{ flex: 1 }}>

          {/*  Image Enlargement Modal */}
          <Modal visible={modalVisible} transparent={true} animationType="fade" >
            <View style={styles.modalContainer}>
              <TouchableOpacity onPress={closeModal} style={styles.closeArea}>
                <Text style={styles.closeText}>Schließen</Text>
              </TouchableOpacity>
              {selectedImage && (
              <Image
                source={{ uri: selectedImage }}
                style={styles.fullscreenImage}
                resizeMode="contain"
              />
              )}
            </View>
          </Modal>

          <ImageBackground source={backgroundImage} style={styles.backgroundImage}  >
          {isLoading ? (
              <View style={styles.uploadingContainer}>
                <ActivityIndicator size="large" color="#fff" />
              </View>
            ) : (
              <FlatList
                ref={flatListRef}
                data={messages}
                keyExtractor={(item, index) => {
                  return item.chatId.toString();
                }}
                renderItem={({ item }) => (
                  <RenderMessageItem item={item}  user={currentUser}  onDeleteMessage={deleteMessage}  onImagePress={(uri) => {
                     setSelectedImage(uri); setModalVisible(true); }} />
                )}
              />
            )}
              <View style={styles.inputContainer}>
                <Pressable onPress={pickImage} style={styles.icon}>
                  <EvilIcons name="image" size={wp("8%")}  color="black" style={styles.icon} />
                </Pressable>
                <TextInput
                style={styles.input}
                value={message}
                multiline
                onFocus={() => setIsShowKeyboard(true)}
                onBlur={() => setIsShowKeyboard(false)}
                onChangeText={handleChangeMessage}
                returnKeyType="send"
                placeholder="Nachricht eingeben..."
                onSubmitEditing={() => console.log('SEND')}
                />
                <TouchableOpacity style={styles.button} onPress={() => sendMessage(message)}>
                  <Text style={styles.buttonText}>Senden</Text>
                </TouchableOpacity>
              </View>
          </ImageBackground>
          </View>
      </Pressable>
      </KeyboardAvoidingView>
  );
}