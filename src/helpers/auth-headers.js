import { AsyncStorage } from 'react-native';
export function authHeader(token) {
    return {'Authorization': 'Token ' + token};
}