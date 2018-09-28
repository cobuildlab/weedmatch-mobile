import { StyleSheet, Platform, Dimensions } from 'react-native';
var width = Dimensions.get('window').width;

export default styles = StyleSheet.create({

    viewContainer: {
      backgroundColor: '#fff',
      flex: 1,
      flexDirection: 'column',
    },
    viewMsg: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      padding: 15,
    },
    containerLoader: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    imgProfileItem:{
      width: 35,
      height: 35,
      borderRadius: 35/2,
      resizeMode: 'cover',
    },
    imageSize: {
      width: 28,
      height: 28,
      marginLeft: 20,
    },
    viewTexts:{
      flex: 1,
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
    textUser:{
      marginLeft: 12,
      fontWeight: '400',
      fontSize: 16,
    },
    textTime:{
      marginLeft: 12,
      fontWeight: '400',
      fontSize: 12,
      color: '#777'
    },
    viewOption:{
      flex: 1,
      flexDirection: 'row',
      right: 10,
      top: 38,
      position: 'absolute'
    },
    viewButtom:{
      width: 50,
      height: 50,
    },
    Buttom:{
      alignItems: 'center',
    },
    containers: {
      flex: 1,
      justifyContent: 'center'
    },
    horizontal: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 10
    },


});
