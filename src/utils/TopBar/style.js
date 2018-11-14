import { StyleSheet, Platform, Dimensions  } from 'react-native';

export default styles = StyleSheet.create({

    imageContainerLeft: {
        height:27,
        width:27,
        resizeMode:'contain',
        ...Platform.select({
            android: {
                marginLeft: 130,
            },
        }),
    },
    imageContainerRight: {
        height:27,
        width:27,
        resizeMode:'contain',
        ...Platform.select({
            android: {
                marginRight: 130,
            },
        }),
    },
    buttomIconMsg:{
        position: 'absolute',
        ...Platform.select({
            ios: {
              width: 10,
              height: 10,
              top: 22,
              right: 35,
            },
            android: {
              width: 30,
              height: 30,
              top: 12,
              right: 15,
            },
          }),
        zIndex: 999,
    },
    buttomIconProfile:{
        position: 'absolute',

        flex: 1,
        ...Platform.select({
          ios: {
            width: 10,
            height: 10,
            top: 22,
            left: 15,
          },
          android: {
            width: 30,
            height: 30,
            top: 12,
            left: 15
          },
        }),
        zIndex: 999,
    },
    imgIconProfile:{
        borderRadius: 26 / 2,
        width: 26,
        height: 26
    },
    imgIconMsg:{
        width: 30,
        height: 27,
    },
    tabContainerStyle: {

        backgroundColor: '#fff',
        borderColor: 'transparent',
        ...Platform.select({
            ios: {
                paddingTop: 35,
                paddingBottom: 20,
                marginRight: 130,
                marginLeft: 130,
            },
            android: {
                // marginRight: 130,
                // marginLeft: 130,
            },
          }),
    },
    containerColor: {
        backgroundColor: null
    },
    bgColor: {
        backgroundColor: '#fff'
    },
    tabContainer: {
        backgroundColor: '#fff',
        borderRightColor: '#ccc',
        borderRightWidth: 2,
    }
})
