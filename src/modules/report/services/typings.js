/**
 * Type definitions used in the report service module.
 * JSON schemas taken from: https://github.com/4geeks/weedmatch-backend/blob/02b1750b78f4c26fa4383cab3aec09a309073555/documentations/services_endpoint/report_services.md
 * However, the schema has some typos which will be corrected here and may not
 * reflect the docs linked above.
 * @author danlugo92
 */

import { PLACE_ENUM } from '../index';
import { REPORT_REASON_ENUM } from '../index';

/**
 * @param {any} o
 * @returns {o is Object}
 */
const isObject = o => typeof o === 'object' && !Array.isArray(o);

/**
 * An enum for the `place` key in all of the POST json body parameters. Each one
 * corresponds exclusively to the type of the report being made.
 * @typedef {"Chat"|"Feed"|"Profile"} PlaceEnum
 */

/**
 * @param {string} str
 * @return {str is PlaceEnum}
 */
const stringIsPlaceEnum = str => {
    if (typeof str !== 'string') return false;
    // @ts-ignore Typescript wants us to pass a value that is an actual value of
    // the object (a PlaceEnum), but that is what we are actually checking here
    // so that typecheck makes no sense
    return Object.values(PLACE_ENUM).includes(str);
};

/**
 * An enum for the `reason` key in all of the POST json body parameters
 * @typedef {"Spam or Fraud"|"Pornography or Nudes"|"Language or symbols that incite hatred"|"Violence or threat of violence"|"Sale or promotion of drugs"|"Harassment or bullying"|"Infringement of intellectual property"|"Self-injury"} ReasonEnum
 */

/**
 * @param {string} str
 * @returns {str is ReasonEnum}
 */
const stringIsReasonEnum = str => {
    if (typeof str !== 'string') return false;
    // @ts-ignore Typescript wants us to pass a value that is an actual value of
    // the object (a ReasonEnum), but that is what we are actually checking here
    // so that typecheck makes no sense
    return Object.values(REPORT_REASON_ENUM).includes(str);
};

// -----------------------------------------------------------------------------

/**
 * Parameters common to all reports
 * @typedef {object} _BaseReportPOSTParams
 * @prop {string} comment Comment from the user creating the report
 * @prop {ReasonEnum} reason
 * @prop {string} reported_user User id that will be reported, the one doing the
 * transgression
 * @prop {PlaceEnum} place
 */

/**
 * @param {any} o
 */
export const validateReport = o => {
    if (!isObject(o)) throw new Error('Object Expected');
    if (typeof o.comment !== 'string')
        throw new Error('`comment` of type string expected');
    if (typeof o.reason !== 'string')
        throw new Error('`reason` of type string expected');
    if (!stringIsReasonEnum(o.reason))
        throw new Error(
            `invalid value for 'reason' expecting: ${Object.values(
                REPORT_REASON_ENUM
            )}`
        );
    if (typeof o.reported_user !== 'string')
        throw new Error('`reported_user` of type string expected');
    if (typeof o.place !== 'string')
        throw new Error('`place` of type string expected');
    if (!stringIsPlaceEnum(o.place))
        throw new Error(
            `invalid value for 'place' expecting: ${Object.values(PLACE_ENUM)}`
        );
};

// -----------------------------------------------------------------------------

/**
 * Parameters exclusive to a report of an image feed
 * @typedef {object} _ImageFeedReportPOSTParams
 * @prop {string} image_feed Id of the image in the image feed, that is going to
 * to be reported
 * @prop {'Feed'} place A constant telling the backend this is an image
 * feed report
 */

/**
 * Parameters of the POST json body for making an image feed report
 * @typedef {_BaseReportPOSTParams & _ImageFeedReportPOSTParams} ImageFeedReportPOSTParams
 */

/**
 * The keys of an ImageFeedReport POST json body
 * @typedef {keyof ImageFeedReportPOSTParams} ImageFeedReportPOSTParamsKeys
 */

/**
 * Error response received when one of the POST json body parameters of a
 * ImageFeedReport is of the wrong type. The strings in the array of each key
 * inside the object `detail` is the reasons the validation for that parameter
 * failed.
 * @typedef {object} ImageFeedReportValidationErrorResponse
 * @prop {Partial<Record<ImageFeedReportPOSTParamsKeys, ReadonlyArray<string>>>} detail
 */

/**
 * @param {any} o
 * @returns {o is ImageFeedReportPOSTParams}
 */
export const isImageFeedReportPOSTParams = o => {
    validateReport(o);

    /**
     * Type assertion required here because after doing
     * `isBaseReportPOSTParams(o)`, `o` becomes of type `_BaseReportPOSTParams`
     * and typescript starts throwing errors till the end of the function
     * @type {any}
     */
    const obj = o;

    if (typeof obj.image_feed !== 'string') return false;
    if (obj.place !== PLACE_ENUM.Feed) return false;
    return true;
};

/**
 * The response if the id of an image feed image being reported isn't valid
 * @typedef {object} InvalidFeedImageIDErrorResponse
 * @prop {{ image_feed: string }} detail An object with a `image_feed` property
 * containing the relevant error message
 */

/**
 * @param {any} o
 * @returns {o is InvalidFeedImageIDErrorResponse}
 */
export const isInvalidFeedImageIDErrorResponse = o => {
    if (!isObject(o)) return false;
    if (!isObject(o.detail)) return false;
    if (typeof o.image_feed !== 'string') return false;
    return true;
};

// -----------------------------------------------------------------------------

/**
 * Parameters exclusive to a report of a profile image
 * @typedef {object} _ImageProfileReportPOSTParams
 * @prop {string} image_profile Id of the profile picture (not the same as the
 * user id)
 * @prop {'Profile'} place A constant telling the backend this is an image
 * profile report
 */

/**
 * Parameters of the POST json body for making an image profile report
 * @typedef {_BaseReportPOSTParams & _ImageProfileReportPOSTParams} ImageProfileReportPOSTParams
 */

/**
 * The keys of an ImageProfileReport POST json body
 * @typedef {keyof ImageProfileReportPOSTParams} ImageProfileReportPOSTParamsKeys
 */

/**
 * Error response received when one of the POST json body parameters of a
 * ImageProfileReport is of the wrong type. The strings in the array of each key
 * inside the object `detail` is the reasons the validation for that parameter
 * failed.
 * @typedef {object} ImageProfileReportValidationErrorResponse
 * @prop {Partial<Record<ImageProfileReportPOSTParamsKeys, ReadonlyArray<string>>>} detail
 */

/**
 * @param {any} o
 * @returns {o is ImageProfileReportPOSTParams}
 */
export const isImageProfileReportPOSTParams = o => {
    validateReport(o);

    /**
     * Type assertion required here because after doing
     * `isBaseReportPOSTParams(o)`, `o` becomes of type `_BaseReportPOSTParams`
     * and typescript starts throwing errors till the end of the function
     * @type {any}
     */
    const obj = o;

    if (typeof obj.image_profile !== 'string') return false;
    if (obj.place !== PLACE_ENUM.Profile) return false;
    return true;
};

/**
 * @typedef {object} InvalidProfileImageIDErrorResponse
 * @prop {{ image_profile: string }} detail An object with a `image_profile`
 * property containing the relevant error message
 */

/**
 * @param {any} o
 * @returns {o is InvalidProfileImageIDErrorResponse}
 */
export const isInvalidProfileImageIDErrorResponse = o => {
    if (!isObject(o)) return false;
    if (!isObject(o.detail)) return false;
    if (typeof o.detail.image_profile !== 'string') return false;
    return true;
};

// -----------------------------------------------------------------------------

/**
 * Parameters exclusive to a report of a chat
 * @typedef {object} _ChatReportPOSTParams
 * @prop {string} chat Id of the chat being reported
 * @prop {'Chat'} place A constant telling the backend this is a chat report
 */

/**
 * Parameters of the POST json body for making a chat report
 * @typedef {_BaseReportPOSTParams & _ChatReportPOSTParams} ChatReportPOSTParams
 */

/**
 * The keys of an ChatReport POST json body
 * @typedef {keyof ChatReportPOSTParams} ChatReportPOSTParamsKeys
 */

/**
 * Error response received when one of the POST json body parameters of a
 * ChatReport is of the wrong type. The strings in the array of each key
 * inside the object `detail` is the reasons the validation for that parameter
 * failed.
 * @typedef {object} ChatReportValidationErrorResponse
 * @prop {Partial<Record<ChatReportPOSTParamsKeys, ReadonlyArray<string>>>} detail
 */

/**
 * @param {any} o
 * @returns {o is ChatReportPOSTParams}
 */
export const isChatReportPOSTParams = o => {
    validateReport(o);

    /**
     * Type assertion required here because after doing
     * `isBaseReportPOSTParams(o)`, `o` becomes of type `_BaseReportPOSTParams`
     * and typescript starts throwing errors till the end of the function
     * @type {any}
     */
    const obj = o;

    if (typeof obj.chat !== 'string')
        throw new Error('`chat` of type string expected');
    if (obj.place !== PLACE_ENUM.Chat)
        throw new Error('wrong value for `place` of type string expected');
    return true;
};

/**
 * @typedef {object} InvalidChatIDErrorResponse
 * @prop {{ chat: string }} detail An object with a `chat` property containing
 * the relevant error message
 */

/**
 * @param {any} o
 * @returns {o is InvalidChatIDErrorResponse}
 */
export const isInvalidChatIDErrorResponse = o => {
    if (!isObject(o)) return false;
    if (!isObject(o.detail)) return false;
    if (typeof o.detail.chat !== 'string') return false;
    return true;
};

// -----------------------------------------------------------------------------

/**
 * Shape of a successful response for all types of reports.
 * @typedef {object} SuccessResponse
 * @prop {string} detail Sucess message.
 */

/**
 * @param {any} o
 * @returns {o is SuccessResponse}
 */
export const isSuccessResponse = o => {
    if (!isObject(o)) return false;
    if (typeof o.detail !== 'string') return false;
    return true;
};

// -----------------------------------------------------------------------------

/**
 * Shape of response when `reported_user` from the POST params is not a valid
 * user id (doesn't exist)
 * @typedef {object} InvalidUserIDErrorResponse
 * @prop {{ reported_user: string }} detail An object with a `reported_user`
 * property containing the relevant error message
 */

/**
 * @param {any} o
 * @returns {o is InvalidUserIDErrorResponse}
 */
export const isInvalidUserIDErrorResponse = o => {
    if (!isObject(o)) return false;
    if (!isObject(o.detail)) return false;
    if (typeof o.detail.reported_user !== 'string') return false;
    return true;
};

// -----------------------------------------------------------------------------

/**
 * Use this function to see if the response is a cerberus validation response
 * then typecast to the expected response type
 * @param {any} o
 * @returns {o is ImageFeedReportValidationErrorResponse|ImageProfileReportValidationErrorResponse|ChatReportValidationErrorResponse}
 */
export const isValidationErrorResponse = o => {
    if (!isObject(o)) return false;
    if (!isObject(o.detail)) return false;
    const possiblyStringArrays = Object.values(o.detail);
    // an empty object, with no validation warnings? obviously not a valid
    // response
    if (possiblyStringArrays.length === 0) return false;
    // Conversely, each array should be populated with at least one validation
    // error message
    const areTheyAllPopulatedArrays = possiblyStringArrays.every(
        arr => Array.isArray(arr) && arr.length > 0
    );
    if (!areTheyAllPopulatedArrays) return false;

    const areTheyAllStringArrays = possiblyStringArrays.every(subArr =>
        subArr.every(
            (/** @type {unknown} */ possiblyString) =>
                typeof possiblyString === 'string'
        )
    );

    return areTheyAllStringArrays;
};

// Keep typescript and eslint off from bugging about no exports
