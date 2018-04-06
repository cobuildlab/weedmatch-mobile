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

import {strings} from "../../i18n";
import {registerAction} from "./RegisterActions";
import {APP_STORE} from "../../Store";
import ValidationComponent from '../../utils/ValidationComponent';
import styles from './style';
import {toastMsg} from "../../utils";

import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import Picker from 'react-native-picker';

export const IMAGE_HEIGHT = window.width / 2;
export const IMAGE_WIDTH = window.width;

class RegisterPage extends ValidationComponent {

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
            year: ''
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

                        }else{
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

    componentWillUnmount() {
        console.log("RegisterPage:componentWillUmmount");
        Picker.hide();
        this.event.unsubscribe();
    }

    registerUser() {
        /*
        * Validating Form with rules
        */
        this.validate({
            username:  {required: true, minlength:6, maxlength:12},
            password:  {required: true, minlength:6, maxlength:20},
            full_name: {required: true, minlength:3, maxlength:30},
            email:     {required: true, email: true},
            age:       {date: 'YYYY-MM-dd', require: true}
        });
        if(this.isFormValid()){
            this.setState({isLoading: true});
            registerAction(this.state.full_name, this.state.email, this.state.username, this.state.password,
                parseFloat(this.state.latitud).toFixed(6), parseFloat(this.state.longitud).toFixed(6), this.state.sex, this.state.age)
        }else{
            if(this.state.full_name !== '' || this.state.email !== '' || this.state.username !== '' || this.state.password !== '' || this.state.age !== ''){
                if(this.isFieldInError('full_name')){
                    this.getErrorsInField('full_name').map((result) => toastMsg(result))
                    return
                }
                if(this.isFieldInError('email')){
                    this.getErrorsInField('email').map((result) => toastMsg(result))
                    return
                }
                if(this.isFieldInError('age')){
                    this.getErrorsInField('age').map((result) => toastMsg(result))
                    return
                }
                if(this.isFieldInError('sex')){
                    this.getErrorsInField('sex').map((result) => toastMsg(result))
                    return
                }
                if(this.isFieldInError('username')){
                    this.getErrorsInField('username').map((result) => toastMsg(result))
                    return
                }
                if(this.isFieldInError('password')){
                    this.getErrorsInField('password').map((result) => toastMsg(result))
                    return
                }

            }else{
                toastMsg(strings("register.allInputs"))
            }
        }

    }

     _createDateData() {

        var today = new Date();
        var _month = parseInt(today.getMonth()+1);
        var _today = parseInt(today.getDate());

            let date = [];
            for(var i=parseInt(today.getFullYear()-18);i>1930;i--){
                let month = [];
                for(let j = 1;j<13;j++){
                    let day = [];
                    if(j === 2){
                        for(let k=1;k<29;k++){
                            day.push(k);
                        }
                        //Leap day for years that are divisible by 4, such as 2000, 2004
                        if(i%4 === 0){
                            day.push(29);
                        }
                    }
                    else if(j in {1:1, 3:1, 5:1, 7:1, 8:1, 10:1, 12:1}){
                        for(let k=1;k<32;k++){
                            day.push(k);
                        }
                    }
                    else{
                        for(let k=1;k<31;k++){
                            day.push(k);
                        }
                    }
                    let _month = {};
                    _month[j] = day;
                    month.push(_month);
                }
                let _date = {};
                _date[i] = month;
                date.push(_date);
            }
            return date;
        }

        _showDatePicker() {
            Picker.init({
                pickerData: this._createDateData(),
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

        _toggle() {
            Picker.toggle();
        }

        _isPickerShow(){
            Picker.isPickerShow(status => {
                alert(status);
            });
        }

    registerCancel() {
        this.props.navigation.goBack();
    }

    render() {
        var radio_props = [
          {label: strings("register.male"), value: 'Hombre' },
          {label: strings("register.female"), value: 'Mujer' }
        ];
        const {isLoading} = this.state;
        let body = <ActivityIndicator size="large" color="#0000ff"/>;
        if (!isLoading) {
            body = <View>
                <TextInput
                    style={styles.inputStyle}
                    editable={true}
                    underlineColorAndroid='transparent'
                    onChangeText={(full_name) => this.setState({full_name})}
                    placeholder={strings("register.fullName")}
                    ref='full_name'
                    returnKeyType='next'
                    value={this.state.full_name}
                />
                <TextInput
                    style={styles.inputStyle}
                    editable={true}
                    underlineColorAndroid='transparent'
                    onChangeText={(email) => this.setState({email})}
                    placeholder={strings("register.email")}
                    ref='email'
                    returnKeyType='next'
                    value={this.state.email}
                />
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
                <RadioForm
                    style={styles.radioStyle}
                    radio_props={radio_props}
                    initial={0}
                    ref="sex"
                    radioStyle={{paddingRight: 20}}
                    formHorizontal={true}
                    buttonColor={'#9605CC'}
                    selectedButtonColor={'#9605CC'}
                    onPress = {(value) => {this.setState({sex:value})}}
                />
                <TextInput
                    style={styles.inputStyle}
                    editable={true}
                    underlineColorAndroid='transparent'
                    onChangeText={(username) => this.setState({username})}
                    placeholder={strings("register.username")}
                    ref='username'
                    returnKeyType='next'
                    value={this.state.username}
                />
                <TextInput
                    style={styles.inputStyle}
                    editable={true}
                    underlineColorAndroid='transparent'
                    onChangeText={(password) => this.setState({password})}
                    placeholder={strings("register.password")}
                    ref='password'
                    returnKeyType='next'
                    secureTextEntry={true}
                    value={this.state.password}
                />
                <TouchableOpacity
                    style={styles.buttomRegisterStyle}
                    onPress={this.registerUser.bind(this)}>
                    <Text style={styles.buttonText}> {strings("register.register")} </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.buttomCancelStyle}
                    onPress={this.registerCancel.bind(this)}>
                    <Text style={styles.buttonTextCancel}> {strings("home.cancel")} </Text>
                </TouchableOpacity>
            </View>
        }
        return (
           <ScrollView style={{backgroundColor: '#fff',}}>
              <View style={styles.teclado}>
                <Image style={styles.container}
                       source={require('../../assets/img/logo-b.png')}
                />
                <Text style={styles.textLight}>
                    {strings("main.title")}
                </Text>
                <Text style={styles.textBold}>
                    COGOLLO
                </Text>
                {body}
              </View>
           </ScrollView>
        );
    }
}

export default RegisterPage;
