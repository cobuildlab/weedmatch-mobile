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
    ToastAndroid,
} from 'react-native';
import {APP_STORE} from '../../Store'
import {loginAction} from './LoginActions'
import styles from './style'
import {strings} from '../../i18n';
import {isValidText} from "../../utils";

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
                console.log(state.error)
                console.log(state.error)
                ToastAndroid.show(state.error, ToastAndroid.LONG);
                console.log(state.error)
        });
    }

    componentWillUnmount() {
        console.log("LoginPage:componentWillUmmount");
        this.tokenSubscription.unsubscribe();
        this.appSubscription.unsubscribe();
    }

    static navigationOptions = {header: null};

    userAuthentication() {
        this.props.navigation.navigate('SignIn');
    }

    userLogin() {
        this.setState({isLoading: true});
        loginAction(this.state.username, this.state.password)
    }

    render() {
        const {isLoading} = this.state;
        if (isLoading) {
            return (
                <KeyboardAvoidingView style={styles.teclado} behavior="height">
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
                        <Text style={styles.buttonText}>Inicia Sesión</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttomBackLogin} onPress={this.userAuthentication.bind(this)}>
                        <Text> Iniciar Sesión con Redes Sociales </Text>
                    </TouchableOpacity>

                    <View style={{height: 0}}/>

                </KeyboardAvoidingView>
            )
        } else {
            return (
                <KeyboardAvoidingView style={styles.teclado}
                                      behavior="height"
                >

                    <Image
                        style={styles.container}
                        source={require('../../assets/img/logo-b.png')}
                    />

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
                        onChangeText={(username) => this.setState({username})}
                        placeholder='Username'
                        ref='username'
                        returnKeyType='next'
                        value={this.state.username}
                    />

                    <TextInput
                        style={styles.inputStyle}
                        editable={true}
                        onChangeText={(password) => this.setState({password})}
                        placeholder='Password'
                        ref='password'
                        returnKeyType='next'
                        secureTextEntry={true}
                        value={this.state.password}
                    />

                    <TouchableOpacity
                        style={styles.buttomLoginStyle}
                        onPress={this.userLogin.bind(this)}>
                        <Text style={styles.buttonText}>Inicia Sesión</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttomBackLogin} onPress={this.userAuthentication.bind(this)}>
                        <Text> Iniciar Sesión   con Redes Sociales </Text>
                    </TouchableOpacity>
                    <View style={{height: 0}}/>
                </KeyboardAvoidingView>
            );
        }
    }
}

export const IMAGE_HEIGHT = window.width / 2;
export const IMAGE_WIDTH = window.width;
export default LoginPage;
