/**
 * Check is the text is a valid input
 * @param {string} text The text to be tested
 */
import {APP_STATE} from "../State";

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
 * Creates a logger with the prefix
 * @param {string} prefix The prefix to be used
 */
function getLogger(prefix) {
    return {
        info(msg, obj) {
            if (typeof (__DEV__) !== undefined && __DEV__ === true) {
                if (typeof (obj) === undefined)
                    console.info(prefix + ": " + msg);
                else
                    console.info(prefix + ": " + msg, obj);
            }
        },
        log(msg, obj) {
            if (typeof (__DEV__) !== undefined && __DEV__ === true) {
                if (typeof (obj) === undefined)
                    console.log(prefix + ": " + msg);
                else
                    console.log(prefix + ": " + msg, obj);
            }
        },
        warn(msg, obj) {
            if (typeof (__DEV__) !== undefined && __DEV__ === true) {
                if (typeof (obj) === undefined)
                    console.warn(prefix + ": " + msg);
                else
                    console.warn(prefix + ": " + msg, obj);
            }
        },
        error(msg, obj) {
            if (typeof (__DEV__) !== undefined && __DEV__ === true) {
                if (typeof (obj) === undefined)
                    console.error(prefix + ": " + msg);
                else
                    console.error(prefix + ": " + msg, obj);
            }
        },
    }
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

export {isValidText, authHeader, getLogger, catchErrorAndPropagate}