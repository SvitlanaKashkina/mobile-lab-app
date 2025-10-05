import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const wp = (percentage) => (width * parseFloat(percentage)) / 100;
const hp = (percentage) => (height * parseFloat(percentage)) / 100;

const isTablet = width >= 768;

export const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: "100%",
        height: "100%",
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: "center",
        paddingHorizontal: wp("5%"),
        paddingVertical: hp("5%"),
    },
    box: {
        paddingHorizontal: wp("5%"),
        paddingVertical: hp("3%"),
        width: isTablet ? wp("60%") : wp("90%"),
        backgroundColor: "white",
        borderRadius: wp("3%"),
        shadowColor: "#000",
        shadowOffset: { width: 2, height: 3 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        elevation: 5,
        alignSelf: 'center',
    },
    heading: {
        textAlign: "center",
        color: "darkblue",
        fontSize: isTablet ? wp("4%") : wp("6%"),
        marginBottom: hp("0.5%"),
    },
    subheading: {
        textAlign: "center",
        marginTop: hp("1%"),
        marginBottom: hp("1%"),
        fontStyle: "italic",
        color: "darkblue",
        fontSize: isTablet ? wp("3%") : wp("4%"),
    },
    labelText: {
        color: "black",
        fontSize: wp("4%"),
    },
    input: {
        borderWidth: 1,
        borderColor: "black",
        height: hp("5.5%"),
        borderRadius: wp("2%"),
        paddingLeft: wp("3%"),
        fontSize: isTablet ? wp("3%") : wp("4%"),
        backgroundColor: "#f9f9f9",
    },
    inputContainer: {
        marginBottom: hp("1%"),
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 5,
        backgroundColor: "#f9f9f9",
        height: hp("5.5%"),
        paddingHorizontal: 10,
    },
    inputInner: {
        flex: 1,
        fontSize: wp("4%"),
    },
    icon: {
        position: 'absolute',
        right: wp("1.5%"),
        top: hp("1%"),
    },
    linkText: {
        marginTop: hp("0.5%"),
        color: "darkblue",
        fontSize: wp("4%"),
    },
    hStack: {
        flexDirection: "column",
        alignItems: "center",
        marginTop: hp("0.3%"),
    },
    smallText: {
        fontSize: wp("4%"),
        color: "black",
    },
    signUpLink: {
        color: "blue",
        fontWeight: "bold",
        textDecorationLine: "underline",
        fontSize: wp("4%"),
        marginTop: hp("0.3%"),
    },
    button: {
        marginVertical: hp("0.5%"),
        paddingVertical: hp("1%"),
        borderRadius: wp("2%"),
        alignItems: 'center',
        backgroundColor: "darkblue",
    },
     buttonText: {
        fontSize: wp("5%"),
        color: "white",
    },
});