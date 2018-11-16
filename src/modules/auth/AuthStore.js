/**
 * @prettier
 */
// @ts-check
import { FluxStore } from '../../utils/flux-state/index';
import { AsyncStorage } from 'react-native';

/**
 * @typedef {object} UserObject
 * @prop {string} id
 * @prop {string} image_profile
 * @prop {string} token
 * @prop {string} username
 */

export const events = {
    // dispatched from components/login/actions
    ERROR: 'authStore/error',
    /**
     * An object of the shape UserObject
     * @see UserObject
     */
    USER: 'authStore/user',
};

/**
 * Store for the authenticated user
 */
class AuthStore extends FluxStore {
    constructor() {
        super();

        Object.values(events).forEach(eventName => {
            this.addEvent(eventName, (/** @type {unknown} */ value) => {
                AsyncStorage.setItem(eventName, JSON.stringify(value));
                return value;
            });
        });
    }
}

const store = new AuthStore();

export default store;
