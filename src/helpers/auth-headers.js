import { AsyncStorage } from 'react-native';
import React from 'react';

export function authHeader() {
    // return authorization header with jwt token
    let id_token = AsyncStorage.getItem('id_token');


    return { 'Authorization': 'Token  f9d231421eafd150875fd875d2d87eb3bb397ae3' };


    // if (id_token && id_token.token) {
    //     return { 'Authorization': 'token f9d231421eafd150875fd875d2d87eb3bb397ae3' };
    // } else {
    //     return {};
    // }
}