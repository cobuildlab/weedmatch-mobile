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
    Image
} from 'react-native';
import {LoginButton, AccessToken, LoginManager} from 'react-native-fbsdk';
import {strings} from '../../i18n';
import {Logger,isValidText} from "../../utils";
import {APP_STORE} from '../../Store'
import styles from './styles'
import {facebookAction} from './AutheticationActions'

export default class Authentication extends Component {

    constructor() {
        super();
        this.state = {
            latitud: '',
            longitud: '',
        };
    }

    componentDidMount() {
        console.log("Authentication:componentDidMount");

        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    latitud: position.coords.latitude.toFixed(6),
                    longitud: position.coords.longitude.toFixed(6)
                })
            },
            (error) => {
                console.log(error)
            },
            {enableHighAccuracy: true, timeout: 50000, maximumAge: 10000}
        );

        this.tokenSubscription = APP_STORE.TOKEN_EVENT.subscribe(state => {
            console.log("Authentication:componentDidMount:tokenSubscription", state);
        });

        this.idSubscription = APP_STORE.ID_EVENT.subscribe(state => {
            console.log("Authentication:componentDidMount:idSubscription", state);
            this.setState({isLoading: false});
            if (isValidText(state.id)) {
                this.props.navigation.navigate('App');
            }
        });

        this.appSubscription = APP_STORE.APP_EVENT.subscribe(state => {
            console.log("Authentication:componentDidMount:appSubscription", state);
            this.setState({isLoading: false});
            if (isValidText(state.error))
                toastMsg(state.error);
        });
    }

    componentWillUnmount() {
        console.log("LoginPage:componentWillUmmount");
        this.tokenSubscription.unsubscribe();
        this.appSubscription.unsubscribe();
        this.idSubscription.unsubscribe();
    }

    static navigationOptions = {header: null};

    userRegister() {
        this.props.navigation.navigate('Register');
    }

    userLoginPage() {
        this.props.navigation.navigate('Login');
    }

    _facebookLogin() {
        facebookAction(this.state)
    }

    render() {
        return (
            <ScrollView style={styles.scrollContainer}>
                <View style={styles.headerLogin}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={styles.imageStyle}>
                            <Image
                                style={styles.container}
                                source={require('../../assets/img/logo-login.png')}
                            />
                        </View>
                    </View>
                </View>
                <View style={styles.contentLogin}>
                    <Text style={styles.textLight}>
                        {strings("main.title")}
                    </Text>
                    <Text style={styles.textBold}>
                          {strings('wmatch')}
                    </Text>
                    <TouchableOpacity
                        style={styles.buttomFacebookStyle}
                        onPress={this._facebookLogin.bind(this)}>
                        <Text style={styles.buttonTextFacebook}>{strings('login.facebook')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.buttomLoginStyle}
                          onPress={this.userRegister.bind(this)}>
                        <Text style={styles.buttonText}>{strings('login.register')}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.contentLogin}>
                  <TouchableOpacity
                      style={styles.buttomRegister}
                      onPress={this.userLoginPage.bind(this)}>
                      <Text style={styles.buttomTextRegister}>
                        {strings('login.signup_button')}</Text>
                  </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }
}
