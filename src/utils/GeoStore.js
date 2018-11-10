import {FluxStore} from './flux-state';

/**
 * Store for the Geolocalization Data
 */
class GeoStore extends FluxStore {
    constructor() {
        super();
        // Succesfully Acquire GeoData
        this.addEvent('GeoData');
    }
}

const store = new GeoStore();
export default store;
