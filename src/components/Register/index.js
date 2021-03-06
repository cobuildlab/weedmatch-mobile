import React, {Component} from 'react';
import {
    ActivityIndicator,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import {strings} from "../../i18n";
import {isValidText} from '../../utils';
import {
    firebaseAction,
    registerAction,
    validateEmailAction,
    validateUsernameAction
} from "./RegisterActions";
import {facebookAction} from "../Authentication/AuthenticationActions";

import {APP_STORE} from "../../Store";
import styles, { dateTextStyle } from './style';
import loginStyles from '../Login/style';
import {generateUsernameFromFullName, toastMsg,
        charIsLetter,
        charIsNumber,
        charIsAcuteVowel} from "../../utils";
import Picker from 'react-native-picker';
import validate from './validate_wrapper';
import ImagePicker from 'react-native-image-crop-picker';
import ActionSheet from 'react-native-actionsheet';
import firebase from 'react-native-firebase';
import { DatePicker } from 'native-base'
import moment from 'moment'
import authStore, { events as authEvents } from '../../modules/auth/AuthStore'

import TermsModal from './TermsModal'

class RegisterPage extends Component {
    /**
     * Today - 18 years
     */
    static MAX_DATE: Date = (() => {
        const rightNow = new Date();
        const day = rightNow.getDate();
        const monthIndex = rightNow.getMonth();
        const year = rightNow.getFullYear();

        const eighteenYearsAgo = new Date(year - 18, monthIndex, day);

        return eighteenYearsAgo;
    })();

    static MIN_DATE: Date = (() => {
        const rightNow = new Date();
        const day = rightNow.getDate();
        const monthIndex = rightNow.getMonth();
        const year = rightNow.getFullYear();

        const aHundredYearsAgo = new Date(year - 100, monthIndex, day)

        return aHundredYearsAgo;
    })();

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
            /**
             * This age string is not the one being displayed anymore (after
             * changing to native-base's DatePicker), however it's the one we
             * send to registerAction()
             */
            age: '',
            sex: 'Hombre',
            image: '',
            isLoading: authStore.getState(authEvents.FB_LOGGING_IN),
            year: '',
            step: 1,
            emailError: '',
            full_nameError: '',
            passwordError: '',
            ageError: '',
            sexError: '',
            termsModalVisible: false,
        };
        this.libraryPermissionsHasBeenAsked = false;
        this.cameraPermissionsHasBeenAsked = false;
        this.termsModalAccepted = false
    }

    static navigationOptions = {header: null};

    componentDidMount() {
        console.log("RegisterPage:componentDidMount");
        this.event = APP_STORE.APP_EVENT.subscribe(state => {
            console.log("RegisterPage:componentDidMount:APP_STORE.APP_EVENT", state);
            if (state.error) {
                this.setState({isLoading: false});
                if (state.error.detail) {
                    Object.keys(state.error.detail).map(function (objectKey) {
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

        this.idSubscription = APP_STORE.ID_EVENT.subscribe(state => {
            // eslint-disable-next-line no-console
            console.log(
                'RegisterPage:componentDidMount:idSubscription',
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

        this.usernameSubscription = APP_STORE.USERNAME_EVENT.subscribe(state => {
            this.setState({isLoading: true});
            if (state.error) {
                this.setState({isLoading: false});
                toastMsg(state.error);
                this.onChangeUsername(generateUsernameFromFullName(this.state.full_name, true))
                return;
            }
            if (state.success) {
                this.setState({isLoading: false});
                this.setState({
                    step: 3
                });
            }
        });

        this.authStoreSubscription = authStore.subscribe(
            authEvents.FB_LOGGING_IN,
            (loadingFBLogin: boolean) =>
        {
            this.setState({
                isLoading: loadingFBLogin,
            })
        });
    }

    userTerms() {
        this.props.navigation.navigate('Terms');
    }

    _facebookLogin = () => {
        facebookAction(this.state)
    }

    componentWillUnmount() {
        console.log("RegisterPage:componentWillUmmount");
        Picker.hide();
        this.event.unsubscribe();
        this.idSubscription.unsubscribe();
        this.email.unsubscribe();
        this.usernameSubscription.unsubscribe();
        this.firebaseSubscription.unsubscribe();
        this.authStoreSubscription.unsubscribe();
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
            toastMsg(strings('register.errorFullName'))
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
            if (!this.termsModalAccepted) {
                this.setState({
                    termsModalVisible: true,
                })
                return false
            }
            this.setState({
                isLoading: true,
            })

            this.onChangeUsername(generateUsernameFromFullName(this.state.full_name))

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

            if (this.state.username.length < 6) {
                toastMsg('El nombre de usuario debe tener al menos 6 caracteres')
                return false
            }

            this.setState({isLoading: true});

            // throws if invalid
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

    getPhotoFromPicker = () => {
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
        }).catch(e => console.log(e));
    };

    _getPhoto() {
        this.getPhotoFromPicker();
    }

    takePhotoFromPicker = () => {
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

        }).catch(e => { console.warn(e) });
    }

    _takePhoto() {
        this.takePhotoFromPicker();
    }

    renderBy(body) {
        const {step} = this.state;
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
                                onPress={this._facebookLogin}
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

    onAcceptTerms = () => {
        this.termsModalAccepted = true

        this.setState({
            termsModalVisible: false,
        })

        this._nextStep()
    }

    onRejectTerms = () => {
        this.setState({
            termsModalVisible: false,
        })
    }

    onBlurFullName = () => {
        this.setState(({full_name}: { full_name: string }) => ({
            full_name: full_name.trim()
        }))
    }

    /**
     * We turn any combinations of words from:
     * 'hELLo    wOrld'
     * to:
     * 'Hello World"
     * No leading or trailling whitespace is trimmed, this is done on
     * `onBlurFullName`
     * However, no two consecutive spaces are allowed
     * @param text
     */
    onChangeFullName = (text: string) => {
        const filtered = text
            .split('')
            .filter(char =>
                    charIsLetter(char) ||
                    char === ' ' ||
                    charIsAcuteVowel(char)
            )
            .join('')

        const withoutConsecutiveWhiteSpaces = filtered.replace(/\s+/g, ' ')

        const asLowercaseWords = withoutConsecutiveWhiteSpaces
            .split(' ') // to words
            .map(eachWord => eachWord.toLowerCase())
            // ['hello', 'world'] => [["h", "e", "l", "l", "o"], ["w", "o", "r", "l", "d"]]
            .map(eachWord => eachWord.split(''))
            .map(eachWordChars => eachWordChars
                    .map((char, i) => i == 0
                        ? char.toUpperCase()
                        : char)
                    .join('')
                )
            .join(' ')


        this.setState({
            full_name: asLowercaseWords,
        })
    }

    /**
     * Allow only usernames with letters, numbers, `-`, `.` and `_`.
     * Allow only from length 6 to 30
     * @param text The text from the username input
     */
    onChangeUsername = (text: string) => {
        const chars = text.split('')

        const filtered = chars
            .filter(char =>
                    charIsLetter(char) ||
                    charIsNumber(char) ||
                    char == '-' ||
                    char == '_' ||
                    char == '.'
            )
            .join('')

        this.setState({
            username: filtered,
        })
    }

    onDateChange = (date: Date) => {
        // the format expected by registerAction() and the API itself
        const formatted = moment(date).format('YYYY-MM-DD')

        this.setState({
            age: formatted,
        })
    }

    render() {
        const {isLoading, step, image} = this.state;
        let body = <ActivityIndicator size="large" color="#9605CC"/>;
        if (!isLoading) {
            body = <View>
                {this._showActivity()}
                {step == 1 &&
                <View style={{marginTop: -5,}}>
                    <TermsModal
                        isVisible={this.state.termsModalVisible}
                        onAccept={this.onAcceptTerms}
                        onCloseOrReject={this.onRejectTerms}
                    />
                    <TextInput
                        style={styles.inputStyle}
                        editable={true}
                        underlineColorAndroid='transparent'
                        onBlur={this.onBlurFullName}
                        onChangeText={this.onChangeFullName}
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
                        <TouchableWithoutFeedback>
                            <View style={styles.viewButtonStyleFecha}>
                                <DatePicker
                                    // use spinner, calendar mode has a bug
                                    // where you can select a date greater than
                                    // the max allowed one
                                    androidMode="spinner"
                                    animationType="slide"
                                    defaultDate={new Date(2018, 4, 4)}
                                    formatChosenDate={undefined}
                                    timeZoneOffsetInMinutes={undefined}
                                    onDateChange={this.onDateChange}
                                    placeHolderText={strings("register.age")}
                                    locale="es"
                                    textStyle={dateTextStyle}
                                    placeHolderTextStyle={dateTextStyle}
                                    maximumDate={RegisterPage.MAX_DATE}
                                    minimumDate={RegisterPage.MIN_DATE}
                                />
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
                        onChangeText={this.onChangeUsername}
                        placeholder={strings('register.username')}
                        returnKeyType={"next"}
                        // ref='username'
                        onSubmitEditing={() => {
                            this._nextStep();
                        }}
                        blurOnSubmit={false}
                        value={this.state.username}
                        maxLength={30}
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
                {this.renderBy(body)}
            </View>
        );
    }
}

export default RegisterPage;
