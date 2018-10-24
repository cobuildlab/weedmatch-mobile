import {
    authHeader,
    catchErrorAndPropagate,
    URL,
    authHeaderForm,
} from '../../utils';
import DeviceInfo from 'react-native-device-info';
import { APP_STORE } from '../../Store';

import I18n from 'react-native-i18n';
/**
 * Detects the lenguange and keeps in constant
 */
const LENGUAGE = I18n.currentLocale().slice(0, 2);

export const userService = {
    publicProfile,
    saveProfile,
    changeImage,
    deleteImage,
    uploadImage,
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
        headers: authHeader(token),
    };

    return fetch(URL + 'profile/' + id + '/', requestOptions);
}

/**
 * Upload a new picture of the user
 * @param token The token of the current user's sesion
 * @param id The id of the user
 * @param image The path of the image to upload
 * @returns {Promise<any>}
 */
function uploadImage(token, id, image) {
    var re = /(?:\.([^.]+))?$/;
    var ext = re.exec(image)[1];

    const data = new FormData();

    data.append('image', {
        uri: image,
        type: 'image/' + ext,
        name: 'photo.' + ext,
    });

    const requestOptions = {
        method: 'POST',
        headers: authHeaderForm(token),
        body: data,
    };

    return fetch(URL + 'profile/' + id + '/upload-image/', requestOptions);
}

/**
 * Change a picture of the user
 * @param token The token of the current user's sesion
 * @param id The id of the user
 * @param image The path of the image to upload
 * @returns {Promise<any>}
 */
function changeImage(token, id, image, imageID) {
    var re = /(?:\.([^.]+))?$/;
    var ext = re.exec(image)[1];

    const data = new FormData();

    data.append('image', {
        uri: image,
        type: 'image/' + ext,
        name: 'photo.' + ext,
    });

    const requestOptions = {
        method: 'PUT',
        headers: authHeaderForm(token),
        body: data,
    };

    return fetch(
        URL + 'profile/' + id + '/upload-image/' + imageID + '/',
        requestOptions
    );
}

/**
 * Delete a picture of the user
 * @param token The token of the current user's sesion
 * @param id The id of the user
 * @param image The id of the image to delete
 * @returns {Promise<any>}
 */
function deleteImage(token, id, image) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader(token),
    };

    return fetch(
        URL + 'profile/' + id + '/delete-image/' + image + '/',
        requestOptions
    );
}

function saveProfile(token, id, state) {
    const value = {
        username: state.username,
        first_name: state.name,
        description: state.description,
        match_sex: state.user.match_sex,
        sex: state.user.sex,
        distance: state.sliderOneValue.toString(),
        notification: state.notification ? 'true' : 'false',
    };

    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept-Language': LENGUAGE,
            Authorization: 'Token ' + token,
        },
        body: JSON.stringify(value),
    };

    return fetch(URL + 'profile/' + id + '/', requestOptions);
}
