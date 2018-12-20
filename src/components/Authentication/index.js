import React, {Component} from 'react';
import {
    Text,
    TouchableOpacity,
    View,
    ScrollView,
    Image,
} from 'react-native';
import {strings} from '../../i18n';
import {isValidText, toastMsg} from '../../utils';
import {APP_STORE} from '../../Store';
import styles, { MAGENTA } from './styles';
import {facebookAction, firebaseAction} from './AuthenticationActions';
import firebase from 'react-native-firebase';
import {LoginManager} from 'react-native-fbsdk';
import { Spinner } from 'native-base';
import authStore, { events as authEvents } from '../../modules/auth/AuthStore'


/**
 * Authentication Screen
 */
export default class Authentication extends Component {
    constructor() {
        super();
        this.state = {
            latitud: '',
            loadingFBLogin: false,
            longitud: '',
        };
        // we force logout of the Facebook SDK in case that the normal Logout of the App fail or was erased
        LoginManager.logOut();
    }

    componentDidMount() {
        this.appSubscription = APP_STORE.APP_EVENT.subscribe(state => {
            // eslint-disable-next-line no-console
            console.log(
                'Authentication:componentDidMount:appSubscription',
                state
            );

            if (isValidText(state.error)) toastMsg(state.error);
        });

        this.firebaseSubscription = APP_STORE.FIRE_EVENT.subscribe(state => {
            // eslint-disable-next-line no-console
            console.log(
                'Authentication:componentDidMount:firebaseSubscription',
                state
            );

            this.props.navigation.navigate('App');
        });

        this.idSubscription = APP_STORE.ID_EVENT.subscribe(state => {
            // eslint-disable-next-line no-console
            console.log(
                'Authentication:componentDidMount:idSubscription',
                state
            );

            if (isValidText(state.id)) {
                if (firebase.messaging().hasPermission()) {
                    try {
                        firebase.messaging().requestPermission();
                    } catch (e) {
                        alert('Failed to grant permission');
                    }
                }
                // workaround while firebase login gets merged with the fb login
                
                firebase
                    .messaging()
                    .getToken()
                    .then(token => {
                        firebaseAction(token);
                    });
            }
        });

        this.authStoreSubscription = authStore.subscribe(
            authEvents.FB_LOGGING_IN,
            (loadingFBLogin: boolean) =>
        {
            this.setState({
                loadingFBLogin,
            })
        });
    }

    componentWillUnmount() {
        this.appSubscription.unsubscribe();
        this.firebaseSubscription.unsubscribe();
        this.idSubscription.unsubscribe();
        this.authStoreSubscription.unsubscribe();
    }

    static navigationOptions = {header: null};

    userRegister() {
        this.props.navigation.navigate('Register');
    }

    userLoginPage() {
        this.props.navigation.navigate('Login');
    }

    _facebookLogin = () => {
        facebookAction(this.state);
    }

    render() {
        return (
            <ScrollView style={styles.scrollContainer}>
                <View style={styles.headerLogin}>
                    <View style={styles.headerImageHolder}>
                        <View style={styles.imageStyle}>
                            <Image
                                style={styles.container}
                                source={require('../../assets/img/logo-login.png')}
                            />
                        </View>
                    </View>
                </View>
                {
                    this.state.loadingFBLogin
                    ? (
                        <View style={styles.deadCenter}>
                            <Spinner color={MAGENTA} />
                            <Text>
                                {strings('register.loggingInWithFacebook')}
                            </Text>
                        </View>
                    ) : (
                        <View style={styles.contentLogin}>
                            <Text style={styles.textLight}>
                                {strings('main.title')}
                            </Text>
                            <Text style={styles.textBold}>{strings('wmatch')}</Text>
                            <TouchableOpacity
                                style={styles.buttomFacebookStyle}
                                onPress={this._facebookLogin}
                            >
                                <Image
                                    style={styles.logoFacebook}
                                    source={require('../../assets/img/facebook-app-logo.png')}
                                />
                                <Text style={styles.buttonTextFacebook}>
                                    {strings('login.facebook')}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.buttomLoginStyle}
                                onPress={this.userRegister.bind(this)}
                            >
                                <Text style={styles.buttonText}>
                                    {strings('login.register')}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.buttomRegister}
                                onPress={this.userLoginPage.bind(this)}
                            >
                                <Text style={styles.buttomTextRegister}>
                                    {strings('login.signup_button')}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )
                }
            </ScrollView>
        );
    }
}
