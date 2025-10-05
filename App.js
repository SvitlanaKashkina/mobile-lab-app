import React from 'react';
import { NativeBaseProvider } from "native-base"; 
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from "./navigation/RootNavigator";  
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from "expo-status-bar";


export default function App() {

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }} edges={["top", "left", "right"]}>
      <StatusBar style="dark" hidden={false} translucent={false} backgroundColor="white"/>
      <NativeBaseProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </NativeBaseProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};