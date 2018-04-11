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
import {Logger} from "../../utils";
import styles from './styles'
import {facebookAction} from './AutheticationActions'

export default class Authentication extends Component {

    constructor() {
        super();
        console.log("Authentication:constructor");
        this.state = {username: null, password: null};
    }

    componentDidMount() {
        console.log("Authentication:componentDidMount");
    }

    componentWillUnmount() {
        console.log("Authentication:componentWillUmmount");
    }

    static navigationOptions = {header: null};

    async saveItem(item, selectedValue) {
        try {
            await AsyncStorage.setItem(item, selectedValue);
        } catch (error) {
            console.error('AsyncStorage error: ' + error.message);
        }
    }

    userRegister() {
        this.props.navigation.navigate('Register');
    }

    userLoginPage() {
        this.props.navigation.navigate('Login');
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
                {/*    <TouchableOpacity
                        style={styles.buttomLoginIntagramStyle}
                        onPress={this.userLogin.bind(this)}>
                        <Text style={styles.buttonInstagramText}> Inicia Sesión con Instagram </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.buttomFacebookStyle}
                        onPress={this._facebookLogin.bind(this)}>
                        <Text style={styles.buttonTextFacebook}> Inicia Sesión con Facebook </Text>
                    </TouchableOpacity>
                */}
                    <TouchableOpacity
                        style={styles.buttomLoginStyle}
                        onPress={this.userLoginPage.bind(this)}>
                        <Text style={styles.buttonText}>{strings('login.login')}</Text>
                    </TouchableOpacity>
                    <View>
                        <TouchableOpacity
                            style={styles.buttomRegister}
                            onPress={this.userRegister.bind(this)}>
                            <Text style={styles.buttomTextRegister}>{strings('login.signup_button')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        );
    }
}