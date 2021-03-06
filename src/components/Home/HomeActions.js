import { APP_STORE } from '../../Store';
import { userService } from './service';
import moment from 'moment';
// eslint-disable-next-line no-unused-vars
import moment_timezone from 'moment-timezone';
import DeviceInfo from 'react-native-device-info';
import { URL } from '../../utils';
import { dispatchEvent } from '../../utils/flux-state';
import { events } from '../../modules/feed/FeedStore';


function feedAction(state, nextUrl = null, numPage = 0) {
    console.log(`feedAction:`, [state, nextUrl, numPage]);

    if (nextUrl !== null && numPage > 0) {
        getFeed(state, nextUrl);
    } else if (numPage === 0) {
        // state.longitude = -70.6504492;
        // state.latitude = -33.4532908;
        const pagUrl = URL + 'public-feed/?latitud=' + state.latitude + '&longitud=' + state.longitude;
        getFeed(state, pagUrl);
    }
}

function getFeed(state, pagUrl) {
    console.log(`getFeed:`, [state, pagUrl]);
    const token = APP_STORE.getToken();
    if (pagUrl.indexOf("https") === -1)
        pagUrl = pagUrl.replace('http', 'https');
        
    userService.feed(token, state, pagUrl)
        .then(async (response) => {
            console.log(`getFeed:response`, response);
            const json = await response.json();
            console.log(`homeAction:JSON:`, json);
            if (response.ok) {
                console.log(json.results);
                dispatchEvent(events.ON_FEED, json);
                return;
            }
            dispatchEvent(events.ON_FEED_ERROR, json.detail);
        }).catch(e => dispatchEvent(events.ON_FEED_ERROR, e.message))
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
    console.log(`uploadAction: ${token}`, state);

    userService.publicImage(token, state)
        .then(async (response) => {
            console.log(`uploadAction: ${token}, ${state.time}`, response);
            const json = await response.json();
            console.log(`uploadAction:JSON:`, json);
            if (response.ok) {
                dispatchEvent(events.ON_UPLOAD_PHOTO, json);
                return;
            }
            dispatchEvent(events.ON_FEED_ERROR, json.detail);
        });
}

function likeAction(id, id_user, like, row) {
    console.log(`likeAction:`, [id, id_user, like, row]);

    userService.publicImageLike(APP_STORE.getToken(), id, id_user, like)
        .then(async (response) => {
            console.log(`likeAction:`, response);
            const json = await response.json();
            console.log(`likeAction:JSON:`, json);
            if (response.ok) {
                APP_STORE.LIKE_EVENT.next({ row });
                return;
            }
            APP_STORE.APP_EVENT.next({ "error": json.detail });
        }).catch(err => {
            APP_STORE.APP_EVENT.next({ "error": err.message });
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

export { feedAction, uploadAction, likeAction, calculateTime, appendData };
