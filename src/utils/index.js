/**
 * Check is the text is a valid input
 * @param {string} text The text to be tested
 */
import React, {Component} from 'react';
import {
    Platform,
} from 'react-native';
import {APP_STATE} from "../Store";
import DeviceInfo from 'react-native-device-info';
import Toast from 'react-native-toast-native';
/**
 * Detects the lenguange and keeps in constant
 */
const LENGUAGE = DeviceInfo.getDeviceLocale().slice(0,2);


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
        'Accept-Language': LENGUAGE
    }
}

/**
 * Propagate an Error in to the
 * @param {Error} err error to be propagated
 * @throws {Error} the error that receives
 */
function catchErrorAndPropagate(err) {
    APP_STATE.next({error: String(err)});
    throw err;
}


function toastMsg(msg){
    Toast.show(msg, Toast.SHORT, Toast.BOTTOM, style);
}

export {isValidText, authHeader, catchErrorAndPropagate, toastMsg}


const style={
    backgroundColor: "#333333",
    width: 300,
    height: Platform.OS === ("ios") ? 50 : 130,
    color: "#ffffff",
    paddingLeft: 50,
    paddingRight: 50,
    fontSize: 12,
    borderRadius: Platform.OS === ("ios") ? 25 : 55,
    fontWeight: "normal",
    yOffset: 60
};
