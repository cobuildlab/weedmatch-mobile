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
 * Synchronous save the username
 * @param username
 * @returns {Promise<void>}
 */
async function saveUser(user) {
    try {
        await AsyncStorage.setItem("username", user);
    } catch (error) {
        console.error('AsyncStorage error: ' + error.message);
    }
}

/**
 * Synchronous save the id
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
 * Synchronous save the firebase ID
 * @param idFB
 * @returns {Promise<void>}
 */
async function saveFB(id) {
    try {
        await AsyncStorage.setItem("idFB", id);
    } catch (error) {
        console.error('AsyncStorage error: ' + error.message);
    }
}

/**
 * Synchronous save the notif Boolean
 * @param notif
 * @returns {Promise<void>}
 */
async function saveNoti(noti) {
    try {
        await AsyncStorage.setItem("noti", JSON.stringify(noti));
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

async function popUser(state) {
    try {
        const user = await AsyncStorage.getItem('username');
        if (isValidText(user)) {
            console.log("popUser:", user);
             state.username = user;
        }
    } catch (error) {
        console.error('AsyncStorage error: ' + error.message);
        return undefined;
    }
}

async function popId(state) {
    try {
        const id = await AsyncStorage.getItem('id');
        if (isValidText(id)) {
            console.log("popId:", id);
             state.id = id;
        }
    } catch (error) {
        console.error('AsyncStorage error: ' + error.message);
        return undefined;
    }
}

async function popIdFB(state) {
    try {
        const id = await AsyncStorage.getItem('idFB');
        if (isValidText(id)) {
            console.log("popFB:", id);
             state.tokenFB = id;
        }
    } catch (error) {
        console.error('AsyncStorage error: ' + error.message);
        return undefined;
    }
}

async function popNoti(state) {
    try {
        await AsyncStorage.getItem('noti').then((value) => {
            console.log("popNotification:", value);
            state.noti = value;
        });
        
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
            username: undefined,
            id: undefined,
            feed: undefined,
            page: undefined,
            like: undefined,
            publicProfile: undefined,
            saveProfile: undefined,
            email: undefined,
            publicImages420: undefined,
            publicImages420Page: undefined,
            swiper: undefined,
            swiperPage: undefined,
            profile: undefined,
            profileImages420: undefined,
            profileImages420Page: undefined,
            swiperAction: undefined,
            likeAction: undefined,
            tokenFB: undefined,
            chats: undefined,
            super: undefined,
            chatMsg: undefined,
            chatMsgPage: undefined,
            bad: undefined,
            face: undefined,
            noti: undefined,
        };
        popToken(this.state);
        popId(this.state);
        popIdFB(this.state);
        popUser(this.state);
        popNoti(this.state);
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
            if (isValidText(state.token)) {
                saveToken(state.token);
                me.state.token = state.token;
            }
        });
        this.NOTI_EVENT = new Subject();
        this.NOTI_EVENT.subscribe(state => {
            if (!state)
                return;
            if (state.noti) {
                saveNoti(state.noti);
                me.state.noti = state.noti;
            }
        });
        this.USER_EVENT = new Subject();
        this.USER_EVENT.subscribe(state => {
            if (!state)
                return;
            if (isValidText(state.username)) {
                saveUser(state.username);
                me.state.username = state.username;
            }
        });
        this.ID_EVENT = new Subject();
        this.ID_EVENT.subscribe(state => {
            if (!state)
                return;
            if (isValidText(state.id)) {
                saveId(state.id);
                me.state.id = state.id;
            }
        });
        this.FIRE_EVENT = new Subject();
        this.FIRE_EVENT.subscribe(state => {
            if (!state)
                return;
            if (isValidText(state.tokenFB)) {
                saveFB(state.tokenFB);
                me.state.tokenFB = state.tokenFB;
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
        this.PROFILE_EVENT = new Subject();
        this.PROFILE_EVENT.subscribe(state => {
            if (!state)
                return;
            me.state.profile = state.profile;
        });
        this.PROFILEIMAGES_EVENT = new Subject();
        this.PROFILEIMAGES_EVENT.subscribe(state => {
            if (!state)
                return;
            me.state.profileImages420 = state.profileImages420;
        });
        this.PROFILEPAGE_EVENT = new Subject();
        this.PROFILEPAGE_EVENT.subscribe(state => {
            if (!state)
                return;
            me.state.profileImages420Page = state.profileImages420Page;
        });
        this.SWIPERPAGE_EVENT = new Subject();
        this.SWIPERPAGE_EVENT.subscribe(state => {
            if (!state)
                return;
            me.state.swiperPage = state.swiperPage;
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
        this.PUBLICEDITPROFILE_EVENT = new Subject();
        this.PUBLICEDITPROFILE_EVENT.subscribe(state => {
            if (!state)
                return;
            me.state.publicProfile = state.publicProfile;
        });
        this.PUBLIC_SAVE_PROFILE_EVENT = new Subject();
        this.PUBLIC_SAVE_PROFILE_EVENT.subscribe(state => {
            if (!state)
                return;
            me.state.saveProfile = state.saveProfile;
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
        this.SWIPER_EVENT = new Subject();
        this.SWIPER_EVENT.subscribe(state => {
            if (!state)
                return;
            me.state.swiper = state.swiper;
        });
        this.SWIPERACTION_EVENT = new Subject();
        this.SWIPERACTION_EVENT.subscribe(state => {
            if (!state)
                return;
            me.state.swiperAction = state.swiperAction;
        });
        this.CHAT_EVENT = new Subject();
        this.CHAT_EVENT.subscribe(state => {
            if (!state)
                return;
            me.state.chats = state.chats;
        });
        this.SUPER_EVENT = new Subject();
        this.SUPER_EVENT.subscribe(state => {
            if (!state)
                return;
            me.state.super = state.super;
        });
        this.LIKEACTION_EVENT = new Subject();
        this.LIKEACTION_EVENT.subscribe(state => {
            if (!state)
                return;
            me.state.likeAction = state.likeAction;
        });
        this.CHATMSG_EVENT = new Subject();
        this.CHATMSG_EVENT.subscribe(state => {
            if (!state)
                return;
            me.state.chatMsg = state.chatMsg;
        });
        this.CHATPAGE = new Subject();
        this.CHATPAGE.subscribe(state => {
            if (!state)
                return;
            me.state.chatMsgPage = state.chatMsgPage;
        });
        this.BAD_EVENT = new Subject();
        this.BAD_EVENT.subscribe(state => {
            if (!state)
                return;
            me.state.bad = state.bad;
        });
        this.FACE_EVENT = new Subject();
        this.FACE_EVENT.subscribe(state => {
            if (!state)
                return;
            me.state.face = state.face;
        });
    }

    getToken() {
        return this.state.token;
    }

    getId() {
        return this.state.id;
    }

    getIdFB() {
        return this.state.tokenFB;
    }


    getUser() {
        return this.state.username;
    }

    getNoti() {
        return this.state.noti;
    }
}

const store = new Store();

export {store as APP_STORE};
