import {APP_STORE} from '../../Store';
import {strings} from '../../i18n';
import {isValidText} from '../../utils/index'
import {userService} from './service';
import moment from 'moment';
import DeviceInfo from 'react-native-device-info';

function getSuper() {

    userService.superService(APP_STORE.getToken())
        .then(async (response) => {
            const json = await response.json();
            console.log(`getSuper:JSON:`, json);
            if (response.ok) {
                APP_STORE.SUPER_EVENT.next({"super": json});
                return;
            }
            APP_STORE.APP_EVENT.next({"error": json.detail});
        });
}

function likeAction(action,id) {

    userService.swiperAction(action,id)
        .then(async (response) => {
            const json = await response.json();
            console.log(`LikeAction:JSON:`, json);
            if (response.ok) {
                console.log(json.detail);
                APP_STORE.LIKEACTION_EVENT.next({"likeAction": json.detail});
                return;
            }
            APP_STORE.APP_EVENT.next({"error": json.detail});
        })
}

function calculateTime(rowData) {
    var start = moment(rowData).tz(DeviceInfo.getTimezone());
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

    return moment(rowData).tz(DeviceInfo.getTimezone()).format('MMMM DD, YYYY')

}

export { getSuper,calculateTime,likeAction };