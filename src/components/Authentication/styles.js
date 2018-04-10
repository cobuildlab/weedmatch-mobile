import { StyleSheet, Dimensions } from 'react-native';

export default styles = StyleSheet.create({
    headerLogin: {
        backgroundColor: '#9605CC',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        width: '100%',
        resizeMode: 'contain',
    },
    imageStyle: {
        height: 300,
        flex: 3,
        width: null,
    },
    contentLogin: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25,
    },
    textLight: {
        fontSize: 20,
        color: '#9605CC',
    },
    textBold: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#9605CC',
        marginBottom: 40,
    },

    buttomLoginIntagramStyle: {
        marginTop: 5,
        marginBottom: 10,
        width: 300,
        paddingTop: 14,
        paddingBottom: 14,
        borderRadius: 50,
        alignItems: 'center',
        backgroundColor: '#9605CC',
    },
    buttonInstagramText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttomRegister: {
        marginTop: 20,
    },
    buttonTextRegister: {
        color: '#333333',
        fontSize: 16,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
    buttomFacebookStyle: {
        marginTop: 5,
        marginBottom: 10,
        width: 280,
        paddingTop: 14,
        paddingBottom: 14,
        borderRadius: 50,
        alignItems: 'center',
        backgroundColor: '#b22abf',
    },
    buttonTextFacebook: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500',
    },
    buttomLoginStyle: {
        marginTop: 5,
        marginBottom: 10,
        width: 260,
        paddingTop: 14,
        paddingBottom: 14,
        borderRadius: 50,
        alignItems: 'center',
        // backgroundColor: '#c646b6',
          backgroundColor: '#9605CC',
    },
});