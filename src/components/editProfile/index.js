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
  Navigator,
  TouchableOpacity
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import styles from './style';
import TabProfile from '../tabProfile';
var mePic = require('../../assets/img/upload.png');
var meName = 'Sebastian Diaz'
var meUsername = 'holasebasdiaz'
var meEdad = '24'
var meCiudad = 'Santiago'
var meDescription = 'Piolito, nomá'

export default class EditProfile extends Component {

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
      <ScrollView automaticallyAdjustContentInsets={false} style={styles.scrollView}>
      <View style={styles.meInfoWrap}>
        <TouchableOpacity style={styles.buttomUploadStyle}>
          <Image source={mePic} style={styles.mePic}/>
        </TouchableOpacity>
      </View>
      <View style={styles.contentImg}>
         <View style={styles.meSubPic}>
           <TouchableOpacity style={styles.buttomUploadStyle}>
             <Image  style={styles.meSubImg}/>
           </TouchableOpacity>
         </View>
         <View style={styles.meSubPic}>
           <TouchableOpacity style={styles.buttomUploadStyle}>
             <Image  style={styles.meSubImg}/>
           </TouchableOpacity>
         </View>
         <View style={styles.meSubPic}>
           <TouchableOpacity style={styles.buttomUploadStyle}>
             <Image  style={styles.meSubImg}/>
           </TouchableOpacity>
         </View>
       </View>
      </ScrollView>

    );
  }
}
