/* eslint-disable no-console */

import { APP_STORE } from '../../Store';
import { userService } from './service';

function publicEditAction(token, id) {
    console.log(`publicEditProfileAction: ${token}, ${id}`);

    userService.publicProfile(token, id).then(async response => {
        console.log(`publicEditProfileAction: ${token}, ${id}`, response);
        const json = await response.json();
        console.log(`publicEditProfileAction:JSON:`, json);
        if (response.ok) {
            APP_STORE.PUBLICEDITPROFILE_EVENT.next({ publicEditProfile: json });
            return;
        }
        APP_STORE.APP_EVENT.next({ error: json.detail });
    });
}

function postImageAction(image) {
    console.log(`postImageAction`);

    userService
        .uploadImage(APP_STORE.getToken(), APP_STORE.getId(), image)
        .then(async response => {
            console.log('postImageAction', response);
            const json = await response.json();
            console.log(`postImageAction:JSON:`, json);
            if (response.ok) {
                APP_STORE.PUBLICEDITPROFILE_EVENT.next({
                    publicEditProfile: json,
                });
                return;
            }
            APP_STORE.APP_EVENT.next({ error: json.detail });
        });
}

function putImageAction(image, id) {
    console.log(`putImageAction`);

    userService
        .changeImage(APP_STORE.getToken(), APP_STORE.getId(), image, id)
        .then(async response => {
            console.log('putImageAction', response);
            const json = await response.json();
            console.log(`putImageAction:JSON:`, json);
            if (response.ok) {
                APP_STORE.PUBLICEDITPROFILE_EVENT.next({
                    publicEditProfile: json,
                });
                return;
            }
            APP_STORE.APP_EVENT.next({ error: json.detail });
        });
}

function deleteImageAction(image) {
    console.log(`deleteImageAction`);

    userService
        .deleteImage(APP_STORE.getToken(), APP_STORE.getId(), image)
        .then(async response => {
            console.log('deleteImageAction', response);
            const json = await response.json();
            console.log(`deleteImageAction:JSON:`, json);
            if (response.ok) {
                APP_STORE.PUBLICEDITPROFILE_EVENT.next({
                    publicEditProfile: json,
                });
                return;
            }
            APP_STORE.APP_EVENT.next({ error: json.detail });
        });
}

function saveProfileAction(token, id, state) {
    console.log(`saveProfile: ${token}, ${id}, ${state}`);

    userService.saveProfile(token, id, state).then(async response => {
        console.log(
            `publicSaveProfileAction: ${token}, ${id}, ${state}`,
            response
        );
        const json = await response.json();
        console.log(`publicSaveProfileAction:JSON:`, json);
        if (response.ok) {
            APP_STORE.PUBLIC_SAVE_PROFILE_EVENT.next({ saveProfile: json });
            return;
        }
        APP_STORE.APP_EVENT.next({ error: json.detail });
    });
}

export {
    publicEditAction,
    saveProfileAction,
    putImageAction,
    postImageAction,
    deleteImageAction,
};
