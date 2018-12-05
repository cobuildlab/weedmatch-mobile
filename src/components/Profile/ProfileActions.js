import {APP_STORE} from '../../Store';
import {strings} from '../../i18n';
import {isValidText} from '../../utils/index'
import {userService} from './service';
import {AsyncStorage} from 'react-native';
import {authHeader, catchErrorAndPropagate, URL, LENGUAGE} from '../../utils';
import {AccessToken, LoginManager} from 'react-native-fbsdk';
import firebase from 'react-native-firebase';
import authStore from './../../modules/auth/AuthStore';

function publicProfileAction(token, id) {
    console.log(`publicProfileAction: ${token}, ${id}`);

    userService.publicProfile(token, id)
        .then(async (response) => {
            console.log(`ProfileAction: ${token}, ${id}`, response);
            const json = await response.json();
            console.log(`ProfileAction:JSON:`, json);
            if (response.ok) {
                APP_STORE.PROFILE_EVENT.next({"profile": json});
                return;
            }
            APP_STORE.APP_EVENT.next({"error": json.detail});
        });
}

function privateProfileAction(token, id) {
    console.log(`privateProfileAction: ${token}, ${id}`);

    userService.privateProfile(token, id)
        .then(async (response) => {
            console.log(`privateProfileAction: ${token}, ${id}`, response);
            const json = await response.json();
            console.log(`privateProfileAction:JSON:`, json);
            if (response.ok) {
                APP_STORE.PROFILE_EVENT.next({"profile": json});
                return;
            } else if (response.status === 401) {
                logOut()
            }
            APP_STORE.APP_EVENT.next({"error": json.detail});
        });
}

function publicImages420Action(token, id, pageUrl) {
    console.log(`publicImages420Action: ${token}, ${id}, ${pageUrl}`);

    userService.publicImages420(token, id, pageUrl)
        .then(async (response) => {
            console.log(`publicImages420Action: ${token}, ${id}, ${pageUrl}`, response);
            const json = await response.json();
            console.log(`publicImages420Action:JSON:`, json);
            if (response.ok) {
                APP_STORE.PROFILEIMAGES_EVENT.next({"profileImages420": json.results});
                APP_STORE.PROFILEPAGE_EVENT.next({"profileImages420Page": json.next});
                return;
            }
            APP_STORE.APP_EVENT.next({"error": json.detail});
        });
}

function Action420(token, state, userId) {

    console.log(`Action420: ${token}, ${state}, ${userId}`);

    var pagUrl = '';

    if (state.urlPage != '' && state.numPage > 0) {
        pagUrl = state.urlPage;
        publicImages420Action(token, pagUrl);

    } else if (state.numPage == 0) {
        pagUrl = URL + 'public-image/' + userId + '/';
        publicImages420Action(token, pagUrl);
    }
}

function appendData(oldData, newData) {
    oldData.slice();

    newData.map((data) => {
        oldData.push(data);
    });

    return oldData;
}

/**
 * Logout the session
 */
const logOut = async () => {
    console.log(`ProfileActions:logOut`);
    try {
        const data = await AccessToken.getCurrentAccessToken();
        console.log(`ProfileActions:logOut:deleteFacebookToken:`, data);
        if (data)
            LoginManager.logOut();
    } catch (err) {
        console.log(`ProfileActions:logOut:AccessToken`, JSON.stringify(err))
    }
    ;

    console.log(`ProfileActions:logOut:deletefirebaseToken`);
    let token;

    try {
        token = await firebase.messaging().getToken();
    } catch (e) {
        console.log(`ProfileActions:logOut:firebase.messaging:error`, e);
    }

    console.log(`ProfileActions:logOut:deletefirebaseToken:`, token);
    console.log(`ProfileActions:logOut:deletefirebaseToken:`, APP_STORE.getIdFB());
    if (token) {
        const response = await userService.deleteFirebaseToken(APP_STORE.getIdFB());
        console.log(`ProfileActions:logOut:firebase.messaging:response:`, response);
    }

    try {
        await _cleanStorage();
    } catch (e) {
        console.log(`ProfileActions:logOut:cleanStorageError`, e);
    }

    APP_STORE.NOTI_EVENT.next({"noti": false});
};

/**
 * Removes the data from the storage
 * @return {Promise<void>}
 * @private
 */
const _cleanStorage = async () => {
    authStore.clearState();
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('id');
    await AsyncStorage.removeItem('day');
    await AsyncStorage.removeItem('idFB');
    await AsyncStorage.removeItem('username');
    APP_STORE.resetStore();
};

function getImages(data) {

    const _images = [];

    data.map((image) => {
        _images.push(image.image);
    });

    return _images;
}

export {publicProfileAction, getImages, publicImages420Action, appendData, Action420, logOut, privateProfileAction};
