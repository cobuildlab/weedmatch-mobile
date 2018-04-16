import {APP_STORE} from '../../Store';
import {strings} from '../../i18n';
import {isValidText} from '../../utils/index'
import {userService} from './service';
import {Logger} from "../../utils";
import ValidationComponent from '../../utils/ValidationComponent';

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
function registerAction(firstName, email, username, password, lat, lon, sex, age) {

    if (verifyAction(firstName, email, username, password, lat, lon, sex, age)) {

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
                }
                            
                APP_STORE.APP_EVENT.next({error: error.detail})
        });
    }
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

export {registerAction, createDateData};