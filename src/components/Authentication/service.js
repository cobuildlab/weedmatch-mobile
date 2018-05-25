import { URL ,LENGUAGE} from '../../utils';

export const userService = {
    facebookHandle,
};

/**
 * Login/Register facebook action
 * @param token The facebook access token
 * @returns {Promise<any>}
 */
function facebookHandle(token) {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept-Language': LENGUAGE
      },
      body: JSON.stringify({"access_token": token})
    }
    return fetch(URL + 'login-facebook/', requestOptions);
}