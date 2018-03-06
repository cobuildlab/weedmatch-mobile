//import { authHeader } from '../helpers';
import {Text, TextInput, TouchableOpacity, View, AsyncStorage, Alert, ScrollView} from 'react-native';


export const userService = {
    login,
    logout,
};

const URL = "https://ezonsellerbackend.herokuapp.com/";
//const URL = "https://weedmatch.herokuapp.com/";


function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(URL + 'login/', requestOptions).then(handleResponse);
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}


function handleResponse(response) {
    if (!response.ok) {
        return Promise.reject(response.json());
    }
    return response.json();
}


