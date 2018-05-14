import {authHeader, catchErrorAndPropagate , URL} from '../../utils';
import DeviceInfo from 'react-native-device-info';
import {APP_STORE} from "../../Store";

import I18n from 'react-native-i18n';
/**
 * Detects the lenguange and keeps in constant
 */
const LENGUAGE = I18n.currentLocale().slice(0,2);

export const userService = {
    publicProfile,
    saveProfile,
};

/**
 * Get the user's profile data
 * @param token The token of the current user's sesion
 * @param id The id of the user
 * @returns {Promise<any>}
 */
function publicProfile(token, id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(token)
    };

    return fetch(URL + 'profile/' + id + '/', requestOptions);
}

function saveProfile(token, id, state) {

    const value = {
        "username": state.user.username,
        "first_name": state.user.first_name,
        "description": state.user.description,
        "match_sex": state.user.match_sex,
        "sex": state.user.sex,
        "distance": state.sliderOneValue.toString(),
        "notification":"true"
    }

    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept-Language': LENGUAGE,
            'Authorization': 'Token ' + token,
        },
        body: JSON.stringify(value)
    };

    return fetch(URL + 'profile/' + id + '/', requestOptions);
}