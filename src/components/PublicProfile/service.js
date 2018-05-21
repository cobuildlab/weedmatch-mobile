import {authHeader, catchErrorAndPropagate , URL} from '../../utils';
import DeviceInfo from 'react-native-device-info';
import {APP_STORE} from "../../Store";

export const userService = {
    publicProfile,
    publicImages420,
    swiperAction
};

/**
 * Get the user's profile data
 * @param token The token of the current user's sesion
 * @param id The id of the user
 * @returns {Promise<any>}
 */
function publicProfile(token, id, state) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(token)
    };

    return fetch(URL + 'public-profile/' + id + '/?latitud=' + state.latitud + '&longitud=' + state.longitud, requestOptions);
}

/**
 * Get the user's profile data
 * @param token The token of the current user's sesion
 * @param pageUrl The Url of the page to fetch
 * @returns {Promise<any>}
 */
function publicImages420(token,pageUrl) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(token)
    };
    return fetch(pageUrl, requestOptions);
}

/**
 * Do the action of swiper (like,dislike,super)
 * @param token The Token of the user
 * @param action The Token of the user
 * @param state The current state of render screen
 * @returns {Promise<any>}
 */
function swiperAction(token,action,id) {

    const data = {
        "user_match": id.toString(),
        "action": action,
    }

    const requestOptions = {
        method: 'POST',
        headers: authHeader(token),
        body: JSON.stringify(data)
    };

    return fetch(URL + 'swiper/', requestOptions);
}