/**
 * @prettier
 */
import { APP_STORE } from '../../Store';
import { strings } from '../../i18n';
import { userService } from './service';
import { URL } from '../../utils';
import { logOut } from '../Profile/ProfileActions';
import moment from 'moment';
import { NetInfo } from 'react-native';

/**
 * Action to send a swipper Action to the server. Ex, "like", "not-like", "love"
 * @param token
 * @param action
 * @param id
 */
const swiperAction = async (token, action, id) => {
    let isConnected = await NetInfo.isConnected.fetch();
    if (isConnected === false) {
        APP_STORE.ERROR_EVENT.next(strings('main.internet'));
        return;
    }

    userService
        .swiperAction(token, action, id, moment().format())
        .then(async response => {
            try {
                const json = await response.json();
                if (response.ok) {
                    APP_STORE.SWIPERACTION_EVENT.next({
                        swiperAction: json.detail,
                    });
                    return;
                } else {
                    throw new Error(json.detail);
                }
            } catch (e) {
                console.warn(e.message);
                APP_STORE.APP_EVENT.next({ error: e.message });
            }
        });
};

/**
 * get the list of swipper profiles
 * @param token
 * @param state
 */
const swiperListAction = (token, state) => {
    console.log("swiperListAction", token, state)
    state.longitude = -70.6504492;
    state.latitude = -33.4532908;
    let pageUrl =
        URL +
        'swiper/?latitud=' +
        state.latitude +
        '&longitud=' +
        state.longitude;

    if (state.numPage > 0) pageUrl = state.urlPage;
    getSwiper(token, pageUrl);
};

function swiper(token, state) {
    var pagUrl = '';

    if (state.urlPage != '' && state.numPage > 0) {
        pagUrl = state.urlPage;
        getSwiper(token, pagUrl);
    } else if (state.numPage == 0) {
        pagUrl =
            URL +
            'swiper/?latitud=' +
            state.latitude +
            '&longitud=' +
            state.longitude;
        getSwiper(token, pagUrl);
    }
}

function getSwiper(token, pagUrl) {
    console.log("getSwiper", token, pagUrl)
    if (pagUrl.indexOf('https') === -1)
        pagUrl = pagUrl.replace('http', 'https');

    userService.swiper(token, pagUrl).then(async response => {
        try {
            const json = await response.json();
            if (response.ok) {
                console.log("getSwiper:Response", response, json)
                APP_STORE.SWIPER_EVENT.next({ swiper: json.results, swiperPage: json.next });
                // APP_STORE.SWIPERPAGE_EVENT.next({ swiperPage: json.next });
                return;
            } else if (response.status === 401 || response.status === 403) {
                logOut();
            } else {
                throw new Error(json.detail);
            }
        } catch (e) {
            APP_STORE.APP_EVENT.next({ error: e.message });
        }
    });
}

function appendData(oldData, newData) {
    oldData.slice();

    newData.map(data => {
        oldData.push(data);
    });

    return oldData;
}

export { swiperAction, appendData, swiper, swiperListAction };
