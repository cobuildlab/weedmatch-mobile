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
    Picker,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator,
    ToastAndroid
} from 'react-native';
import {strings} from "../../i18n";
import {registerAction} from "./RegisterActions";
import {APP_STORE} from "../../Store";
import ValidationComponent from '../../utils/ValidationComponent';
import styles from './style'

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
            isLoading: false
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
        APP_STORE.APP_EVENT.subscribe(state => {
            this.setState({isLoading: true});
            if (state.error) {
                this.setState({isLoading: false});
                if(state.error.detail){
                    Object.keys(state.error.detail).map(function(objectKey, index) {
                        var value = state.error.detail[objectKey];
                        ToastAndroid.show(value, ToastAndroid.LONG);
                    });

                }
            return;
            }
            if (state.success) {
                ToastAndroid.show(strings("register.successTitle"), ToastAndroid.LONG);
                this.props.navigation.navigate('Login');
            }
        });
    }

    componentWillUnmount() {
        console.log("RegisterPage:componentWillUmmount");
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
            age:       {date: 'YYYY-MM-DD', require: true}
        });
        if(this.isFormValid()){
            this.setState({isLoading: true});
            registerAction(this.state.full_name, this.state.email, this.state.username, this.state.password,
                parseFloat(this.state.latitud).toFixed(6), parseFloat(this.state.longitud).toFixed(6), this.state.sex, this.state.age)
        }else{
            if(this.state.full_name !== '' || this.state.email !== '' || this.state.username !== '' || this.state.password !== '' || this.state.age !== ''){
                if(this.isFieldInError('full_name')){
                    this.getErrorsInField('full_name').map((result) => ToastAndroid.show(result, ToastAndroid.LONG))
                    return
                }
                if(this.isFieldInError('email')){
                    this.getErrorsInField('email').map((result) => ToastAndroid.show(result, ToastAndroid.LONG))
                    return
                }
                if(this.isFieldInError('age')){
                    this.getErrorsInField('age').map((result) => ToastAndroid.show(result, ToastAndroid.LONG))
                    return
                }
                if(this.isFieldInError('username')){
                    this.getErrorsInField('username').map((result) => ToastAndroid.show(result, ToastAndroid.LONG))
                    return
                }
                if(this.isFieldInError('password')){
                    this.getErrorsInField('password').map((result) => ToastAndroid.show(result, ToastAndroid.LONG))
                    return
                }

            }else{
                ToastAndroid.show(strings("register.allInputs"), ToastAndroid.LONG);
            }
        }

    }

    registerCancel() {
        this.props.navigation.goBack();
    }

    render() {
        const {isLoading} = this.state;
        let body = <ActivityIndicator size="large" color="#0000ff"/>;
        if (!isLoading) {
            body = <View>
                <TextInput
                    style={styles.inputStyle}
                    editable={true}
                    onChangeText={(full_name) => this.setState({full_name})}
                    placeholder={strings("register.fullName")}
                    ref='full_name'
                    returnKeyType='next'
                    value={this.state.full_name}
                />
                <TextInput
                    style={styles.inputStyle}
                    editable={true}
                    onChangeText={(email) => this.setState({email})}
                    placeholder={strings("register.email")}
                    ref='email'
                    returnKeyType='next'
                    value={this.state.email}
                />

                <TextInput
                    style={styles.inputStyle}
                    editable={true}
                    onChangeText={(age) => this.setState({age})}
                    placeholder={strings("register.age")}
                    ref='age'
                    returnKeyType='next'
                    value={this.state.age}
                />
                <TextInput
                    style={styles.inputStyle}
                    editable={true}
                    onChangeText={(username) => this.setState({username})}
                    placeholder={strings("register.username")}
                    ref='username'
                    returnKeyType='next'
                    value={this.state.username}
                />
                <TextInput
                    style={styles.inputStyle}
                    editable={true}
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
                    <Text style={styles.buttonText}> Register </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.buttomCancelStyle}
                    onPress={this.registerCancel.bind(this)}>
                    <Text style={styles.buttonTextCancel}> Cancel </Text>
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
                    ENCUENTRA TU MEDIO
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
