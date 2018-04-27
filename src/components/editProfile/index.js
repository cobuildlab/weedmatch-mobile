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
  TouchableOpacity,
  TextInput,
  Picker,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import styles from './style';
import TabProfile from '../tabProfile';
var mePic = require('../../assets/img/upload.png');
var Delete = require('../../assets/img/delete.png');
var meName = 'Sebastian Diaz'
var meUsername = 'holasebasdiaz'
var meEdad = '24'
var meCiudad = 'Santiago'
var meDescription = 'Piolito, nomá'

export default class EditProfile extends Component {

  constructor(props) {
    super(props);

    this.state = {
      sliderOneChanging: false,
      sliderOneValue: [5],
      multiSliderValue: [3, 7],

    };
  }

_logout(){
  AsyncStorage.removeItem('token');
  this.props.navigation.navigate('Auth');

}

sliderOneValuesChangeStart = () => {
 this.setState({
   sliderOneChanging: true,
 });
}

sliderOneValuesChange = (values) => {
 let newValues = [0];
 newValues[0] = values[0];
 this.setState({
   sliderOneValue: newValues,
 });
}

sliderOneValuesChangeFinish = () => {
 this.setState({
   sliderOneChanging: false,
 });
}

multiSliderValuesChange = (values) => {
 this.setState({
   multiSliderValue: values,
 });
}
  static navigationOptions = { title: 'Editar Perfil' };

  render() {

    return (
      <ScrollView automaticallyAdjustContentInsets={false} style={styles.scrollView}>
      <View style={styles.meInfoWrap}>
        <TouchableOpacity>
          <Image source={mePic} style={styles.mePic}/>
        </TouchableOpacity>
      </View>
      <View style={styles.contentImg}>
         <View style={styles.meSubPic}>
           <TouchableOpacity style={styles.buttomUploadStyle}>
             <Image  style={styles.meSubImg}/>
           </TouchableOpacity>
           <TouchableOpacity style={styles.buttomDelete}>
             <Image source={Delete}/>
           </TouchableOpacity>
         </View>
         <View style={styles.meSubPic}>
           <TouchableOpacity style={styles.buttomUploadStyle}>
             <Image style={styles.meSubImg}/>
           </TouchableOpacity>
           <TouchableOpacity style={styles.buttomDelete}>
             <Image source={Delete}/>
           </TouchableOpacity>
         </View>
         <View style={styles.meSubPic}>
           <TouchableOpacity style={styles.buttomUploadStyle}>
             <Image style={styles.meSubImg}/>
           </TouchableOpacity>
           <TouchableOpacity style={styles.buttomDelete}>
             <Image source={Delete}/>
           </TouchableOpacity>
         </View>
       </View>
       <View style={styles.contentForm}>
         <View style={styles.labelText}>
           <Text style={styles.textLabel}>Acerca de ti</Text>
         </View>
         <TextInput
            style={styles.meDescription}
            placeholder={'Me gustar cultivar Cannabis <3'}
          />
        <View style={styles.divider} />
        <View style={styles.labelText}>
          <Text style={styles.textLabel}>Nombre</Text>
        </View>
        <TextInput
           style={styles.meDescription}
           placeholder={'Jorge Pernia'}
         />
       <View style={styles.divider} />
       <View style={styles.labelText}>
         <Text style={styles.textLabel}>Usuario</Text>
       </View>
       <TextInput
          style={styles.meDescription}
          placeholder={'jorpg'}
        />
        {/* <View style={styles.divider} />
          <View style={styles.labelText}>
            <Text style={styles.textLabel}>Pais</Text>
          </View>
          <TextInput
             style={styles.meDescription}
             placeholder={'jorpg'}
           />
         <View style={styles.divider} />
         <View style={styles.labelText}>
           <Text style={styles.textLabel}>Ciudad</Text>
         </View>
         <TextInput
            style={styles.meDescription}
            placeholder={'jorpg'}
          />
        */}
          <View style={styles.divider} />
              <View style={styles.labelText}>
                <Text style={styles.textLabel}>Distancia Máxima</Text>
              </View>
              {/* <TextInput
                 style={styles.meDescription}
                 placeholder={'Rango'}
               /> */}
               <View style={{marginTop: 30,}}>
                 <MultiSlider
                   selectedStyle={{
                     backgroundColor: '#9605CC',
                   }}
                   unselectedStyle={{
                     backgroundColor: '#ccc',
                   }}
                   style={{marginBottom: 0,}}
                    values={this.state.sliderOneValue}
                    sliderLength={350}
                    onValuesChangeStart={this.sliderOneValuesChangeStart}
                    onValuesChange={this.sliderOneValuesChange}
                    onValuesChangeFinish={this.sliderOneValuesChangeFinish}
                  />
               </View>
             <View style={styles.divider} />

       </View>
       {/* <View style={styles.labelText}>
         <Text style={styles.textLabel}>Genero</Text>
       </View>
       <View style={styles.contentFormGender}>
         <View style={styles.contenGender}>
           <TouchableOpacity style={styles.buttomEditSexOn}>
             <Text style={styles.buttonTextOn}>Hombre</Text>
           </TouchableOpacity>
         </View>
         <View style={styles.contenGender}>
           <TouchableOpacity style={styles.buttomEditSexOff}>
             <Text style={styles.buttonTextOff}>Mujer</Text>
           </TouchableOpacity>

         </View>
         <View style={styles.contenGender}>
           <TouchableOpacity style={styles.buttomEditSexOff}>
             <Text style={styles.buttonTextOff}>Otros</Text>
           </TouchableOpacity>
         </View>
       </View> */}

       <View style={styles.labelTextGender}>
         <Text style={styles.textLabel}>Match</Text>
       </View>
       <View style={styles.contentFormGender}>
         <View style={styles.contenGender}>
           <TouchableOpacity style={styles.buttomEditSexOn}>
             <Text style={styles.buttonTextOn}>Hombre</Text>
           </TouchableOpacity>
         </View>
         <View style={styles.contenGender}>
           <TouchableOpacity style={styles.buttomEditSexOff}>
             <Text style={styles.buttonTextOff}>Mujer</Text>
           </TouchableOpacity>

         </View>
         <View style={styles.contenGender}>
           <TouchableOpacity style={styles.buttomEditSexOff}>
             <Text style={styles.buttonTextOff}>Todos</Text>
           </TouchableOpacity>
         </View>
       </View>
       <View style={styles.divider} />

       <View style={styles.labelTextGender}>
         <Text style={styles.textLabel}>Tu Genero</Text>
       </View>
       <View style={styles.contentFormGender}>
         <View style={styles.contenGender}>
           <TouchableOpacity style={styles.buttomEditSexOff}>
             <Text style={styles.buttonTextOff}>Hombre</Text>
           </TouchableOpacity>
         </View>
         <View style={styles.contenGender}>
           <TouchableOpacity style={styles.buttomEditSexOn}>
             <Text style={styles.buttonTextOn}>Mujer</Text>
           </TouchableOpacity>

         </View>
         <View style={styles.contenGender}>
           <TouchableOpacity style={styles.buttomEditSexOff}>
             <Text style={styles.buttonTextOff}>Todos</Text>
           </TouchableOpacity>
         </View>
       </View>
       <View style={styles.divider} />

       <View style={styles.labelText}>
         <Text style={styles.textLabelCard}>Comprar Version Pro</Text>
         <TouchableOpacity
             style={styles.buttomCardStyle}>
             <Text style={styles.buttonTextCard}>Pagar con Tarjeta de Credito</Text>
         </TouchableOpacity>
       </View>
      <View style={styles.divider} />
    <View style={styles.content}>
        <TouchableOpacity
            style={styles.buttomRegisterStyle}>
            <Text style={styles.buttonText}>Guardar Cambios</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.buttomPassStyle}>
            <Text style={styles.buttonTextCard}>Cambiar Contraseña</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>

    );
  }
}
