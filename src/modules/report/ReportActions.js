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
    /**
     * @param {Response} res
     */
    const successCallback = async res => {
        if (res.ok) {
            dispatchEvent('Reported', 'REPORT_SENT');
        } else {
            const json = await res.json();
            const detail =
                typeof json.detail != 'string' ? 'UNKNOWN_ERROR' : json.detail;

            dispatchEvent('ReportError', detail);
        }
    };

    /**
     * @param {{ message: string }} e
     */
    const errorCallback = e => {
        dispatchEvent('ReportError', e.message);

        console.warn(e.message);
    };

    try {
        postReport(report)
            .then(successCallback)
            .catch(errorCallback);
    } catch (e) {
        console.warn(e.message);
        // catch synchronous errors
        errorCallback(e);
    }
};
