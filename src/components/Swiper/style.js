import { StyleSheet, Platform, Dimensions  } from 'react-native';
var width = Dimensions.get('window').width;

export default styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#888',
      alignItems: 'flex-start',
    },
    card: {
      flex: 1,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: '#E8E8E8',
      justifyContent: 'center',
      backgroundColor: 'white',
      paddingBottom: 20,
    },
    text: {
      textAlign: 'center',
      fontSize: 50,
      backgroundColor: 'transparent'
    },
    buttonViewContainer: {
      flex: 1,
      padding: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
    },
    containerFlex: {
      flex: 1,
    },
    containerSpinner: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFF',
    },
    containerLoader: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    containerLoaderImage: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      height: 80,
      width: 80,
      resizeMode: 'contain',
    },
    horizontal: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 10
    },
    viewFlex: {
      flex: 1,
    },
    viewBackground: {
      backgroundColor: '#FFF',
      flex:3,

    },
    media: {
      width:null,
      height:width,
      borderRadius: 10,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
    },
    viewContainer: {
      flex: 1,
      flexDirection: 'column',
      marginTop: 25,
    },
    textName: {
      marginTop: 15,
      paddingLeft: 20,
      fontSize: 18,
      color: '#333',
    },
    textContainer: {
      paddingLeft: 20,
      marginTop: 15,
      fontSize: 14,
      color: '#777'
    },
    textContainer2: {
      paddingLeft: 20,
      marginTop: 10,
      fontSize: 14,
      color: '#777'
    },
    TouchableOpacityStyle: {
      position: 'absolute',
      width: 50,
      height: 50,
      top: -55,
      alignItems: 'center',
      justifyContent: 'center',
      right: 30,
    },
    ShowDetail: {
      resizeMode: 'contain',
      width: 25,
      height: 25,
    },
    imageSize: {
      width: 50,
      height: 50
    }

})
