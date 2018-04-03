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
            sexo: 'Hombre',
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
            console.log(state);
            if (state.error) {
                this.setState({isLoading: false});
                ToastAndroid.show(this.getErrorMessages(), ToastAndroid.LONG);
                //Alert.alert(strings("register.errorTitle"), state.error);
            return;
            }
            // if (state.success) {
            //     Alert.alert(strings("register.successTitle"), state.error);
            //     this.props.navigation.navigate('Login');
            // }
        });
    }

    componentWillUnmount() {
        console.log("RegisterPage:componentWillUmmount");
    }

    registerUser() {
        this.validate({
            username:  {required: true, minlength:6, maxlength:12},
            password:  {required: true, minlength:6, maxlength:20},
            full_name: {required: true, minlength:3, maxlength:30},
            email:     {required: true, email: true}
        });
        this.setState({isLoading: true});
        registerAction(this.state.first_name, this.state.email, this.state.username, this.state.password,
            parseFloat(this.state.latitud).toFixed(6), parseFloat(this.state.longitud).toFixed(6))
    }

    registerCancel() {
        this.props.navigation.goBack();
        // this.props.navigation.navigate('SignIn');
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
                <View style={{height: 0}}/>
            </View>
        }
        return (
            <KeyboardAvoidingView style={styles.teclado}
                                  behavior="height">
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
            </KeyboardAvoidingView>
        );

    }
}

export default RegisterPage;
