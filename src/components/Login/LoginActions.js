import {APP_STORE} from '../../Store';
import {strings} from '../../i18n';
import {isValidText} from '../../utils/index'
import {userService} from './service';
import {AsyncStorage} from 'react-native';
import logToServer from 'log-to-server'
function loginAction(username, password) {
    logToServer(`loginAction: ${username}, ${password}`);
    if (!isValidText(username) || !isValidText(password)) {
        APP_STORE.APP_EVENT.next({error: strings("login.required_fields_error")});
        return;
    }
    userService.login(username, password)
        .then(async (response) => {
            logToServer(`loginAction: ${username}, ${password}`, response);
            const json = await response.json();
            logToServer(`loginAction:JSON:`, json);
            if (response.ok) {
                APP_STORE.TOKEN_EVENT.next({"token": json.token});
                APP_STORE.USER_EVENT.next({"username": json.username});
                APP_STORE.ID_EVENT.next({"id": json.id.toString()});
                return;
            }
            APP_STORE.APP_EVENT.next({"error": json.detail});
        }).catch(err => {
        logToServer(`loginAction:CATCH:`, err);
        APP_STORE.APP_EVENT.next({"error": err.message});
    });
}

/**
 * Register the token in the server for Push Notifications
 * @param token
 */
function firebaseAction(token) {
    logToServer(`firebaseAction: ${token}`);

    userService.tokenFB(token)
        .then(async (response) => {
            logToServer(`firebaseAction: ${token}`, response);
            const json = await response.json();
            logToServer(`firebaseAction:JSON:`, json);
            if (response.ok) {
                APP_STORE.FIRE_EVENT.next({"tokenFB": json.id.toString()});
                saveFirebase(token);
                return;
            }
            APP_STORE.APP_EVENT.next({"error": json.detail});
        });
}

async function saveFirebase(token) {
    try {
        await AsyncStorage.setItem("firebase", token);
    } catch (error) {
        console.error('AsyncStorage error: ' + error.message);
    }
}

export {loginAction,firebaseAction};
