import {getLocale, URL} from '../../utils';

export const userService = {
    forgotPassword,
    recoveryPassword,
};

/**
 * Forget user's password action
 * @param email The email
 * @return {Promise<any>}
 */
function forgotPassword(email) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept-Language': getLocale(),
        },
        body: JSON.stringify({'email': email}),
    };
    return fetch(URL + 'forgot-password/', requestOptions);
}

/**
 * Recover user's password
 * @param code The code send to email
 * @param password The new password
 * @return {Promise<any>}
 */
function recoveryPassword(code, password) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept-Language': getLocale(),
        },
        body: JSON.stringify({'code': code, 'password': password}),
    };
    return fetch(URL + 'recover-password/', requestOptions);
}
