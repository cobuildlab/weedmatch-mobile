import {APP_STORE} from '../../Store';
import {userService} from './service';
import {URL} from '../../utils';
import moment from 'moment';
import logToServer from 'log-to-server'
function swiperAction(token, action, id) {

    userService.swiperAction(token, action, id, moment().format())
        .then(async (response) => {
            logToServer(`Swiper: ${token}, ${action}, ${id}`, response);
            const json = await response.json();
            logToServer(`Swiper:JSON:`, json);
            if (response.ok) {
                logToServer(json.detail);
                APP_STORE.SWIPERACTION_EVENT.next({"swiperAction": json.detail});
                return;
            }
            APP_STORE.APP_EVENT.next({"error": json.detail});
        })
}

function publicProfileAction(token, id, state) {
    logToServer(`publicProfileAction: ${token}, ${id}`);

    userService.publicProfile(token, id, state)
        .then(async (response) => {
            logToServer(`publicProfileAction: ${token}, ${id}`, response);
            const json = await response.json();
            logToServer(`publicProfileAction:JSON:`, json);
            if (response.ok) {
                APP_STORE.PUBLICPROFILE_EVENT.next({"publicProfile": json});
                return;
            }
            APP_STORE.APP_EVENT.next({"error": json.detail});
        });
}

function publicImages420Action(token, pageUrl) {
    logToServer(`publicImages420Action: ${token}, ${pageUrl}`);

    userService.publicImages420(token, pageUrl)
        .then(async (response) => {
            logToServer(`publicImages420Action: ${token}, ${pageUrl}`, response);
            const json = await response.json();
            logToServer(`publicImages420Action:JSON:`, json);
            if (response.ok) {
                APP_STORE.PUBLICIMAGES420_EVENT.next({"publicImages420": json.results});
                APP_STORE.PUBLICIMAGES420PAGE_EVENT.next({"publicImages420Page": json.next});
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

function getImages(data) {

    const _images = [];

    data.map((image) => {
        _images.push(image.image);
    });

    return _images;
}

export {publicProfileAction, getImages, publicImages420Action, appendData, Action420, swiperAction};
