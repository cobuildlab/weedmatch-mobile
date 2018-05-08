import { StyleSheet, Platform  } from 'react-native';

export default styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  scrollView:{
    backgroundColor: '#fff',
    marginBottom:0
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  mePic:{
      width:'100%',
      height: 300,
      resizeMode: 'cover',
  },
  meInfoWrap:{
    flexDirection:'column'
  },
  meContenInfo:{
    padding: 15,
    paddingTop: 5,
    marginBottom: 20,
    flexDirection:'row',
  },
  meData:{
    flex:2,
    paddingTop:20,
    flexDirection:'column',
  },
  meInfo:{
    alignItems:'center',
  },
  meName:{
    fontWeight:'bold',
    fontSize:16,
    color: '#333',
    paddingTop:5,
  },
  meNameOther:{
    fontWeight:'300',
    fontSize:14,
    color: '#9D9D9C',
    paddingTop:5,
  },
  data:{
    flex:1,
    alignItems:'center'
  },
  edit:{
    borderWidth:1,
    borderColor:'#ccc',
    borderRadius:3,
    alignItems:'center',
    margin:15,
    padding:2
  },
  edit2:{
    alignItems:'center',
    margin:15,
    marginTop: 0,
    padding:2
  },
  buttomCerrarStyle: {
      marginTop: 20,
      marginBottom: 10,
      marginRight: 5,
      paddingTop: 10,
      paddingBottom: 10,
      borderRadius: 50,
      alignItems: 'flex-end',
      backgroundColor: 'transparent',
  },
  buttomOpt:{
    width: 25,
    height: 20,
    resizeMode: 'contain',
    },
  viewContainer: {
    height: .5,
    backgroundColor: '#B2B2B2',
    marginBottom: 8,
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 20,
    flexDirection:'column',
  },


});
