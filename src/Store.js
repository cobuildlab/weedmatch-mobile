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
 */
async function popToken(state) {
    try {
        const token = await AsyncStorage.getItem('token');
        if (isValidText(token)) {
            console.log("popToken:", token);
             state.token = token;
        }
    } catch (error) {
        console.error('AsyncStorage error: ' + error.message);
        return undefined;
    }
}

class Store {
    constructor() {
        this.state = {
            error: undefined,
            success: undefined,
            token: undefined,
        };
        popToken(this.state);
        const me = this;
        this.APP_EVENT = new Subject();
        this.APP_EVENT.subscribe(state => {
            if (!state)
                return;
            const error = state.error;
            if (isValidText(error)) {
                me.state.error = error;
            }
            const success = state.success;
            if (isValidText(success)) {
                me.state.success = success;
            }
        });
        this.TOKEN_EVENT = new Subject();
        this.TOKEN_EVENT.subscribe(state => {
            if (!state)
                return;
            const token = state.token;
            if (isValidText(token)) {
                saveToken(token);
                me.state.token = token;
            }
        });
    }

    getToken() {
        return this.state.token;
    }
}

const store = new Store();

export {store as APP_STORE};
