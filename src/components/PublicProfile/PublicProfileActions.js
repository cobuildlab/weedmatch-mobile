import {APP_STORE} from '../../Store';
import {strings} from '../../i18n';
import {isValidText} from '../../utils/index'
import {userService} from './service';
import { authHeader, catchErrorAndPropagate , URL,LENGUAGE } from '../../utils';
import moment from 'moment';
import { AsyncStorage, Alert} from 'react-native'

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

function publicProfileAction(token, id,state) {
    console.log(`publicProfileAction: ${token}, ${id}`);

    userService.publicProfile(token, id,state)
        .then(async (response) => {
            console.log(`publicProfileAction: ${token}, ${id}`, response);
            const json = await response.json();
            console.log(`publicProfileAction:JSON:`, json);
            if (response.ok) {
                APP_STORE.PUBLICPROFILE_EVENT.next({"publicProfile": json});
                return;
            }
            APP_STORE.APP_EVENT.next({"error": json.detail});
        });
}

function publicImages420Action(token, pageUrl) {
    console.log(`publicImages420Action: ${token}, ${pageUrl}`);

    userService.publicImages420(token,pageUrl)
        .then(async (response) => {
            console.log(`publicImages420Action: ${token}, ${pageUrl}`, response);
            const json = await response.json();
            console.log(`publicImages420Action:JSON:`, json);
            if (response.ok) {
                APP_STORE.PUBLICIMAGES420_EVENT.next({"publicImages420": json.results});
                APP_STORE.PUBLICIMAGES420PAGE_EVENT.next({"publicImages420Page": json.next});
                return;
            }
            APP_STORE.APP_EVENT.next({"error": json.detail});
        });
}

function Action420(token, state,userId) {

    console.log(`Action420: ${token}, ${state}, ${userId}`);

    var pagUrl = '';

    if (state.urlPage != '' && state.numPage > 0) {
        pagUrl = state.urlPage;
        publicImages420Action(token,pagUrl);

    } else if (state.numPage == 0){
        pagUrl = URL + 'public-image/' + userId + '/';
        publicImages420Action(token,pagUrl);
    }
}

function appendData(oldData, newData) {
    oldData.slice();

    newData.map((data) => { 
        oldData.push(data);
    });

    return oldData;
}

function getImages(data) {

    const _images = [];

    data.map((image) => {
      _images.push(image.image);
    });

    return _images;
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

            Alert.alert(newtime)

        } else {
            saveSuper(id,tomorrow)
        }
    } else {
        saveSuper(id,tomorrow)
    }
}

export { publicProfileAction,getImages,publicImages420Action,appendData,Action420,swiperAction,saveHour };