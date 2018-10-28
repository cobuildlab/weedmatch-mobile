import {authHeader, URL} from '../../utils';

export const userService = {
    swiper,
    swiperAction
};

/**
 * Get the data of the user to show in the swiper
 * @param token The Toekn of the user
 * @param pagUrl The url of the object the get
 * @returns {Promise<any>}
 */
function swiper(token, pagUrl) {

    const requestOptions = {
        method: 'GET',
        headers: authHeader(token),
    };

    return fetch(pagUrl, requestOptions);
}

/**
 * Do the action of swiper (like,dislike,super)
 * @param token The Token of the user
 * @param action The Token of the user
 * @param state The current state of render screen
 * @returns {Promise<any>}
 */
function swiperAction(token, action, id, time) {

    const data = {
        "user_match": id.toString(),
        "action": action,
        "time": time
    }

    const requestOptions = {
        method: 'POST',
        headers: authHeader(token),
        body: JSON.stringify(data)
    };

    return fetch(URL + 'swiper/', requestOptions);
}
