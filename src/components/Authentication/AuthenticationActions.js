import { APP_STORE } from '../../Store';
import { userService } from './service';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { events as authStoreEvents } from '../../modules/auth/AuthStore'
import { dispatchEvent } from '../../utils/flux-state'
import { events as authEvents } from '../../modules/auth/AuthStore'
/**
 * @typedef {import('../../modules/auth/AuthStore').UserObject} UserObject
 */


export function facebookAction(state) {
    // eslint-disable-next-line no-console
    console.log("AuthenticationActions:facebookAction",state);

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
                } else {
                    AccessToken.getCurrentAccessToken().then(data => {
                        // eslint-disable-next-line no-console
                        console.log("AuthenticationActions:facebookAction", data.accessToken.toString());
    
                        // this gets set to false inside firebaseAction()
                        dispatchEvent(authStoreEvents.FB_LOGGING_IN, true)
                        userService
                            .facebookHandle(data.accessToken.toString(), state)
                            .then(async response => {
                                try {
                                    console.log(
                                        `AuthenticationActions:facebookAction: ${data.accessToken.toString()}`,
                                        response
                                    );
    
                                    const json = await response.json();
    
                                    // eslint-disable-next-line no-console
                                    console.log(`AuthenticationActions:facebookAction:JSON:`, json);

                                    if (response.ok) {
                                       /**
                                        * @type {UserObject}
                                        */
                                        const user = json
    
                                        dispatchEvent(authStoreEvents.USER, user)
                                        
                                        APP_STORE.TOKEN_EVENT.next({
                                            token: json.token,
                                        });

                                        APP_STORE.ID_EVENT.next({
                                            id: json.id.toString(),
                                        });
                                    } else {
                                        console.error(`AuthenticationActions:facebookAction:JSON:`, json);
                                        throw new Error(json.detail)
                                    }
                                } catch (e) {
                                    APP_STORE.APP_EVENT.next({ error: e.message });
                                }
                            });
                    });
                }
                
            }
            
        ).catch(function(error) {
            alert('Login fail with error: ' + error);
        });
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
            dispatchEvent(authEvents.FB_LOGGING_IN, false)
            return;
        }
        APP_STORE.APP_EVENT.next({ error: json.detail });
    });
}
