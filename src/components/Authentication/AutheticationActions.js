import {APP_STORE} from '../../Store';
import {strings} from '../../i18n';
import {userService} from '../../services';
import {LoginButton, AccessToken, LoginManager} from 'react-native-fbsdk';

function facebookAction() {
    LoginManager.logInWithReadPermissions(["public_profile"]).then(
        function (result) {
            if (result.isCancelled) {
                console.log('Login cancelled');
            } else {
                console.log('Login success with permissions: '
                    + result.grantedPermissions.toString());
                AccessToken.getCurrentAccessToken().then(
                    (data) => {
                        console.log(data.accessToken.toString())
                    }
                )
                console.log(result);
            }
        },
        function (error) {
            console.log('Login fail with error: ' + error);
        }
    );
}

export {facebookAction};