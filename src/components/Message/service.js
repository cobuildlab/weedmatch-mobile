import {authHeader, catchErrorAndPropagate , URL} from '../../utils';

export const userService = {
    chatService,
};

/**
 * Get the chats of the user
 * @param token The token of the current user's sesion
 * @returns {Promise<any>}
 */
function chatService(token) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(token)
    };

    return fetch(URL + 'getchat/', requestOptions);
}
