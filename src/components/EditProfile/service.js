import { authHeader, URL, authHeaderForm } from '../../utils';

import I18n from 'react-native-i18n';
/**
 * Detects the lenguange and keeps in constant
 */
const LENGUAGE = I18n.currentLocale().slice(0, 2);

export const userService = {
    changeImage,
    deleteImage,
    publicProfile,
    saveProfile,
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
        headers: authHeader(token),
        method: 'GET',
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
        name: 'photo.' + ext,
        type: 'image/' + ext,
        uri: image,
    });

    const requestOptions = {
        body: data,
        headers: authHeaderForm(token),
        method: 'POST',
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
        name: 'photo.' + ext,
        type: 'image/' + ext,
        uri: image,
    });

    const requestOptions = {
        body: data,
        headers: authHeaderForm(token),
        method: 'PUT',
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
        headers: authHeader(token),
        method: 'DELETE',
    };

    return fetch(
        URL + 'profile/' + id + '/delete-image/' + image + '/',
        requestOptions
    );
}

function saveProfile(token, id, state) {
    const value = {
        description: state.description,
        distance: state.sliderOneValue.toString(),
        first_name: state.name,
        match_sex: state.user.match_sex,
        notification: state.notification ? 'true' : 'false',
        sex: state.user.sex,
        username: state.username,
    };

    const requestOptions = {
        body: JSON.stringify(value),
        headers: {
            'Accept-Language': LENGUAGE,
            Authorization: 'Token ' + token,
            'Content-Type': 'application/json',
        },
        method: 'PUT',
    };

    return fetch(URL + 'profile/' + id + '/', requestOptions);
}
