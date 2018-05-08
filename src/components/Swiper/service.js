import {authHeader, catchErrorAndPropagate , URL, LENGUAGE} from '../../utils';
import DeviceInfo from 'react-native-device-info';
import {APP_STORE} from "../../Store";

export const userService = {
    swiper,
};

/**
 * Get the data of the user to show in the swiper
 * @param token The Toekn of the user
 * @param pagUrl The url of the object the get
 * @returns {Promise<any>}
 */
function swiper(token,pagUrl) {

    const requestOptions = {
        method: 'GET',
        headers: authHeader(token),
    };

    return fetch(pagUrl, requestOptions);
}