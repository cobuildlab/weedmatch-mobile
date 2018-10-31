import { URL as GLOBAL_URL } from '../utils';
/**
 * @typedef {import('./typings').PlaceEnum} PlaceEnum
 * @typedef {import('./typings').ReasonEnum} ReasonEnum
 */

/**
 * Valid reasons for making a report
 * @type {{ [K: string]: ReasonEnum }}
 */
export const reportReasonEnum = {
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
export const placeEnum = {
    Chat: 'Chat',
    Feed: 'Feed',
    Profile: 'Profile',
};

export const REPORT_API_ENDPOINT_URL = GLOBAL_URL + 'reported/';
