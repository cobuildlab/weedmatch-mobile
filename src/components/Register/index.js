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
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator,
    TouchableWithoutFeedback,
} from 'react-native';
import {strings} from "../../i18n";
import {
    registerAction,
    createDateData,
    validateEmailAction,
    facebookAction,
    firebaseAction,
    validateUsernameAction
} from "./RegisterActions";
import {APP_STORE} from "../../Store";
import styles from './style';
import loginStyles from '../Login/style';
import {toastMsg, connection, internet, checkConectivity, generateUsernameFromFullName} from "../../utils";
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import Picker from 'react-native-picker';
import validate from './validate_wrapper';
import ImagePicker from 'react-native-image-crop-picker';
import ActionSheet from 'react-native-actionsheet';
import firebase from 'react-native-firebase';
import GeoLocationProvider from "../../utils/GeoLocationProvider";

class RegisterPage extends Component {

    constructor(props) {
        super(props);
        console.log("RegisterPage:constructor");
        this.state = {
            full_name: '',
            username: '',
            email: '',
            password: '',
            latitud: '',
            longitud: '',
            age: '',
            sex: 'Hombre',
            image: '',
            isLoading: false,
            year: '',
            step: 1,
            emailError: '',
            full_nameError: '',
            passwordError: '',
            ageError: '',
            sexError: '',
        };
    }

    static navigationOptions = {header: null};

    componentDidMount() {
        console.log("RegisterPage:componentDidMount");

        this.event = APP_STORE.APP_EVENT.subscribe(state => {
            if (state.error) {
                this.setState({isLoading: false});
                if (state.error.detail) {
                    Object.keys(state.error.detail).map(function (objectKey, index) {
                        var value = state.error.detail[objectKey];
                        if (typeof value == 'object') {
                            value.forEach(function (msg) {
                                toastMsg(msg);
                            });
                        } else {
                            toastMsg(value);
                        }
                    });
                }
                return;
            }
            if (state.success) {
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

        this.firebaseSubscription = APP_STORE.FIRE_EVENT.subscribe(state => {
            console.log("RegisterPage:componentDidMount:firebaseSubscription", state);
            this.props.navigation.navigate('App');
        });

        this.email = APP_STORE.EMAIL_EVENT.subscribe(state => {
            this.setState({isLoading: true});
            if (state.error) {
                this.setState({isLoading: false});
                toastMsg(state.error);
                return;
            }
            if (state.success) {
                this.setState({isLoading: false});
                this.setState({
                    step: 2
                });
            }
        });

        const me = this;

        this.usernameSubscription = APP_STORE.USERNAME_EVENT.subscribe(state => {
            this.setState({isLoading: true});
            if (state.error) {
                this.setState({isLoading: false});
                toastMsg(state.error);
                me.setState({username: generateUsernameFromFullName(this.state.full_name, true)});
                return;
            }
            if (state.success) {
                this.setState({isLoading: false});
                this.setState({
                    step: 3
                });
            }
        });
    }

    userTerms() {
        this.props.navigation.navigate('Terms');
    }

    _facebookLogin() {
        this.setState({isLoading: true});
        facebookAction(this.state)
    }

    componentWillUnmount() {
        console.log("RegisterPage:componentWillUmmount");
        Picker.hide();
        this.event.unsubscribe();
        this.email.unsubscribe();
        this.usernameSubscription.unsubscribe();
        this.firebaseSubscription.unsubscribe();
    }

    /**
     * Method call for registering the user
     * */
    _registerUser() {
        console.log('Register:_registerUser');
        this.setState({
            isLoading: true
        }, () => {
            const longitude = (this.longitude === undefined) ? undefined : parseFloat(this.longitude);
            const latitude = (this.latitude === undefined) ? undefined : parseFloat(this.latitude);
            registerAction(this.state.full_name, this.state.email, this.state.password, latitude,
                longitude, this.state.sex, this.state.age, this.state.image, this.state.username);
        })
    }

    _showDatePicker() {
        Picker.init({
            pickerData: createDateData(),
            pickerFontColor: [153, 0, 204, 1],
            pickerToolBarBg: [232, 232, 232, 1],
            pickerTitleText: '',
            pickerConfirmBtnColor: [153, 0, 204, 1],
            pickerCancelBtnColor: [153, 0, 204, 1],
            pickerBg: [255, 255, 255, 1],
            onPickerConfirm: (pickedValue, pickedIndex) => {
                var month = '';
                var day = '';
                if (pickedValue[1] <= 9) {
                    month = '0' + pickedValue[1].toString();
                } else {
                    month = pickedValue[1];
                }
                if (pickedValue[2] <= 9) {
                    day = '0' + pickedValue[2].toString();
                } else {
                    day = pickedValue[2];
                }
                let dateAge = pickedValue[0] + '/' + month + '/' + day
                this.setState({age: dateAge})
            },
            onPickerCancel: (pickedValue, pickedIndex) => {
                console.log('date', pickedValue, pickedIndex);
            },
            onPickerSelect: (pickedValue, pickedIndex) => {
                this.setState({year: pickedValue[0]});
                console.log('date3', pickedValue, pickedIndex);
            }
        });
        Picker.show();
    }

    _registerCancel() {
        this.props.navigation.goBack();
    }

    _maleSelect() {
        this.setState({
            sex: 'Hombre'
        })
    }

    _femaleSelect() {
        this.setState({
            sex: 'Mujer'
        })
    }

    _nextStep() {
        console.log("Register:_nextStep", this.state);
        const emailError = validate('email', this.state.email);
        const full_nameError = validate('full_name', this.state.full_name);
        const passwordError = validate('password', this.state.password);

        if (full_nameError) {
            toastMsg(full_nameError);
            return false
        }
        if (emailError) {
            toastMsg(emailError);
            return false
        }
        if (passwordError) {
            toastMsg(passwordError);
            return false
        }

        if (this.state.step == 1) {
            this.state.username = generateUsernameFromFullName(this.state.full_name);
            this.setState({isLoading: true});
            validateEmailAction({"email": this.state.email});
            return false
        }
        if (this.state.step == 2) {
            if (this.state.age == '') {
                toastMsg(strings("register.ageRequired"));
                return false
            }
            if (this.state.sex == '') {
                toastMsg(strings("register.sexRequired"));
                return false
            }
            this.setState({isLoading: true});
            const username =
                validateUsernameAction(this.state.username);
            return false
        }

        if (this.state.step === 3) {
            if (this.state.image == '') {
                toastMsg(strings("register.imageRequired"));
                return false
            } else {
                this._registerUser();
            }
        }
    }

    _showActivity() {
        return (
            <View>
                <ActionSheet
                    ref={o => this.ActionSheet = o}
                    title={strings("home.actionSheet")}
                    options={[
                        strings("home.camera"),
                        strings("home.biblio"),
                        strings("home.cancel"),
                    ]}
                    cancelButtonIndex={2}
                    onPress={(index) => {

                        switch (index) {
                            case 0:
                                this._takePhoto();
                                break;
                            case 1:
                                this._getPhoto();
                                break;
                            default:
                                break;
                        }
                    }}
                />
            </View>
        );
    }

    _getPhoto() {
        ImagePicker.openPicker({
            cropping: false,
            width: 500,
            height: 500,
            compressImageQuality: 0.5,
            includeExif: true,
        }).then(image => {
            console.log('received image', image.path);
            this.setState({
                image: image.path
            });
        }).catch(e => alert(e));
    }

    _takePhoto() {
        ImagePicker.openCamera({
            cropping: false,
            width: 500,
            height: 500,
            compressImageQuality: 0.5,
            includeExif: true,
        }).then(image => {
            console.log('received image', image.path);
            this.setState({
                image: image.path
            });

        }).catch(e => alert(e));
    }

    renderBy(body) {
        const {isLoading, step, emailError, full_nameError, passwordError, image} = this.state;
        if (Platform.OS == 'android') {
            return (
                <ScrollView
                    style={styles.scrollContainer}
                    keyboardShouldPersistTaps={'always'}
                >
                    <View style={styles.teclado}>
                        {step == 1 &&

                        <Text style={styles.textRegister2}>
                            {strings("main.register")}
                        </Text>

                        }
                        {/* <Image style={styles.container}
                         source={require('../../assets/img/logo-b.png')}

                  /> */}

                        <View style={styles.contentSocial}>
                            {step == 1 &&
                            <TouchableOpacity
                                style={styles.buttomFacebookStyle}
                                onPress={this._facebookLogin.bind(this)}
                            >
                                <Image
                                    style={styles.logoFacebook}
                                    source={require('../../assets/img/facebook-app-logo.png')}
                                />
                                <Text style={styles.buttonTextFacebook}>

                                    {strings("register.facebook")}
                                </Text>
                            </TouchableOpacity>
                            }
                            {step == 1 &&
                            <Text style={styles.textFacebook}> {strings("register.textFacebook")} </Text>
                            }
                        </View>
                        {step == 1 &&
                        <View style={styles.optBox}>
                            <View style={styles.lineOpt}/>
                            <Text style={styles.opt}> {strings("register.opt")} </Text>
                            <View style={styles.lineOpt}/>
                        </View>
                        }
                        {body}
                    </View>
                </ScrollView>
            );
        } else if (Platform.OS == 'ios') {
            return (
                <KeyboardAvoidingView style={styles.scrollContainer} behavior="padding">
                    <View style={styles.teclado}>
                        {/* <Image style={styles.container}
                                source={require('../../assets/img/logo-b.png')}
                        /> */}
                        {step == 1 &&
                        <Text style={styles.textRegister2}>
                            {strings("main.register")}
                        </Text>
                        }

                        <View style={styles.contentSocial}>
                            {step == 1 &&
                            <TouchableOpacity
                                style={styles.buttomFacebookStyle}
                                onPress={this._facebookLogin.bind(this)}
                            >
                                <Image
                                    style={styles.logoFacebook}
                                    source={require('../../assets/img/facebook-app-logo.png')}
                                />
                                <Text style={styles.buttonTextFacebook}>

                                    {strings("register.facebook")}</Text>
                            </TouchableOpacity>
                            }
                            {step == 1 &&
                            <Text style={styles.textFacebook}> {strings("register.textFacebook")} </Text>
                            }
                        </View>
                        {step == 1 &&
                        <View style={styles.optBox}>
                            <View style={styles.lineOpt}/>
                            <Text style={styles.opt}> {strings("register.opt")} </Text>
                            <View style={styles.lineOpt}/>
                        </View>
                        }
                        {body}
                    </View>
                </KeyboardAvoidingView>
            );
        }
    }

    onLocation = (position) => {
        console.log('Register:onLocation', position);
        if (!position || !position.coords)
            return;
        this.latitude = position.coords.latitude.toFixed(6);
        this.longitude = position.coords.longitude.toFixed(6);
    };

    render() {
        const GEOL_OCATION_PROVIDER = <GeoLocationProvider dialogMessage={strings('register.locationMessage')}
                                                           dialogTitle={strings('register.locationTitle')}
                                                           onLocation={this.onLocation}/>;
        const {isLoading, step, emailError, full_nameError, passwordError, image} = this.state;
        let body = <ActivityIndicator size="large" color="#9605CC"/>;
        if (!isLoading) {
            body = <View>
                {GEOL_OCATION_PROVIDER}
                {this._showActivity()}
                {step == 1 &&
                <View style={{marginTop: -5,}}>
                    <TextInput
                        style={styles.inputStyle}
                        editable={true}
                        underlineColorAndroid='transparent'
                        onChangeText={(full_name) => this.setState({full_name})}
                        placeholder={strings("register.fullName")}
                        returnKeyType={"next"}
                        maxLength={30}
                        value={this.state.full_name}
                        onSubmitEditing={() => {
                            this.emailInput.focus();
                        }}
                        blurOnSubmit={false}
                    />
                    <TextInput
                        style={styles.inputStyle}
                        editable={true}
                        underlineColorAndroid='transparent'
                        onChangeText={(email) => this.setState({email})}
                        placeholder={strings("register.email")}
                        ref={(input) => {
                            this.emailInput = input;
                        }}
                        returnKeyType={"next"}
                        value={this.state.email}
                        onSubmitEditing={() => {
                            this.passwordInput.focus();
                        }}
                        blurOnSubmit={false}
                    />
                    <TextInput
                        style={styles.inputStyle}
                        editable={true}
                        underlineColorAndroid='transparent'
                        onChangeText={(password) => this.setState({password})}
                        placeholder={strings("register.password")}
                        ref={(input) => {
                            this.passwordInput = input;
                        }}
                        returnKeyType={"next"}
                        secureTextEntry={true}
                        value={this.state.password}
                        onSubmitEditing={() => {
                            this._nextStep()
                        }}
                        blurOnSubmit={false}
                    />

                </View>
                }
                {step == 2 &&
                <View>

                    <Text style={styles.textRegister2}>
                        {strings("main.registerContinue")}
                    </Text>


                    <Text style={styles.textIam}>
                        {strings("main.iAm")}
                    </Text>
                    <TouchableOpacity
                        onPress={this._maleSelect.bind(this)}
                        style={this.state.sex === 'Hombre' ? styles.buttomRegisterSexOn : styles.buttomRegisterSexOff}>
                        <Text
                            style={this.state.sex === 'Hombre' ? styles.buttonTextOn : styles.buttonTextOff}> {strings("register.male")} </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={this._femaleSelect.bind(this)}
                        style={this.state.sex === 'Mujer' ? styles.buttomRegisterSexOn : styles.buttomRegisterSexOff}>
                        <Text
                            style={this.state.sex === 'Mujer' ? styles.buttonTextOn : styles.buttonTextOff}> {strings("register.female")} </Text>
                    </TouchableOpacity>
                    <View style={styles.inputStyleFecha}>
                        <TouchableWithoutFeedback onPress={this._showDatePicker.bind(this)}>
                            <View style={styles.viewButtonStyleFecha}>
                                {this.state.age == '' &&
                                <Text style={styles.textButtonStyleFecha}>
                                    {strings("register.age")}
                                </Text>
                                }
                                {this.state.age !== '' &&
                                <Text>
                                    {this.state.age}
                                </Text>
                                }
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <Text style={styles.textIam}>
                        {strings("register.username")}
                    </Text>
                    <TextInput
                        style={loginStyles.inputStyle}
                        underlineColorAndroid='transparent'
                        editable={true}
                        onChangeText={(username) => this.setState({username})}
                        placeholder={strings('register.username')}
                        returnKeyType={"next"}
                        ref='username'
                        onSubmitEditing={() => {
                            this.passwordInput.focus();
                        }}
                        blurOnSubmit={false}
                        value={this.state.username}
                    />

                </View>
                }
                {step == 3 &&
                <View style={styles.contentSocial}>
                    <Text style={styles.textRegister2}>
                        {strings("register.photo")}
                    </Text>
                    <TouchableOpacity style={styles.buttomUploadStyle} onPress={() => this.ActionSheet.show()}>
                        {image == '' &&
                        <Image style={styles.buttomUpload}
                               source={require('../../assets/img/upload.png')}
                        />
                        }
                        {image !== '' &&
                        <Image style={styles.buttomToUpload}
                               source={{uri: image}}
                        />
                        }
                    </TouchableOpacity>
                </View>
                }

                <TouchableOpacity
                    style={styles.buttomRegisterStyle}
                    onPress={this._nextStep.bind(this)}>
                    <Text style={styles.buttonText}> {strings("register.paso1")} </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.buttomCancelStyle}
                    onPress={this._registerCancel.bind(this)}>
                    <Text style={styles.buttonTextCancel}> {strings("home.cancel")} </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.buttomCancelStyle}
                    onPress={this.userTerms.bind(this)}>
                    <Text style={styles.buttonTextTerms}> {strings("register.terms")} </Text>
                </TouchableOpacity>
            </View>

        }
        return (
            <View style={styles.scrollContainer}>
                {GEOL_OCATION_PROVIDER}
                {this.renderBy(body)}
            </View>
        );
    }
}

export default RegisterPage;
