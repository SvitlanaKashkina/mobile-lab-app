import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const wp = (percentage) => (width * parseFloat(percentage)) / 100;
const hp = (percentage) => (height * parseFloat(percentage)) / 100;

const isTablet = width >= 768;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  box: {
    paddingHorizontal: wp(isTablet ? "3%" : "4%"),
    paddingTop: hp("0.5%"),
    paddingBottom: hp("1%"),
    width: "100%",
    maxWidth: wp(isTablet ? "70%" : "88%"),
    backgroundColor: "white",
    borderRadius: wp("2%"),
    // iOS shadow
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    // Android shadow
    elevation: 15,
  },
  heading: {
    justifyContent: "flex-start",
    color: "darkblue",
    textAlign: "center",
    fontSize: wp(isTablet ? "4%" : "5%"),
  },
  label: {
    color: "black",
    fontSize: wp(isTablet ? "3%" : "3.5%"),
    fontWeight: "500",
    marginTop: hp("0.5%"),
  },
  inputContainer: {
    justifyContent: 'center',
  },
  icon: {
    position: 'absolute',
    right: wp("2%"),
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    height: hp(isTablet ? "4.5%" : "5.5%"),
    borderRadius: wp("2%"),
    paddingLeft: wp("3.5%"),
    fontSize: wp(isTablet ? "3.5%" : "4%"),
    textAlignVertical: "center",
    backgroundColor: "#f9f9f9",
  },
  button: {
    marginTop: hp("2%"),
    marginBottom: hp("2%"),
    borderRadius: wp("2%"),
    alignItems: 'center',
    fontSize: wp(isTablet ? "5%" : "5.5%"),
    backgroundColor: "darkblue",
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp("11%"),
    marginRight: hp("1%"),
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 10,
  },
  backText: {
    fontSize: wp(isTablet ? "4%" : "4.5%"),
    marginLeft: 5,
    color: '#FE9900',
    fontWeight: 'bold',
  },
});
