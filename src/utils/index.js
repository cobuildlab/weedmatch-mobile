/**
 * Check is the text is a valid input
 * @param {string} text The text to be tested
 */
import {APP_STATE} from "../Store";

function isValidText(text) {
    if (text == null) {
        return false;
    }
    if (typeof(text) === undefined) {
        return false;
    }
    if (text === "") {
        return false;
    }
    return true
}

/**
 * Headers for Authorization
 * @param {string} token The token to be used
 */
function authHeader(token) {
    return {'Authorization': 'Token ' + token};
}

/**
 * Propagate an Error in to the
 * @param {Error} err error to be propagated
 * @throws {Error} the error that receives
 */
function catchErrorAndPropagate(err) {
    APP_STATE.next({error: String(err)});
    throw err;
}

export {isValidText, authHeader, catchErrorAndPropagate}