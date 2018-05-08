import React, { Component } from 'react';
import {
 AppRegistry,
 StyleSheet,
 Text,
 View,
 ScrollView,
 AsyncStorage,
 TouchableOpacity,
 Image,
 Navigator,
 Dimensions
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import styles from './style';
import TabProfile from '../tabProfile';
import EditProfile from '../editProfile';

var mePic = require('../../images/sebas.jpg');
var menu = require('../../assets/img/edit.png');
var meName = 'Sebastian Diaz'
var meUsername = 'holasebasdiaz'
var meEdad = '24'
var meCiudad = 'Santiago'
var meDescription = 'Piolito, nomá'

var images = [
 require('../../images/p1.jpg'),
 require('../../images/p2.jpg'),
 require('../../images/p3.jpg'),
 require('../../images/p4.jpg'),
 require('../../images/p5.jpg'),
 require('../../images/p6.jpg')
]

var { height, width } = Dimensions.get('window');


export default class Profile extends Component {

 constructor(props) {
   super(props);
   this.state = {};
 }

 _logout(){
   AsyncStorage.removeItem('token');
   this.props.navigation.navigate('Auth');
 }
_editProfile() {
     this.props.navigation.navigate('EditProfile');
 }

 static navigationOptions = { title: 'Perfil' };

 renderSectionOne() {
   return images.map((image, index) => {
       return (
           <View key={index} style={[{ width: (width) / 3 }, { height: (width) / 3 }, { marginBottom: 2 }, index % 3 !== 0 ? { paddingLeft: 2 } : { paddingLeft: 0 }]}>
               <Image style={{
                   flex: 1,
                   alignSelf: 'stretch',
                   width: undefined,
                   height: undefined,

               }}
                   source={image}>
               </Image>

           </View>
       )
   })

}

 renderSection() {
   return (
       <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
           {this.renderSectionOne()}
       </View>
   )
 }

 render() {

   return (
    <View>
     <ScrollView automaticallyAdjustContentInsets={false} style={styles.scrollView}>
     <View style={styles.meInfoWrap}>
       <View style={styles.meInfo}>
         <Image source={mePic} style={styles.mePic}/>
       </View>
       <View style={styles.meContenInfo}>
          <View style={styles.meData}>
            <Text style={styles.meName}>{meName}, {meEdad}</Text>
            <Text style={styles.meNameOther}>{meCiudad}</Text>
            <Text style={styles.meNameOther}>{meDescription}</Text>
          </View>
          <TouchableOpacity style={styles.buttomCerrarStyle} onPress={this._editProfile.bind(this)}>
              <Image source={menu} style={styles.buttomOpt}/>
          </TouchableOpacity>
          {/* <View style={styles.viewContainer} /> */}
        </View>
     </View>
     {/* <TabProfile navigator={this.props.navigator}/> */}
     {this.renderSection()}
     <View style={styles.flex}>

       {/* <View style={styles.edit}>
         <Text>Editar Perfil</Text>
       </View> */}
       <View style={styles.edit2}>
         <TouchableOpacity style={styles.buttomCerrarStyle} onPress={()=>this._logout()}>
             <Text>Cerrar Sesión</Text>
         </TouchableOpacity>

       </View>
     </View>
     </ScrollView>
   </View>
   );
 }
}
