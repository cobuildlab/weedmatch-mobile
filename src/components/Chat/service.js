import { authHeader, catchErrorAndPropagate , URL,LENGUAGE, authHeaderForm} from '../../utils';
import {APP_STORE} from "../../Store";

export const userService = {
    chats,
};

function chats(pagUrl) {

    const requestOptions = {
        method: 'GET',
        headers: authHeader(APP_STORE.getToken()),
    };

    return fetch(pagUrl, requestOptions);
}