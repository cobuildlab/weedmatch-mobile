import { APP_STORE } from '../../Store';
import { strings } from '../../i18n';
import { userService } from './service';
import EmailValidator from 'email-validator';
import { isValidText } from '../../utils';


function forgotAction(email) {
    console.log(`forgotAction: ${email}`);
    if (!EmailValidator.validate(email))
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

function recoveryPassword(code, password, confirmPassword) {
    console.log(`recoveryPassword: ${code} ${password}`);

    if (!isValidText(code))
        return APP_STORE.APP_EVENT.next({ 'error': strings('register.errorCode') });

    if (!isValidText(password))
        return APP_STORE.APP_EVENT.next({ 'error': strings('register.errorPassword') });

    if (password.length > 12 || password.length < 6)
        return APP_STORE.APP_EVENT.next({ 'error': strings('register.errorPassword') });

    if (confirmPassword !== password)
        return APP_STORE.APP_EVENT.next({ 'error': strings('register.errorPassword') });

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
