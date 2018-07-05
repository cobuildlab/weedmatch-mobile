import {authHeader, URL} from '../../utils';
import {APP_STORE} from "../../Store";

export const userService = {
    refreshToken,
};

/**
 * Upload the user token
 * @param token The token of firebase
 * @returns {Promise<any>}
 */
function refreshToken(token) {

    const requestOptions = {
        method: 'PUT',
        headers: authHeader(APP_STORE.getToken()),
        body: JSON.stringify({
            "new_registration_id": token,
        })
    };
    return fetch(URL + 'device/' + APP_STORE.getIdFB() + '/', requestOptions);
}