import React from 'react';
import { View, Image, Text, Pressable, Linking, ImageBackground, ScrollView, Dimensions } from 'react-native';
import { Box, VStack, Heading } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import MenuComponent from "../menu/MenuComponent";
import { styles } from "../../styles/aboutCompany/aboutCompanyStyles";

const backgroundImage = require("../../assets/feedbackbackground.png");

const { width } = Dimensions.get('window');
const isTablet = width >= 768;

export default function AboutScreen() {
  const navigation = useNavigation();
  return (
      <View style={styles.container}>
        <ImageBackground source={backgroundImage} style={styles.backgroundImage}  resizeMode="stretch">
        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <Box  style={styles.imageContainer} >

            <View style={{ position: 'absolute',
              top: 10,
              left: 10,
              borderColor: '#06019D',
              borderWidth: 1,
              borderRadius: 5,
              padding: 2,
              backgroundColor: 'white',
              zIndex: 10,}}
            >
                <MenuComponent navigation={navigation} />
            </View>

            <Image
              source={require('../../assets/aboutCompany.png')}
              style={styles.image}
              resizeMode="cover"
            />

        </Box>
        <Heading style={[styles.heading, { fontSize: isTablet ? 26 : 20 }]}>
          Title of the company....
        </Heading>
      <VStack space={0.5} style={styles.vStack}>
        <Text style={[
                styles.paragraph,
                { fontSize: isTablet ? 18 : 16, lineHeight: isTablet ? 28 : 22 },
              ]} >
          Short description...
        </Text>
        <Text style={[styles.listHead, { fontSize: isTablet ? 20 : 17 }]} >Our core competencies:</Text>
        <VStack >
            <Text style={[styles.listItem, { fontSize: isTablet ? 18 : 16 }]}>• description...</Text>
            <Text style={[styles.listItem, { fontSize: isTablet ? 18 : 16 }]}>• description...</Text>
            <Text style={[styles.listItem, { fontSize: isTablet ? 18 : 16 }]}>• description...</Text>
            <Text style={[styles.listItem, { fontSize: isTablet ? 18 : 16 }]}>• description...</Text>
        </VStack>

        <Box mt={2} >
          <Text style={[styles.linksHead, { fontSize: isTablet ? 20 : 17 }]}>More information on our pages:</Text>
          <Pressable onPress={() => Linking.openURL('https://www.*********.com/******/******')}>
            <Text style={[styles.textLink, { fontSize: isTablet ? 18 : 16 }]}>
              About Company
            </Text>
          </Pressable>

          <Pressable onPress={() => Linking.openURL('https://www.*********.com/******/******')}>
            <Text style={[styles.textLink, { fontSize: isTablet ? 18 : 16 }]}>
              More about our services
            </Text>
          </Pressable>

          <Pressable onPress={() => Linking.openURL('https://www.*********.com/******/******')}>
            <Text style={[styles.textLink, { fontSize: isTablet ? 18 : 16 }]}>
              Current job offers
            </Text>
          </Pressable>
        </Box>

      </VStack>
      </ScrollView>
      </ImageBackground>
    </View>
  );
}
