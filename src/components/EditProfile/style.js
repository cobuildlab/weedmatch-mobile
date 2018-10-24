import { StyleSheet, Platform } from 'react-native';

const COOL_GRAY = '#B2B2B2';
const LIGHT_GRAY = '#CCCCCC';
const MAGENTA = '#9605CC';
const MEDIUM_GRAY = '#777777';
const STANDARD_GRAY = '#9D9D9C';
const WHITE = '#FFFFFF';

const styleSheet = StyleSheet.create({
    scrollView: {
        backgroundColor: WHITE,
        marginBottom: 0,
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: WHITE,
    },
    mePic: {
        width: '100%',
        height: 300,
        resizeMode: 'cover',
        backgroundColor: LIGHT_GRAY,
    },
    meSubPic: {
        width: '30%',
        height: 85,
        marginRight: 2,
    },
    meDescription: {
        width: '100%',
        height: 40,
    },
    containers: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: WHITE,
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
    contentForm: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft: 15,
        paddingRight: 15,
    },
    content: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 15,
    },
    contentFormGender: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 5,
        paddingRight: 5,
        marginTop: 0,
        marginBottom: 20,
    },
    contenGender: {
        width: '30%',
        height: 30,
        marginRight: 8,
        alignItems: 'center',
    },
    buttomEditSexOff: {
        marginBottom: 10,
        width: '100%',
        paddingTop: 10,
        paddingBottom: 10,
        borderColor: LIGHT_GRAY,
        borderRadius: 50,
        borderWidth: 1,
        alignItems: 'center',
    },
    buttonTextOff: {
        color: LIGHT_GRAY,
        fontSize: 16,
    },
    buttomEditSexOn: {
        marginBottom: 10,
        width: '100%',
        paddingTop: 10,
        paddingBottom: 10,
        borderColor: MAGENTA,
        borderRadius: 50,
        borderWidth: 1,
        alignItems: 'center',
    },
    buttonTextOn: {
        color: MAGENTA,
        fontSize: 16,
    },
    buttomRegisterStyle: {
        marginTop: 15,
        marginBottom: 10,
        width: 250,
        marginRight: 5,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 50,
        alignItems: 'center',
        backgroundColor: MAGENTA,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
    },
    buttonTextCard: {
        color: MAGENTA,
        fontSize: 16,
    },
    buttomCardStyle: {
        marginBottom: 10,
        marginLeft: 15,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 50,
        alignItems: 'center',
    },
    textLabelCard: {
        color: MEDIUM_GRAY,
        fontSize: 16,
        marginLeft: 15,
        marginBottom: 0,
        paddingBottom: 0,
        alignItems: 'flex-start',
    },
    buttomPassStyle: {
        marginBottom: 10,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 50,
        alignItems: 'center',
    },
    labelText: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginTop: 20,
        marginBottom: 0,
        paddingBottom: 0,
    },
    labelTextComprar: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginTop: 20,
        marginBottom: 0,
        paddingBottom: 0,
    },
    textLabel: {
        color: MEDIUM_GRAY,
        fontSize: 16,
        marginBottom: 0,
        paddingBottom: 0,
    },
    textLabelSwitch: {
        color: MEDIUM_GRAY,
        fontSize: 16,
        marginTop: 5,
        marginBottom: 0,
        paddingBottom: 0,
    },
    switchStyle: {
        marginBottom: 20,
    },
    viewSwitch: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    textLabelvalue: {
        color: MEDIUM_GRAY,
        fontSize: 16,
        marginBottom: 0,
        marginLeft: 30,
        paddingBottom: 0,
    },
    labelTextGender: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginTop: 20,
        paddingRight: 15,
        paddingLeft: 15,
        marginBottom: 15,
        paddingBottom: 0,
    },
    buttomUploadStyle: {
        backgroundColor: WHITE,
    },
    meSubImg: {
        width: '100%',
        height: 80,
        resizeMode: 'cover',
    },
    meSubImgSin: {
        width: '100%',
        height: 80,
        resizeMode: 'contain',
    },
    meInfoWrap: {
        flexDirection: 'column',
    },
    meContenInfo: {
        padding: 15,
        paddingTop: 5,
        marginBottom: 20,
    },
    meData: {
        flex: 2,
        paddingTop: 20,
        flexDirection: 'row',
    },
    meInfo: {
        alignItems: 'center',
    },
    meName: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#333',
        paddingTop: 5,
    },

    meNameOther: {
        fontWeight: '300',
        fontSize: 14,
        color: STANDARD_GRAY,
        paddingTop: 5,
    },
    data: {
        flex: 1,
        alignItems: 'center',
    },
    imageMode: {
        resizeMode: 'stretch',
    },
    buttomDelete: {
        ...StyleSheet.absoluteFillObject,
        top: -8,
        left: -8,
        zIndex: 999,
        ...Platform.select({
            ios: {
                width: 15,
                height: 15,
            },
            android: {
                width: 35,
                height: 35,
            },
        }),
    },
    contentImg: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    edit: {
        borderWidth: 1,
        borderColor: LIGHT_GRAY,
        borderRadius: 3,
        alignItems: 'center',
        margin: 15,
        padding: 2,
    },
    edit2: {
        alignItems: 'center',
        margin: 15,
        marginTop: 0,
        padding: 2,
    },
    buttomCerrarStyle: {
        marginTop: 0,
        marginBottom: 10,
        width: 250,
        marginRight: 5,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 50,
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    divider: {
        height: 0.5,
        width: '100%',
        backgroundColor: COOL_GRAY,
        marginBottom: 0,
        paddingLeft: 30,
        paddingRight: 30,
        marginTop: 0,
    },
    marginView: {
        marginTop: 30,
        width: '100%',
        marginRight: 50,
        alignItems: 'center',
    },
});

export default styleSheet;
