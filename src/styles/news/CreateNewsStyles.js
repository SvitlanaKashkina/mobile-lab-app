import { StyleSheet, Dimensions } from 'react-native';

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
    resizeMode: 'cover'
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: hp("10%"),
  },
  view: {
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: hp("3%"),
  },
  box: {
    alignItems: "center",
    padding: wp("3%"),
    width: isTablet ? wp("70%") : wp("90%"),
    marginTop: hp("-3%"),
    backgroundColor: "white",
    borderRadius: wp("3%"),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  label: {
    fontSize: isTablet ? wp("3.2%") : wp("4%"),
    fontWeight: "bold",
    color: "darkblue",
    fontStyle: "italic",
    alignSelf: 'center',
  },
  inputTitle: {
    height: isTablet ? 50 : 40,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: wp("2%"),
    fontSize: isTablet ? wp("3.5%") : wp("4%"),
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
    width: "100%",
  },
  inputContent: {
    height: isTablet ? 200 : 160,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: wp("2%"),
    fontSize: isTablet ? wp("3.5%") : wp("4%"),
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
    textAlignVertical: 'top',
    width: "100%",
  },
  inputAuthor: {
    height: isTablet ? 50 : 40,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: wp("2%"),
    fontSize: isTablet ? wp("3.5%") : wp("4%"),
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
    width: "100%",
  },
  fotoButton: {
    marginTop: hp("1%"),
    padding: hp("0.6%"),
    paddingLeft: hp("2%"),
    borderRadius: wp("2%"),
    borderWidth: 1,
    borderColor: "darkblue",
    alignSelf: 'center',
    height: hp("4.5%"),
    width: isTablet ? wp("40%") : wp("50%"),
    fontSize: wp("5%"),
    flexDirection: "row",
    backgroundColor: "lightgray",
  },
  fotoButtonText: {
    fontSize: isTablet ? wp("3.5%") : wp("4%"),
    color: "darkblue",
    textAlign: 'center',
    marginLeft: hp("2%"),
  },
  image: {
    width: isTablet ? wp("60%") : wp("70%"),
    height: isTablet ? hp("35%") : hp("30%"),
    marginTop: hp("2%"),
    alignSelf: 'center',
  },
  button: {
    marginBottom: hp("1%"),
    marginTop: hp("3%"),
    padding: hp("1.5%"),
    borderRadius: wp("2%"),
    alignItems: 'center',
    height: isTablet ? hp("8%") : hp("6%"),
    width: isTablet ? wp("60%") : wp("70%"),
    backgroundColor: "darkblue",
    // iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    // Android shadow
    elevation: 5,
  },
  buttonText: {
    fontSize: isTablet ? wp("4.5%") : wp("5%"),
    color: "white",
    textAlign: 'center',
    fontWeight: "bold",
  },
});