import { authHeader } from '../../utils';
import { APP_STORE } from '../../Store';

function chats(pagUrl) {
    const requestOptions = {
        headers: authHeader(APP_STORE.getToken()),
        method: 'GET',
    };

    return fetch(pagUrl, requestOptions);
}

export const userService = {
    chats,
};
