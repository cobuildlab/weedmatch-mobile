import { StyleSheet, Platform, Dimensions  } from 'react-native';

export default styles = StyleSheet.create({

    imageContainer: {
        height:27,
        width:27,
        resizeMode:'contain'
    },
    buttomIconMsg:{
        position: 'absolute',
        top: 22,
        right: 35,
        width: 10,
        height: 10,
        zIndex: 999,
    },
    buttomIconProfile:{
        position: 'absolute',
        top: 22,
        left: 15,
        width: 10,
        height: 10,
        zIndex: 999,
    },
    imgIconProfile:{
        width: 26,
        height: 26
    },
    imgIconMsg:{
        width: 30,
        height: 27,
    },
    tabContainerStyle: {
        paddingTop: 35, 
        paddingBottom: 20, 
        marginRight: 130, 
        marginLeft: 130, 
        backgroundColor: '#fff', 
        borderColor: 'transparent',
    },
    containerColor: {
        backgroundColor: '#fff'
    }
})