/* eslint-disable no-console */

import { APP_STORE } from '../../Store';
import { userService } from './service';
import logToServer from 'log-to-server'
function publicEditAction(token, id) {
    logToServer(`publicEditProfileAction: ${token}, ${id}`);

    userService.publicProfile(token, id).then(async response => {
        logToServer(`publicEditProfileAction: ${token}, ${id}`, response);
        const json = await response.json();
        logToServer(`publicEditProfileAction:JSON:`, json);
        if (response.ok) {
            APP_STORE.PUBLICEDITPROFILE_EVENT.next({ publicEditProfile: json });
            return;
        }
        APP_STORE.APP_EVENT.next({ error: json.detail });
    });
}

function postImageAction(image) {
    logToServer(`postImageAction`);

    userService
        .uploadImage(APP_STORE.getToken(), APP_STORE.getId(), image)
        .then(async response => {
            logToServer('postImageAction', response);
            const json = await response.json();
            logToServer(`postImageAction:JSON:`, json);
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
    logToServer(`putImageAction`);

    userService
        .changeImage(APP_STORE.getToken(), APP_STORE.getId(), image, id)
        .then(async response => {
            logToServer('putImageAction', response);
            const json = await response.json();
            logToServer(`putImageAction:JSON:`, json);
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
    logToServer(`deleteImageAction`);

    userService
        .deleteImage(APP_STORE.getToken(), APP_STORE.getId(), image)
        .then(async response => {
            logToServer('deleteImageAction', response);
            const json = await response.json();
            logToServer(`deleteImageAction:JSON:`, json);
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
    logToServer(`saveProfile: ${token}, ${id}, ${state}`);

    userService.saveProfile(token, id, state).then(async response => {
        logToServer(
            `publicSaveProfileAction: ${token}, ${id}, ${state}`,
            response
        );
        const json = await response.json();
        logToServer(`publicSaveProfileAction:JSON:`, json);
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
