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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: wp("2%"),
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  uploadingContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "gray",
    paddingVertical: hp("1.5%"),
    paddingHorizontal: wp("3%"),
    borderRadius: 7,
    backgroundColor: "white",
    maxHeight: hp(isTablet ? "12%" : "9%"),
    fontSize: isTablet ? wp("4%") : wp("3.5%"),
  },
  button: {
    marginLeft: wp("2%"),
    paddingVertical: hp("1.5%"),
    paddingHorizontal: wp("4%"),
    backgroundColor: "blue",
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: "white",
    fontSize: isTablet ? wp("4%") : wp("3.5%"),
  },
  messageRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginVertical: hp("0.5%"),
    marginHorizontal: wp("1%"),
  },
  ownMessageRow: {
    justifyContent: "flex-end",
  },
  otherMessageRow: {
    justifyContent: "flex-start",
  },
  messageContent: {
    backgroundColor: "#C8F3F5",
    padding: hp("1.5%"),
    borderRadius: wp("3%"),
    maxWidth: "75%",
    minWidth: wp("12%"),
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  ownMessage: {
    backgroundColor: "#FFFFFF",
    borderTopRightRadius: 0,
    marginLeft: wp("2%"),
    position: 'relative',
    marginLeft: 10,
    padding: 10,
    maxWidth: "75%",
  },
  otherMessage: {
    backgroundColor: "#89F5FA",
    borderTopLeftRadius: 0,
    marginRight: wp("2%"),
  },
  deleteIconContainer: {
    right: 2,
    width: 16,
    height: 17,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    marginLeft: wp("1%"),
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: hp("0.5%"),
  },
  userName: {
    fontWeight: "bold",
    fontSize: isTablet ? wp("4%") : wp("3.5%"),
    marginRight: wp("1%"),
    maxWidth: '85%',
  },
  imageWrapper: {
    padding: wp("0.5%"),
  },
  image: {
    width: isTablet ? 50 : 36,
    height: isTablet ? 50 : 36,
    borderRadius: isTablet ? 25 : 18,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  messageImage: {
    width: isTablet ? wp("40%") : wp("60%"),
    height: isTablet ? hp("25%") : hp("20%"),
    borderRadius: wp("3%"),
    marginTop: hp("1%"),
    resizeMode: "cover",
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  fullImage: {
    width: "100%",
    height: "100%",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  fullscreenImage: {
    width: "95%",
    height: "95%",
  },
  closeArea: {
    position: "absolute",
    top: hp("5%"),
    right: wp("5%"),
    padding: wp("3%"),
    zIndex: 10,

  },
  closeText: {
    color: "white",
    fontSize: isTablet ? wp("5%") : wp("4%"),
    fontWeight: 'bold',
  },
  messageTimestamp: {
    fontSize: 10,
    color: 'gray',
    marginTop: 4,
    textAlign: 'right',
  }
});