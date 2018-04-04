import {APP_STORE} from '../../Store';
import {strings} from '../../i18n';
import {isValidText} from '../../utils/index'
import {userService} from '../../services';

function feedAction(token, state) {

    console.log(`homeAction: ${token}, ${state}`);

    userService.feed(token, state)
        .then(async (response) => {
            console.log(`homeAction: ${token}, ${state}`, response);
            const json = await response.json();
            console.log(`homeAction:JSON:`, json);
            if (response.ok) {
                console.log(json.results);
                APP_STORE.FEED_EVENT.next({"feed": json.results});
                return;
            }
            APP_STORE.APP_EVENT.next({"error": json.detail});
        });
}

function uploadAction(token, state) {

    console.log(`uploadAction: ${token}, ${state}`);

    userService.publicImage(token, state)
        .then(async (response) => {
            console.log(`uploadAction: ${token}, ${state}`, response);
            const json = await response.json();
            console.log(`uploadAction:JSON:`, json);
            if (response.ok) {
                APP_STORE.APP_EVENT.next({"success": json.detail});
                return;
            }
            APP_STORE.APP_EVENT.next({"error": json.detail});
        });
}

function likeAction(token, id, id_user, like) {

    console.log(`likeAction: ${token}, ${id}, ${id_user}, ${like}`);

    userService.publicImageLike(token, id, id_user, like)
        .then(async (response) => {
            console.log(`likeAction: ${token}, ${id}, ${id_user}, ${like}`, response);
            const json = await response.json();
            console.log(`likeAction:JSON:`, json);
            if (response.ok) {
                APP_STORE.APP_EVENT.next({"success": json.detail});
                return;
            }
            APP_STORE.APP_EVENT.next({"error": json.detail});
        });
}

export {feedAction, uploadAction, likeAction};