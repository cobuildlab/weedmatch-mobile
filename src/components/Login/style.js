import { StyleSheet, Platform  } from 'react-native';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    width: '80%',
    resizeMode: 'contain',
  },
  contentLogin: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textLight: {
    fontSize: 20,
    marginTop: 35,
    color: '#9605CC',
  },
  textRegister: {
      fontSize: 26,
      color: '#9605CC',
      marginBottom: 30,
  },
  textBold: {
    fontSize: 20,
    marginBottom: 35,
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
    paddingTop: 12,
    paddingRight: 10,
    marginBottom: 10,
    ...Platform.select({
        ios: {
            paddingTop: 0,
        },
    }),
  },
  buttomLoginStyle: {
    marginTop: 20,
    marginBottom: 10,
    width: 250,
    paddingTop: 14,
    paddingBottom: 14,
    borderRadius: 50,
    alignItems: 'center',
    backgroundColor: '#9605CC',

  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500'
  },
  buttomBackLogin: {
    marginTop: 15,
    marginBottom: 20,
  },
  errorMessages:{
    color: 'red'
  },
  teclado: {
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

    ...Platform.select({
      ios: {

      },
      android: {

      },
    }),
  },
  containerView: {
    backgroundColor: '#FFF',
  },
});
