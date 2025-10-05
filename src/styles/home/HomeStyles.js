import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const wp = (percentage) => (width * parseFloat(percentage)) / 100;
const hp = (percentage) => (height * parseFloat(percentage)) / 100;

const isTablet = width >= 768;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center", 
    justifyContent: "center",
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  view: {
    flex: 1,
    alignSelf: "center",
    marginTop: isTablet ? hp("8%") : hp("10%"),
    width: isTablet ? wp("70%") : wp("80%"),
  },
  title: {
    fontSize: isTablet ? wp("5.5%") : wp("7%"),
    fontWeight: "bold",
    color: "darkblue",
    textAlign: "center",
    textShadowColor: "#E2F5FA",  
    textShadowOffset: { width: wp("1%"), height: hp("0.5%") }, 
    textShadowRadius:  wp("1%"), 
    fontStyle: "italic",
  },
  text: {
    marginTop: hp("5%"),
    paddingTop: hp("1.5%"),
    fontSize: isTablet ? wp("4%") : wp("5%"),
    fontWeight: "bold",
    color: "darkblue",
    textAlign: "center",
    lineHeight: hp("4%"),
    textShadowColor: "#E2F5FA",  
    textShadowOffset: { width: wp("0.5%"), height: hp("0.3%") },  
    textShadowRadius: wp("0.5%"), 
    fontStyle: "italic",
  },
});