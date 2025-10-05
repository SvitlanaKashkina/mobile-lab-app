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
  formContainer: {
    flex: 1,
    alignSelf: "center",
    width: isTablet ? wp("60%") : wp("75%"),
    height: isTablet ? hp("75%") : wp("100%"),
    justifyContent: "flex-start",
  },
  text: {
    marginTop: hp("10%"),
    marginBottom: hp("7%"),
    paddingTop: hp("1.5%"),
    fontSize: isTablet ? wp("4.5%") : wp("5.9%"),
    lineHeight: hp('4%'),
    fontWeight: "bold",
    color: "darkblue",
    textAlign: "center",
    textShadowColor: "#E2F5FA",
    textShadowOffset: { width: wp("0.5%"), height: hp("0.5%") },
    shadowOpacity: 0.3,
    textShadowRadius: wp("0.8%"),
    fontStyle: "italic",
  },
  input: {
    borderWidth: 1,
    borderColor: "darkblue",
    height: hp("6%"),
    width: isTablet ? wp("35%") : wp("40%"),
    borderRadius: wp("2%"),
    backgroundColor: "white",
    alignSelf: "center",
    textAlign: "center",
    fontSize: isTablet ? wp("4.2%") : wp("4.7%"),
  },
  button: {
    marginBottom: hp("2%"),
    marginTop: hp("8%"),
    padding: isTablet ? hp("2%") : hp("1.5%"),
    width: isTablet ? wp("50%") : wp("60%"),
    borderRadius: wp("2%"),
    borderColor: "black",
    backgroundColor: "darkblue",
    alignSelf: "center",
    height: isTablet ? hp("8%") : hp("6%"),
    // Shadow für iOS
    shadowColor: '#000',
    shadowOffset: { width: wp('0.5%'), height: hp('2%') },
    shadowOpacity: 0.6,
    shadowRadius: wp('2%'),
    // Shadow für Android
    elevation: wp('1.5%'),
  },
  buttonText: {
    fontSize: isTablet ? wp("4.5%") : wp("5%"),
    color: "white",
    textAlign: 'center',
  },
});