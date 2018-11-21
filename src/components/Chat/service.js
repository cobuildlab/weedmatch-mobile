import { authHeader } from '../../utils';
import { APP_STORE } from '../../Store';

/**
 * @param {string} pagUrl
 */
function chats(pagUrl) {
    iif (__DEV__) {
        // eslint-disable-next-line no-console
        console.log('Chat::ChatServices::chats', pagUrl);
    }

    const requestOptions = {
        headers: authHeader(APP_STORE.getToken()),
        method: 'GET',
    };

    return fetch(pagUrl, requestOptions);
}

export const userService = {
    chats,
};
