import { URL as GLOBAL_URL } from '../utils';
/**
 * @typedef {import('./definitions').ReasonEnum} ReasonEnum
 */

/**
 * Valid reasons for making a report
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

export const REPORT_API_ENDPOINT_URL = GLOBAL_URL + 'reported/';
