import { authHeader } from '../helpers';
export const userService = {
    login,
    logout,
    getCountry,
    postRegister,
    feed,
};

const URL = "https://weedmatch.herokuapp.com/";
//const URL = "https://weedmatch.herokuapp.com/";


function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(URL + 'login/', requestOptions).then(handleResponse);
}

function feed() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
        // body: JSON.stringify({ lati, long })
    };

    return fetch(URL + 'public-feed/', requestOptions).then(handleResponse);
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}


function getCountry(username, password) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(URL + 'countrys/', requestOptions).then(handleResponse);
}

function postRegister(data) {
    console.log(data)
    const requestOptions = {
        method: 'POST',
        body: data
    };

    return fetch(URL + 'register/', requestOptions).then(handleResponse);
}


function handleResponse(response) {
    if (!response.ok) {
        return Promise.reject(response.json());
    }
    return response.json();
}


