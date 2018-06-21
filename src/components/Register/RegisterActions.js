import {APP_STORE} from '../../Store';
import {strings} from '../../i18n';
import {isValidText} from '../../utils/index'
import {userService} from './service';
import {Logger} from "../../utils";
import { AccessToken, LoginManager} from 'react-native-fbsdk';

/**
 *
 * @param firstName
 * @param email
 * @param username
 * @param password
 * @param lat
 * @param lon
 * @param sex
 * @param age
 * @returns A boolean value 
 */
function verifyAction(firstName, email, username, password, lat, lon, sex, age) {
    if (!isValidText(firstName)) {
        APP_STORE.APP_EVENT.next({error: strings("register.errorFullName")});
        return false
    }
    if (!isValidText(email)) {
        APP_STORE.APP_EVENT.next({error: strings("register.errorEmail")});
        return false
    }
    if (!isValidText(username)) {
        APP_STORE.APP_EVENT.next({error: strings("register.errorUsername")});
        return false
    }
    if (!isValidText(password)) {
        APP_STORE.APP_EVENT.next({error: strings("register.errorPassword")});
        return false
    }
    if (!isValidText(sex)) {
        APP_STORE.APP_EVENT.next({error: strings("register.errorSex")});
        return false
    }
    if (!isValidText(age)) {
        APP_STORE.APP_EVENT.next({error: strings("register.errorAge")});
        return false
    }
    if (Number.isNaN(lat)) {
        lat = 0
    }
    if (Number.isNaN(lon)) {
        lon = 0
    }

    return true
}

/**
 *
 * @param firstName
 * @param email
 * @param username
 * @param password
 * @param lat
 * @param lon
 * @param sex
 * @param age
 */
function registerAction(firstName, email, password, lat, lon, sex, age, image) {

    const data = new FormData();
    var re = /(?:\.([^.]+))?$/;
    var ext = re.exec(image)[1];

    data.append('first_name', firstName);
    data.append('email', email);
    data.append('password', password);
    data.append('latitud', lat);
    data.append('longitud', lon);
    data.append('sex', sex);
    data.append('age', age);
    data.append('image', {
        uri: image,
        type: 'image/' + ext,
        name: 'photo.' + ext
    });

    userService.postRegister(data)
        .then(async (response) => {
            console.log(`registerAction:`, data);
            console.log(`response:`, response);
            const json = await response.json();
            console.log(`registerAction:JSON:`, json);

            if (response.ok) {
                APP_STORE.APP_EVENT.next({"success": json.detail})
                APP_STORE.TOKEN_EVENT.next({"token": json.token});
                APP_STORE.ID_EVENT.next({"id": json.id.toString()});
            return;
            }
                        
            APP_STORE.APP_EVENT.next({error: json.detail})
    });
}

function createDateData() {

    var today = new Date();
    var _month = parseInt(today.getMonth()+1);
    var _today = parseInt(today.getDate());

        let date = [];
        for(var i=parseInt(today.getFullYear()-18);i>1930;i--){
            let month = [];
            for(let j = 1;j<13;j++){
                let day = [];
                if(j === 2){
                    for(let k=1;k<29;k++){
                        day.push(k);
                    }
                    if(i%4 === 0){
                        day.push(29);
                    }
                }
                else if(j in {1:1, 3:1, 5:1, 7:1, 8:1, 10:1, 12:1}){
                    for(let k=1;k<32;k++){
                        day.push(k);
                    }
                }
                else{
                    for(let k=1;k<31;k++){
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


function validateEmail(email) {
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
                                    APP_STORE.APP_EVENT.next({"success": json.image_profile})
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

export {registerAction, createDateData, validateEmail,facebookAction,firebaseAction};