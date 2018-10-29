/**
 * Type definitions used in the report service module.
 * JSON schemas taken from: https://github.com/4geeks/weedmatch-backend/blob/02b1750b78f4c26fa4383cab3aec09a309073555/documentations/services_endpoint/report_services.md
 * However, the schema has some typos which will be corrected here and may not
 * reflect the docs linked above.
 * @author danlugo92
 */

/**
 * @typedef {"Spam or Fraud"|"Pornography or Nudes"|"Language or symbols that incite hatred"|"Violence or threat of violence"|"Sale or promotion of drugs"|"Harassment or bullying"|"Infringement of intellectual property"|"Self-injury"} ReasonEnum
 */

/**
 * Parameters common to all reports
 * @typedef {object} _BaseReportPOSTParams
 * @prop {string} comment Comment from the user creating the report
 * @prop {ReasonEnum} reason
 * @prop {number} reported_user User id that will be reported, the one doing the
 * transgression
 */

/**
 * Parameters exclusive to a report of an image feed
 * @typedef {object} _ImageFeedReportPOSTParams
 * @prop {number} image_feed Id of the image in the image feed, that is going to
 * to be reported
 * @prop {'Feed'} place A constant telling the backend this is an image
 * feed report
 */

/**
 * Parameters of the API for making an image feed report
 * @typedef {_BaseReportPOSTParams & _ImageFeedReportPOSTParams} ImageFeedReportPOSTParams
 */

/**
 * Parameters exclusive to a report of a profile image
 * @typedef {object} _ImageProfileReportPOSTParams
 * @prop {number} image_profile Id of the profile picture (not the same as the
 * user id)
 * @prop {'Profile'} place A constant telling the backend this is an image
 * profile report
 */

/**
 * Parameters of the API for making an image profile report
 * @typedef {_BaseReportPOSTParams & _ImageProfileReportPOSTParams} ImageProfileReportPOSTParams
 */

/**
 * Parameters exclusive to a report of a chat
 * @typedef {object} _chatReportPOSTParams
 * @prop {number} chat Id of the chat being reported
 * @prop {'Chat'} place A constant telling the backend this is a chat report
 */

/**
 * @typedef {_BaseReportPOSTParams & _chatReportPOSTParams} chatReportPOSTParams
 */

// Keep typescript and eslint off from bugging about no exports
export default {};
