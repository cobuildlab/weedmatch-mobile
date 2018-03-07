import { AsyncStorage } from 'react-native';
export function authHeader() {
    // return authorization header with jwt token
    let id_token = AsyncStorage.getItem('id_token');;
    if (id_token && id_token.Token) {
        return { 'Authorization': 'Token ' + id_token };
    } else {
        return {};
    }
}