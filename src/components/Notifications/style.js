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
    imgProfileItem:{
      width: 35,
      height: 35,
      borderRadius: 50,

      resizeMode: 'contain',
    },
    underLineColor: {
        backgroundColor: '#9605CC',
    },
    tabStyleBg:{
      backgroundColor: '#fff',
    },
    tabContainerStyle:{
      backgroundColor: '#fff',
    },
    bgColor: {
        backgroundColor: '#fff'
    },
    tabContainer: {
        backgroundColor: '#fff',

    },
    textTab:{
      color: '#9605CC',
      fontWeight: '500',
    }


});
