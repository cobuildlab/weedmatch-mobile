import {authHeader, catchErrorAndPropagate , URL, LENGUAGE} from '../../utils';
import DeviceInfo from 'react-native-device-info';
import {APP_STORE} from "../../Store";

export const userService = {
    postRegister,
    validateEmail,
    facebookHandle
};

/**
 * Register the user
 * @param data The data of the user to register
 * @returns {Promise<any>}
 */
function postRegister(data) {
    const requestOptions = {
        method: 'POST',
        headers: {
        'Accept-Language': LENGUAGE
        },
        body: data
    };

    console.log(requestOptions)

    return fetch(URL + 'register/', requestOptions)
}

/**
 * Validate de Email
 * @param data The data of the user to validate
 * @returns {Promise<any>}
 */
function validateEmail(data) {
    const requestOptions = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'Accept-Language': LENGUAGE
        },
        body: JSON.stringify(data)
    };

    return fetch(URL + 'email-verification/', requestOptions)
}

/**
 * Login/Register facebook action
 * @param token The facebook access token
 * @returns {Promise<any>}
 */
function facebookHandle(token) {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept-Language': LENGUAGE
      },
      body: JSON.stringify({"access_token": token})
    }
    return fetch(URL + 'login-facebook/', requestOptions);
}