import {APP_STORE} from '../../Store';
import {strings} from '../../i18n';
import {userService} from './service';
import { AccessToken, LoginManager} from 'react-native-fbsdk';

function facebookAction(state) {

    AccessToken.getCurrentAccessToken().then(
        (data) => {
            if(data) {
                LoginManager.logOut();
                return
            }
            LoginManager.logInWithReadPermissions(["public_profile","email","user_birthday","user_gender"]).then(
                function(result) {
                    if (result.isCancelled) {
                        return
                    }
                    AccessToken.getCurrentAccessToken().then(
                        (data) => {
                            console.log(data.accessToken.toString())

                            userService.facebookHandle(data.accessToken.toString(),state)
                            .then(async (response) => {
                                console.log(`facebookAction: ${data.accessToken.toString()}`, response);
                                const json = await response.json();
                                console.log(`facebookAction:JSON:`, json);
                                if (response.ok) {
                                    APP_STORE.TOKEN_EVENT.next({"token": json.token});
                                    APP_STORE.ID_EVENT.next({"id": json.id.toString()});
                                    return;
                                }
                                APP_STORE.APP_EVENT.next({"error": json.detail});
                            });
                        }
                    )
                },
                function(error) {
                  alert('Login fail with error: ' + error);
                }
            );
        }
    )
}

export {facebookAction};