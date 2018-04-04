import {APP_STORE} from '../../Store';
import {strings} from '../../i18n';
import {isValidText} from '../../utils/index'
import {userService} from '../../services';

function loginAction(username, password) {
    console.log(`loginAction: ${username}, ${password}`);
    if (!isValidText(username) || !isValidText(password)) {
        APP_STORE.APP_EVENT.next({error: strings("login.required_fields_error")});
        return;
    }
    userService.login(username, password)
        .then(async (response) => {
            console.log(`loginAction: ${username}, ${password}`, response);
            const json = await response.json();
            console.log(`loginAction:JSON:`, json);
            if (response.ok) {
                //APP_STORE.APP_EVENT.next({"success": strings("login.welcome")});
                APP_STORE.TOKEN_EVENT.next({"token": json.token});
                APP_STORE.ID_EVENT.next({"id": json.id.toString()});
                return;
            }
            APP_STORE.APP_EVENT.next({"error": json.detail});
        });
}

export {loginAction};