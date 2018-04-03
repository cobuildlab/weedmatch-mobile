import {authHeader, catchErrorAndPropagate} from '../utils';
import {APP_STORE} from "../Store";

export const userService = {
    login,
    logout,
    getCountry,
    postRegister,
    feed,
    publicProfile,
    publicImage
};

// const URL = "http://192.168.0.21:8080/";
const URL = "https://weedmatch.herokuapp.com/";

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
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username, password})
    };
    return fetch(URL + 'login/', requestOptions);
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    APP_STORE.TOKEN_EVENT.next({})
}

function getCountry(username, password) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(URL + 'countrys/', requestOptions);
}

function postRegister(data) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    };

    return fetch(URL + 'register/', requestOptions)
}

function feed(token, state) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(token),
        // body: JSON.stringify({ lati, long })
    };

    return fetch(URL + 'public-feed/?latitud=' + state.latitud + '&logitud=' + state.logitud, requestOptions);
}

function publicImage(token, state) {

    var re = /(?:\.([^.]+))?$/;
    var ext = re.exec(state.image)[1];

    const data = new FormData();

    data.append('image', {
        uri: state.image,
        type: 'image/' + ext,
        name: 'photo.' + ext
    });

    data.append('latitud', state.latitud);
    data.append('longitud', state.longitud);
    data.append('comment', state.comment);
    
    const requestOptions = {
        method: 'POST',
        headers: authHeader(token),
        body: data
    };

    return fetch(URL + 'public-image/', requestOptions);
}

function publicImageLike(token, id) {
    const requestOptions = {
        method: 'PUT',
        headers: authHeader(token)
    };

    return fetch(URL + 'public-image/id/like/id_user/', requestOptions).then(handleResponse);
}

function publicProfile(token, id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(token)
    };

    return fetch(URL + 'public-profile/' + id + '/', requestOptions).then(handleResponse);
}

function handleResponse(response) {
    if (!response.ok) {
        return Promise.reject(response.json());
    }
    return response.json();
}