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
  Keyboard,
  ActivityIndicator,
  Switch,
  Alert
} from 'react-native';

import { strings } from "../../i18n";
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import styles from './style';
import ImagePicker from 'react-native-image-crop-picker';
import ActionSheet from 'react-native-actionsheet';
import {APP_STORE} from '../../Store';
import { internet, checkConectivity,parseError, toastMsg } from '../../utils';
import { publicEditAction, saveProfileAction,putImageAction,postImageAction,deleteImageAction } from './EditProfileActions';

export default class EditProfile extends Component {

  constructor(props) {
    super(props);
    console.log("EditProfile:constructor");

    this.state = {
      isLoading: false,
      sliderOneChanging: false,
      sliderOneValue: [0],
      index: 0,
      user: {},
      images:{},
      username: '',
      description: '',
      name: '',
      notification: true
    };

    this.helper = false
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
              username: state.publicEditProfile.username,
              description: state.publicEditProfile.description,
              name: state.publicEditProfile.first_name,
              images: state.publicEditProfile.profile_images,
              notification: state.publicEditProfile.notification
          })
          return;
        }
    });

    this.saveProfile = APP_STORE.PUBLIC_SAVE_PROFILE_EVENT.subscribe(state => {
      console.log("Public Save Profile:componentDidMount:PUBLIC_SAVE_PROFILE_EVENT", state);
      console.log(state);
      if (state.saveProfile) {
        this.helper = true
        this.props.navigation.pop()
        return;
      }
    });

    this.event = APP_STORE.APP_EVENT.subscribe(state => {
      this.setState({isLoading: true});
      console.log("Edit Profile:componentDidMount:APP_EVENT", state);
      console.log(state);
      if (state.error) {
        parseError(state.error)
      }
  });

    this._getProfileId();

  }

  componentWillUnmount() {
      console.log("EditProfile:componentWillUmmount");
      if (this.helper) {
        this.props.navigation.state.params.refresh()
      }
      this.public.unsubscribe();
      this.saveProfile.unsubscribe();

  }

  _getProfileId() {
      publicEditAction(APP_STORE.getToken(), APP_STORE.getId())
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

  handleImage(index) {
    this.setState({
      index: index
    },() => {
      this.ActionSheet.show()
    })
  }

    setImageUrl(image,index) {

      if(this.state.user.profile_images.length >= index + 1) {
        //put
        var newArr = this.state.images
        newArr[index].image = image
        this.setState({
          images: newArr
        },() => {
          this.setState({isLoading: false });
          putImageAction(image,this.state.images[index].id)
        })
      } else {
        //post
        this.setState({isLoading: false });
        postImageAction(image)
      }
    }

    deleteImage(index) {
      this.setState({isLoading: false });
      deleteImageAction(this.state.images[index].id)
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
                    this._takePhoto(this.state.index);
                    break;
                  case 1:
                    this._getPhoto(this.state.index);
                    break;
                  default:
                    break;
                }
               }}
            />
          </View>
        );
    }

  _getPhoto(index) {
      ImagePicker.openPicker({
        cropping: false,
        width: 500,
        height: 500,
        compressImageQuality: 0.5,
        includeExif: true,
        }).then(image => {
          this.setImageUrl(image.path,index)
      }).catch(e => alert(e));
  }

  _takePhoto(index) {
      ImagePicker.openCamera({
        cropping: false,
        width: 500,
        height: 500,
        compressImageQuality: 0.5,
        includeExif: true,
        }).then(image => {
          this.setImageUrl(image.path,index)
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
    if (checkConectivity()) {
      this.setState({isLoading: false });
      saveProfileAction(APP_STORE.getToken(), APP_STORE.getId(), this.state)
    } else {
      internet();
    }
  }

  setPhoto(index){

    if(index == 0) {
      return (
        <Image style={styles.mePic} source={{uri: this.state.user.profile_images[index].image}} />
      );
    } else if(this.state.images.length >= index + 1) {
      return (
        <Image style={styles.meSubImg} source={{uri: this.state.images[index].image}} />
      )
    } else {
      return (
        <Image source={require('../../assets/img/image_cover.png')} style={styles.meSubImgSin}/>
      )
    }
  }

  notificationes() {
    this.setState({
      notification: !this.state.notification
    });
  }

  setButton(index){

    if(this.state.images.length >= index + 1) {

      return (
        <TouchableOpacity style={styles.buttomDelete} onPress={() => this.deleteImage(index)}>
          <Image source={require('../../assets/img/delete.png')} style={styles.imageMode} />
        </TouchableOpacity>
      )
    }
  }

  static navigationOptions = { title: strings("register.editProfile") };

  render() {
    const { image, user, isLoading } = this.state;

    if(isLoading) {
      return (
        <ScrollView
          automaticallyAdjustContentInsets={false}
          style={styles.scrollView}
          keyboardShouldPersistTaps={'always'}
        >
        {this.showActivity()}
        <View style={styles.meInfoWrap}>
          <TouchableOpacity onPress={() => this.handleImage(0)}>
          {this.setPhoto(0)}
          </TouchableOpacity>
        </View>
        <View style={styles.contentImg}>
           <View style={styles.meSubPic}>
             <TouchableOpacity onPress={() => this.handleImage(1)} style={styles.buttomUploadStyle}>
              {this.setPhoto(1)}
             </TouchableOpacity>
              {this.setButton(1)}
           </View>
           <View style={styles.meSubPic}>
             <TouchableOpacity onPress={() => this.handleImage(2)} style={styles.buttomUploadStyle}>
              {this.setPhoto(2)}
             </TouchableOpacity>
             {this.setButton(2)}
           </View>
           <View style={styles.meSubPic}>
             <TouchableOpacity onPress={() => this.handleImage(3)} style={styles.buttomUploadStyle}>
              {this.setPhoto(3)}
             </TouchableOpacity>
             {this.setButton(3)}

           </View>
         </View>
         <View style={styles.contentForm}>
           <View style={styles.labelText}>
             <Text style={styles.textLabel}>{strings("register.about")}</Text>
           </View>
           <TextInput
              underlineColorAndroid='transparent'
              style={styles.meDescription}
              value={this.state.description}
              onChangeText={(description) => this.setState({description})}
              blurOnSubmit={false}
              returnKeyType = {"next"}
              ref='descripcion'
              onSubmitEditing={() => { this.nombre.focus(); }}
            />
          <View style={styles.divider} />
          <View style={styles.labelText}>
            <Text style={styles.textLabel}>{strings("register.name")}</Text>
          </View>
          <TextInput
             underlineColorAndroid='transparent'
             style={styles.meDescription}
             value={this.state.name}
             onChangeText={(name) => this.setState({name})}
             blurOnSubmit={false}
             returnKeyType = {"next"}
             ref={(input) => { this.nombre = input; }}
             onSubmitEditing={() => { this.usuario.focus(); }}
           />
         <View style={styles.divider} />
         <View style={styles.labelText}>
           <Text style={styles.textLabel}>{strings("register.username")}</Text>
         </View>
         <TextInput
            underlineColorAndroid='transparent'
            style={styles.meDescription}
            value={this.state.username}
            onChangeText={(username) => this.setState({username})}
            blurOnSubmit={false}
            returnKeyType = {"next"}
            ref={(input) => { this.usuario = input; }}
            onSubmitEditing={() => { Keyboard.dismiss() }}
          />
          <View style={styles.divider} />
          <View style={styles.labelText}>
            <Text style={styles.textLabel}>{strings("register.distance")}</Text>
            <Text style={styles.textLabelvalue}>{this.state.sliderOneValue + 'Km'}</Text>
          </View>
          <View style={styles.marginView}>
            <MultiSlider
              selectedStyle={{
                backgroundColor: '#9605CC',
              }}
              min={2}
              max={2000}
              unselectedStyle={{
                backgroundColor: '#ccc',
              }}
              values={this.state.sliderOneValue}
              sliderLength={300}
              onValuesChangeStart={this.sliderOneValuesChangeStart}
              onValuesChange={this.sliderOneValuesChange}
              onValuesChangeFinish={this.sliderOneValuesChangeFinish}
            />
          </View>
          <View style={styles.divider} />
            <View style={styles.labelText}>
              <Text style={styles.textLabelSwitch}>{strings("register.silence")}</Text>
              <View style={styles.viewSwitch}>
              <Switch
                style={styles.switchStyle}
                onTintColor={"#9605CC"}
                value={this.state.notification}
                onValueChange={() => this.notificationes()}
              />
              </View>
            </View>
          <View style={styles.divider} />
         </View>
         <View style={styles.labelTextGender}>
           <Text style={styles.textLabel}>Match</Text>
         </View>
         <View style={styles.contentFormGender}>
           <View style={styles.contenGender}>
             <TouchableOpacity style={this.state.user.match_sex === 'Hombre' ? styles.buttomEditSexOn : styles.buttomEditSexOff } onPress={() => this._setMatch('Hombre') }>
               <Text style={this.state.user.match_sex === 'Hombre' ? styles.buttonTextOn : styles.buttonTextOff}>{strings("register.male")}</Text>
             </TouchableOpacity>
           </View>
           <View style={styles.contenGender}>
             <TouchableOpacity style={this.state.user.match_sex === 'Mujer' ? styles.buttomEditSexOn : styles.buttomEditSexOff } onPress={() => this._setMatch('Mujer') }>
               <Text style={this.state.user.match_sex === 'Mujer' ? styles.buttonTextOn : styles.buttonTextOff}>{strings("register.female")}</Text>
             </TouchableOpacity>

           </View>
           <View style={styles.contenGender}>
             <TouchableOpacity style={this.state.user.match_sex === 'Otro' ? styles.buttomEditSexOn : styles.buttomEditSexOff } onPress={() => this._setMatch('Otro') }>
               <Text style={this.state.user.match_sex === 'Otro' ? styles.buttonTextOn : styles.buttonTextOff}>{strings("register.all")}</Text>
             </TouchableOpacity>
           </View>
         </View>
         <View style={styles.divider} />

         <View style={styles.labelTextGender}>
           <Text style={styles.textLabel}>{strings("register.ownGen")}</Text>
         </View>
         <View style={styles.contentFormGender}>
           <View style={styles.contenGender}>
             <TouchableOpacity style={this.state.user.sex === 'Hombre' ? styles.buttomEditSexOn : styles.buttomEditSexOff } onPress={() => this._setGenero('Hombre') }>
               <Text style={this.state.user.sex === 'Hombre' ? styles.buttonTextOn : styles.buttonTextOff}>{strings("register.male")}</Text>
             </TouchableOpacity>
           </View>
           <View style={styles.contenGender}>
             <TouchableOpacity style={this.state.user.sex === 'Mujer' ? styles.buttomEditSexOn : styles.buttomEditSexOff } onPress={() => this._setGenero('Mujer') }>
               <Text style={this.state.user.sex === 'Mujer' ? styles.buttonTextOn : styles.buttonTextOff}>{strings("register.female")}</Text>
             </TouchableOpacity>
           </View>
           <View style={styles.contenGender}>
             <TouchableOpacity style={this.state.user.sex === 'Otro' ? styles.buttomEditSexOn : styles.buttomEditSexOff } onPress={() => this._setGenero('Otro') }>
               <Text style={this.state.user.sex === 'Otro' ? styles.buttonTextOn : styles.buttonTextOff}>{strings("register.other")}</Text>
             </TouchableOpacity>
           </View>
         </View>
         <View style={styles.divider} />

         {/* <View style={styles.labelTextComprar}>
           <Text style={styles.textLabelCard}>{strings("main.pro")}</Text>
           <TouchableOpacity
               style={styles.buttomCardStyle}>
               <Text style={styles.buttonTextCard}>{strings("main.pay")}</Text>
           </TouchableOpacity>
         </View> */}
        <View style={styles.divider} />
      <View style={styles.content}>
          <TouchableOpacity
              style={styles.buttomRegisterStyle} onPress={() => this._saveInfo()}>
              <Text style={styles.buttonText}>{strings("main.changes")}</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
              style={styles.buttomPassStyle}>
              <Text style={styles.buttonTextCard}>{strings("main.password")}</Text>
          </TouchableOpacity> */}
        </View>
        </ScrollView>
      );
    } else {
        return (
            <View style={[styles.containers, styles.horizontal]}>
                <ActivityIndicator size="large" color="#9605CC" />
            </View>
        )
    }
  }
}
