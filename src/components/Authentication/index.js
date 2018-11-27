import React, {Component} from 'react';
import {
    Text,
    TouchableOpacity,
    View,
    Alert,
    ScrollView,
    Image, SafeAreaView,
} from 'react-native';
import {strings} from '../../i18n';
import {isValidText, toastMsg} from '../../utils';
import {APP_STORE} from '../../Store';
import styles from './styles';
import {facebookAction, firebaseAction} from './AutheticationActions';
import firebase from 'react-native-firebase';
import GeoLocationProvider from "../../utils/geolocation/GeoLocationProvider";

/**
 * MatchUsersScreen Screen
 */
export default class Authentication extends Component {
    constructor() {
        super();
        this.state = {
            loadingFBLogin: false,
            latitud: '',
            longitud: '',
        };
    }

    subscription() {
        this.face = APP_STORE.FACE_EVENT.subscribe(state => {
            // eslint-disable-next-line no-console
            console.log(
                'Public Profile:componentDidMount:PUBLICPROFILE_EVENT',
                state
            );

            if (state.face) {
                this.appSubscription.unsubscribe();
                this.firebaseSubscription.unsubscribe();
                this.idSubscription.unsubscribe();
            }
        });

        this.appSubscription = APP_STORE.APP_EVENT.subscribe(state => {
            // eslint-disable-next-line no-console
            console.log(
                'MatchUsersScreen:componentDidMount:appSubscription',
                state
            );

            if (isValidText(state.error)) toastMsg(state.error);
        });

        this.firebaseSubscription = APP_STORE.FIRE_EVENT.subscribe(state => {
            // eslint-disable-next-line no-console
            console.log(
                'MatchUsersScreen:componentDidMount:firebaseSubscription',
                state
            );

            this.props.navigation.navigate('App');
        });

        this.idSubscription = APP_STORE.ID_EVENT.subscribe(state => {
            // eslint-disable-next-line no-console
            console.log(
                'MatchUsersScreen:componentDidMount:idSubscription',
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

                firebase
                    .messaging()
                    .getToken()
                    .then(token => {
                        firebaseAction(token);
                    });
            }
        });
    }

    static navigationOptions = {header: null};

    userRegister() {
        this.props.navigation.navigate('Register');
    }

    userLoginPage() {
        this.props.navigation.navigate('Login');
    }

    _facebookLogin() {
        this.subscription();
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
                <View style={styles.contentLogin}>
                    <Text style={styles.textLight}>
                        {strings('main.title')}
                    </Text>
                    <Text style={styles.textBold}>{strings('wmatch')}</Text>
                    <TouchableOpacity
                        style={styles.buttomFacebookStyle}
                        onPress={this._facebookLogin.bind(this)}
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
            </ScrollView>
        );
    }
}
