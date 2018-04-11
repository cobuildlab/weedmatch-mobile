import {APP_STORE} from '../../Store';
import {strings} from '../../i18n';
import {isValidText} from '../../utils/index'
import {userService} from './service';
import {Logger} from "../../utils";

/**
 *
 * @param firstName
 * @param email
 * @param username
 * @param password
 * @param lat
 * @param lon
 */
function registerAction(firstName, email, username, password, lat, lon, sex, age) {
    if (!isValidText(firstName)) {
        APP_STORE.APP_EVENT.next({error: strings("register.errorFullName")});
        return
    }
    if (!isValidText(email)) {
        APP_STORE.APP_EVENT.next({error: strings("register.errorEmail")});
        return
    }
    if (!isValidText(username)) {
        APP_STORE.APP_EVENT.next({error: strings("register.errorUsername")});
        return
    }
    if (!isValidText(password)) {
        APP_STORE.APP_EVENT.next({error: strings("register.errorPassword")});
        return
    }
    if (!isValidText(sex)) {
        APP_STORE.APP_EVENT.next({error: strings("register.errorSex")});
        return
    }
    if (!isValidText(age)) {
        APP_STORE.APP_EVENT.next({error: strings("register.errorAge")});
        return
    }
    if (Number.isNaN(lat)) {
        lat = 0
    }
    if (Number.isNaN(lon)) {
        lon = 0
    }

    let valueUser = {
        "first_name": firstName,
        email,
        username,
        password,
        "latitud": lat,
        "longitud": lon,
        sex,
        age
    };
    userService.postRegister(valueUser)
        .then(async (response) => {
            console.log(`registerAction:`, valueUser);
            const json = await response.json();
            console.log(`registerAction:JSON:`, json);
            if (response.ok) {
                APP_STORE.APP_EVENT.next({success: json.detail});
                return;
            }else{
                APP_STORE.APP_EVENT.next({error: json});
            }
            //APP_STORE.APP_EVENT.next({error: error.detail})
        });
}

export {registerAction};