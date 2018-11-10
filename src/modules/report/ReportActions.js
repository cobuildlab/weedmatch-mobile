/**
 * @prettier
 */
import { dispatchEvent } from '../../utils/flux-state';

import { postReport } from './services/postReport';

/**
 * @typedef {import('./services/typings').ReportPOSTParams} ReportPOSTParams
 */

/**
 * Action to report a user
 * @param {ReportPOSTParams} report
 * @returns {void}
 */
export const reportAction = report => {
    dispatchEvent('Reported', 'SENDING_REPORT');

    /**
     * @param {boolean} result
     */
    const successCallback = result => {
        // eslint-disable-next-line no-console
        console.log('ReportAction: ', result);
        dispatchEvent('Reported', 'REPORT_SENT');
    };

    /**
     * @param {{ message: string }} e
     */
    const errorCallback = e => {
        dispatchEvent('ReportError', e.message);
    };

    try {
        postReport(report)
            .then(successCallback)
            .catch(errorCallback);
    } catch (e) {
        // catch synchronous errors
        errorCallback(e);
    }
};
