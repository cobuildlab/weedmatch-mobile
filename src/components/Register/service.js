import {authHeader, catchErrorAndPropagate , URL, LENGUAGE} from '../../utils';
import DeviceInfo from 'react-native-device-info';
import {APP_STORE} from "../../Store";

export const userService = {
    postRegister,
    validateEmail,
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