/**
 * @prettier
 */
import { FluxStore } from '../../utils/flux-state';

export const events = {
    ON_FEED: 'onFeed',
    ON_UPLOAD_PHOTO: 'onUploadPhoto',
    ON_FEED_ERROR: 'onFeedError',
};

/**
 * Store for the Report Data
 */
class FeedStore extends FluxStore {
    constructor() {
        super();
        // Feed Data
        this.addEvent(events.ON_FEED);
        this.addEvent(events.ON_FEED_ERROR);
        this.addEvent(events.ON_UPLOAD_PHOTO);
    }
}

const store = new FeedStore();

export default store;
