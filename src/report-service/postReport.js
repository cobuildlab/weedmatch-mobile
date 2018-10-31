import * as Validation from './typings';
import { errorEnum, REPORT_API_ENDPOINT_URL } from './constants';

/**
 * @typedef {import('./typings').ChatReportPOSTParams} ChatReportPOSTParams
 * @typedef {import('./typings').ImageFeedReportPOSTParams} ImageFeedReportPOSTParams
 * @typedef {import('./typings').ImageProfileReportPOSTParams} ImageProfileReportPOSTParams
 */

/**
 * @param {ChatReportPOSTParams} chatReportParameters
 * @returns {Promise<boolean>} Returns a promise of a boolean, if the boolean
 * is true, the report was made successfully
 * @throws {Error} If the report wasn't sucessfully created
 */
export const postChatReport = chatReportParameters => {
    if (!Validation.isChatReportPOSTParams(chatReportParameters)) {
        throw new Error(
            'chatReportParameters is of wrong type see typings to know the correct schema'
        );
    }

    return fetch(REPORT_API_ENDPOINT_URL, {
        body: JSON.stringify(chatReportParameters),
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
    })
        .then(res => Promise.all([res.ok, res.json()]))
        .then(([ok, json]) => {
            if (ok) {
                if (!Validation.isSuccessResponse(json) && __DEV__) {
                    // eslint-disable-next-line no-console
                    console.warn(
                        'Invalid response from server accompanied by OK response status'
                    );
                }

                // Return true anyways because of the OK response status
                return true;
            }

            // pass json to error handler below
            return json;
        })
        .then(errorJson => {
            if (Validation.isInvalidUserIDErrorResponse(errorJson)) {
                throw new Error(errorEnum.INVALID_USER_ID);
            }

            if (Validation.isInvalidChatIDErrorResponse(errorJson)) {
                throw new Error(errorEnum.INVALID_CHAT_ID);
            }

            if (Validation.isValidationErrorResponse(errorJson)) {
                throw new Error(errorEnum.VALIDATION_ERROR);
            }

            throw new Error(errorEnum.UNKNOWN_ERROR);
        });
};

/**
 * @param {ImageFeedReportPOSTParams} imageFeedReportPOSTParams
 * @returns {Promise<boolean>} Returns a promise of a boolean, if the boolean
 * is true, the report was made successfully
 * @throws {Error} If the report wasn't sucessfully created
 */
export const postFeedImageReport = imageFeedReportPOSTParams => {
    if (!Validation.isImageFeedReportPOSTParams(imageFeedReportPOSTParams)) {
        throw new Error(
            'imageFeedReportPOSTParams is of wrong type see typings to know the correct schema'
        );
    }

    return fetch(REPORT_API_ENDPOINT_URL, {
        body: JSON.stringify(imageFeedReportPOSTParams),
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
    })
        .then(res => Promise.all([res.ok, res.json()]))
        .then(([ok, json]) => {
            if (ok) {
                if (!Validation.isSuccessResponse(json) && __DEV__) {
                    // eslint-disable-next-line no-console
                    console.warn(
                        'Invalid response from server accompanied by OK response status'
                    );
                }

                // Return true anyways because of the OK response status
                return true;
            }

            // pass json to error handler below
            return json;
        })
        .then(errorJson => {
            if (Validation.isInvalidUserIDErrorResponse(errorJson)) {
                throw new Error(errorEnum.INVALID_USER_ID);
            }

            if (Validation.isInvalidFeedImageIDErrorResponse(errorJson)) {
                throw new Error(errorEnum.INVALID_FEED_IMAGE_ID);
            }

            if (Validation.isValidationErrorResponse(errorJson)) {
                throw new Error(errorEnum.VALIDATION_ERROR);
            }

            throw new Error(errorEnum.UNKNOWN_ERROR);
        });
};

/**
 * @param {ImageProfileReportPOSTParams} imageProfileReportPOSTParams
 * @returns {Promise<boolean>} Returns a promise of a boolean, if the boolean
 * is true, the report was made successfully
 * @throws {Error} If the report wasn't sucessfully created
 */
export const postProfileImageReport = imageProfileReportPOSTParams => {
    if (
        !Validation.isImageProfileReportPOSTParams(imageProfileReportPOSTParams)
    ) {
        throw new Error(
            'imageFeedReportPOSTParams is of wrong type see typings to know the correct schema'
        );
    }

    return fetch(REPORT_API_ENDPOINT_URL, {
        body: JSON.stringify(imageProfileReportPOSTParams),
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
    })
        .then(res => Promise.all([res.ok, res.json()]))
        .then(([ok, json]) => {
            if (ok) {
                if (!Validation.isSuccessResponse(json) && __DEV__) {
                    // eslint-disable-next-line no-console
                    console.warn(
                        'Invalid response from server accompanied by OK response status'
                    );
                }

                // Return true anyways because of the OK response status
                return true;
            }

            // pass json to error handler below
            return json;
        })
        .then(errorJson => {
            if (Validation.isInvalidUserIDErrorResponse(errorJson)) {
                throw new Error(errorEnum.INVALID_USER_ID);
            }

            if (Validation.isInvalidProfileImageIDErrorResponse(errorJson)) {
                throw new Error(errorEnum.INVALID_PROFILE_IMAGE_ID);
            }

            if (Validation.isValidationErrorResponse(errorJson)) {
                throw new Error(errorEnum.VALIDATION_ERROR);
            }

            throw new Error(errorEnum.UNKNOWN_ERROR);
        });
};
