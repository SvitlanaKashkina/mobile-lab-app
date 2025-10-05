import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');
const wp = (percentage) => (width * parseFloat(percentage)) / 100;
const hp = (percentage) => (height * parseFloat(percentage)) / 100;
const isTablet = width >= 768;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  flatList: {
    flex: 1,
    paddingHorizontal: isTablet ? wp("4%") : 12,
    paddingTop: isTablet ? hp("3%") : 10,
    paddingBottom: isTablet ? hp("4%") : 20,
  },
});
