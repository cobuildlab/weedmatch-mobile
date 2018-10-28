import {authHeader, catchErrorAndPropagate , URL} from '../../utils';
import {APP_STORE} from "../../Store";

export const userService = {
    superService,
    swiperAction
};

/**
 * Get the chats of the user
 * @param token The token of the current user's sesion
 * @returns {Promise<any>}
 */
function superService(token) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(token)
    };

    return fetch(URL + 'notify-iloved/', requestOptions);
}

/**
 * Do the action of me encanta (accept,deny)
 * @param id The id of the object "me encanta"
 * @param action The action to handle
 * @returns {Promise<any>}
 */
function swiperAction(action,id) {

    const data = {
        "id_iloved": id,
        "accept_notification":action
    }

    const requestOptions = {
        method: 'POST',
        headers: authHeader(APP_STORE.getToken()),
        body: JSON.stringify(data)
    };

    return fetch(URL + 'notify-iloved/', requestOptions);
}
