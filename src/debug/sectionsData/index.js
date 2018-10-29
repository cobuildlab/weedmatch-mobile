/**
 * @file Specify test screens for debugging presentational components.
 * This data is used by routes/SectionList and passed into views/SectionList
 * @author danlugo92
 */

import chatScreen from './chatScreen';
/**
 * @template Props
 * @typedef {import('../definitions').Section<Props>} Section
 */

/**
 * This must be a writable array according to react native's SectionList typings
 * @type {Array<Section<any>>}
 */
const sections = [chatScreen];

export default sections;
