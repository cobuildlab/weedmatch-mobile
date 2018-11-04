import {FluxStore} from '../../utils/flux-state';

/**
 * Store for the Report Data
 */
class ReportStore extends FluxStore {
    constructor() {
        super();
        // Succesfully Reported User
        this.addEvent('Reported');
        // Error reporting;
        this.addEvent('ReportError');
    }
}

const store = new ReportStore();
export default store;
