import { APP_STORE } from '../../Store';
import { URL as GLOBAL_URL } from '../../utils';

export const fetchChat = () => {
    const headers = {
        Authorization: `Token ${APP_STORE.getToken()}`,
        'Content-Type': 'application/json',
    };

    return fetch(`${GLOBAL_URL}getchat/`, {
        headers,
        method: 'GET'
    })
};

export const touchChatMessage = messageId => {
    const headers = {
        Authorization: `Token ${APP_STORE.getToken()}`,
        'Content-Type': 'application/json',
    };

    return fetch(`${GLOBAL_URL}messages/${messageId}/read/`, {
        headers,
        method: 'POST'
    })
};
