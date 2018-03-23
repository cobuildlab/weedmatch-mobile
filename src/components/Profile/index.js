import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  AsyncStorage,
  TouchableHighlight,
  Image,
  Navigator
} from 'react-native';
import { StackNavigator } from 'react-navigation';

import TopBar from './../../utils/TopBar';
import TabProfile from '../tabProfile';

var mePic = require('../../images/sebas.jpg');
var meName = 'Sebastian Diaz'
var meUsername = 'holasebasdiaz'

export default class Profile extends Component {

  constructor(props) {
    super(props);

    this.state = {};
  }

_logout(){
  AsyncStorage.removeItem('id_token');
  this.props.navigation.navigate('Auth');

}
  static navigationOptions = { title: 'Perfil' };

  render() {

    return (
     <View>



      <ScrollView automaticallyAdjustContentInsets={false} style={styles.scrollView}>


      <View style={styles.meInfoWrap}>

            <View style={styles.meInfo}>
              <Image source={mePic} style={styles.mePic}/>
              <Text style={styles.meName}>{meName}</Text>
            </View>

          <View style={{flex:1}}>

            <View style={styles.edit}>
              <Text>Editar Perfil</Text>
            </View>
            <View style={styles.edit2}>
              <TouchableHighlight onPress={()=>this._logout()}>
                  <Text style={styles.username}>Cerrar Sesión</Text>
              </TouchableHighlight>
            </View>
          </View>

      </View>
      <TabProfile navigator={this.props.navigator}/>


      </ScrollView>

    </View>
    );
  }
}

const styles = StyleSheet.create({
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
      width:70,
      height:70,
      borderRadius:35
  },
  meInfoWrap:{
    paddingTop:5,
    flexDirection:'row'
  },
  meData:{
    flex:2,
    paddingTop:20,
    flexDirection:'row',
  },
  meInfo:{
    alignItems:'center',
    padding:15
  },
  meName:{
    fontWeight:'bold',
    fontSize:12,
    paddingTop:10
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
    borderWidth:1,
    borderColor:'#ccc',
    borderRadius:3,
    alignItems:'center',
    margin:15,
    marginTop: 0,
    padding:2
  }

});
