import {APP_STORE} from '../../Store';
import {userService} from './service';
import moment from 'moment';
import moment_timezone from 'moment-timezone';
import DeviceInfo from 'react-native-device-info';
import {logOut} from '../Profile/ProfileActions';
import {URL} from '../../utils';
import logToServer from 'log-to-server'
const DOUBLE_PRESS_DELAY = 300;

function feedAction(token, state) {

    logToServer(`homeAction: ${token}, ${state}`);

    var pagUrl = '';

    if (state.urlPage != '' && state.numPage > 0) {
        pagUrl = state.urlPage;
        getFeed(token, state, pagUrl);

    } else if (state.numPage == 0) {
        pagUrl = URL + 'public-feed/?latitud=' + state.latitud + '&longitud=' + state.longitud;
        getFeed(token, state, pagUrl);
    }
}

function getFeed(token, state, pagUrl) {
    userService.feed(token, state, pagUrl)
        .then(async (response) => {
            logToServer(`homeAction: ${token}, ${state}`, response);
            const json = await response.json();
            logToServer(`homeAction:JSON:`, json);
            if (response.ok) {
                logToServer(json.results);
                APP_STORE.FEED_EVENT.next({"feed": json.results});
                APP_STORE.FEEDPAGE_EVENT.next({"page": json.next});
                return;
            } else if (response.status === 401) {
                logOut()
            }
            APP_STORE.APP_EVENT.next({"error": json.detail});
        })
}

function appendData(oldData, newData) {
    oldData.slice();

    newData.map((data) => {
        oldData.push(data);
    });

    return oldData;
}

/**
 * Upload the picture to the server
 * @param token
 * @param state
 */
function uploadAction(token, state) {
    logToServer(`uploadAction: ${token}`, state);

    userService.publicImage(token, state)
        .then(async (response) => {
            logToServer(`uploadAction: ${token}, ${state.time}`, response);
            const json = await response.json();
            logToServer(`uploadAction:JSON:`, json);
            if (response.ok) {
                APP_STORE.UPLOAD_EVENT.next({"upload": json.detail});
                return;
            }
            APP_STORE.APP_EVENT.next({"error": json.detail});
        });
}

function likeAction(id, id_user, like, row) {
    logToServer(`likeAction:`, [id, id_user, like, row]);

    userService.publicImageLike(APP_STORE.getToken(), id, id_user, like)
        .then(async (response) => {
            logToServer(`likeAction:`, response);
            const json = await response.json();
            logToServer(`likeAction:JSON:`, json);
            if (response.ok) {
                APP_STORE.LIKE_EVENT.next({row});
                return;
            }
            APP_STORE.APP_EVENT.next({"error": json.detail});
        }).catch(err => {
        APP_STORE.APP_EVENT.next({"error": err.message});
    });
}


function calculateTime(rowData) {
    var start = moment(rowData.time).tz(DeviceInfo.getTimezone());
    var end = moment();

    var minutes = parseInt(moment.duration(end.diff(start)).asMinutes());

    if (minutes < 60) {
        return minutes + ' m'
    }

    var hours = parseInt(moment.duration(end.diff(start)).asHours());

    if (hours < 24) {
        return hours + ' h'
    }

    var day = parseInt(moment.duration(end.diff(start)).asDays());

    if (day < 31) {
        return day + ' d'
    }

    return moment(rowData.time).tz(DeviceInfo.getTimezone()).format('MMMM DD, YYYY')

}

export {feedAction, uploadAction, likeAction, calculateTime, appendData};
