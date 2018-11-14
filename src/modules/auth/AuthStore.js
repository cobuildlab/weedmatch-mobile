/**
 * @prettier
 */
// @ts-check
import { FluxStore } from '../../utils/flux-state/index';

export const events = {
    // dispatched from components/login/actions
    ERROR: 'authStore/error',
    ID: 'authStore/id',
    IMAGE_PROFILE_URL: 'authStore/image-profile-url',
    TOKEN: 'authStore/token',
    USER_NAME: 'authStore/user-name',
};

/**
 * Store for the authenticated user
 */
class AuthStore extends FluxStore {
    constructor() {
        super();

        Object.values(events).forEach(event => {
            this.addEvent(event);
        });
    }
}

const store = new AuthStore();

export default store;
