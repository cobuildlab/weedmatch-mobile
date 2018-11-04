import {URL as GLOBAL_URL} from "../../utils";

/**
 * @typedef {import('./services/typings').PlaceEnum} PlaceEnum
 * @typedef {import('./services/typings').ReasonEnum} ReasonEnum
 */

/**
 * @typedef {'BULLYING'|'HATE'|'INFRINGEMENT'|'INJURY'|'PORN'|'SALE'|'SPAM'|'VIOLENCE'} ReportReasonEnumKey
 */



export default 'REPORT_ROUTE_KEY';
/**
 * Valid reasons for making a report
 * @type {{ [K in ReportReasonEnumKey]: ReasonEnum }}
 */
export const REPORT_REASON_ENUM = {
    BULLYING: 'Harassment or bullying',
    HATE: 'Language or symbols that incite hatred',
    INFRINGEMENT: 'Infringement of intellectual property',
    INJURY: 'Self-injury',
    PORN: 'Pornography or Nudes',
    SALE: 'Sale or promotion of drugs',
    SPAM: 'Spam or Fraud',
    VIOLENCE: 'Violence or threat of violence',
};
/**
 * Valid values for the key `place` when for making a report, depending on the
 * type of the report being made
 * @type {{ [k in PlaceEnum]: PlaceEnum }}
 */
export const PLACE_ENUM = {
    Chat: 'Chat',
    Feed: 'Feed',
    Profile: 'Profile',
};
export const ERROR_ENUM = {
    INVALID_CHAT_ID: 'INVALID_CHAT_ID',
    INVALID_FEED_IMAGE_ID: 'INVALID_FEED_IMAGE_ID',
    INVALID_PROFILE_IMAGE_ID: 'INVALID_PROFILE_IMAGE_ID',
    INVALID_USER_ID: 'INVALID_USER_ID',
    UNKNOWN_ERROR: 'UNKNOWN_ERROR',
    /**
     * There's an error inside the post function because it doesn't validate
     * the parameters before sending them
     */
    VALIDATION_ERROR: 'VALIDATION_ERROR',
};
export const REPORT_API_ENDPOINT_URL = GLOBAL_URL + 'reported/';
