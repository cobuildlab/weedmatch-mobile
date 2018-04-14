import {authHeader, catchErrorAndPropagate , URL,LENGUAGE} from '../../utils';
import DeviceInfo from 'react-native-device-info';
import {APP_STORE} from "../../Store";

export const userService = {
    login,
};

/**
 * Log in the user
 * @param username The username
 * @param password the Password
 * @returns {Promise<any>}
 */
function login(username, password) {
    console.log(`USERSERVICE:login: ${username}, ${password}`);
    const requestOptions = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'Accept-Language': LENGUAGE
        },
        body: JSON.stringify({username, password})
    };
    return fetch(URL + 'login/', requestOptions);
}