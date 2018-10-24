import { StyleSheet } from 'react-native';

const BLUE = '#3B5998';
const MAGENTA = '#9605CC';
const PLEASANT_TEXT_BLACK = '#333333';
const WHITE = '#FFFFFF';

const styleSheet = StyleSheet.create({
    buttomFacebookStyle: {
        alignItems: 'center',
        backgroundColor: BLUE,
        borderRadius: 8,
        justifyContent: 'center',
        marginBottom: 10,
        marginTop: 5,
        paddingBottom: 14,
        paddingTop: 14,
        width: 260,
    },
    buttomIconMsg: {
        height: 10,
        position: 'absolute',
        right: 35,
        top: 22,
        width: 10,
        zIndex: 999,
    },
    buttomIconProfile: {
        height: 10,
        left: 15,
        position: 'absolute',
        top: 22,
        width: 10,
        zIndex: 999,
    },
    buttomLoginIntagramStyle: {
        alignItems: 'center',
        backgroundColor: MAGENTA,
        borderRadius: 50,
        marginBottom: 10,
        marginTop: 5,
        paddingBottom: 14,
        paddingTop: 14,
        width: 300,
    },
    buttomLoginStyle: {
        alignItems: 'center',
        backgroundColor: MAGENTA,
        // backgroundColor: '#c646b6',
        borderRadius: 50,
        marginBottom: 10,
        marginTop: 5,
        paddingBottom: 14,
        paddingTop: 14,
        width: 240,
    },
    buttomRegister: {
        marginTop: 20,
    },
    buttonInstagramText: {
        color: WHITE,
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonText: {
        color: WHITE,
        fontSize: 16,
    },
    buttonTextFacebook: {
        color: WHITE,
        fontSize: 16,
        fontWeight: '500',
        marginTop: -5,
        paddingLeft: 20,
    },
    buttonTextRegister: {
        color: PLEASANT_TEXT_BLACK,
        fontSize: 16,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        resizeMode: 'contain',
        width: '100%',
    },
    contentLogin: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        marginBottom: 20,
        marginTop: 15,
    },
    headerImageHolder: {
        flex: 1,
        flexDirection: 'row',
    },
    headerLogin: {
        alignItems: 'center',
        backgroundColor: MAGENTA,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    imageStyle: {
        flex: 2,
        height: 300,
        width: null,
    },
    imgIconMsg: {
        height: 27,
        width: 30,
    },
    imgIconProfile: {
        height: 28,
        width: 28,
    },
    logoFacebook: {
        height: 17,
        left: 17,
        position: 'absolute',
        top: 11,
        width: 16,
    },
    scrollContainer: {
        backgroundColor: WHITE,
        height: '100%',
    },
    textBold: {
        color: MAGENTA,
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 40,
    },
    textLight: {
        color: MAGENTA,
        fontSize: 20,
    },
});

export default styleSheet;
