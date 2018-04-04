import { StyleSheet, Dimensions } from 'react-native';

var width = Dimensions.get('window').width;

export default styles = StyleSheet.create({
    MainContainer:{
      justifyContent: 'center',
      flex:1,
      margin: 10
    },
    rowViewContainer:{
      fontSize: 18,
      paddingRight: 10,
      paddingTop: 10,
      paddingBottom: 10,
    },
    TouchableOpacityStyle:{
        position: 'absolute',
        width: 100,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        bottom: 5,
        right: 136,
    },
    FloatingButtonStyle: {
      resizeMode: 'contain',
      width: 100,
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
    listView:{
      marginTop:0,
      width:width,
    },
    picture:{
      width:30,
      height:30,
      borderRadius:15,
    },
    media:{
      width:width,
      height:width
    },
    mediaUser:{
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
    username:{
      paddingLeft:10,
    },
    mediaIcons:{
      width:width-10,
      flexDirection:'row',
      height:30,
    },
    icons:{
      marginLeft:10,
      marginTop:5,
      width:30,
      height:26
    },
    likes:{
      flexDirection:'row',
      width:width,
      marginTop:10,
      marginLeft:10,
      marginBottom:10,
    },
    comments:{
      flexDirection:'row',
      width:width,
      marginLeft:10,
      marginBottom:5
    },
    user:{
      fontWeight:'bold',
      fontSize:10
    },
    comment:{
      marginLeft:5,
      fontSize:10
    },
    time:{
      marginRight:20,
      marginTop: 10,
      fontSize:14,
      color:'#777',
      textAlign:'left'
    },
    topBar:{
      backgroundColor:'blue'
    },
    headerSection:{
      backgroundColor:'blue',

      height:40
    },
    mediaUser:{
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
    picture:{
      width:30,
      height:30,
      borderRadius:15,
    },
    username:{
      paddingLeft:10,
    },
    modalContainer: {
      paddingTop: 20,
      flex: 1
    },
    scrollView: {
        flexWrap: 'wrap',
        flexDirection: 'row'
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
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        color: '#000',
        padding: 10,
        margin: 40
    },
    inputStyle:{
        backgroundColor: '#ffffff',
        height: 80,
        width: width,
        padding: 5
      }
  });
