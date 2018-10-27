/**
 * @file Specify test screens for debugging presentational components.
 * This data is used by routes/SectionList and passed into views/SectionList
 * @author danlugo92
 */

/**
 * @template Props
 * @typedef {import('react').SFC<Props>} SFC
 */

/**
 * An screen is pair of props and a SFC. The idea is to specify several
 * combinations/choices for props for a given SFC and see how it's rendered
 * @typedef {object} Screen
 * @prop {string} name Name indicating what this component+prop duo represents.
 * Example: `chat with no texts`, `list when loading 2nd page`, etc.
 * @prop {{[K: string]: any}} props
 * @prop {SFC<{[K: string]: any}>} statelessFunctionalComponent
 */

/**
 * @typedef {object} Section
 * @prop {Array<Screen>} data This must be a writable array according to
 * react native's SectionList typings
 * @prop {string} title
 */

/**
 * This must be a writable array according to react native's SectionList typings
 * @type {Array<Section>}
 */
const sections = [
    {
        data: [],
        title: 'Chat Screen',
    },
];

export default sections;
