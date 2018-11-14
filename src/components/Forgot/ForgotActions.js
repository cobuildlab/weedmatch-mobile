import {APP_STORE} from '../../Store';
import {strings} from '../../i18n';
import {isValidText, toastMsg} from "../../utils";
import {userService} from './service';
import logToServer from 'log-to-server'
function forgotAction(email) {
    logToServer(`forgotAction: ${email}`);
    userService.forgotPassword(email)
        .then(async (response) => {
            logToServer(`forgotAction: ${email}`, response);
            const json = await response.json();
            logToServer(`forgotAction:JSON:`, json);

            if (response.ok) {
                APP_STORE.APP_EVENT.next({"success": json.detail});
                return;
            }
            APP_STORE.APP_EVENT.next({"error": json.detail});
    });
}

function recoveryPassword(code, password){
    logToServer(`recoveryPassword: ${code} ${password}`);

    userService.recoveryPassword(code, password)
        .then(async (response) => {
            logToServer(`forgotAction: ${code}`, response);
            const json = await response.json();
            logToServer(`forgotAction:JSON:`, json);

            if (response.ok) {
                APP_STORE.APP_EVENT.next({"success": json.detail});
                return;
            }
            APP_STORE.APP_EVENT.next({"error": json.detail});
    });
}

export {forgotAction, recoveryPassword};
