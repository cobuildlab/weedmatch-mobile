import {Subject} from 'rxjs/Subject';
import {AsyncStorage} from 'react-native';
import {isValidText} from "./utils";

/**
 * Synchronous save the token
 * @param token
 * @returns {Promise<void>}
 */
async function saveToken(token) {
    try {
        await AsyncStorage.setItem("token", token);
    } catch (error) {
        console.error('AsyncStorage error: ' + error.message);
    }
}

/**
 * Pops the token from the Async Store
 * @param {Subject} state the state for pushing to token
 */
async function popToken(state) {
    try {
        const token = await AsyncStorage.getItem('token');
        if (isValidText(token)) {
            state.next({token})
        }
    } catch (error) {
        console.error('AsyncStorage error: ' + error.message);
    }
}

const LOGIN_STATE = new Subject();
const TOKEN_STATE = new Subject();
popToken(TOKEN_STATE);
TOKEN_STATE.subscribe(state => {
    console.log(state);
    const token = state.token;
    if (isValidText(token))
        saveToken(token);
});
const APP_STATE = new Subject();

export {LOGIN_STATE, APP_STATE, TOKEN_STATE};
