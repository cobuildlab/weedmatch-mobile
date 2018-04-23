import React, {Component} from 'react';
import {
    Text,
    TextInput,
    TouchableOpacity,
    View,
    AsyncStorage,
    Alert,
    ScrollView,
    StyleSheet,
    Image,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator,
    ToastAndroid,
    TouchableWithoutFeedback
} from 'react-native';
import {
    strings
} from "../../i18n";
import {
    registerAction,
    createDateData
} from "./RegisterActions";
import {
    APP_STORE
} from "../../Store";
import styles from './style';
import {
        toastMsg,
        connection,
        internet,
        checkConectivity
} from "../../utils";

import RadioForm, {
    RadioButton,
    RadioButtonInput,
    RadioButtonLabel
} from 'react-native-simple-radio-button';

import Picker from 'react-native-picker';
// import validate from 'validate.js';
import validate from './validate_wrapper';

import ImagePicker from 'react-native-image-crop-picker';
import ActionSheet from 'react-native-actionsheet';

class RegisterPage extends Component {

    constructor(props) {
        super(props);
        console.log("RegisterPage:constructor");
        this.state = {
            full_name: '',
            email: '',
            username: '',
            password: '',
            latitud: '',
            longitud: '',
            age: '',
            sex: 'Hombre',
            isLoading: false,
            year: '',
            step: 1
        };
    }

    static navigationOptions = {header: null};

    componentDidMount() {
        console.log("RegisterPage:componentDidMount");
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    latitud: position.coords.latitude,
                    longitud: position.coords.longitude
                })
            },
            (error) => {
                console.log(error)
            },
            {enableHighAccuracy: true, timeout: 50000, maximumAge: 10000}
        );
        this.event = APP_STORE.APP_EVENT.subscribe(state => {
            this.setState({isLoading: true});
            if (state.error) {
                this.setState({isLoading: false});
                if(state.error.detail){
                    Object.keys(state.error.detail).map(function(objectKey, index) {
                        var value = state.error.detail[objectKey];
                        if(typeof value == 'object'){
                            value.forEach(function(msg) {
                                toastMsg(msg);
                            });
                        } else {
                            toastMsg(value);
                        }
                    });
                }
            return;
            }
            if (state.success) {
                toastMsg(strings("register.successTitle"));
                this.props.navigation.goBack();
            }
        });
    }

    userTerms() {
        this.props.navigation.navigate('Terms');
    }

    componentWillUnmount() {
        console.log("RegisterPage:componentWillUmmount");
        Picker.hide();
        this.event.unsubscribe();
    }

    registerUser() {
            this.setState({isLoading: true});
            if (connection) {
                registerAction(this.state.full_name, this.state.email, this.state.username, this.state.password,
                    parseFloat(this.state.latitud).toFixed(6), parseFloat(this.state.longitud).toFixed(6), this.state.sex, this.state.age)
            } else {
                internet();
            }



    }

        _showDatePicker() {
            Picker.init({
                pickerData: createDateData(),
                pickerFontColor: [153, 0 ,204, 1],
                pickerToolBarBg:[232, 232, 232, 1],
                pickerTitleText: '',
                pickerConfirmBtnColor: [153, 0 ,204, 1],
                pickerCancelBtnColor: [153, 0 ,204, 1],
                pickerBg: [226, 226, 226, 1],

                onPickerConfirm: (pickedValue, pickedIndex) => {
                    var month = '';
                    var day = '';
                    if(pickedValue[1] <= 9){
                        month = '0' + pickedValue[1].toString();
                    }else{
                        month = pickedValue[1];
                    }
                    if(pickedValue[2] <= 9){
                        day = '0' + pickedValue[2].toString();
                    }else{
                        day = pickedValue[2];
                    }
                    let dateAge = pickedValue[0] + '-' + month + '-' + day
                    this.setState({age: dateAge})
                },
                onPickerCancel: (pickedValue, pickedIndex) => {
                    console.log('date', pickedValue, pickedIndex);
                },
                onPickerSelect: (pickedValue, pickedIndex) => {
                    this.setState({year: pickedValue[0]});
                    console.log('date3', pickedValue, pickedIndex);
                }
            });
            Picker.show();
        }

    registerCancel() {
        this.props.navigation.goBack();
    }

    nextStep() {
        console.log(this.state);
        this.setState({
            step: this.state.step + 1
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
          console.log(image);
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
          console.log(image);
          this.setState({
            image: image.path
          });

        }).catch(e => alert(e));
    }

    render() {
        const {isLoading, step} = this.state;
        let body = <ActivityIndicator size="large" color="#0000ff"/>;
        if (!isLoading) {
            body = <View>
                {this.showActivity()}
                {step == 1 &&
                    <View>
                        <TextInput
                            style={styles.inputStyle}
                            editable={true}
                            underlineColorAndroid='transparent'
                            onChangeText={(full_name) => this.setState({full_name})}
                            placeholder={strings("register.fullName")}
                            returnKeyType = {"next"}
                            value={this.state.full_name}
                            onSubmitEditing={() => { this.emailInput.focus(); }}
                            blurOnSubmit={false}
                        />
                        <TextInput
                            style={styles.inputStyle}
                            editable={true}
                            underlineColorAndroid='transparent'
                            onChangeText={(email) => this.setState({email})}
                            placeholder={strings("register.email")}
                            ref={(input) => { this.emailInput = input; }}
                            returnKeyType = {"next"}
                            value={this.state.email}
                            onSubmitEditing={() => { this._showDatePicker(); }}
                            blurOnSubmit={false}
                        />
                        <TextInput
                            style={styles.inputStyle}
                            editable={true}
                            underlineColorAndroid='transparent'
                            onChangeText={(password) => this.setState({password})}
                            placeholder={strings("register.password")}
                            ref={(input) => { this.passwordInput = input; }}
                            returnKeyType = {"next"}
                            secureTextEntry={true}
                            value={this.state.password}
                            onSubmitEditing={() => { this.registerUser(); }}
                            blurOnSubmit={false}
                        />
                    </View>
                }
                {step == 2 &&
                    <View>
                        <View style={styles.inputStyleFecha}>
                            <TouchableWithoutFeedback onPress={this._showDatePicker.bind(this)}>
                                <View style={styles.viewButtonStyleFecha}>
                                    {this.state.age == '' &&
                                        <Text style={styles.textButtonStyleFecha}>
                                            {strings("register.age")}
                                        </Text>
                                    }
                                    {this.state.age !== '' &&
                                        <Text>
                                            {this.state.age}
                                        </Text>
                                    }
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                        <TouchableOpacity
                            style={styles.buttomRegisterStyle}>
                            <Text style={styles.buttonText}> {strings("register.male")} </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.buttomRegisterStyle}>
                            <Text style={styles.buttonText}> {strings("register.female")} </Text>
                        </TouchableOpacity>

                    </View>
                }
                {step == 3 &&
                        <TouchableOpacity style={styles.buttomRegisterStyle} onPress={() => this.ActionSheet.show() }>
                            <Text style={styles.buttonText}> {strings("register.photo")} </Text>
                        </TouchableOpacity>
                }

                <TouchableOpacity
                    style={styles.buttomRegisterStyle}
                    onPress={this.nextStep.bind(this)}>
                    <Text style={styles.buttonText}> {strings("register.paso1")} </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.buttomCancelStyle}
                    onPress={this.registerCancel.bind(this)}>
                    <Text style={styles.buttonTextCancel}> {strings("home.cancel")} </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.buttomCancelStyle}
                    onPress={this.userTerms.bind(this)}>
                    <Text style={styles.buttonTextTerms}> {strings("register.terms")} </Text>
                </TouchableOpacity>
            </View>
        }
        return (
           <ScrollView style={styles.scrollContainer}>
              <View style={styles.teclado}>
                <Image style={styles.container}
                       source={require('../../assets/img/logo-b.png')}
                />
                <Text style={styles.textLight}>
                    {strings("main.title")}
                </Text>
                <Text style={styles.textBold}>
                    {strings('wmatch')}
                </Text>
                <TouchableOpacity
                    style={styles.buttomFacebookStyle}>
                    <Text style={styles.buttonText}>{strings('register.facebook')}</Text>
                </TouchableOpacity>
                  <Text style={styles.textFacebook}> {strings("register.textFacebook")} </Text>
                <View style={styles.optBox}>
                <View style={styles.lineOpt} />
                  <Text style={styles.opt}> {strings("register.opt")} </Text>
                <View style={styles.lineOpt} />
               </View>
                {body}
              </View>
           </ScrollView>
        );
    }
}

export default RegisterPage;
