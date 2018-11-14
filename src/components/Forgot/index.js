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
import {APP_STORE} from '../../Store';
import {forgotAction, recoveryPassword, forgotPassword} from './ForgotActions';
import styles from './style';
import {strings} from '../../i18n';
import {isValidText, toastMsg} from "../../utils";
import ValidationComponent from '../../utils/ValidationComponent';
import logToServer from 'log-to-server'
class ForgotPage extends ValidationComponent {

    constructor() {
        super();
        logToServer("Forgot:constructor");
        this.state = {
            email: ``,
            step: 1,
            code: '',
            password: '',
            confirmPassword: '',
            isLoading: false
        };
    }

    componentDidMount() {
        logToServer("Forgot:componentDidMount");
        this.appSubscription = APP_STORE.APP_EVENT.subscribe(state => {
            logToServer("Forgot:componentDidMount:appSubscription", state);
            this.setState({isLoading: false});
            if(state.success && this.state.step == 2){
                toastMsg(state.success);
                this.appSubscription.unsubscribe();
                this.props.navigation.popToTop();
            }
            if(state.success){
                toastMsg(state.success);
                this.setState({step: 2});
            }
            if (isValidText(state.error))
                toastMsg(state.error);
        });
    }

    componentWillUnmount() {
        logToServer("Forgot:componentWillUnmount");
        this.appSubscription.unsubscribe();
    }

    static navigationOptions = {header: null};

    _forgotCancel() {
        this.props.navigation.goBack();
    }

    _forgotPassword(email) {
        /*
        * Validating Form with rules
        */
        this.validate({
            email: {required: true, email: true}
        });
        if (this.isFormValid()) {
            this.setState({isLoading: true});
            forgotAction(this.state.email.toString());
        } else {
            if (this.isFieldInError('email')) {
                this.getErrorsInField('email').map((result) => toastMsg(result))
                return
            }
        }
    }

    _forgotSendPassword() {
        /*
        * Validating Form with rules
        */
        this.validate({
            code: {required: true, minlength:6, maxlength:20},
            password: {required: true, minlength:6, maxlength:12},
            confirmPassword: {required: true, minlength:6, maxlength:12}
        });
        if(this.isFormValid()){
            this.setState({isLoading: true});
            recoveryPassword(this.state.code, this.state.password);
        }else{
            if(this.isFieldInError('code')){
                this.getErrorsInField('code').map((result) => toastMsg(result))
                return
            }
            if(this.isFieldInError('password')){
                this.getErrorsInField('password').map((result) => toastMsg(result))
                return
            }
            if(this.isFieldInError('confirmPassword')){
                this.getErrorsInField('confirmPassword').map((result) => toastMsg(result))
                return
            }
        }
    }

    render() {
        const {isLoading, step} = this.state;
        if (isLoading) {
            return (
                <View style={styles.teclado}>
                <Image
                    style={styles.container}
                    source={require('../../assets/img/logo-b.png')}
                    style={[{width: null, height: 300}]}
                />
              <Text style={styles.textRecover}>
                    {strings('main.recover')}
                </Text>
                <ActivityIndicator size="large" color="#0000ff"/>
                </View>
            )
        } else {
            if(step == 1){
                return (
                    <ScrollView style={{backgroundColor: '#fff',}}>
                        <View style={styles.teclado}>
                            <Image
                                style={styles.container}
                                source={require('../../assets/img/logo-b.png')}
                            />
                            <View style={styles.contentLogin}>
                                <Text style={styles.textRecover}>
                                    {strings('main.recover')}
                                </Text>
                            </View>
                            <TextInput
                                style={styles.inputStyle}
                                editable={true}
                                underlineColorAndroid='transparent'
                                onChangeText={(email) => this.setState({email})}
                                placeholder={strings('register.email')}
                                ref='email'
                                returnKeyType = {"next"}
                                onSubmitEditing={() => { this._forgotPassword(); }}
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
            }else if(step == 2){
                return (
                    <ScrollView style={{backgroundColor: '#fff',}}>
                        <View style={styles.teclado}>
                            <Image
                                style={styles.container}
                                source={require('../../assets/img/logo-b.png')}/>

                            <View style={styles.contentLogin}>
                                <Text style={styles.textRecover}>
                                    {strings('main.recover')}
                                </Text>

                            </View>
                            <TextInput
                                style={styles.inputStyle}
                                editable={true}
                                underlineColorAndroid='transparent'
                                onChangeText={(code) => this.setState({code})}
                                placeholder={strings('forgot.code')}
                                value={this.state.code}
                                ref={(input) => { this.codeInput = input; }}
                                returnKeyType = {"next"}
                                onSubmitEditing={() => { this.passwordInput.focus(); }}
                                blurOnSubmit={false}
                            />
                            <TextInput
                                style={styles.inputStyle}
                                editable={true}
                                underlineColorAndroid='transparent'
                                onChangeText={(password) => this.setState({password})}
                                placeholder={strings('forgot.password')}
                                ref={(input) => { this.passwordInput = input; }}
                                returnKeyType = {"next"}
                                onSubmitEditing={() => { this.confirmInput.focus(); }}
                                blurOnSubmit={false}
                                value={this.state.password}
                            />
                            <TextInput
                                style={styles.inputStyle}
                                editable={true}
                                underlineColorAndroid='transparent'
                                onChangeText={(confirmPassword) => this.setState({confirmPassword})}
                                placeholder={strings('forgot.confirmPassword')}
                                ref={(input) => { this.confirmInput = input; }}
                                returnKeyType = {"next"}
                                onSubmitEditing={() => { this._forgotSendPassword(); }}
                                blurOnSubmit={false}
                                value={this.state.confirmPassword}
                            />

                            <TouchableOpacity
                                style={styles.buttomLoginStyle}
                                onPress={this._forgotSendPassword.bind(this)}>
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
}

export const IMAGE_HEIGHT = window.width / 2;
export const IMAGE_WIDTH = window.width;
export default ForgotPage;
