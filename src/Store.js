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
 * Synchronous save the token
 * @param id
 * @returns {Promise<void>}
 */
async function saveId(id) {
    try {
        await AsyncStorage.setItem("id", id);
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
            id: undefined,
            feed: undefined,
            page: undefined,
            like: undefined,
            publicProfile: undefined,
            email: undefined,
            publicImages: undefined,
            publicImages420: undefined,
            publicImages420Page: undefined,
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
        this.ID_EVENT = new Subject();
        this.ID_EVENT.subscribe(state => {
            if (!state)
                return;
            const id = state.id;
            if (isValidText(id)) {
                saveId(id);
                me.state.id = id;
            }
        });
        this.FEED_EVENT = new Subject();
        this.FEED_EVENT.subscribe(state => {
            if (!state)
                return;
            me.state.feed = state.feed;
        });
        this.FEEDPAGE_EVENT = new Subject();
        this.FEEDPAGE_EVENT.subscribe(state => {
            if (!state)
                return;
            me.state.page = state.page;
        });
        this.LIKE_EVENT = new Subject();
        this.LIKE_EVENT.subscribe(state => {
            if (!state)
                return;
            me.state.like = state.like;
        });
        this.PUBLICPROFILE_EVENT = new Subject();
        this.PUBLICPROFILE_EVENT.subscribe(state => {
            if (!state)
                return;
            me.state.publicProfile = state.publicProfile;
        });
        this.PUBLICIMAGES_EVENT = new Subject();
        this.PUBLICIMAGES_EVENT.subscribe(state => {
            if (!state)
                return;
            me.state.publicImages = state.publicImages;
        });
        this.PUBLICIMAGES420_EVENT = new Subject();
        this.PUBLICIMAGES420_EVENT.subscribe(state => {
            if (!state)
                return;
            me.state.publicImages420 = state.publicImages420;
        });
        this.PUBLICIMAGES420PAGE_EVENT = new Subject();
        this.PUBLICIMAGES420PAGE_EVENT.subscribe(state => {
            if (!state)
                return;
            me.state.publicImages420Page = state.publicImages420Page;
        });
        this.EMAIL_EVENT = new Subject();
        this.EMAIL_EVENT.subscribe(state => {
            if (!state)
                return;
            me.state.email = state.email;
        });
    }

    getToken() {
        return this.state.token;
    }
}

const store = new Store();

export {store as APP_STORE};
