import { StyleSheet, Platform } from 'react-native';

const COOL_GRAY = '#B2B2B2';
export const LIGHT_GRAY = '#CCCCCC';
export const MAGENTA = '#9605CC';
const MEDIUM_GRAY = '#777777';
const PLEASANT_TEXT_BLACK = '#333333';
const STANDARD_GRAY = '#9D9D9C';
const WHITE = '#FFFFFF';

const styleSheet = StyleSheet.create({
    buttomCardStyle: {
        alignItems: 'center',
        borderRadius: 50,
        marginBottom: 10,
        marginLeft: 15,
        paddingBottom: 10,
        paddingTop: 10,
    },
    // transparent isn't a color!
    // eslint-disable-next-line react-native/no-color-literals
    buttomCerrarStyle: {
        alignItems: 'center',
        backgroundColor: 'transparent',
        borderRadius: 50,
        marginBottom: 10,
        marginRight: 5,
        marginTop: 0,
        paddingBottom: 10,
        paddingTop: 10,
        width: 250,
    },
    buttomDelete: {
        ...StyleSheet.absoluteFillObject,
        ...Platform.select({
            android: {
                height: 35,
                width: 35,
            },
            ios: {
                height: 15,
                width: 15,
            },
        }),
        left: -8,
        top: -8,
        zIndex: 999,
    },
    buttomEditSexOff: {
        alignItems: 'center',
        borderColor: LIGHT_GRAY,
        borderRadius: 50,
        borderWidth: 1,
        marginBottom: 10,
        paddingBottom: 10,
        paddingTop: 10,
        width: '100%',
        color:'black',
        height:39,
    },
    buttomEditSexOn: {
        alignItems: 'center',
        borderColor: MAGENTA,
        borderRadius: 50,
        borderWidth: 1,
        height:39,
        color:'black',
        marginBottom: 10,
        paddingBottom: 10,
        paddingTop: 10,
        width: '100%'
    },
    buttomPassStyle: {
        alignItems: 'center',
        borderRadius: 50,
        marginBottom: 10,
        paddingBottom: 10,
        paddingTop: 10,
    },
    buttomRegisterStyle: {
        alignItems: 'center',
        backgroundColor: MAGENTA,
        borderRadius: 50,
        marginBottom: 10,
        marginRight: 5,
        marginTop: 15,
        paddingBottom: 10,
        paddingTop: 10,
        width: 250,
    },
    buttomUploadStyle: {
        backgroundColor: WHITE,
    },
    buttonText: {
        color: WHITE,
        fontSize: 16,
    },
    buttonTextCard: {
        color: MAGENTA,
        fontSize: 16,
    },
    buttonTextOff: {
        color: LIGHT_GRAY,
        fontSize: 16,
    },
    buttonTextOn: {
        color: MAGENTA,
        fontSize: 16,
    },
    container: {
        backgroundColor: WHITE,
        flex: 1,
    },
    containers: {
        alignItems: 'center',
        backgroundColor: WHITE,
        flex: 1,
        justifyContent: 'center',
    },
    contenGender: {
        alignItems: 'center',
        height: 30,
        marginRight: 8,
        width: '30%',
    },
    content: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        paddingLeft: 15,
        paddingRight: 15,
    },
    contentForm: {
        alignItems: 'flex-start',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        paddingLeft: 15,
        paddingRight: 15,
    },
    contentFormGender: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
        marginTop: 0,
        paddingLeft: 5,
        paddingRight: 5,
    },
    contentImg: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },
    data: {
        alignItems: 'center',
        flex: 1,
    },
    divider: {
        backgroundColor: COOL_GRAY,
        height: 0.5,
        marginBottom: 0,
        marginTop: 0,
        paddingLeft: 30,
        paddingRight: 30,
        width: '100%',
    },
    edit: {
        alignItems: 'center',
        borderColor: LIGHT_GRAY,
        borderRadius: 3,
        borderWidth: 1,
        margin: 15,
        padding: 2,
    },
    edit2: {
        alignItems: 'center',
        margin: 15,
        marginTop: 0,
        padding: 2,
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
    imageMode: {
        resizeMode: 'stretch',
    },

    labelText: {
        alignItems: 'flex-start',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 0,
        marginTop: 20,
        paddingBottom: 0,
    },
    labelTextComprar: {
        alignItems: 'flex-start',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        marginBottom: 0,
        marginTop: 20,
        paddingBottom: 0,
    },
    labelTextGender: {
        alignItems: 'flex-start',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        marginBottom: 15,
        marginTop: 20,
        paddingBottom: 0,
        paddingLeft: 15,
        paddingRight: 15,
    },
    marginView: {
        alignItems: 'center',
        marginRight: 50,
        marginTop: 30,
        width: '100%',
    },
    meContenInfo: {
        marginBottom: 20,
        padding: 15,
        paddingTop: 5,
    },
    meData: {
        flex: 2,
        flexDirection: 'row',
        paddingTop: 20,
    },
    meDescription: {
        height: 40,
        width: '100%',
    },
    meInfo: {
        alignItems: 'center',
    },
    meInfoWrap: {
        flexDirection: 'column',
    },
    meName: {
        color: PLEASANT_TEXT_BLACK,
        fontSize: 16,
        fontWeight: 'bold',
        paddingTop: 5,
    },
    meNameOther: {
        color: STANDARD_GRAY,
        fontSize: 14,
        fontWeight: '300',
        paddingTop: 5,
    },
    mePic: {
        backgroundColor: LIGHT_GRAY,
        height: 300,
        resizeMode: 'cover',
        width: '100%',
    },
    meSubImg: {
        height: 80,
        resizeMode: 'cover',
        width: '100%',
    },
    meSubImgSin: {
        height: 80,
        resizeMode: 'contain',
        width: '100%',
    },
    meSubPic: {
        height: 85,
        marginRight: 2,
        width: '30%',
    },
    scrollView: {
        backgroundColor: WHITE,
        flex: 1,
        marginBottom: 0,
    },
    switchStyle: {
        marginBottom: 20,
    },
    textLabel: {
        color: MEDIUM_GRAY,
        fontSize: 16,
        marginBottom: 0,
        paddingBottom: 0,
    },
    textLabelCard: {
        alignItems: 'flex-start',
        color: MEDIUM_GRAY,
        fontSize: 16,
        marginBottom: 0,
        marginLeft: 15,
        paddingBottom: 0,
    },
    textLabelSwitch: {
        color: MEDIUM_GRAY,
        fontSize: 16,
        marginBottom: 0,
        marginTop: 5,
        paddingBottom: 0,
    },
    textLabelvalue: {
        color: MEDIUM_GRAY,
        fontSize: 16,
        marginBottom: 0,
        marginLeft: 30,
        paddingBottom: 0,
    },
    viewSwitch: {
        alignItems: 'flex-end',
        flex: 1,
        justifyContent: 'center',
    },
});

export default styleSheet;
