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
    Clipboard
} from 'react-native';
import logToServer from 'log-to-server'
import {APP_STORE} from '../../Store';
import {loginAction, firebaseAction} from './LoginActions';
import styles from './style';
import {strings} from '../../i18n';
import {isValidText, internet, checkConectivity, parseError, toastMsg} from "../../utils";
import firebase from 'react-native-firebase';

/**
 * Screen to Login the User
 */
export default class LoginPage extends Component {

    constructor() {
        super();
        logToServer("LoginPage:constructor");
        this.state = {
            username: ``,
            password: ``,
            isLoading: false
        };
    }

    componentDidMount() {
        logToServer("LoginPage:componentDidMount");
        this.tokenSubscription = APP_STORE.TOKEN_EVENT.subscribe(state => {
            logToServer("LoginPage:componentDidMount:tokenSubscription", state);
        });

        this.firebaseSubscription = APP_STORE.FIRE_EVENT.subscribe(state => {
            logToServer("LoginPage:componentDidMount:firebaseSubscription", state);
            this.setState({isLoading: false});
            // Initialization session on Firebase
            firebase.auth().signInAnonymouslyAndRetrieveData()
                .then((user) => {
                    logToServer("LoginPage:componentDidMount:firebaseAuth", user);
                    const username = APP_STORE.getUser();
                    logToServer("LoginPage:componentDidMount:firebaseAuth", username);
                    firebase.analytics().setUserId(username);
                    this.props.navigation.navigate('App');
                }).catch(err => console.error("LoginPage:componentDidMount:firebaseAuth", err));
        });

        this.idSubscription = APP_STORE.ID_EVENT.subscribe(state => {
            logToServer("LoginPage:componentDidMount:idSubscription", state);
            if (isValidText(state.id)) {

                if (firebase.messaging().hasPermission()) {
                    try {
                        firebase.messaging().requestPermission();
                    } catch (e) {
                        alert("Failed to grant permission")
                    }
                }

                firebase.messaging().getToken().then(token => {
                    firebaseAction(token)
                });
            }
        });

        this.appSubscription = APP_STORE.APP_EVENT.subscribe(state => {
            logToServer("LoginPage:componentDidMount:appSubscription", state);
            this.setState({isLoading: false});
            if (state.error) {
                toastMsg(state.error)
            }
        });
    }

    componentWillUnmount() {
        logToServer("LoginPage:componentWillUnmount");
        this.tokenSubscription.unsubscribe();
        this.appSubscription.unsubscribe();
        this.idSubscription.unsubscribe();
        this.firebaseSubscription.unsubscribe();
    }

    static navigationOptions = {header: null};

    popScreen() {
        this.props.navigation.goBack();
    }

    _forgotScreen() {
        this.tokenSubscription.unsubscribe();
        this.appSubscription.unsubscribe();
        this.idSubscription.unsubscribe();
        this.firebaseSubscription.unsubscribe();
        this.props.navigation.navigate('Forgot');
    }

    userLogin() {
        if (checkConectivity()) {
            this.setState({isLoading: true});
            loginAction(this.state.username, this.state.password)
        } else {
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
                    <ActivityIndicator size="large" color="#9605CC"/>
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
                <ScrollView
                    style={styles.containerView}
                    keyboardShouldPersistTaps={'always'}
                >
                    <View style={styles.teclado}>
                        <Image
                            style={styles.container}
                            source={require('../../assets/img/logo-b.png')}
                        />
                        <View style={styles.contentLogin}>
                            <Text style={styles.textRegister}>
                                {strings('main.login')}
                            </Text>
                        </View>
                        <TextInput
                            style={styles.inputStyle}
                            underlineColorAndroid='transparent'
                            editable={true}
                            onChangeText={(username) => this.setState({username})}
                            placeholder={strings('register.username_or_email')}
                            returnKeyType={"next"}
                            ref='username'
                            onSubmitEditing={() => {
                                this.passwordInput.focus();
                            }}
                            blurOnSubmit={false}
                            value={this.state.username}
                        />
                        <TextInput
                            style={styles.inputStyle}
                            underlineColorAndroid='transparent'
                            editable={true}
                            onChangeText={(password) => this.setState({password})}
                            placeholder={strings("register.password")}
                            ref={(input) => {
                                this.passwordInput = input;
                            }}
                            returnKeyType={"next"}
                            secureTextEntry={true}
                            value={this.state.password}
                            onSubmitEditing={() => {
                                this.userLogin();
                            }}
                            blurOnSubmit={false}
                        />
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
