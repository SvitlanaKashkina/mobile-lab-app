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
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: hp("23%"),
    maxHeight: 300,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  menuComponent: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 10,
    backgroundColor: 'rgba(255,255,255,0.7)',
    padding: 8,
    borderRadius: 6,
  },
  vStack: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    paddingTop: 6,
    paddingHorizontal: 18,
  },
  heading: {
    fontSize: isTablet ? wp("4.5%") : wp("5.5%"),
    textAlign: 'center',
    color: 'darkblue',
    fontStyle: 'italic',
    paddingTop: 8,
    paddingBottom: 6,
    textShadowColor: 'rgb(255, 255, 153)',
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 3,
    fontStyle: 'italic',
  },
  paragraph: {
    fontSize: isTablet ? wp("3.8%") : wp("4.5%"),
    textAlign: 'justify',
    color: 'darkblue',
    lineHeight: isTablet ? hp("2.8%") : hp("3%"),
  },
  listHead: {
     fontSize: isTablet ? wp("3.5%") : wp("4.5%"),
     color: 'darkblue',
     fontStyle: 'italic',
  },
  listItem: {
    fontSize: isTablet ? wp("3.2%") : wp("4%"),
    color: 'darkblue',
  },
  linksHead: {
    fontSize: isTablet ? wp("3.5%") : wp("4.5%"),
    color: 'darkblue',
    fontWeight: 'bold',
    textShadowColor: 'rgb(255, 255, 153)',
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 3,
    fontStyle: 'italic',
    marginTop: hp(2),
    marginBottom: hp(1),
  },
  textLink: {
    fontSize: isTablet ? wp("3.2%") : wp("4%"),
    textAlign: 'left',
    color: 'darkblue',
    textDecorationLine: 'underline',
    marginBottom: 8,
    paddingTop: hp(0.3),

  },
});
