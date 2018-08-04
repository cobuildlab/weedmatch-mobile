import {APP_STORE} from '../../Store';
import {strings} from '../../i18n';
import {userService} from './service';
import { authHeader , URL ,LENGUAGE } from '../../utils';
import moment from 'moment';
import { AsyncStorage, Alert} from 'react-native'
import moment_timezone from 'moment-timezone';

function swiperAction(token,action,id) {

    userService.swiperAction(token,action,id,moment().format())
        .then(async (response) => {
            console.log(`Swiper: ${token}, ${action}, ${id}`, response);
            const json = await response.json();
            console.log(`Swiper:JSON:`, json);
            if (response.ok) {
                console.log(json.detail);
                APP_STORE.SWIPERACTION_EVENT.next({"swiperAction": json.detail});
                return;
            }
            APP_STORE.APP_EVENT.next({"error": json.detail});
        })
}

function swiper(token, state) {

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

async function saveSuper(id,tomorrow) {
    try {
        await AsyncStorage.setItem("day", tomorrow);
        swiperAction(APP_STORE.getToken(),'SuperLike',id)
    } catch (error) {
        console.error('AsyncStorage error: ' + error.message);
    }
}

async function saveHour(id) {

    var today = new Date();
    var tomorrow = new Date(today.getTime() + (1000 * 60 * 60 * 24));

    const day = await AsyncStorage.getItem('day');

    if (day != null) {
        if (moment().diff(day, 'minutes') < 0) {

            startTime = "00:00"
            minutes = moment().diff(day, 'minutes') * -1
            h = Math.floor(minutes / 60)
            m = minutes % 60 + parseInt(startTime.substring(3,4));
            newtime = h + strings("swiper.hours") + m + strings("swiper.minutes");
  
            APP_STORE.BAD_EVENT.next({"bad": true});
            Alert.alert(newtime)
  
          } else {
            saveSuper(id,tomorrow)
          }
    } else {
        saveSuper(id,tomorrow)
    }
}

export { swiperAction,appendData,swiper,saveHour};