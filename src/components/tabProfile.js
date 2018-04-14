import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Dimensions,
  Image,
  Navigator
} from 'react-native';
var width = Dimensions.get('window').width;
var feedData = require('./feedData');
var mePic = require('./../images/sebas.jpg');
var meName = 'Sebastian Diaz'
var meUsername = 'holasebasdiaz'

export default class tabProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      render: this._Grid()
    };
  }

  _goPhoto(data) {
      this.props.navigator.push({
          ident: 'Photo',
          data
     })

  }

  _Grid(){
     //This should be a loop data reder
    return(
      <View>
      <View style={styles.viewrow}>
        <TouchableHighlight ><Image source={feedData[1].media.media} style={styles.rowimage}/></TouchableHighlight>
        <TouchableHighlight ><Image source={feedData[2].media.media} style={styles.rowimage}/></TouchableHighlight>
        <TouchableHighlight ><Image source={feedData[3].media.media} style={styles.rowimage}/></TouchableHighlight>
      </View>
      </View>
    )
  }

   _List(feed, callback){
  //This should be a loop data reder
    return(
     <View>
        <View style={styles.mediaUser}><Image style={styles.picture}/><Text style={styles.username}>{meUsername}</Text></View>
        <TouchableHighlight><Image source={feedData[1].media.media} style={styles.listImage}/></TouchableHighlight>
        <View style={styles.mediaUser}><Image style={styles.picture}/><Text style={styles.username}>{meUsername}</Text></View>
        <TouchableHighlight><Image source={feedData[2].media.media} style={styles.listImage}/></TouchableHighlight>
        <View style={styles.mediaUser}><Image style={styles.picture}/><Text style={styles.username}>{meUsername}</Text></View>
        <TouchableHighlight><Image source={feedData[3].media.media} style={styles.listImage}/></TouchableHighlight>
      </View>
    )
  }


  render() {
    return (
      <View style={styles.container}>
      {this.state.render}
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
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
  menu:{
    borderWidth:1,
    borderTopColor:'#f2f2f2',
    borderRightColor:'#FFF',
    borderLeftColor:'#FFF',
    borderBottomColor:'#f2f2f2',

    marginTop:10,
    width:width,
    height:40,
    backgroundColor:'#FFF',
    flexDirection:'row'
  },
  menuitem:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
   viewrow:{
    flexDirection:'row',
  },
  rowimage:{
    width:width/3,
    height:width/3,
    borderWidth:.5,
    padding: 20,
    borderColor:'#fff'

  },
  listImage:{
    width:width,
    height:width,
  },
   mediaUser:{

    alignItems: 'center',
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
    padding: 10,

  },
   username:{
    paddingLeft:10,

  },
});
