/**
 * @prettier
 */
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
 * @throws {TypeError}
 * @returns {o is Object}
 */
const isObject = o => {
    if (typeof o !== 'object' || Array.isArray(o))
        throw new TypeError('Expected an object for a report');
    return true;
};

// -----------------------------------------------------------------------------

/**
 * An enum for the `place` key in all of the POST json body parameters. Each one
 * corresponds exclusively to the type of the report being made.
 * @typedef {"Chat"|"Feed"|"Profile"|"Swiper"} PlaceEnum
 */

/**
 * @param {string} str
 * @throws {TypeError}
 * @return {str is PlaceEnum}
 */
const stringIsPlaceEnum = str => {
    if (typeof str !== 'string') {
        throw new TypeError(
            `Expected report.place to be an string instead got: ${typeof str}`
        );
    }
    // @ts-ignore Typescript wants us to pass a value that is an actual value of
    // the object (a PlaceEnum), but that is what we are actually checking here
    // so that typecheck makes no sense
    if (!Object.values(PLACE_ENUM).includes(str)) {
        throw new TypeError(
            `Expected report.place to be: ${Object.values(
                PLACE_ENUM
            )} but instead got: ${str}`
        );
    }

    return true;
};

// -----------------------------------------------------------------------------

/**
 * An enum for the `reason` key in all of the POST json body parameters
 * @typedef {"Spam or Fraud"|"Pornography or Nudes"|"Language or symbols that incite hatred"|"Violence or threat of violence"|"Sale or promotion of drugs"|"Harassment or bullying"|"Infringement of intellectual property"|"Self-injury"} ReasonEnum
 */

/**
 * @param {string} str
 * @throws {TypeError}
 * @returns {str is ReasonEnum}
 */
const stringIsReasonEnum = str => {
    if (typeof str !== 'string') {
        throw new TypeError(
            `Expected report.reason to be an string instead got: ${typeof str}`
        );
    }
    // @ts-ignore Typescript wants us to pass a value that is an actual value of
    // the object (a ReasonEnum), but that is what we are actually checking here
    // so that typecheck makes no sense
    if (!Object.values(REPORT_REASON_ENUM).includes(str)) {
        throw new TypeError(
            `Expected report.place to be: ${Object.values(
                REPORT_REASON_ENUM
            )} but instead got: ${str}`
        );
    }

    return true;
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
 * @throws {TypeError}
 * @returns {o is _BaseReportPOSTParams}
 */
const isBaseReportPOSTParams = o => {
    isObject(o);
    if (typeof o.comment !== 'string') {
        throw new TypeError(`
            Expected o.comment to be an string instead got: ${typeof o.comment}
        `);
    }
    stringIsReasonEnum(o.reason);
    stringIsPlaceEnum(o.place);
    if (typeof o.reported_user !== 'string') {
        throw new TypeError(`
            Expected o.reported_user to be an string instead got: ${typeof o.reported_user}
        `);
    }
    if (typeof o.place !== 'string') {
        throw new TypeError(`
            Expected o.place to be an string instead got: ${typeof o.place}
        `);
    }

    return true;
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
 * @param {any} o
 * @throws {TypeError}
 * @returns {o is ImageFeedReportPOSTParams}
 */
export const validateImageFeedReport = o => {
    isBaseReportPOSTParams(o);

    if (o.place !== PLACE_ENUM.Feed) {
        throw new TypeError(
            `Called isImageFeedReportPOSTParams on a report with report.place not ${
                PLACE_ENUM.Feed
            }`
        );
    }

    /**
     * Type assertion required here because after doing
     * `isBaseReportPOSTParams(o)`, `o` becomes of type `_BaseReportPOSTParams`
     * and typescript starts throwing errors till the end of the function
     * @type {any}
     */
    const obj = o;

    if (typeof obj.image_feed !== 'string') {
        throw new TypeError(`
            Expected o.image_feed to be an string instead got: ${typeof obj.image_feed}
        `);
    }

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
 * @throws {TypeError}
 * @returns {o is ImageProfileReportPOSTParams}
 */
export const validateImageProfileReport = o => {
    isBaseReportPOSTParams(o);

    if (o.place !== PLACE_ENUM.Profile) {
        throw new TypeError(
            `Called isImageProfileReportPOSTParams on a report with report.place not ${
                PLACE_ENUM.Profile
            }`
        );
    }

    /**
     * Type assertion required here because after doing
     * `isBaseReportPOSTParams(o)`, `o` becomes of type `_BaseReportPOSTParams`
     * and typescript starts throwing errors till the end of the function
     * @type {any}
     */
    const obj = o;

    if (typeof obj.image_profile !== 'string') {
        throw new TypeError(`
            Expected report.image_profile to be an string instead got: ${typeof obj.image_profile}
        `);
    }

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
 * @param {any} o
 * @throws {TypeError}
 * @returns {o is ChatReportPOSTParams}
 */
export const validateChatReport = o => {
    isBaseReportPOSTParams(o);

    if (o.place !== PLACE_ENUM.Chat) {
        throw new TypeError(
            `Called isChatReportPOSTParams on a report with report.place not ${
                PLACE_ENUM.Chat
            }`
        );
    }

    /**
     * Type assertion required here because after doing
     * `isBaseReportPOSTParams(o)`, `o` becomes of type `_BaseReportPOSTParams`
     * and typescript starts throwing errors till the end of the function
     * @type {any}
     */
    const obj = o;

    if (typeof obj.chat !== 'string') {
        throw new TypeError(`
            Expected report.chat to be an string instead got: ${typeof obj.chat}
        `);
    }

    return true;
};

// -----------------------------------------------------------------------------
/**
 * Parameters exclusive to a report of an swiper image (which is the profile
 * image actually, but the backend records the place where it was reported)
 * @typedef {object} _SwiperReportPOSTParams
 * @prop {string} image_profile ID of the image being reported
 * @prop {'Swiper'} place A constant telling the backend this is an
 * swiper report
 */

/**
 * Parameters of the POST json body for making an swiper report.
 * @typedef {_BaseReportPOSTParams & _SwiperReportPOSTParams} SwiperReportPOSTParams
 */

/**
 * @param {any} o
 * @throws {TypeError}
 * @returns {o is SwiperReportPOSTParams}
 */
export const validateSwiperReport = o => {
    isBaseReportPOSTParams(o);

    if (o.place !== PLACE_ENUM.Swiper) {
        throw new TypeError(
            `Called isSwiperReportPOSTParams on a report with report.place not ${
                PLACE_ENUM.Swiper
            }`
        );
    }

    /**
     * Type assertion required here because after doing
     * `isBaseReportPOSTParams(o)`, `o` becomes of type `_BaseReportPOSTParams`
     * and typescript starts throwing errors till the end of the function
     * @type {any}
     */
    const obj = o;

    if (typeof obj.image_profile !== 'string') {
        throw new TypeError(`
            Expected report.image_profile to be an string instead got: ${typeof obj.image_profile}
        `);
    }

    return true;
};

// -----------------------------------------------------------------------------

/**
 * @typedef {ChatReportPOSTParams|ImageFeedReportPOSTParams|ImageProfileReportPOSTParams|SwiperReportPOSTParams} ReportPOSTParams
 */
