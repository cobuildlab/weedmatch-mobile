import { StyleSheet, Platform  } from 'react-native';
import {WHITE} from '../../styles/colors';

export default styles = StyleSheet.create({
    container: {
        width: '80%',
        resizeMode: 'contain',
        flex: 1,
    },
    contentRegister: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },
    textLight: {
        fontSize: 20,
        color: '#9605CC',
    },
    boxTitle:{
      backgroundColor: '#9605CC',
      alignItems: 'center',
      marginBottom: 25,
      borderBottomLeftRadius: 200,
      borderBottomRightRadius: 200,
    },
    textRegister: {
        fontSize: 26,
        color: '#fff',
        marginBottom: 30,
        marginTop: 30,
    },
    textRegister2: {
        fontSize: 26,
        textAlign: 'center',
        color: '#9605CC',
        width: '100%',
        marginBottom: 30,
        marginTop: 30,
        ...Platform.select({
            ios: {
                marginTop: 35,
            },
        }),
    },
    textRegisterContinue: {
        fontSize: 22,
        color: '#9605CC',
        marginBottom: 30,
        textAlign: 'center',
        ...Platform.select({
            android: {
                marginTop: -30,
            },
        }),
    },
    textIam: {
        fontSize: 18,
        color: '#333',
        marginBottom: 15,
        textAlign: 'center',
    },
    textphoto: {
        fontSize: 18,
        color: '#333',
        marginBottom: 0,
        textAlign: 'center',
    },
    textBold: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#9605CC',
        marginBottom: 25,
    },
    inputStyle: {
        backgroundColor: '#ffffff',
        height: 45,
        width: 250,
        borderColor: '#ccc',
        borderRadius: 50,
        borderWidth: 1,
        paddingLeft: 20,
        paddingRight: 10,
        paddingTop: 12,
        marginBottom: 10,
        ...Platform.select({
            ios: {
                paddingTop: 0,
            },
        }),
    },
    inputStyleFecha: {
        backgroundColor: '#ffffff',
        height: 40,
        width: 250,
        borderColor: '#ccc',
        borderRadius: 50,
        borderWidth: 1,
        paddingLeft: 100,
        paddingRight: 10,
        marginBottom: 10,
    },
    viewButtonStyleFecha: {
        position: 'absolute',
        zIndex: 999,
        top: 10,
        left: 17,
        width: 230,
    },
    textButtonStyleFecha: {
        color: '#ccc',
    },
    textFecha: {
        color: '#9605CC',
    },
    buttomRegisterStyle: {
        marginTop: 5,
        marginBottom: 10,
        width: 250,
        marginRight: 5,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 50,
        alignItems: 'center',
        backgroundColor: '#9605CC',

    },
    buttomUploadStyle: {
        marginTop: 5,
        marginBottom: 15,
        width: 170,
        height: 130,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttomUpload: {
        width: 120,
        height: 120,
        flex: 0,
        resizeMode:'contain'
    },
    buttomToUpload: {
        width: 120,
        height: 120,
        flex: 0,
        borderRadius: 60,
    },
    buttomRegisterSexOff: {
        marginTop: 0,
        marginBottom: 10,
        width: 250,
        marginRight: 5,
        paddingTop: 10,
        paddingBottom: 10,
        borderColor: '#ccc',
        borderRadius: 50,
        borderWidth: 1,
        alignItems: 'center',
    },
    buttonTextOff: {
        color: '#ccc',
        fontSize: 16,
    },
    buttomRegisterSexOn: {
        marginTop: 0,
        marginBottom: 10,
        width: 250,
        marginRight: 5,
        paddingTop: 10,
        paddingBottom: 10,
        borderColor: '#9605CC',
        borderRadius: 50,
        borderWidth: 1,
        alignItems: 'center',
    },
    buttonTextOn: {
        color: '#9605CC',
        fontSize: 16,
    },

    buttomFacebookStyle: {
        marginTop: 5,
        marginBottom: 10,
        width: 250,
        paddingTop: 14,
        paddingBottom: 14,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3b5998',
    },
    logoFacebook:{
      width:16,
      height: 17,
      position: 'absolute',
      top: 11,
      left: 17,
    },
    buttonTextFacebook: {
        color: WHITE,
        fontSize: 16,
        fontWeight: '500',
        paddingLeft: 18,
        marginTop: -5,
    },
    contentSocial:{
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    opt:{
      justifyContent: 'center',
      alignItems: 'center',
      color: '#777',
    },
    lineOpt:{
      width: 50,
      height: 1,
      backgroundColor: '#777',
    },
    optBox:{
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
      marginBottom: 30,
    },
    buttomCancelStyle: {
        marginTop: 0,
        marginBottom: 10,
        width: 250,
        marginRight: 5,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 50,
        alignItems: 'center',
        backgroundColor: 'transparent',
        ...Platform.select({
            android: {
                paddingTop: 0,
                paddingBottom: 10,
            },
        }),
    },
    buttonTextCancel: {
        color: '#9605CC',
        fontSize: 16,
    },
    buttonTextTerms: {
        color: '#777',
        fontSize: 15,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
    },
    buttomBackLogin: {
        marginTop: 30,
    },
    grupBtn:{
      flex: 1, flexDirection: 'row',  justifyContent: 'center',
      width: '90%',
    },
    radioStyle:{
      paddingTop: 5,
      paddingBottom: 5,
    },
    teclado: {
        backgroundColor: '#fff',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 'auto',
        ...Platform.select({
            ios: {},
            android: {},
        }),
    },
    picker: {
        position: 'absolute',
        zIndex: 999,
        top: 10,
        left: 17,
        width: 230
    },
    scrollContainer: {
        backgroundColor: '#FFF',
        flex:1,
    },
    termsModalContainer: {
        alignItems: 'center',
        elevation: 5,
        margin: 30,
        padding: 20,
    },
    termsModalText: {
        fontSize: 14,
    },
})
