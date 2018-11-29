/**
 * @prettier
 */
// @ts-check
import {FluxStore} from '../../utils/flux-state/index';
import {AsyncStorage} from 'react-native';

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
     * The profile Image
     *
     */
    PROFILE_IMAGE: 'authStore/profile-image',
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
        this.addEvent(events.USER, (/** @type {unknown} */ value) => {
            AsyncStorage.setItem(events.USER, JSON.stringify(value));
            return value;
        });
        this.addEvent(events.ERROR);
        this.addEvent(events.PROFILE_IMAGE);
    }
}

const store = new AuthStore();

export default store;
