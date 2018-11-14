import {authHeader, URL, getLocale} from '../../utils';
import {APP_STORE} from '../../Store';

export const userService = {
    postRegister,
    validateEmail,
    facebookHandle,
    tokenFB,
    validateUsernameService,
};
import logToServer from 'log-to-server'
/**
 * Register the user
 * @param data The data of the user to register
 * @return {Promise<any>}
 */
function postRegister(data) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data',
            'Accept-Language': getLocale(),
        },
        body: data,
    };

    logToServer(requestOptions);

    return fetch(URL + 'register/', requestOptions);
}

/**
 * Validate de Email
 * @param data The data of the user to validate
 * @return {Promise<any>}
 */
function validateEmail(data) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept-Language': getLocale(),
        },
        body: JSON.stringify(data),
    };

    return fetch(URL + 'email-verification/', requestOptions);
}


/**
 * Validate the Username
 * @param username the username to validate
 * @return {Promise<any>}
 */
function validateUsernameService(username) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept-Language': getLocale(),
        },
        body: JSON.stringify({username: username}),
    };

    return fetch(URL + 'username-verification/', requestOptions);
}

/**
 * Login/Register facebook action
 * @param token The facebook access token
 * @param state The state of the current screen
 * @return {Promise<any>}
 */
function facebookHandle(token, state) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept-Language': getLocale(),
        },
        body: JSON.stringify({
            'access_token': token,
            'latitud': state.latitud,
            'longitud': state.longitud,
        }),
    };
    return fetch(URL + 'login-facebook/', requestOptions);
}

/**
 * Upload the user token
 * @param token The token of firebase
 * @return {Promise<any>}
 */
function tokenFB(token) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(APP_STORE.getToken()),
        body: JSON.stringify({
            'registration_id': token,
        }),
    };
    return fetch(URL + 'device/', requestOptions);
}
