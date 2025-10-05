import { Platform, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const wp = (percentage) => (width * parseFloat(percentage)) / 100;
const hp = (percentage) => (height * parseFloat(percentage)) / 100;

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: wp("4%"),
    borderColor: "darkblue",
    borderWidth: wp("0.5%"),
    marginBottom: hp("2%"),
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowOffset: { width: wp("2%"), height: hp("1.5%") },
        shadowColor: "black",
        shadowOpacity: 0.1,
        shadowRadius: wp("2%"),
      },
      android: {
        elevation: 5,
      },
    }),
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: hp("0.5%"),
    paddingHorizontal: wp("3%"),
  },
  createdAt: {
    fontSize: wp("3.5%"),
    fontWeight: "bold",
    color: "darkblue",
  },
  newsId: {
    fontSize: wp("3.5%"),
    fontWeight: "600",
    color: "darkblue",
  },
  imageContainer: {
    width: "100%",
    height: hp("10%"),
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  line: {
    height: hp("0.3%"),
    backgroundColor: "darkblue",
    width: "100%",
  },
  title: {
    fontSize: wp("5%"),
    fontWeight: "bold",
    paddingHorizontal: wp("3%"),
    marginBottom: hp("0.5%"),
    color: "darkblue",
    lineHeight: hp("2.5%"),
  },
  content: {
    fontSize: wp("4%"),
    color: "black",
    paddingHorizontal: wp("3%"),
    textAlign: "justify",
    lineHeight: hp("2.2%"),
    marginBottom: hp("0.5%"),
  },
  author: {
    fontSize: wp("3.5%"),
    fontStyle: "italic",
    color: "darkblue",
    textAlign: "right",
    paddingHorizontal: wp("3%"),
    paddingBottom: hp("0.5%"),
  },
});