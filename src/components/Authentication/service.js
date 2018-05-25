import { URL ,LENGUAGE} from '../../utils';

export const userService = {
    facebookHandle,
};

/**
 * Login/Register facebook action
 * @param token The facebook access token
 * @param state The state of the current screen
 * @returns {Promise<any>}
 */
function facebookHandle(token,state) {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept-Language': LENGUAGE
      },
      body: JSON.stringify({
        "access_token": token,
        "latitud":state.latitud,
        "longitud":state.longitud
      })
    }
    return fetch(URL + 'login-facebook/', requestOptions);
}