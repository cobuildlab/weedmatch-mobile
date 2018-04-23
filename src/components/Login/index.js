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
import {loginAction} from './LoginActions';
import styles from './style';
import {strings} from '../../i18n';
import {isValidText, toastMsg, connection, internet} from "../../utils";

class LoginPage extends Component {

    constructor() {
        super();
        console.log("LoginPage:constructor");
        this.state = {
            username: ``,
            password: ``,
            isLoading: false
        };
    }

    componentDidMount() {
        console.log("LoginPage:componentDidMount");
        this.tokenSubscription = APP_STORE.TOKEN_EVENT.subscribe(state => {
            console.log("LoginPage:componentDidMount:tokenSubscription", state);
            this.setState({isLoading: false});
            if (isValidText(state.token))
                this.props.navigation.navigate('App');
        });

        this.appSubscription = APP_STORE.APP_EVENT.subscribe(state => {
            console.log("LoginPage:componentDidMount:appSubscription", state);
            this.setState({isLoading: false});
            if (isValidText(state.error))
                toastMsg(state.error);
        });
    }

    componentWillUnmount() {
        console.log("LoginPage:componentWillUmmount");
        this.tokenSubscription.unsubscribe();
        this.appSubscription.unsubscribe();
    }

    static navigationOptions = {header: null};

    popScreen() {
        this.props.navigation.goBack();
    }

    _forgotScreen() {
        this.tokenSubscription.unsubscribe();
        this.appSubscription.unsubscribe();
        this.props.navigation.navigate('Forgot');
    }

    userLogin() {
        if (connection) {
            this.setState({isLoading: true});
            loginAction(this.state.username, this.state.password)
        } else {
            internet();
        }
    }

    render() {
        const {isLoading} = this.state;
        if (isLoading) {
            return (
                    <View style={styles.teclado}>
                    <Image
                        style={styles.container}
                        source={require('../../assets/img/logo-b.png')}
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
                <ScrollView style={styles.containerView}>
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
                          onChangeText={(username) => this.setState({username})}
                          placeholder={strings('register.username')}
                          ref='username'
                          returnKeyType='next'
                          value={this.state.username}
                      />
                      <TextInput
                          style={styles.inputStyle}
                          editable={true}
                          underlineColorAndroid='transparent'
                          onChangeText={(password) => this.setState({password})}
                          placeholder={strings('register.password')}
                          ref='password'
                          returnKeyType='next'
                          secureTextEntry={true}
                          value={this.state.password} />

                      <TouchableOpacity
                          style={styles.buttomLoginStyle}
                          onPress={this.userLogin.bind(this)}>
                          <Text style={styles.buttonText}>{strings('login.login')}</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.buttomBackLogin} onPress={this._forgotScreen.bind(this)}>
                          <Text> {strings('login.forgot')} </Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.buttomBackLogin} onPress={this.popScreen.bind(this)}>
                          <Text> {strings('login.redes')} </Text>
                      </TouchableOpacity>
                  </View>
                </ScrollView>
            );
        }
    }
}

export const IMAGE_HEIGHT = window.width / 2;
export const IMAGE_WIDTH = window.width;
export default LoginPage;
