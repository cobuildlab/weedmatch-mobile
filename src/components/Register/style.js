import { StyleSheet, Platform  } from 'react-native';

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
    textBold: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#9605CC',
        marginBottom: 25,
    },
    inputStyle: {
        backgroundColor: '#ffffff',
        height: 40,
        width: 250,
        borderColor: '#ccc',
        borderRadius: 50,
        borderWidth: 1,
        paddingLeft: 20,
        paddingRight: 10,
        marginBottom: 10,
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
    buttomRegisterStyle: {
        marginTop: 0,
        marginBottom: 10,
        width: 250,
        marginRight: 5,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 50,
        alignItems: 'center',
        backgroundColor: '#9605CC',

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
    },
    buttonTextCancel: {
        color: '#9605CC',
        fontSize: 16,
    },
    buttonTextTerms: {
        color: '#333',
        fontSize: 16,
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
    }
})
