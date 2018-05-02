import {APP_STORE} from '../../Store';
import {strings} from '../../i18n';
import {isValidText} from '../../utils/index'
import {userService} from './service';
import moment from 'moment';
import moment_timezone from 'moment-timezone';
import DeviceInfo from 'react-native-device-info';
import { authHeader, catchErrorAndPropagate , URL,LENGUAGE } from '../../utils';

function feedAction(token, state) {

    console.log(`homeAction: ${token}, ${state}`);

    var pagUrl = '';

    if (state.urlPage != '' && state.numPage > 0) {
        pagUrl = state.urlPage;
        getFeed(token, state,pagUrl);

    } else if (state.numPage == 0){
        pagUrl = URL + 'public-feed/?latitud=' + state.latitud + '&logitud=' + state.longitud;
        getFeed(token, state,pagUrl);
    }
}

function getFeed(token, state,pagUrl) {
    userService.feed(token, state,pagUrl)
    .then(async (response) => {
        console.log(`homeAction: ${token}, ${state}`, response);
        const json = await response.json();
        console.log(`homeAction:JSON:`, json);
        if (response.ok) {
            console.log(json.results);
            APP_STORE.FEED_EVENT.next({"feed": json.results});
            APP_STORE.FEEDPAGE_EVENT.next({"page": json.next});
            return;
        }
        APP_STORE.APP_EVENT.next({"error": json.detail});
    })
}

function appendData(oldData, newData) {
    oldData.slice();

    newData.map((data) => { 
        oldData.push(data);
    });

    return oldData;
}

function uploadAction(token, state) {

    console.log(`uploadAction: ${token}, ${state}`);

    userService.publicImage(token, state)
        .then(async (response) => {
            console.log(`uploadAction: ${token}, ${state.time}`, response);
            const json = await response.json();
            console.log(`uploadAction:JSON:`, json);
            if (response.ok) {
                APP_STORE.APP_EVENT.next({"success": json.detail});
                return;
            }
            APP_STORE.APP_EVENT.next({"error": json.detail});
        });
}

function likeAction(token, id, id_user, like,row) {

    console.log(`likeAction: ${token}, ${id}, ${id_user}, ${like}`);

    userService.publicImageLike(token, id, id_user, like)
        .then(async (response) => {
            console.log(`likeAction: ${token}, ${id}, ${id_user}, ${like}`, response);
            const json = await response.json();
            console.log(`likeAction:JSON:`, json);
            if (response.ok) {
                APP_STORE.LIKE_EVENT.next({"like": row});
                return;
            }
            APP_STORE.APP_EVENT.next({"error": json.detail});
        });
}

function calculateTime(rowData) {
    var start = moment(rowData.time).tz(DeviceInfo.getTimezone());
    var end = moment();

    var minutes = parseInt(moment.duration(end.diff(start)).asMinutes());

    if (minutes < 60) {
        return minutes + ' m'
    }

    var hours = parseInt(moment.duration(end.diff(start)).asHours());

    if (hours < 24) {
        return hours + ' h'
    }

    var day = parseInt(moment.duration(end.diff(start)).asDays());

    if (day < 31) {
        return day + ' d'
    }

    return moment(rowData.time).tz(DeviceInfo.getTimezone()).format('MMMM DD, YYYY')

}

export { feedAction, uploadAction, likeAction, calculateTime, appendData };