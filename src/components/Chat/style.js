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
    viewLeft:{
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'flex-end',
      alignItems: 'flex-start',
    },
    viewTextLeft:{
      width: 'auto',
      padding: 15,
      marginBottom: 15,
      marginLeft: 25,
      borderRadius: 10,
      backgroundColor: '#f3f3f3'
    },
    viewRight:{
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
    },
    viewTextRight:{
      width: 'auto',
      padding: 15,
      marginBottom: 15,
      marginRight: 25,
      borderRadius: 10,
      marginLeft: 80,
      backgroundColor: '#9605CC',
    },
    styleTextRight:{
      color: '#fff',
    },
    viewContainerInput:{
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    inputStyle:{
      maxHeight: 200,
      height: 55,
      paddingLeft: 10,
      paddingRight: 15,
      paddingTop: 5,
    },
    viewInput:{
      width: '100%',
      borderWidth: 2,
      borderTopColor: '#9605CC',
    },
    iconSend:{
      width: 30,
      height: 30,
    },
    viewIconSend:{
      position: 'absolute',
      right: 10,
      top: 11,
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
