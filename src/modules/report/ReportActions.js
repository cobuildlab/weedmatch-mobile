/**
 * @prettier
 */
import { dispatchEvent } from '../../utils/flux-state';
import * as Validation from './services/typings';

import {
    postChatReport,
    postFeedImageReport,
    postProfileImageReport,
    postSwiperReport,
} from './services/postReport';

/**
 * @typedef {import('./services/typings').ChatReportPOSTParams} ChatReportPOSTParams
 * @typedef {import('./services/typings').ImageFeedReportPOSTParams} ImageFeedReportPOSTParams
 * @typedef {import('./services/typings').ImageProfileReportPOSTParams} ImageProfileReportPOSTParams
 * @typedef {import('./services/typings').SwiperReportPOSTParams} SwiperReportPOSTParams
 * @typedef {ChatReportPOSTParams|ImageFeedReportPOSTParams|ImageProfileReportPOSTParams|SwiperReportPOSTParams} ReportPOSTParams
 */

/**
 * Action to report a user
 * @param {ReportPOSTParams} report
 * @returns {void}
 */
export const reportAction = report => {
    /**
     * @param {boolean} result
     */
    const successCallback = result => {
        // eslint-disable-next-line no-console
        console.log('ReportAction: ', result);
        dispatchEvent('Reported', {});
    };
    /**
     * @param {{ message: string }} e
     */
    const errorCallback = e => {
        dispatchEvent('ReportError', e.message);
    };

    if (Validation.isChatReportPOSTParams(report)) {
        postChatReport(report)
            .then(successCallback)
            .catch(errorCallback);
    } else if (Validation.isImageFeedReportPOSTParams(report)) {
        postFeedImageReport(report)
            .then(successCallback)
            .catch(errorCallback);
    } else if (Validation.isImageProfileReportPOSTParams(report)) {
        postProfileImageReport(report)
            .then(successCallback)
            .catch(errorCallback);
    } else if (Validation.isSwiperReportPOSTParams(report)) {
        postSwiperReport(report)
            .then(successCallback)
            .catch(errorCallback);
    } else {
        errorCallback({
            message: 'Invalid report type'
        })
    }
};
