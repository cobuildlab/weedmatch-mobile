import {APP_STORE} from '../../Store';
import {strings} from '../../i18n';
import {userService} from './service';
import { authHeader , URL ,LENGUAGE } from '../../utils';

function swiperAction(token, state) {

    console.log(`SwiperAction: ${token}, ${state.urlPage}, ${state.numPage}`);

    var pagUrl = '';

    if (state.urlPage != '' && state.numPage > 0) {
        pagUrl = state.urlPage;
        getSwiper(token,pagUrl);

    } else if (state.numPage == 0){
        pagUrl = URL + 'swiper/?latitud=' + state.latitud + '&longitud=' + state.longitud;
        getSwiper(token,pagUrl);
    }
}

function getSwiper(token,pagUrl) {
    userService.swiper(token,pagUrl)
    .then(async (response) => {
        console.log(`SwiperAction: ${token}, ${pagUrl}`, response);
        const json = await response.json();
        console.log(`SwiperAction:JSON:`, json);
        if (response.ok) {
            console.log(json.results);
            APP_STORE.SWIPER_EVENT.next({"swiper": json.results});
            APP_STORE.SWIPERPAGE_EVENT.next({"swiperPage": json.next});
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

export { swiperAction,appendData };