import {APP_STORE} from '../../Store';
import {strings} from '../../i18n';
import {userService} from './service';
import {authHeader, URL, LENGUAGE} from '../../utils';
import {logOut} from '../Profile/ProfileActions';
import moment from 'moment';
import {AsyncStorage, NetInfo} from 'react-native'

/**
 * Action to send a swipper Action to the server. Ex, "like", "not-like", "love"
 * @param token
 * @param action
 * @param id
 */
const swiperAction = async (token, action, id) => {
    console.log(`SwiperActions:swiperAction: ${token}, ${action}, ${id}`);
    let isConnected = await NetInfo.isConnected.fetch();
    if (isConnected === false) {
        APP_STORE.ERROR_EVENT.next(strings("main.internet"));
        return;
    }

    userService.swiperAction(token, action, id, moment().format())
        .then(async (response) => {
            console.log(`SwiperActions:swiperAction:`, response);
            const json = await response.json();
            if (response.ok) {
                APP_STORE.SWIPERACTION_EVENT.next({"swiperAction": json.detail});
                return;
            }
            APP_STORE.APP_EVENT.next({"error": json.detail});
        });
};

/**
 * get the list of swipper profiles
 * @param token
 * @param state
 */
const swiperListAction = (token, state) => {
    console.log(`SwiperActions:swiper ${token}, ${state.urlPage}, ${state.numPage}`, state);

    let pageUrl = URL + 'swiper/?latitud=' + state.latitude + '&longitud=' + state.longitude;

    if (state.numPage > 0)
        pageUrl = state.urlPage;

    getSwiper(token, pageUrl);

};

function swiper(token, state) {
    console.log(`SwiperAction: ${token}, ${state.urlPage}, ${state.numPage}`);

    var pagUrl = '';

    if (state.urlPage != '' && state.numPage > 0) {
        pagUrl = state.urlPage;
        getSwiper(token, pagUrl);

    } else if (state.numPage == 0) {
        pagUrl = URL + 'swiper/?latitud=' + state.latitude + '&longitud=' + state.longitude;
        getSwiper(token, pagUrl);
    }
}

function getSwiper(token, pagUrl) {
    userService.swiper(token, pagUrl)
        .then(async (response) => {
            console.log(`SwiperAction: ${token}, ${pagUrl}`, response);
            const json = await response.json();
            console.log(`SwiperAction:JSON:`, json);
            if (response.ok) {
                console.log(json.results);
                APP_STORE.SWIPER_EVENT.next({"swiper": json.results});
                APP_STORE.SWIPERPAGE_EVENT.next({"swiperPage": json.next});
                return;
            } else if (response.status === 401 || response.status === 403) {
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


export {swiperAction, appendData, swiper, swiperListAction};
