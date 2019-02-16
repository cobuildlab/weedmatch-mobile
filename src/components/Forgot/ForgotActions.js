import { APP_STORE } from '../../Store';
import { strings } from '../../i18n';
import { isValidText, toastMsg } from "../../utils";
import { userService } from './service';
import Isemail from 'isemail';

function forgotAction(email) {
    console.log(`forgotAction: ${email}`);
    if (!Isemail.validate(email))
        return APP_STORE.APP_EVENT.next({ 'error': strings('register.errorEmail') });

    userService.forgotPassword(email)
        .then(async (response) => {
            console.log(`forgotAction: ${email}`, response);
            const json = await response.json();
            console.log(`forgotAction:JSON:`, json);

            if (response.ok) {
                APP_STORE.APP_EVENT.next({ "success": json.detail });
                return;
            }
            APP_STORE.APP_EVENT.next({ "error": json.detail });
        });
}

function recoveryPassword(code, password) {
    console.log(`recoveryPassword: ${code} ${password}`);

    userService.recoveryPassword(code, password)
        .then(async (response) => {
            console.log(`forgotAction: ${code}`, response);
            const json = await response.json();
            console.log(`forgotAction:JSON:`, json);

            if (response.ok) {
                APP_STORE.APP_EVENT.next({ "success": json.detail });
                return;
            }
            APP_STORE.APP_EVENT.next({ "error": json.detail });
        });
}

export { forgotAction, recoveryPassword };
