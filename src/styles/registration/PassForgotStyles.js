import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const wp = (percentage) => (width * parseFloat(percentage)) / 100;
const hp = (percentage) => (height * parseFloat(percentage)) / 100;

// Tablet-Check
const isTablet = width >= 768;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    backgroundImage: {
        position: 'absolute',
        width: "100%",
        height: "100%",
    },
    view: {
        flex: 1,
        alignItems: "center",
        marginTop: isTablet ? hp("10%") : hp("15%"),
        marginBottom: isTablet ? hp("5%") : hp("5%"),
    },
    box: {
        padding: wp("4%"),
        paddingVertical: hp("4%"),
        paddingTop: hp("2%"),
        marginBottom: hp("12%"),
        width: isTablet ? wp("70%") : wp("90%"),
        maxWidth: wp("80%"),
        backgroundColor: "white",
        borderRadius: wp("3%"),
        shadowColor: "#000",
        shadowOffset: { width: 0, height: hp("0.5%") },
        shadowOpacity: 0.3,
        shadowRadius: wp("3%"),
        elevation: 5,
    },
    heading: {
        textAlign: "center",
        color: "darkblue",
        fontSize: isTablet ? wp("5%") : wp("6.5%"),
    },
    subheading: {
        textAlign: "center",
        marginTop: hp("2%"),
        fontStyle: "italic"
    },
    text: {
        color: "black",
        marginTop: hp("0.5%"),
    },
    input: {
        borderWidth: 1,
        borderColor: "black",
        height: isTablet ? hp("6%") : hp("5%"),
        borderRadius: 6,
        paddingLeft: wp("3%"),
        fontSize: isTablet ? wp("2%") : wp("3.5%"),
    },
    button: {
        marginTop: hp("3%"),
        borderRadius: 5,
        alignItems: 'center',
        backgroundColor: "darkblue",
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: hp("13%"),
        marginRight: hp("1%"),
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 10,
    },
    backText: {
        fontSize: isTablet ? 20 : 18,
        marginLeft: 5,
        color: '#FE9900',
        fontWeight: 'bold',
    },
});