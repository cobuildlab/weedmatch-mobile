import { StyleSheet, Dimensions } from 'react-native';

var width = Dimensions.get('window').width;

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'flex-start',
    },
    text: {
        textAlign: 'center',
        fontSize: 50,
        backgroundColor: 'transparent'
    },
    swiper: {
        backgroundColor: '#fff',
    },
    buttonViewContainer: {
        position: "absolute",
        bottom: 10,
        backgroundColor: "#fff",
        width: width,
        padding: 15,
        paddingTop: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    centeredButtons: {
        flexDirection: 'row',
    },
    containerFlex: {
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
    viewFlex: {
        flex: 1,
    },
    viewBackground: {
        backgroundColor: '#FFF',
        flex: 8
    },
    media: {
        width: null,
        height: width,
        borderRadius: 10,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
    viewContainer: {
        flex: 1,
        flexDirection: 'column',
    },
    textName: {
        fontSize: 18,
        color: '#333',
    },
    textContainer: {
        fontSize: 14,
        color: '#777'
    },
    textContainer2: {
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
        marginLeft:5,
        marginRight:5,
        width: 50,
        height: 50
    },
    cardBottomHalf: {
        alignContent: 'center',
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingRight: 20,
    },
})
