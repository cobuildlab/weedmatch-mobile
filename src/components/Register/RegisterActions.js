import {APP_STORE} from '../../Store';
import {strings} from '../../i18n';
import {checkConectivity} from '../../utils/index'
import {userService} from './service';
/**
 * @typedef {import('../../modules/auth/AuthStore').UserObject} UserObject
 */

/**
 * Register a User
 * @param firstName
 * @param email
 * @param username
 * @param password
 * @param lat
 * @param lon
 * @param sex
 * @param age
 */
function registerAction(firstName, email, password, lat, lon, sex, age, image, username) {
    console.warn(`registerAction:`, arguments);
    if (!checkConectivity()) {
        APP_STORE.APP_EVENT.next({error: strings('main.internet')});
        return;
    }

    const data = new FormData();
    var re = /(?:\.([^.]+))?$/;
    var ext = re.exec(image)[1];

    data.append('first_name', firstName);
    data.append('email', email.toLowerCase());
    data.append('password', password);
    if (lat)
        data.append('latitud', lat);
    if (lon)
        data.append('longitud', lon);
    data.append('sex', sex);
    data.append('age', age);
    data.append('username', username);
    data.append('image', {
        uri: image,
        type: 'image/' + ext,
        name: 'photo.' + ext
    });

    console.log(`registerAction:`, data);
    userService.postRegister(data)
        .then(async (response) => {
            console.log(`registerAction:Response:`, response);
            let json;
            try {
                json = await response.json();
            }catch (e) {
                console.log(`registerAction:Response:JSON:error`, e);
                APP_STORE.APP_EVENT.next({error: e.message});
                return;
            }
            console.log(`registerAction:Response:JSON`, json);
            if (response.ok) {
                APP_STORE.APP_EVENT.next({"success": json.detail});
                APP_STORE.TOKEN_EVENT.next({"token": json.token});
                APP_STORE.ID_EVENT.next({"id": json.id.toString()});
                return;
            }

            APP_STORE.APP_EVENT.next({error: json});
        });
}

function createDateData() {

    var today = new Date();

    let date = [];
    for (var i = parseInt(today.getFullYear() - 18); i > 1930; i--) {
        let month = [];
        for (let j = 1; j < 13; j++) {
            let day = [];
            if (j === 2) {
                for (let k = 1; k < 29; k++) {
                    day.push(k);
                }
                if (i % 4 === 0) {
                    day.push(29);
                }
            }
            else if (j in {1: 1, 3: 1, 5: 1, 7: 1, 8: 1, 10: 1, 12: 1}) {
                for (let k = 1; k < 32; k++) {
                    day.push(k);
                }
            }
            else {
                for (let k = 1; k < 31; k++) {
                    day.push(k);
                }
            }
            let _month = {};
            _month[j] = day;
            month.push(_month);
        }
        let _date = {};
        _date[i] = month;
        date.push(_date);
    }
    return date;
}

/**
 * Validates the email in the API
 * @param email
 */
function validateEmailAction(email) {
    userService.validateEmail(email)
        .then(async (response) => {
            console.log(`validateEmail:`, email);
            const json = await response.json();
            console.log(`validateEmail:JSON:`, json);

            if (response.ok) {
                APP_STORE.EMAIL_EVENT.next({success: json.detail});
                return;
            }

            APP_STORE.EMAIL_EVENT.next({error: json.detail})
        });
}

/**
 * Validates the username in the API
 * @param username
 */
const validateUsernameAction = (username) => {
    console.log("validateUsernameAction", username);
    userService.validateUsernameService(username)
        .then(async (response) => {
            console.log(`validateUsernameAction:`, username);
            const json = await response.json();
            console.log(`validateUsernameAction:JSON:`, json);
            if (response.ok) {
                APP_STORE.USERNAME_EVENT.next({success: json.detail});
                return;
            }
            APP_STORE.USERNAME_EVENT.next({error: json.detail})
        });
};

function firebaseAction(token) {
    console.log(`firebaseAction: ${token}`);

    userService.tokenFB(token)
        .then(async (response) => {
            console.log(`firebaseAction: ${token}`, response);
            const json = await response.json();
            console.log(`firebaseAction:JSON:`, json);
            if (response.ok) {
                APP_STORE.FIRE_EVENT.next({"tokenFB": json.id.toString()});
                return;
            }
            APP_STORE.APP_EVENT.next({"error": json.detail});
        });
}

export {registerAction, createDateData, validateEmailAction, firebaseAction, validateUsernameAction};
