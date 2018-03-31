import {LOGIN_STATE, APP_STATE, TOKEN_STATE} from '../../State';
import {strings} from '../../i18n';
import {isValidText} from '../../utils/index'
import {userService} from '../../services';
import {AsyncStorage} from "react-native";
import {getLogger} from "../../utils";

LOG = getLogger("LOGINACTIONS");

function loginAction(username, password) {
    LOG.log(`loginAction: ${username}, ${password}`);
    if (!isValidText(username) || !isValidText(password)) {
        APP_STATE.next({error: strings("login.required_fields_error")});
        return;
    }
    userService.login(username, password)
        .then(response => {
            LOG.log(`loginAction: ${username}, ${password}`, response);
            TOKEN_STATE.next({token: "asd"})
            const json = async () => await response.json();
            LOG.log(`loginAction: JSON:`, json);
            if (response.ok) {
                TOKEN_STATE.next({token: json.token});
            } else {
                APP_STATE.next({error: json.detail})
            }
        })
}

export {loginAction};