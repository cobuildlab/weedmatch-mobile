import { Subject } from 'rxjs/Subject';
import { AsyncStorage } from 'react-native';
import { isValidText } from './utils';

/**
 * Asynchronously save the token
 * @param {string} token
 * @returns {Promise<void>}
 */
async function saveToken(token) {
    try {
        await AsyncStorage.setItem('token', token);
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('AsyncStorage error: ' + error.message);
    }
}

/**
 * Asynchronously save the username
 * @param {string} user
 * @returns {Promise<void>}
 */
async function saveUser(user) {
    try {
        await AsyncStorage.setItem('username', user);
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('AsyncStorage error: ' + error.message);
    }
}

/**
 * Asynchronously save the User id
 * @param {string} id
 * @returns {Promise<void>}
 */
async function saveId(id) {
    try {
        await AsyncStorage.setItem('id', id);
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('AsyncStorage error: ' + error.message);
    }
}

/**
 * Asynchronously save the firebase ID
 * @param {string} id
 * @returns {Promise<void>}
 */
async function saveFB(id) {
    try {
        await AsyncStorage.setItem('idFB', id);
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('AsyncStorage error: ' + error.message);
    }
}

/**
 * Asynchronously save the notif Boolean
 * @param {boolean} noti
 * @returns {Promise<void>}
 */
async function saveNoti(noti) {
    try {
        await AsyncStorage.setItem('noti', JSON.stringify(noti));
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('AsyncStorage error: ' + error.message);
    }
}

/**
 * Pops the token from the Async Store
 * @param {{token: string}} state
 * @returns {Promise<void>}
 */
async function popToken(state) {
    try {
        const token = await AsyncStorage.getItem('token');
        if (isValidText(token) && token != null) {
            // eslint-disable-next-line no-console
            console.log('popToken:', token);
            state.token = token;
        }
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('AsyncStorage error: ' + error.message);
        return undefined;
    }
}

/**
 * @param {{username: string}} state
 * @returns {Promise<void>}
 */
async function popUser(state) {
    try {
        const user = await AsyncStorage.getItem('username');
        if (isValidText(user) && user != null) {
            // eslint-disable-next-line no-console
            console.log('popUser:', user);
            state.username = user;
        }
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('AsyncStorage error: ' + error.message);
        return undefined;
    }
}

/**
 * @param {{id: string}} state
 * @returns {Promise<void>}
 */
async function popId(state) {
    try {
        const id = await AsyncStorage.getItem('id');
        if (isValidText(id) && id != null) {
            // eslint-disable-next-line no-console
            console.log('popId:', id);
            state.id = id;
        }
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('AsyncStorage error: ' + error.message);
        return undefined;
    }
}

/**
 * @param {{tokenFB: string}} state
 * @returns {Promise<void>}
 */
async function popIdFB(state) {
    try {
        const id = await AsyncStorage.getItem('idFB');
        if (isValidText(id) && id != null) {
            // eslint-disable-next-line no-console
            console.log('popFB:', id);
            state.tokenFB = id;
        }
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('AsyncStorage error: ' + error.message);
        return undefined;
    }
}

/**
 * @param {{noti: boolean}} state
 * @returns {Promise<void>}
 */
async function popNoti(state) {
    try {
        await AsyncStorage.getItem('noti').then(value => {
            const valueToBeSaved = value === 'true';
            // eslint-disable-next-line no-console
            console.log('STORE:popNotification:', value);
            state.noti = valueToBeSaved;
        });
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('AsyncStorage error: ' + error.message);
        return undefined;
    }
}


class Store {
    constructor() {
        this.state = {
            bad: undefined,
            chatMsg: undefined,
            chatMsgPage: undefined,
            chatNotif: undefined,
            chats: undefined,
            email: undefined,
            error: undefined,
            face: undefined,
            feed: undefined,
            id: undefined,
            like: undefined,
            likeAction: undefined,
            likeNotif: undefined,
            noti: undefined,
            page: undefined,
            profile: undefined,
            profileImages420: undefined,
            profileImages420Page: undefined,
            publicImages420: undefined,
            publicImages420Page: undefined,
            publicProfile: undefined,
            saveProfile: undefined,
            success: undefined,
            super: undefined,
            swiper: undefined,
            swiperAction: undefined,
            swiperPage: undefined,
            token: undefined,
            tokenFB: undefined,
            upload: undefined,
            username: undefined,
        };
        popToken(this.state);
        popId(this.state);
        popIdFB(this.state);
        popUser(this.state);
        popNoti(this.state);
        // this.state.token = '7e6052eeb671064e7822f0fa6a5ff465f052aa61';
        // this.state.id = 115;
        // this.state.username = 'oscarlzcl';

        const me = this;
        this.ERROR_EVENT = new Subject();
        this.ERROR_EVENT.subscribe(state => {
            if (!state) return;
            if (isValidText(state)) {
                me.state.error = state;
            }
        });
        this.APP_EVENT = new Subject();
        this.APP_EVENT.subscribe(state => {
            if (!state) return;
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
            if (!state) return;
            if (isValidText(state.token)) {
                saveToken(state.token);
                me.state.token = state.token;
            }
        });
        this.NOTI_EVENT = new Subject();
        this.NOTI_EVENT.subscribe(state => {
            if (!state) return;
            if (state.noti !== undefined && state.noti !== null) {
                saveNoti(state.noti);
                me.state.noti = state.noti;
            }
        });
        this.USER_EVENT = new Subject();
        this.USER_EVENT.subscribe(state => {
            if (!state) return;
            if (isValidText(state.username)) {
                saveUser(state.username);
                me.state.username = state.username;
            }
        });
        this.ID_EVENT = new Subject();
        this.ID_EVENT.subscribe(state => {
            if (!state) return;
            if (isValidText(state.id)) {
                saveId(state.id);
                me.state.id = state.id;
            }
        });
        this.FIRE_EVENT = new Subject();
        this.FIRE_EVENT.subscribe(state => {
            if (!state) return;
            if (isValidText(state.tokenFB)) {
                saveFB(state.tokenFB);
                me.state.tokenFB = state.tokenFB;
            }
        });
        this.FEED_EVENT = new Subject();
        this.FEED_EVENT.subscribe(state => {
            if (!state) return;
            me.state.feed = state.feed;
        });
        this.FEEDPAGE_EVENT = new Subject();
        this.FEEDPAGE_EVENT.subscribe(state => {
            if (!state) return;
            me.state.page = state.page;
        });
        this.PROFILE_EVENT = new Subject();
        this.PROFILE_EVENT.subscribe(state => {
            if (!state) return;
            me.state.profile = state.profile;
        });
        this.PROFILEIMAGES_EVENT = new Subject();
        this.PROFILEIMAGES_EVENT.subscribe(state => {
            if (!state) return;
            me.state.profileImages420 = state.profileImages420;
        });
        this.PROFILEPAGE_EVENT = new Subject();
        this.PROFILEPAGE_EVENT.subscribe(state => {
            if (!state) return;
            me.state.profileImages420Page = state.profileImages420Page;
        });
        this.SWIPERPAGE_EVENT = new Subject();
        this.SWIPERPAGE_EVENT.subscribe(state => {
            if (!state) return;
            me.state.swiperPage = state.swiperPage;
        });
        this.LIKE_EVENT = new Subject();
        this.LIKE_EVENT.subscribe(state => {
            if (!state) return;
            me.state.row = state.row;
        });
        this.PUBLICPROFILE_EVENT = new Subject();
        this.PUBLICPROFILE_EVENT.subscribe(state => {
            if (!state) return;
            me.state.publicProfile = state.publicProfile;
        });
        this.PUBLICEDITPROFILE_EVENT = new Subject();
        this.PUBLICEDITPROFILE_EVENT.subscribe(state => {
            if (!state) return;
            me.state.publicProfile = state.publicProfile;
        });
        this.PUBLIC_SAVE_PROFILE_EVENT = new Subject();
        this.PUBLIC_SAVE_PROFILE_EVENT.subscribe(state => {
            if (!state) return;
            me.state.saveProfile = state.saveProfile;
        });
        this.PUBLICIMAGES420_EVENT = new Subject();
        this.PUBLICIMAGES420_EVENT.subscribe(state => {
            if (!state) return;
            me.state.publicImages420 = state.publicImages420;
        });
        this.PUBLICIMAGES420PAGE_EVENT = new Subject();
        this.PUBLICIMAGES420PAGE_EVENT.subscribe(state => {
            if (!state) return;
            me.state.publicImages420Page = state.publicImages420Page;
        });
        this.EMAIL_EVENT = new Subject();
        this.EMAIL_EVENT.subscribe(state => {
            if (!state) return;
            me.state.email = state.email;
        });
        this.USERNAME_EVENT = new Subject();
        this.USERNAME_EVENT.subscribe(state => {
            if (!state) return;
            me.state.username = state.username;
        });
        this.SWIPER_EVENT = new Subject();
        this.SWIPER_EVENT.subscribe(state => {
            if (!state) return;
            me.state.swiper = state.swiper;
        });
        this.SWIPERACTION_EVENT = new Subject();
        this.SWIPERACTION_EVENT.subscribe(state => {
            if (!state) return;
            me.state.swiperAction = state.swiperAction;
        });
        this.CHAT_EVENT = new Subject();
        this.CHAT_EVENT.subscribe(state => {
            if (!state) return;
            me.state.chats = state.chats;
        });
        this.CHATMSG_READ_EVENT = new Subject();
        this.CHATMSG_READ_EVENT.subscribe(state => {
            if (!state) return;
            console.log(state);
            /*const index = (me.state.chats || []).findIndex(chat => chat.id === state.id);
            me.state.chats = Object.assign(
                [...(me.state.chats || [])],
                { [index]: Object.assign({}, (me.state.chats || [])[index], { read: true }) }
            )*/
        });

        this.SUPER_EVENT = new Subject();
        this.SUPER_EVENT.subscribe(state => {
            if (!state) return;
            me.state.super = state.super;
        });
        this.LIKEACTION_EVENT = new Subject();
        this.LIKEACTION_EVENT.subscribe(state => {
            if (!state) return;
            me.state.likeAction = state.likeAction;
        });
        this.CHATMSG_EVENT = new Subject();
        this.CHATMSG_EVENT.subscribe(state => {
            if (!state) return;
            me.state.chatMsg = state.chatMsg;
        });
        this.CHATPAGE = new Subject();
        this.CHATPAGE.subscribe(state => {
            if (!state) return;
            me.state.chatMsgPage = state.chatMsgPage;
        });
        this.BAD_EVENT = new Subject();
        this.BAD_EVENT.subscribe(state => {
            if (!state) return;
            me.state.bad = state.bad;
        });
        this.FACE_EVENT = new Subject();
        this.FACE_EVENT.subscribe(state => {
            if (!state) return;
            me.state.face = state.face;
        });
        this.UPLOAD_EVENT = new Subject();
        this.UPLOAD_EVENT.subscribe(state => {
            if (!state) return;
            me.state.upload = state.upload;
        });
        this.CHATNOTIF_EVENT = new Subject();
        this.CHATNOTIF_EVENT.subscribe(state => {
            if (!state) return;
            me.state.chatNotif = state.chatNotif;
        });
        this.LIKENOTIF_EVENT = new Subject();
        this.LIKENOTIF_EVENT.subscribe(state => {
            if (!state) return;
            me.state.likeNotif = state.likeNotif;
        });
    }

    getToken() {
        return this.state.token;
    }

    /**
     * Get the Logged User ID
     * @return {undefined|*}
     */
    getId() {
        return this.state.id;
    }

    getIdFB() {
        return this.state.tokenFB;
    }

    getUser() {
        return this.state.username;
    }
}

const store = new Store();

export { store as APP_STORE };
