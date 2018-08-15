import { StyleSheet, Platform, Dimensions } from 'react-native';
var width = Dimensions.get('window').width;

export default styles = StyleSheet.create({

    MainContainer: {
        justifyContent: 'center',
        flex:1,
        margin: 10
    },
    rowViewContainer: {
        fontSize: 18,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10,
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
    TouchableOpacityPlus: {
        position: 'absolute',
        width: 50,
        height: 50,
        top: -50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        ...Platform.select({
          ios: {
            top: 0,
          },
        }),
    },
    ShowDetail: {
        resizeMode: 'contain',
        width: 25,
        height: 25,
    },
    ShowPublic: {
        resizeMode: 'contain',
        width: 50,
        height: 50,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 5,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    listView: {
        marginTop:0,
        width:width,
    },
    picture: {
        width:30,
        height:30,
        borderRadius:15,
    },
    media: {
        width:width,
        height:width,
        // ...Platform.select({
        //   android: {
        //     width: width,
        //     height: 300,
        //   },
        //   ios: {
        //     width: width,
        //     height: 150,
        //   },
        // }),
    },

    mediaUser: {
        alignItems: 'center',
        padding:10,
        backgroundColor:'#FFF',
        width:width,
        flexDirection:'row',
        borderWidth:1,
        borderTopColor:'#fff',
        borderLeftColor:'#fff',
        borderRightColor:'#fff',
        borderBottomColor:'#fff',
    },
    username: {
        paddingLeft:10,
    },
    mediaIcons: {
        width:width-10,
        flexDirection:'row',
        height:30,
    },
    icons: {
        marginLeft:10,
        marginTop:5,
        width:30,
        height:26
    },
    likes: {
        flexDirection:'row',
        width:width,
        marginTop:10,
        marginLeft:10,
        marginBottom:10,
    },
    comments: {
        flexDirection:'row',
        width:width,
        marginLeft:10,
        marginBottom:5
    },
    user: {
        fontWeight:'bold',
        fontSize:10
    },
    comment: {
        marginLeft:5,
        fontSize:10
    },
    time: {
        marginRight:20,
        marginTop: 10,
        fontSize:14,
        color:'#777',
        textAlign:'left'
    },
    topBar: {
        backgroundColor:'blue'
    },
    headerSection: {
        backgroundColor:'blue',
        height:40
    },
    mediaUser: {
        alignItems: 'center',
        padding:10,
        backgroundColor:'#FFF',
        width:width,
        flexDirection:'row',
        borderWidth:1,
        borderTopColor:'#fff',
        borderLeftColor:'#fff',
        borderRightColor:'#fff',
        borderBottomColor:'#fff',
    },
    picture: {
        width:30,
        height:30,
        borderRadius:15,
    },
    username: {
        paddingLeft:10,
    },
    rowimage: {
        width:width/3,
        height:width/3,
        borderWidth:.5,
        borderColor:'#fff'
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
    viewContainer: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 25,
    },
    viewContainerPlus: {
        flex: 1,
        flexDirection: 'column',
        marginTop: -20,
    },
    viewFlex: {
        flex: 1,
    },
    viewFlexDirection: {
        flexDirection: 'row'
    },
    viewBackground: {
        backgroundColor: '#FFF',
        flex:3
    },
    textName: {
        marginTop: 15,
        marginBottom: 15,
        paddingLeft: 20,
        fontSize: 18,
        color: '#333',
    },
    textNameDetails: {
        marginTop: -32,
        marginBottom: 15,
        paddingLeft: 20,
        fontSize: 18,
        color: '#333',
    },
    textContainer: {
        marginTop: 15,
        paddingLeft: 20,
        fontSize: 15,
        color: '#777'
    },
    textCountry: {
        marginTop: -5,
        marginBottom: 10,
        paddingLeft: 20,
        fontSize: 15,
        color: '#777'
    },
    textDistance: {
        marginTop: 0,
        marginBottom: 10,
        paddingLeft: 20,
        fontSize: 15,
        color: '#777'
    },
    textDescription: {
        marginTop: 0,
        marginBottom: 20,
        paddingLeft: 20,
        fontSize: 15,
        color: '#777'
    },
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
      },
      slider: { backgroundColor: '#000', height: 350 },
      content1: {
        width: '100%',
        height: 50,
        marginBottom: 10,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
      },
      content2: {
        width: '100%',
        height: 100,
        marginTop: 10,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
      },
      contentText: { color: '#fff' },
      buttons: {
        zIndex: 1,
        height: 15,
        marginTop: -25,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
      },
      button: {
        margin: 3,
        width: 15,
        height: 15,
        opacity: 0.9,
        alignItems: 'center',
        justifyContent: 'center',
      },
      buttonSelected: {
        opacity: 1,
        color: 'white',
        fontSize: 40,
      },
      customSlide: {
        alignItems: 'center',
        justifyContent: 'center',
      },
      customImage: {
        width: 100,
        height: 100,
      },
      imageView: {
        flex: 1,
        alignSelf: 'stretch',
        width: undefined,
        height: undefined,
      },
      buttonViewContainer: {
        flex: 1,
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
      }
});
