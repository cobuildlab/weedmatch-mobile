import {APP_STORE} from '../../Store';
import {strings} from '../../i18n';
import {isValidText} from '../../utils/index'
import {userService} from './service';
import {AsyncStorage} from 'react-native';
import {authHeader, catchErrorAndPropagate, URL, LENGUAGE} from '../../utils';
import {AccessToken, LoginManager} from 'react-native-fbsdk';
import firebase from 'react-native-firebase';
import logToServer from 'log-to-server'
function publicProfileAction(token, id) {
    logToServer(`publicProfileAction: ${token}, ${id}`);

    userService.publicProfile(token, id)
        .then(async (response) => {
            logToServer(`ProfileAction: ${token}, ${id}`, response);
            const json = await response.json();
            logToServer(`ProfileAction:JSON:`, json);
            if (response.ok) {
                APP_STORE.PROFILE_EVENT.next({"profile": json});
                return;
            } else if (response.status === 401) {
                logOut()
            }
            APP_STORE.APP_EVENT.next({"error": json.detail});
        });
}

function privateProfileAction(token, id) {
    logToServer(`privateProfileAction: ${token}, ${id}`);

    userService.privateProfile(token, id)
        .then(async (response) => {
            logToServer(`privateProfileAction: ${token}, ${id}`, response);
            const json = await response.json();
            logToServer(`privateProfileAction:JSON:`, json);
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
    logToServer(`publicImages420Action: ${token}, ${id}, ${pageUrl}`);

    userService.publicImages420(token, id, pageUrl)
        .then(async (response) => {
            logToServer(`publicImages420Action: ${token}, ${id}, ${pageUrl}`, response);
            const json = await response.json();
            logToServer(`publicImages420Action:JSON:`, json);
            if (response.ok) {
                APP_STORE.PROFILEIMAGES_EVENT.next({"profileImages420": json.results});
                APP_STORE.PROFILEPAGE_EVENT.next({"profileImages420Page": json.next});
                return;
            }
            APP_STORE.APP_EVENT.next({"error": json.detail});
        });
}

function Action420(token, state, userId) {

    logToServer(`Action420: ${token}, ${state}, ${userId}`);

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

function logOut() {
    logToServer(`ProfileActions:logOut`);
    AccessToken.getCurrentAccessToken().then(
        (data) => {
            logToServer(`ProfileActions:logOut`, data);
            if (data) {
                LoginManager.logOut();
            }
        }
    ).catch(err => logToServer(`ProfileActions:logOut:AccessToken`, JSON.stringify(err)));

    logToServer(`ProfileActions:logOut: Trying to obtain Firebase Token`);
    firebase.messaging().getToken().then(async (token) => {
        logToServer("1")
        if (token) {
            logToServer("2")
            const response = await userService.tokenFB();
            logToServer(`ProfileActions:logOut:firebase.messaging:response${response}`);
            const json = await response.json();
            logToServer(`ProfileActions:logOut:firebase.messaging:responseJSON${JSON.stringify(json)}`);
        }
        logToServer("3")
        _cleanStorage();
        // Tell the system there is no more notifications
        APP_STORE.NOTI_EVENT.next({"noti": false});
    }).catch(err => {
        logToServer(`ProfileActions:logOut:firebase.messaging:error`, JSON.stringify(err));
        _cleanStorage();
        // Tell the system there is no more notifications
        APP_STORE.NOTI_EVENT.next({"noti": false});
    });
}

const _cleanStorage = () => {
    AsyncStorage.removeItem('token');
    AsyncStorage.removeItem('id');
    AsyncStorage.removeItem('day');
    AsyncStorage.removeItem('idFB');
}

function getImages(data) {

    const _images = [];

    data.map((image) => {
        _images.push(image.image);
    });

    return _images;
}

export {publicProfileAction, getImages, publicImages420Action, appendData, Action420, logOut, privateProfileAction};
