import { APP_STORE } from '../../Store';
import { userService } from './service';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { events as authStoreEvents } from '../../modules/auth/AuthStore'
import { dispatchEvent } from '../../utils/flux-state'
/**
 * @typedef {import('../../modules/auth/AuthStore').UserObject} UserObject
 */


export function facebookAction(state) {
    // eslint-disable-next-line no-console
    console.log(state);

    AccessToken.getCurrentAccessToken().then(data => {
        if (data) {
            LoginManager.logOut();
            return;
        }
        LoginManager.logInWithReadPermissions([
            'public_profile',
            'email',
            'user_birthday',
            'user_gender',
        ]).then(
            function(result) {
                if (result.isCancelled) {
                    APP_STORE.FACE_EVENT.next({ face: true });
                }
                AccessToken.getCurrentAccessToken().then(data => {
                    // eslint-disable-next-line no-console
                    console.log(data.accessToken.toString());

                    userService
                        .facebookHandle(data.accessToken.toString(), state)
                        .then(async response => {
                            // eslint-disable-next-line no-console
                            console.log(
                                `facebookAction: ${data.accessToken.toString()}`,
                                response
                            );

                            const json = await response.json();

                            // eslint-disable-next-line no-console
                            console.log(`facebookAction:JSON:`, json);

                            /**
                             * @type {UserObject}
                             */
                            const user = json

                            dispatchEvent(authStoreEvents.USER, user)

                            if (response.ok) {
                                APP_STORE.TOKEN_EVENT.next({
                                    token: json.token,
                                });
                                APP_STORE.ID_EVENT.next({
                                    id: json.id.toString(),
                                });
                                return;
                            }
                            APP_STORE.APP_EVENT.next({ error: json.detail });
                        });
                });
            },
            function(error) {
                alert('Login fail with error: ' + error);
            }
        );
    });
}

export function firebaseAction(token) {
    // eslint-disable-next-line no-console
    console.log(`firebaseAction: ${token}`);

    userService.tokenFB(token).then(async response => {
        // eslint-disable-next-line no-console
        console.log(`firebaseAction: ${token}`, response);

        const json = await response.json();

        // eslint-disable-next-line no-console
        console.log(`firebaseAction:JSON:`, json);

        if (response.ok) {
            APP_STORE.FIRE_EVENT.next({ tokenFB: json.id.toString() });
            return;
        }
        APP_STORE.APP_EVENT.next({ error: json.detail });
    });
}
