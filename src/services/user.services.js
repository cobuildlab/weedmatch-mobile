//import { authHeader } from '../helpers';
import { Actions } from 'react-native-router-flux';
import {Text, TextInput, TouchableOpacity, View, AsyncStorage, Alert, ScrollView} from 'react-native';


export const userService = {
    login,
    logout,
};

const URL = "https://ezonsellerbackend.herokuapp.com/";
//const URL = "http://127.0.0.1:8000/";


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


