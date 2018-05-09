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
import { strings } from "../../i18n";
import { StackNavigator } from 'react-navigation';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import styles from './style';
import TabProfile from '../tabProfile';
import ImagePicker from 'react-native-image-crop-picker';
import ActionSheet from 'react-native-actionsheet';
import {APP_STORE} from '../../Store';
import { publicEditAction, saveProfileAction } from './EditProfileActions';
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
    console.log("EditProfile:constructor");
    console.log(APP_STORE.getId());

    this.state = {
      sliderOneChanging: false,
      sliderOneValue: [5],
      multiSliderValue: [2, 200],
      image: '',
      user: {}

    };

  }

      componentDidMount(){

          this.public = APP_STORE.PUBLICEDITPROFILE_EVENT.subscribe(state => {
              console.log("Public Edit Profile:componentDidMount:PUBLICEDITPROFILE_EVENT", state);
              console.log(state);
              if (state.publicEditProfile) {
              let newValues = [0];
              newValues[0] = state.publicEditProfile.distance;
                  this.setState({
                      isLoading: true,
                      user: state.publicEditProfile,
                      sliderOneValue: newValues,
                      image: state.publicEditProfile.profile_images[0].image
                  })

                return;
              }
              if (state.error) {
                Alert.alert(state.error);
              }
          });

          this.saveProfile = APP_STORE.PUBLIC_SAVE_PROFILE_EVENT.subscribe(state => {
            console.log("Public Save Profile:componentDidMount:PUBLIC_SAVE_PROFILE_EVENT", state);
            console.log(state);
            if (state) {
                this.setState({
                    isLoading: true,
                })
                return;
            }
            if (state.error) {
                Alert.alert(state.error);
            }
          });

          this._getProfileId();

      }

      componentWillUnmount() {
          console.log("EditProfile:componentWillUmmount");
          this.public.unsubscribe();
          this.saveProfile.unsubscribe();

      }

      _getProfileId() {
          publicEditAction(APP_STORE.getToken(), APP_STORE.getId())
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
     console.log(values);
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

    showActivity() {
        return (
          <View>
            <ActionSheet
              ref={o => this.ActionSheet = o}
              title={strings("home.actionSheet")}
              options={[
                strings("home.camera"),
                strings("home.biblio"),
                strings("home.cancel"),
              ]}
              cancelButtonIndex={2}
              onPress={(index) => {

                switch(index) {
                  case 0:
                    this._takePhoto();
                    break;
                  case 1:
                    this._getPhoto();
                    break;
                  default:
                    break;
                }
               }}
            />
          </View>
        );
    }

    _getPhoto() {
        ImagePicker.openPicker({
          cropping: false,
          width: 500,
          height: 500,
          compressImageQuality: 0.5,
          includeExif: true,
          }).then(image => {
          console.log('received image', image.path);
          this.setState({
            image: image.path
          });
        }).catch(e => alert(e));
    }

    _takePhoto() {
        ImagePicker.openCamera({
          cropping: false,
          width: 500,
          height: 500,
          compressImageQuality: 0.5,
          includeExif: true,
          }).then(image => {
          console.log('received image', image.path);
          this.setState({
            image: image.path
          });

        }).catch(e => alert(e));
    }

    _setGenero(value) {
       this.setState(prevState => ({
           user: {
              ...prevState.user,
              genero: value,
              sex: value
           }
       }));
    }

    _setMatch(value) {
        console.log(value)
        this.setState(prevState => ({
            user: {
                ...prevState.user,
                match_sex: value
            }
        }));
    }

    _saveInfo() {
        saveProfileAction(APP_STORE.getToken(), APP_STORE.getId(), this.state)
    }


  static navigationOptions = { title: 'Editar Perfil' };

  render() {
    const { image, user } = this.state;
    return (
      <ScrollView automaticallyAdjustContentInsets={false} style={styles.scrollView}>
      {this.showActivity()}
      <View style={styles.meInfoWrap}>
        <TouchableOpacity onPress={() => this.ActionSheet.show()  }>
          {image == '' &&
            <Image source={mePic} style={styles.mePic}/>
          }
          {image !== '' &&
            <Image style={styles.mePic} source={{uri: image}} />
          }
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
            value={user.description}
          />
        <View style={styles.divider} />
        <View style={styles.labelText}>
          <Text style={styles.textLabel}>Nombre</Text>
        </View>
        <TextInput
           style={styles.meDescription}
           value={user.first_name}
         />
       <View style={styles.divider} />
       <View style={styles.labelText}>
         <Text style={styles.textLabel}>Usuario</Text>
       </View>
       <TextInput
          style={styles.meDescription}
          value={user.username}
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
                    sliderLength={200}
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
           <TouchableOpacity style={this.state.user.match_sex === 'Hombre' ? styles.buttomEditSexOn : styles.buttomEditSexOff } onPress={() => this._setMatch('Hombre') }>
             <Text style={this.state.user.match_sex === 'Hombre' ? styles.buttonTextOn : styles.buttonTextOff}>Hombre</Text>
           </TouchableOpacity>
         </View>
         <View style={styles.contenGender}>
           <TouchableOpacity style={this.state.user.match_sex === 'Mujer' ? styles.buttomEditSexOn : styles.buttomEditSexOff } onPress={() => this._setMatch('Mujer') }>
             <Text style={this.state.user.match_sex === 'Mujer' ? styles.buttonTextOn : styles.buttonTextOff}>Mujer</Text>
           </TouchableOpacity>

         </View>
         <View style={styles.contenGender}>
           <TouchableOpacity style={this.state.user.match_sex === 'Otro' ? styles.buttomEditSexOn : styles.buttomEditSexOff } onPress={() => this._setMatch('Otro') }>
             <Text style={this.state.user.match_sex === 'Otro' ? styles.buttonTextOn : styles.buttonTextOff}>Otro</Text>
           </TouchableOpacity>
         </View>
       </View>
       <View style={styles.divider} />

       <View style={styles.labelTextGender}>
         <Text style={styles.textLabel}>Tu Genero</Text>
       </View>
       <View style={styles.contentFormGender}>
         <View style={styles.contenGender}>
           <TouchableOpacity style={this.state.user.sex === 'Hombre' ? styles.buttomEditSexOn : styles.buttomEditSexOff } onPress={() => this._setGenero('Hombre') }>
             <Text style={this.state.user.sex === 'Hombre' ? styles.buttonTextOn : styles.buttonTextOff}>Hombre</Text>
           </TouchableOpacity>
         </View>
         <View style={styles.contenGender}>
           <TouchableOpacity style={this.state.user.sex === 'Mujer' ? styles.buttomEditSexOn : styles.buttomEditSexOff } onPress={() => this._setGenero('Mujer') }>
             <Text style={this.state.user.sex === 'Mujer' ? styles.buttonTextOn : styles.buttonTextOff}>Mujer</Text>
           </TouchableOpacity>
         </View>
         <View style={styles.contenGender}>
           <TouchableOpacity style={this.state.user.sex === 'Otro' ? styles.buttomEditSexOn : styles.buttomEditSexOff } onPress={() => this._setGenero('Otro') }>
             <Text style={this.state.user.sex === 'Otro' ? styles.buttonTextOn : styles.buttonTextOff}>Otro</Text>
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
            style={styles.buttomRegisterStyle} onPress={() => this._saveInfo()}>
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
