import React, { useState } from 'react';
import { View, Text, Pressable, Dimensions } from 'react-native';
import { StackActions } from '@react-navigation/native';
import { HamburgerIcon, Box } from 'native-base';
import { useNavigation } from '@react-navigation/native';

import { styles } from "../../styles/menu/MenuComponentStyles";

const { width, height } = Dimensions.get('window');
const wp = (percentage) => (width * parseFloat(percentage)) / 100;
const hp = (percentage) => (height * parseFloat(percentage)) / 100;
const isTablet = width >= 768;


export default function MenuComponent() {

  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => setMenuVisible(!menuVisible);

  const tabScreens = ['HomeScreen', 'NewsScreen', 'ChatScreen', 'UserAccountScreen'];

  if (!navigation) {
    console.warn("MenuComponent: navigation ist undefined");
    return null;
  }

  const navigateTo = (screen, params = {}) => {
    setMenuVisible(false);

    if (tabScreens.includes(screen)) {
      // For tab navigation: 'MainTabs' as navigator + screen as tab
      navigation.replace('MainTabs', { screen, ...params });
    } else {
      // For stack navigation: Replace current stack screen
      navigation.dispatch(StackActions.replace(screen, params));
    }
  };

  return (
    <Box >
      <Pressable onPress={toggleMenu}>
        <HamburgerIcon size={isTablet ? wp('6%') : wp('8%')} color="#06019D" />
      </Pressable>

      {menuVisible && (
        <View style={styles.menuContainer}>
          <Pressable onPress={() => navigateTo('HomeScreen')}>
            <Text style={styles.menuItem}>Home</Text>
          </Pressable>
          <Pressable onPress={() => navigateTo('AboutScreen')}>
            <Text style={styles.menuItem}>About Company</Text>
          </Pressable>
          <Pressable onPress={() => navigateTo('NewsScreen')}>
            <Text style={styles.menuItem}>News</Text>
          </Pressable>
          <Pressable onPress={() => navigateTo('NewsManagementScreen')}>
            <Text style={styles.menuItem}>News Management</Text>
          </Pressable>
          <Pressable onPress={() => navigateTo('ChatScreen')}>
            <Text style={styles.menuItem}>Chat</Text>
          </Pressable>
          <Pressable onPress={() => navigateTo('UserAccountScreen')}>
            <Text style={styles.menuItem}>Account</Text>
          </Pressable>
          <Pressable onPress={() => navigateTo('FeedbackScreen')}>
            <Text style={styles.menuItem}>Feedback</Text>
          </Pressable>
        </View>
      )}
    </Box>
  );
}