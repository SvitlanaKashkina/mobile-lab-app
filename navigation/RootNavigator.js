import React, { useState, useEffect } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text } from "native-base";
import { Dimensions, Image, Platform, View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from '@expo/vector-icons/Ionicons';


import MenuComponent from '../components/menu/MenuComponent';
import LogInScreen from "../components/registration/LoginScreen";
import SignUpScreen from "../components/registration/SignUpScreen";
import PassForgotScreen from "../components/registration/PassForgotScreen";
import FeedbackScreen from "../components/feedBack/FeedbackScreen";
import NewsManagementScreen from "../components/news/NewsManagementScreen";
import CreateNewsScreen from "../components/news/CreateNewsScreen";
import DeleteNewsScreen from "../components/news/DeleteNewsScreen";
import AboutScreen from '../components/aboutCompany/AboutScreen';
import HomeScreen from "../components/home/HomeScreen";
import NewsScreen from "../components/news/NewsScreen";
import ChatScreen from "../components/chat/ChatScreen";
import UserAccountScreen from "../components/account/UserAccountScreen";

const RootStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const { width, height } = Dimensions.get('window');
const wp = (percentage) => (width * parseFloat(percentage)) / 100;
const hp = (percentage) => (height * parseFloat(percentage)) / 100;
const isTablet = width >= 768;

// Navigation Tab
function MainTabs () {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const checkStorage = async () => {
      const userId = await AsyncStorage.getItem("userId");
      setIsReady(true);
    };
    checkStorage();
  }, []);

  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
         <Tab.Navigator
                initialRouteName="HomeScreen"
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ color, size }) => {
                    let iconName;
                    if (route.name === "HomeScreen") {
                        iconName = "home";
                    } else if (route.name === "NewsScreen") {
                        iconName = "newspaper";
                    } else if (route.name === "ChatScreen") {
                        iconName = "chatbubbles";
                    } else if (route.name === "UserAccountScreen") {
                        iconName = "person";
                    }
                    return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: "blue",
                    tabBarInactiveTintColor: "#484646",
                    tabBarLabelStyle: {
                    fontSize: 12,
                    fontSize: isTablet ? 16 : 12,
                    paddingBottom: 5,
                    marginTop: -3,
                    },
                    tabBarStyle: {
                    height: Platform.OS === "android" ? 50 : 65,
                    paddingBottom: 5,
                    borderTopWidth: 1,
                    borderTopColor: '#ccc',
                    },
                })}
                >

                <Tab.Screen name="HomeScreen" component={HomeScreen}
                    options={({ navigation }) => ({
                        title: "Home",  headerTitleAlign: "center", freezeOnBlur: true,
                        headerTitle: () => (
                            <Text
                            style={{
                            fontWeight: 'bold',
                            fontSize: isTablet ? wp(4) : wp(6.5),
                            color: 'darkblue',
                            paddingTop: hp(1),
                            textShadowColor: 'lightblue',
                            textShadowOffset: { width: 3, height: 3 },
                            textShadowRadius: 5,
                            fontStyle: 'italic',
                            }} >
                            Company
                            </Text>
                        ),
                        headerRight: () => (
                        <Image
                            source={require("../assets/fototabheader.png")}
                            style={{ width: isTablet ? 80 : 60,
                                      height: isTablet ? 40 : 35,
                                      marginRight: isTablet ? 15 : 10, resizeMode: "contain" }}
                        />
                        ),
                        headerLeft: () => (
                          <View style={{ marginLeft: 15, borderColor: '#06019D', borderWidth: 1, borderRadius: 5, padding: 0.5, backgroundColor: 'white', }}>
                            <MenuComponent navigation={navigation} />
                          </View>
                        ),
                        tabBarInactiveTintColor: "#5D5858",
                        headerStyle: {
                            backgroundColor: "#FFFFFF",
                        } ,
                        headerTitleStyle: { fontWeight: "bold", fontSize: wp(6), fontStyle: "italic"},
                    })}
                />

                <Tab.Screen name="NewsScreen" component={NewsScreen} options={({ navigation }) => ({
                    title: "News", headerTitleAlign: "center", freezeOnBlur: true,
                    headerTitle: () => (
                    <Text
                    style={{
                        fontWeight: 'bold',
                            fontSize: isTablet ? wp(4) : wp(6.5),
                            color: 'darkblue',
                            paddingTop: hp(1),
                            textShadowColor: 'lightblue',
                            textShadowOffset: { width: 3, height: 3 },
                            textShadowRadius: 5,
                    }}
                    >
                        News
                    </Text>
                    ),
                    headerRight: () => (
                        <Image
                            source={require("../assets/fototabheader.png")}
                            style={{ width: isTablet ? 80 : 60,
                                      height: isTablet ? 40 : 35,
                                      marginRight: isTablet ? 15 : 10, resizeMode: "contain" }}
                        />
                    ),
                    headerLeft: () => (
                      <View style={{ marginLeft: 15, borderColor: '#06019D', borderWidth: 1, borderRadius: 5, padding: 0.5, backgroundColor: 'white', }}>
                            <MenuComponent navigation={navigation} />
                      </View>
                    ),
                    tabBarInactiveTintColor: "#5D5858",
                    headerStyle: {
                        backgroundColor: "#FFFFFF",
                    } ,
                })}  />


                <Tab.Screen name="ChatScreen"  component={ChatScreen}
                    options={({ navigation }) => ({
                    title: "Chat",
                    headerTitleAlign: "center",
                    freezeOnBlur: true,
                    headerTitle: () => (
                    <Text
                    style={{
                        fontWeight: 'bold',
                            fontSize: isTablet ? wp(4) : wp(6.5),
                            color: 'darkblue',
                            paddingTop: hp(1),
                            textShadowColor: 'lightblue',
                            textShadowOffset: { width: 3, height: 3 },
                            textShadowRadius: 5,
                    }}
                    >
                        Chat
                    </Text>
                    ),
                    headerRight: () => (
                        <Image
                            source={require("../assets/fototabheader.png")}
                            style={{ width: isTablet ? 80 : 60,
                                      height: isTablet ? 40 : 35,
                                      marginRight: isTablet ? 15 : 10, resizeMode: "contain" }}
                        />
                    ),
                    headerLeft: () => (
                      <View style={{ marginLeft: 15, borderColor: '#06019D', borderWidth: 1, borderRadius: 5, padding: 0.5, backgroundColor: 'white', }}>
                            <MenuComponent navigation={navigation} />
                      </View>
                    ),
                        tabBarInactiveTintColor: "#5D5858",
                        headerStyle: {
                            backgroundColor: "#FFFFFF",
                        } ,
                })}  />


                <Tab.Screen name="UserAccountScreen" component={UserAccountScreen} options={({ navigation }) => ({
                    title: "Account", headerTitleAlign: "center", freezeOnBlur: true,
                    headerTitle: () => (
                    <Text
                    style={{
                        fontWeight: 'bold',
                            fontSize: isTablet ? wp(4) : wp(6.5),
                            color: 'darkblue',
                            paddingTop: hp(1),
                            textShadowColor: 'lightblue',
                            textShadowOffset: { width: 3, height: 3 },
                            textShadowRadius: 5,
                    }}
                    >
                        Account
                    </Text>
                    ),
                    headerRight: () => (
                        <Image
                            source={require("../assets/fototabheader.png")}
                            style={{ width: isTablet ? 80 : 60,
                                      height: isTablet ? 40 : 35,
                                      marginRight: isTablet ? 15 : 10, resizeMode: "contain" }}
                        />
                    ),
                    headerLeft: () => (
                      <View style={{ marginLeft: 15, borderColor: '#06019D', borderWidth: 1, borderRadius: 5, padding: 0.5, backgroundColor: 'white' }}>
                            <MenuComponent navigation={navigation} />
                      </View>
                    ),
                    tabBarInactiveTintColor: "#5D5858",
                    headerStyle: {
                        backgroundColor: "#FFFFFF",
                    } ,
                })} />
    </Tab.Navigator>
  );
}

//Root Navigator
export default function RootNavigator() {

    const [newNews, setNewNews] = useState(null);
    const [userId, setUserId] = useState(null);
    const [isUserIdLoaded, setIsUserIdLoaded] = useState(false);

    // When the app starts: read userId from AsyncStorage
    useEffect(() => {
      const fetchUserId = async () => {
        try {
          const storedId = await AsyncStorage.getItem("userId");
          const numericId = Number(storedId);

          if (storedId && !isNaN(numericId)) {
            setUserId(numericId);
          } else {
            console.warn("⚠️ userId not found or invalid in AsyncStorage");
          }
        } catch (error) {
          console.error("Error loading userId:", error);
        } finally {
          setIsUserIdLoaded(true);
        }
      };

      fetchUserId();
    }, []);

    // ✅ As long as userId is not loaded, optionally show splash or empty view
    if (!isUserIdLoaded) {
      return null;
    }

    return (
    <RootStack.Navigator initialRouteName='LogInScreen'>
        <RootStack.Screen
            name="LogInScreen"
            options={{ headerShown: false }}
            component={LogInScreen}
        />
        <RootStack.Screen
            name="SignUpScreen"
            options={{ headerShown: false }}
            component={SignUpScreen}
        />
        <RootStack.Screen
            name="PassForgotScreen"
            component={PassForgotScreen}
            options={{ headerShown: false }}
        />

        <RootStack.Screen
            name="MainTabs"
            component={MainTabs}
            options={{ headerShown: false }}
        />

        <RootStack.Screen
            name="FeedbackScreen"
            component={FeedbackScreen}
            options={({ navigation }) => ({
                title: "Feedback", headerTitleAlign: "center", headerTintColor: "#06019D",
                headerTitleStyle: {
                fontSize: Math.round(wp("5%")), color: 'darkblue', textShadowColor: 'lightblue', textShadowOffset: { width: Math.round(wp("0.5%")), height: Math.round(hp("0.3%")) }, textShadowRadius: Math.round(wp("0.5%")), fontStyle: 'italic' },
                headerLeft: () => null,
                headerBackVisible: false,
                headerRight: () => (
                    <View style={{ height: '100%', justifyContent: 'center', marginRight: wp("2%") }}>
                              <Image
                                source={require("../assets/fototabheader.png")}
                                style={{
                                  width: wp("14%"),
                                  height: hp("5.5%"),
                                  resizeMode: "contain",
                                }}
                              />
                    </View>
                ),
            })}   />

        <RootStack.Screen
            name="NewsManagementScreen"
            component={NewsManagementScreen}
            options={({ navigation }) => ({  title: "News Management",
                        headerTitleAlign: "center",
                        headerTitleStyle: {
                        fontSize: Math.round(wp("5.5%")),
                        color: 'darkblue',
                        textShadowColor: 'lightblue',
                        textShadowOffset: { width: Math.round(wp("0.5%")), height: Math.round(hp("0.3%")) },
                        textShadowRadius: Math.round(wp("0.5%")),
                        fontStyle: 'italic'  },
                        headerTintColor: "darkblue",
                        headerLeft: () => null,
                        headerBackVisible: false,
                        headerRight: () => (
                          <View style={{ height: '100%', justifyContent: 'center', marginRight: wp("0.5%") }}>
                              <Image
                                source={require("../assets/fototabheader.png")}
                                style={{
                                  width: wp("14%"),
                                  height: hp("5.5%"),
                                  resizeMode: "contain"
                                }}
                              />
                          </View>
                        ),
            })}
        />

        <RootStack.Screen
            name="CreateNewsScreen"
            component={CreateNewsScreen}
            options={({ navigation }) => ({  title: "Create news",
                        headerTitleAlign: "center",
                        headerTitleStyle: {
                        fontSize: Math.round(wp("6%")),
                        color: 'darkblue',
                        textShadowColor: 'lightblue',
                        textShadowOffset: { width: Math.round(wp("0.5%")), height: Math.round(hp("0.3%")) },
                        textShadowRadius: Math.round(wp("0.5%")),
                        fontStyle: 'italic' },
                        headerTintColor: "darkblue",
                        headerLeft: () => null,
                        headerBackVisible: false,
                        headerRight: () => (
                            <View style={{ height: '100%', justifyContent: 'center', marginRight: wp("0.5%") }}>
                              <Image
                                source={require("../assets/fototabheader.png")}
                                style={{
                                  width: wp("14%"),
                                  height: hp("5.5%"),
                                  resizeMode: "contain"
                                }}
                              />
                            </View>
                        ),
            })}
        />

        <RootStack.Screen
            name="DeleteNewsScreen"
            component={DeleteNewsScreen}
            options={({ navigation }) => ({ title: "Delete news", headerTitleAlign: "center",
                        headerTitleStyle: {
                        fontSize: Math.round(wp("6%")), color: 'darkblue', textShadowColor: 'lightblue', textShadowOffset: { width: Math.round(wp("0.5%")), height: Math.round(hp("0.3%")) }, textShadowRadius: Math.round(wp("0.5%")), fontStyle: 'italic' },
                        headerTintColor: "darkblue",
                        headerLeft: () => null,
                        headerBackVisible: false,
                        headerRight: () => (
                          <View style={{ height: '100%', justifyContent: 'center', marginRight: wp("0.5%") }}>
                              <Image
                                source={require("../assets/fototabheader.png")}
                                style={{
                                  width: wp("14%"),
                                  height: hp("5.5%"),
                                  resizeMode: "contain"
                                }}
                              />
                            </View>
                        ),
            })}
        />

        <RootStack.Screen
            name="AboutScreen"
            component={AboutScreen}
              options={({ navigation }) => ({ title: "Über Company",
                     headerTitleAlign: "center",
                     headerTintColor: "#06019D",
                     headerTitleStyle: {
                          fontSize: Math.round(wp("5%")),
                          color: 'darkblue',
                          textShadowColor: 'lightblue',
                          textShadowOffset: { width: Math.round(wp("0.5%")), height: Math.round(hp("0.3%")) },
                          textShadowRadius: Math.round(wp("0.5%")),
                          fontStyle: 'italic' },
                          headerLeft: () => null,
                          headerBackVisible: false,
                          headerRight: () => (
                            <View style={{ height: '100%', justifyContent: 'center', marginRight: wp("3%") }}>
                              <Image
                                source={require("../assets/fototabheader.png")}
                                style={{
                                  width: wp("14%"),
                                  height: hp("5.5%"),
                                  resizeMode: "contain"
                                }}
                              />
                            </View>
                     ),
              })}
        />
    </RootStack.Navigator>
    );
}