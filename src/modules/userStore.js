/**
 * @prettier
 */
// @ts-check
import { FluxStore } from '../utils/flux-state';

/**
 * Store for the Report Data
 */
class UserStore extends FluxStore {
    constructor() {
        super();
        // Info for the
        this.addEvent('user/info');
    }
}

const userStore = new UserStore();

export default userStore;
