/**
 * Check is the text is a valid input
 * @param {string} text The text to be tested
 */
import {APP_STATE} from "../Store";
import DeviceInfo from 'react-native-device-info';

/**
 * Detects the lenguange and keeps in constant
 */
const LENGUAGE = 'en'//DeviceInfo.getDeviceLocale().slice(0,2);


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
        };
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

export {isValidText, authHeader, catchErrorAndPropagate}
