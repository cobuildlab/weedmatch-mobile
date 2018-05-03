import { StyleSheet, Platform, Dimensions  } from 'react-native';
var width = Dimensions.get('window').width;

export default styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5FCFF',
      alignItems: 'flex-start',
    },
    card: {
      flex: 1,
      borderRadius: 4,
      borderWidth: 2,
      borderColor: '#E8E8E8',
      justifyContent: 'center',
      backgroundColor: 'white'
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
      flex:3
    },
    media: {
      width:null,
      height:width
    },
    viewContainer: {
      flex: 1,
      flexDirection: 'column',
      marginTop: 25,
    },
    textName: {
      marginTop: 15,
      paddingLeft: 20,
      fontSize: 16,
      color: '#333',
    },
    textContainer: {
      marginTop: 10,
      paddingLeft: 20,
      fontSize: 16,
      color: '#333'
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

})