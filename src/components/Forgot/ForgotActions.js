import {APP_STORE} from '../../Store';
import {strings} from '../../i18n';
import {isValidText} from '../../utils/index'
import {userService} from '../../services';

function forgotAction(email) {
    console.log(`forgotAction: ${email}`);

    userService.forgotPassword(email)
        .then(async (response) => {
            console.log(`forgotAction: ${email}`, response);
            const json = await response.json();
            console.log(`forgotAction:JSON:`, json);
            if (response.ok) {
                //APP_STORE.APP_EVENT.next({"success": strings("login.welcome")});
                APP_STORE.TOKEN_EVENT.next({"token": json.token});
                APP_STORE.ID_EVENT.next({"id": json.id.toString()});
                return;
            }
            APP_STORE.APP_EVENT.next({"error": json.detail});
        });
}

export {forgotAction};
