import React, {Component} from 'react';
import {
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Alert,
    Image,
    ActivityIndicator,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
} from 'react-native';
import {APP_STORE} from '../../Store'
import {forgotAction} from './ForgotActions'
import styles from './style'
import {strings} from '../../i18n';
import {isValidText, toastMsg} from "../../utils";
import ValidationComponent from '../../utils/ValidationComponent';

class ForgotPage extends ValidationComponent {

    constructor() {
        super();
        console.log("Forgot:constructor");
        this.state = {
            email: ``,
            isLoading: false
        };
    }

    componentDidMount() {
        console.log("Forgot:componentDidMount");
        this.tokenSubscription = APP_STORE.TOKEN_EVENT.subscribe(state => {
            console.log("Forgot:componentDidMount:tokenSubscription", state);
            this.setState({isLoading: false});
            if (isValidText(state.token))
                this.props.navigation.navigate('App');
        });

        this.appSubscription = APP_STORE.APP_EVENT.subscribe(state => {
            console.log("Forgot:componentDidMount:appSubscription", state);
            this.setState({isLoading: false});
            if (isValidText(state.error))
                toastMsg(state.error);
        });
    }

    componentWillUnmount() {
        console.log("Forgot:componentWillUmmount");
        this.tokenSubscription.unsubscribe();
        this.appSubscription.unsubscribe();
    }

    static navigationOptions = {header: null};

    userAuthentication() {
        this.props.navigation.navigate('SignIn');
    }

    popScreen() {
        this.props.navigation.goBack();
    }

    _forgotCancel() {
        this.props.navigation.goBack();
    }

    _forgotPassword() {
        /*
        * Validating Form with rules
        */
        this.validate({
            email:     {required: true, email: true}
        });
        if(this.isFormValid()){
            this.setState({isLoading: true});
            forgotAction(this.state.email)
        }else{
            if(this.isFieldInError('email')){
                this.getErrorsInField('email').map((result) => toastMsg(result))
                return
            }
        }

    }


    render() {
        const {isLoading} = this.state;
        if (isLoading) {
            return (
                    <View style={styles.teclado}>
                    <Image
                        style={styles.container}
                        source={require('./logo-login.png')}
                        style={[{width: null, height: 300}]}
                    />
                    <Text style={styles.textLight}>
                        {strings('main.title')}
                    </Text>
                    <Text style={styles.textBold}>
                        {strings('wmatch')}
                    </Text>
                    <ActivityIndicator size="large" color="#0000ff"/>
                    <TouchableOpacity
                        style={styles.buttomLoginStyle}
                        onPress={this.userLogin.bind(this)}>
                        <Text style={styles.buttonText}>{strings('login.login')}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttomBackLogin} onPress={this.popScreen.bind(this)}>
                        <Text> {strings('login.redes')} </Text>
                    </TouchableOpacity>
                    </View>
            )
        } else {
            return (
                <ScrollView style={{backgroundColor: '#fff',}}>
                <View style={styles.teclado}>
                    <Image
                        style={styles.container}
                        source={require('../../assets/img/logo-b.png')}/>

                    <View style={styles.contentLogin}>
                        <Text style={styles.textLight}>
                            {strings('main.title')}
                        </Text>
                        <Text style={styles.textBold}>
                            {strings('wmatch')}
                        </Text>
                    </View>
                    <TextInput
                        style={styles.inputStyle}
                        editable={true}
                        underlineColorAndroid='transparent'
                        onChangeText={(email) => this.setState({email})}
                        placeholder={strings('register.email')}
                        ref='email'
                        returnKeyType='next'
                        value={this.state.email}
                    />


                    <TouchableOpacity
                        style={styles.buttomLoginStyle}
                        onPress={this._forgotPassword.bind(this)}>
                        <Text style={styles.buttonText}>{strings('forgot.send')}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.buttomCancelStyle}
                        onPress={this._forgotCancel.bind(this)}>
                        <Text style={styles.buttonTextCancel}> {strings("home.cancel")} </Text>
                    </TouchableOpacity>
                </View>
                </ScrollView>
            );
        }
    }
}

export const IMAGE_HEIGHT = window.width / 2;
export const IMAGE_WIDTH = window.width;
export default ForgotPage;
