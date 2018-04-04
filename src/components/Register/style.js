import { StyleSheet, Platform  } from 'react-native';

export default styles = StyleSheet.create({
    container: {
        flex: 2,
        width: '80%',
        resizeMode: 'contain',
        justifyContent: 'center',
    },

    contentRegister: {
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
        marginTop: 2,
        marginBottom: 10,
        width: 220,
        paddingTop: 5,
        paddingBottom: 10,
        borderColor: '#9605CC',
        borderWidth: 1,
        borderRadius: 50,
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    buttonTextCancel: {
        color: '#9605CC',
        fontSize: 16,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
    },
    buttomBackLogin: {
        marginTop: 30,
    },
    teclado: {
        backgroundColor: '#fff',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

        ...Platform.select({
            ios: {},
            android: {},
        }),
    }
})