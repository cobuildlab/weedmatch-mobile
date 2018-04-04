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
import styles from './style';

import TopBar from './../../utils/TopBar';
import TabProfile from '../tabProfile';

var mePic = require('../../images/sebas.jpg');
var meName = 'Sebastian Diaz'
var meUsername = 'holasebasdiaz'
var meEdad = '24'
var meCiudad = 'Santiago'
var meDescription = 'Piolito, nomá'

export default class Profile extends Component {

  constructor(props) {
    super(props);

    this.state = {};
  }

_logout(){
  AsyncStorage.removeItem('token');
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
        </View>
        <View style={styles.meContenInfo}>
          <Text style={styles.meName}>{meName}, {meEdad}</Text>
        <Text style={styles.meNameOther}>{meCiudad}</Text>
      <Text style={styles.meNameOther}>{meDescription}</Text>
          <View style={{height: .8, backgroundColor: '#B2B2B2', marginBottom: 8, paddingLeft: 15, paddingRight: 15, marginTop: 20,}} />
        </View>

      </View>
      <TabProfile navigator={this.props.navigator}/>
      <View style={{flex:1}}>

        {/* <View style={styles.edit}>
          <Text>Editar Perfil</Text>
        </View> */}
        <View style={styles.edit2}>
          <TouchableHighlight style={styles.buttomCerrarStyle} onPress={()=>this._logout()}>
              <Text>Cerrar Sesión</Text>
          </TouchableHighlight>
        </View>
      </View>

      </ScrollView>

    </View>
    );
  }
}
