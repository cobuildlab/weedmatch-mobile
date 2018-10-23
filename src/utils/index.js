/**
 * Check is the text is a valid input
 * @param {string} text The text to be tested
 */
import React, {Component} from 'react';
import {
    Platform,
    NetInfo,
    Alert,
    AsyncStorage
} from 'react-native';
import {strings} from '../i18n';
import {APP_STATE} from "../Store";
import I18n from 'react-native-i18n';
import Toast from 'react-native-toast-native';
import DeviceInfo from 'react-native-device-info';

/**
 * Detects the lenguange and keeps in constant
 */
const LENGUAGE = I18n.currentLocale().slice(0, 2);

/**
 * Dynamically detects user's language
 * @return {string}
 */
const getLocale = () => {
    const currentDeviceCountry = DeviceInfo.getDeviceCountry(); // "US"
    const currentLanguage = DeviceInfo.getDeviceLocale().slice(0, 2); // EN
    return `${currentLanguage}-${currentDeviceCountry}`
};

const URL = "https://api.weedmatch.cl/";
const WS_URL = "ws://api.weedmatch.cl:8888/ws";

// const URL = "http://192.168.0.16:8080/";

async function checkConectivity() {
    let response = await NetInfo.isConnected.fetch();
    return response
}

function parseError(val) {
    Object.keys(val).map((objectKey) => {
        var value = val[objectKey];
        if (typeof value == 'object') {
            value.forEach((msg) => {
                toastMsg(msg);
            });
        } else {
            toastMsg(value);
        }
    });
}

function internet() {
    return Alert.alert(strings("main.internet"));
}

function isValidText(text) {
    if (text == null) {
        return false;
    }
    if (typeof(text) === undefined) {
        return false;
    }
    if (text === "") {
        return false;
    }
    return true
}

/**
 * Headers for Authorization
 * LENGUAGE this cellphone
 * @param {string} token The token to be used
 */
function authHeader(token) {
    return {
        'Authorization': 'Token ' + token,
        'Accept-Language': LENGUAGE,
        'Content-Type': 'application/json',
    }
}

function authHeaderLogout() {
    return {
        'Accept-Language': LENGUAGE,
        'Content-Type': 'application/json',
    }
}

/**
 * Headers for Authorization
 * LENGUAGE this cellphone
 * @param {string} token The token to be used
 */
function authHeaderForm(token) {
    return {
        'Authorization': 'Token ' + token,
        'Accept-Language': LENGUAGE,
        'Content-Type': 'multipart/form-data'
    }
}

/**
 * Propagate an Error in to the
 * @param {Error} err error to be propagated
 * @throws {Error} the error that receives
 */
function catchErrorAndPropagate(err) {
    APP_STATE.next({error: err.toString()});
    throw err;
}

function toastMsg(msg) {
    Toast.show(msg, Toast.SHORT, Toast.BOTTOM, style);
}

/**
 * Generates the username from the Full Name
 * @param username
 */
const generateUsernameFromFullName = (username, addNumber = false) => {
    const newUsername = new String(username).replace(/ /g, "").toLocaleLowerCase();
    if (!addNumber)
        return newUsername;
    const randonNumber = Math.floor((Math.random() * 1000) + 1);
    return [newUsername, randonNumber].join("_");
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
    generateUsernameFromFullName
}


const style = {
    backgroundColor: "#333333",
    width: 300,
    height: Platform.OS === ("ios") ? 50 : 200,
    color: "#ffffff",
    paddingLeft: 50,
    paddingRight: 50,
    fontSize: 12,
    borderRadius: Platform.OS === ("ios") ? 25 : 50,
    fontWeight: "normal",
    yOffset: 60
};
