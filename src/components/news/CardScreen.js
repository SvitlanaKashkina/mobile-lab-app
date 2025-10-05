import React from 'react';
import { Box, Image, Text, VStack, Heading, AspectRatio } from 'native-base';
import { Dimensions } from "react-native";
import { Buffer } from 'buffer';
import { styles } from "../../styles/news/CardStyles";

const { width, height } = Dimensions.get('window');
const wp = (percentage) => (width * parseFloat(percentage)) / 100;
const hp = (percentage) => (height * parseFloat(percentage)) / 100;


export default function CardScreen({ newsId, title, content, image, createdAt, author }) {

  console.log("Data received in CardScreen:", newsId, title, content, createdAt, author);
  console.log("Received image in CardScreen:", image?.substring ? image.substring(0, 50) : image);

  // Function to convert an image to Base64
  function getBase64Image(image) {
    if (!image) return null;

    if (typeof image === 'string' && image.includes(',')) {

      try {
        const arr = image.split(',').map(num => parseInt(num.trim(), 10));
        const byteArray = Uint8Array.from(arr);
        return `data:image/jpeg;base64,${Buffer.from(byteArray).toString('base64')}`;
      } catch (e) {
        console.error('Error converting image from string:', e);
        return null;
      }
    } else if (Array.isArray(image) || image instanceof Uint8Array) {
      try {
        const byteArray = image instanceof Uint8Array ? image : Uint8Array.from(image);
        return `data:image/jpeg;base64,${Buffer.from(byteArray).toString('base64')}`;
      } catch (e) {
        console.error('BildkonImage conversion error:', e);
        return null;
      }
    } else if (typeof image === 'string') {
      return image.startsWith('data:') ? image : `data:image/jpeg;base64,${image}`;
    }

    return null;
  }

  const base64Image = getBase64Image(image);
  console.log("Correct Base64 URI:", base64Image?.substring(0, 100));

  // Date formatting function
  function formatDate(dateString) {
    const date = new Date(dateString);
    if (isNaN(date)) return "unknown date";
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
  }

  return (
    <Box style={styles.container}>
      <Box >
        <Box style={styles.topRow}>
          <Text style={styles.createdAt}>{formatDate(createdAt)}</Text>
          <Text style={styles.newsId}>Article no.: {newsId}</Text>
        </Box>

        {base64Image ? (
          <Box>
            <AspectRatio ratio={16 / 9} w="100%">
              <Image
                style={styles.image}
                source={{ uri: base64Image }}
                alt="News picture"
              />
            </AspectRatio>
            <Box style={styles.line} />
          </Box>
        ) : null}
      </Box>

      <VStack px={wp("3%")} mt={hp("1.5%")}>
        <Heading style={styles.title}>{title}</Heading>
        <Text style={styles.content}>{content}</Text>
        <Text style={styles.author}>Author: {author}</Text>
      </VStack>
    </Box>
  );
};
