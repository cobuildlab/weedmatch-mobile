import { StyleSheet, Platform  } from 'react-native';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '80%',
    resizeMode: 'contain',
    justifyContent: 'center',
  },
  contentLogin: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
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
    marginTop: 20,
    marginBottom: 10
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
  }

});