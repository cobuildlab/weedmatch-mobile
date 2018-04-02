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

export const IMAGE_HEIGHT = window.width / 2;
export const IMAGE_WIDTH = window.width;

class RegisterPage extends Component {

    constructor(props) {
        super(props);
        console.log("RegisterPage:constructor");
        this.state = {
            first_name: '',
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
            // if (state.error) {
            //     Alert.alert(strings("register.errorTitle"), state.error);
            //     return;
            // }
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
                    onChangeText={(firstName) => this.setState({firstName})}
                    placeholder={strings("register.fullName")}
                    ref='firstName'
                    returnKeyType='next'
                    value={this.state.firstName}
                />
                <TextInput
                    style={styles.inputStyle}
                    editable={true}
                    onChangeText={(email) => this.setState({email})}
                    placeholder='Email'
                    ref='email'
                    returnKeyType='next'
                    value={this.state.email}
                />
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

const styles = StyleSheet.create({
    container: {
        flex: 2,
        width: '80%',
        resizeMode: 'contain',
        justifyContent: 'center',
    },

    contentRegister: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25,
    },
    textLight: {
        fontSize: 20,
        color: '#9605CC',
    },
    textBold: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#9605CC',
    },
    inputStyle: {
        backgroundColor: '#ffffff',
        height: 40,
        width: 250,
        borderColor: '#ccc',
        borderRadius: 50,
        borderWidth: 1,
        paddingLeft: 20,
        paddingRight: 10,
        marginBottom: 10,
    },
    buttomRegisterStyle: {
        marginTop: 0,
        marginBottom: 10,
        width: 250,
        marginRight: 5,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 50,
        alignItems: 'center',
        backgroundColor: '#9605CC',

    },
    buttomCancelStyle: {
        marginTop: 2,
        marginBottom: 10,
        width: 220,
        paddingTop: 5,
        paddingBottom: 10,
        borderColor: '#9605CC',
        borderWidth: 1,
        borderRadius: 50,
        alignItems: 'center',
        backgroundColor: 'transparent',

    },
    buttonTextCancel: {
        color: '#9605CC',
        fontSize: 16,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
    },
    buttomBackLogin: {
        marginTop: 30,
    },
    teclado: {
        backgroundColor: '#fff',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

        ...Platform.select({
            ios: {},
            android: {},
        }),
    }

});

export default RegisterPage;
