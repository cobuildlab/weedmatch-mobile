import {authHeader, catchErrorAndPropagate , URL,LENGUAGE} from '../../utils';
import {APP_STORE} from "../../Store";

export const userService = {
    login,
    tokenFB
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

/**
 * Upload the user token
 * @param token The token of firebase
 * @returns {Promise<any>}
 */
function tokenFB(token) {

    const requestOptions = {
        method: 'POST',
        headers: authHeader(APP_STORE.getToken()),
        body: JSON.stringify({
            "registration_id": token,
        })
    };
    return fetch(URL + 'device/', requestOptions);
}
