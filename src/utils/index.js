import { Platform, Alert } from 'react-native';
import { strings } from '../i18n';
import { APP_STATE } from '../Store'; // This module has no exported APP_STATE
import I18n from 'react-native-i18n';
import Toast from 'react-native-toast-native';
import { checkInternetConnection } from 'react-native-offline';

/**
 * Detects the lenguange and keeps in constant
 */
const LENGUAGE = I18n.currentLocale().slice(0, 2);

/**
 * Dynamically detects user's language
 * @return {string}
 */
const getLocale = () => {
    return I18n.currentLocale();
};

const URL = 'https://api.weedmatch.cl/';
const WS_URL = 'ws://api.weedmatch.cl:8888/ws';

// const URL = "http://192.168.0.16:8080/";

/**
 * Return true if there is an available internet connection
 * @return {Promise<boolean>}
 */
async function checkConectivity() {
    const isConnected = await checkInternetConnection();
    return isConnected;
}

/**
 * @param {Object} val
 */
function parseError(val) {
    Object.keys(val).map(objectKey => {
        var value = val[objectKey];
        if (typeof value == 'object') {
            value.forEach(msg => {
                toastMsg(msg);
            });
        } else {
            toastMsg(value);
        }
    });
}

function internet() {
    return Alert.alert(strings('main.internet'));
}

/**
 * Returns true if, and only if, the value provided is an non-empty string.
 * @param {any} text
 * @returns {boolean}
 */
function isValidText(text) {
    if (text == null) {
        return false;
    }
    if (typeof text === 'undefined') {
        return false;
    }
    if (typeof text !== 'string') {
        return false;
    }
    if (text === '') {
        return false;
    }
    return true;
}

/**
 * Returns true if an string is of length one and is in the range of a-z || A-Z
 * @param char The char to be tested
 */
export const charIsLetter = (char: string): boolean => {
    if (char.length !== 1) {
        throw new TypeError(
            'charIsLetter() called with string instead of char'
        )
    }
    const charCode = char.charCodeAt(0)

    return (charCode >= 65 && charCode <= 90)
        || (charCode >= 97 && charCode <= 122)
}

/**
 * Returns true if an string is of length one and is a number
 * @param char The char to be tested
 * @throws {TypeError} If the string provided isn't exactly of length 1
 */
export const charIsNumber = (char: string): boolean => {
    if (char.length !== 1) {
        throw new TypeError(
            'charIsNumber() called with string instead of char'
        )
    }

    const charCode = char.charCodeAt(0)

    return charCode >= 48 && charCode <= 57
}

/**
 * Headers for Authorization
 * LENGUAGE this cellphone
 * @param {string} token The token to be used
 */
function authHeader(token) {
    return {
        'Accept-Language': LENGUAGE,
        Authorization: 'Token ' + token,
        'Content-Type': 'application/json',
    };
}

function authHeaderLogout() {
    return {
        'Accept-Language': LENGUAGE,
        'Content-Type': 'application/json',
    };
}

/**
 * Headers for Authorization
 * LENGUAGE this cellphone
 * @param {string} token The token to be used
 */
function authHeaderForm(token) {
    return {
        'Accept-Language': LENGUAGE,
        Authorization: 'Token ' + token,
        'Content-Type': 'multipart/form-data',
    };
}

/**
 * Propagate an Error in to the
 * @param {Error} err error to be propagated
 * @throws {Error} the error that receives
 */
function catchErrorAndPropagate(err) {
    APP_STATE.next({ error: err.toString() });
    throw err;
}

function toastMsg(msg) {
    Toast.show(msg, Toast.SHORT, Toast.BOTTOM, style);
}

/**
 * Generates the username from the Full Name
 * @param {any} username
 */
const generateUsernameFromFullName = (username, addNumber = false) => {
    const newUsername = new String(username)
        .replace(/ /g, '')
        .toLocaleLowerCase();
    if (!addNumber) return newUsername;
    const randonNumber = Math.floor(Math.random() * 1000 + 1);
    return [newUsername, randonNumber].join('_');
};

export {
    isValidText,
    authHeader,
    catchErrorAndPropagate,
    toastMsg,
    internet,
    authHeaderForm,
    authHeaderLogout,
    URL,
    WS_URL,
    LENGUAGE,
    checkConectivity,
    parseError,
    getLocale,
    generateUsernameFromFullName,
};

const style = {
    backgroundColor: '#333333',
    borderRadius: Platform.OS === 'ios' ? 25 : 50,
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'normal',
    height: Platform.OS === 'ios' ? 50 : 200,
    paddingLeft: 50,
    paddingRight: 50,
    width: 300,
    yOffset: 60,
};
