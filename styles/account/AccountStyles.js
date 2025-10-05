import { Platform, StyleSheet, Dimensions } from 'react-native';

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
  uploadOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  uploadText: {
    color: '#fff',
    marginTop: 10,
    fontSize: 16,
    fontWeight: '600',
  },
  viewFoto: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    alignSelf: "center",
    marginTop: hp("4%"),
    marginBottom: hp("1%"),
    width: isTablet ? wp("35%") : wp("50%"),
    height: isTablet ? wp("35%") : wp("50%"),
    borderRadius: wp("2%"),
    borderWidth: 1,
    borderColor: "white",
  },
  button: {
    marginTop: hp("1%"),
    paddingHorizontal: wp("5%"),
    borderRadius: wp("2%"),
    borderWidth: 1,
    borderColor: "darkblue",
    height: isTablet ? hp("5%") : hp("4%"),
    width: isTablet ? wp("40%") : wp("50%"),
    flexDirection: "row",
    alignSelf: 'center',
    alignItems: "center",      
    justifyContent: "center",
    backgroundColor: "white",
  },
  buttonText: {
    fontSize: isTablet ? wp("3.5%") : wp("4%"),
    color: "darkblue",
    textAlign: 'center',
    marginLeft: hp("2.5%"),
    marginTop: Platform.OS === "ios" ? hp("0.2%") : 0,
  },
  viewText: {
    marginTop: hp("3%"),
    marginLeft: hp("4%"),
  },
  label: {
    fontSize: isTablet ? wp("3.8%") : wp("4.3%"),
    marginTop: hp("2.5%"),
    color: "darkblue",
  },
  text: {
    fontSize: isTablet ? wp("4.5%") : wp("5%"),
    fontWeight: "bold",
    marginTop: hp("0.5%"),
    color: "#073570",
  },
  viewDelete: {
    marginBottom: hp("1%"),
    marginTop: hp("0.5%"),
    padding: hp("1.5%"),
    borderRadius: wp("2%"),
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  textDelete: {
    textDecorationLine: "underline",
    marginLeft: hp("1.5%"),
    color: "darkblue",
    alignSelf: "flex-end",
    fontSize: isTablet ? wp("4%") : wp("5%"),
  },
});