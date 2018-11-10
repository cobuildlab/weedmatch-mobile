import {APP_STORE} from '../../../Store';

import * as Validation from './typings';
import {REPORT_API_ENDPOINT_URL, PLACE_ENUM} from '../index';
import {ERROR_ENUM} from "../index";

/**
 * @typedef {import('./typings').ChatReportPOSTParams} ChatReportPOSTParams
 * @typedef {import('./typings').ImageFeedReportPOSTParams} ImageFeedReportPOSTParams
 * @typedef {import('./typings').ImageProfileReportPOSTParams} ImageProfileReportPOSTParams
 * @typedef {import('./typings').SwiperReportPOSTParams} SwiperReportPOSTParams
 * @typedef {ChatReportPOSTParams|ImageFeedReportPOSTParams|ImageProfileReportPOSTParams|SwiperReportPOSTParams} ReportPOSTParams
 */



/**
 * @param {ReportPOSTParams} report
 * @returns {Promise<boolean>} Returns a promise of a boolean, if the boolean
 * is true, the report was made successfully
 * @throws {TypeError} if the parameters aren't of the correct type
 */
export const postReport = report => {
    const headers = {
        Authorization: `Token ${APP_STORE.getToken()}`,
        'Content-Type': 'application/json',
    };

    switch(report.place) {
        case PLACE_ENUM.Chat:
            Validation.validateChatReport(report)
            break;
        case PLACE_ENUM.Feed:
            Validation.validateImageFeedReport(report)
            break
        case PLACE_ENUM.Profile:
            Validation.validateImageProfileReport(report)
            break
        case PLACE_ENUM.Swiper:
            Validation.validateSwiperReport(report)
            break
        default:
            throw new TypeError(`Unexpected report.place, got: ${report.place}`)
    }
 
    return fetch(REPORT_API_ENDPOINT_URL, {
        body: JSON.stringify(report),
        headers,
        method: 'POST',
    })
        .then(res => res.ok)
};
