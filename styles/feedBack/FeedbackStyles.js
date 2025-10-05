import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const wp = (percentage) => (width * parseFloat(percentage)) / 100;
const hp = (percentage) => (height * parseFloat(percentage)) / 100;
const isTablet = width >= 768;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    minHeight: hp("100%"),
    justifyContent: "flex-start",
    alignItems: "center",
    paddingBottom: hp("10%"),
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  box: {
    width: "90%",
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    borderRadius: wp(isTablet ? "2.5%" : "2%"),
    shadowColor: "#52585F",
    shadowOpacity: 0.4,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 5,
    alignItems: "center",
    marginTop: hp("1%"),
    padding: isTablet ? hp("2%") : hp("1%"),
  },
  feedbackImage: {
    width: "90%",
    height: isTablet ? "28%" : "34%",
    resizeMode: "contain",
  },
  label: {
    fontSize: isTablet ? wp("3.2%") : wp("4%"),
    color: "darkblue",
    marginLeft: hp("3%"),
    alignSelf: "flex-start",
    marginBottom: 5,
  },
  input: {
    minHeight: isTablet ? 50 : 40,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: wp(isTablet ? "2.5%" : "2%"),
    fontSize: wp(isTablet ? "3.8%" : "4%"),
    paddingHorizontal: hp("1%"),
    marginBottom: hp("2%"),
    marginLeft: hp("1%"),
    marginRight: hp("1%"),
    backgroundColor: "white",
    width: "95%",
  },
  button: {
    marginTop: hp("2%"),
    marginBottom: hp("4%"),
    padding: hp(isTablet ? "2%" : "1.5%"),
    borderRadius: wp(isTablet ? "3%" : "2%"),
    backgroundColor: "darkblue",
    alignItems: 'center',
    width: "90%",
  },
  textButton: {
    fontSize: wp(isTablet ? "3.8%" : "4%"),
    color: "white",
  },
  text: {
    fontSize: wp(isTablet ? "3.2%" : "3%"),
    color: "darkblue",
    marginHorizontal: hp("3%"),
  },
});