import { authHeader } from '../../utils';
import { APP_STORE } from '../../Store';

function chats(pagUrl) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(APP_STORE.getToken()),
    };

    return fetch(pagUrl, requestOptions);
}

export const userService = {
    chats,
};
