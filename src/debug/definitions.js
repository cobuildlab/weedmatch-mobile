/**
 * @template Props
 * @typedef {import('react').SFC<Props>} SFC
 */

/**
 * @template Props
 * An screen is pair of props and a SFC. The idea is to specify several
 * combinations/choices for props for a given SFC and see how it's rendered
 * @typedef {object} Screen
 * @prop {string} name Name indicating what this component+prop duo represents.
 * Example: `chat with no texts`, `list when loading 2nd page`, etc.
 * @prop {Props} props
 * @prop {SFC<Props>} statelessFunctionalComponent
 */

/**
 * @template Props
 * @typedef {object} Section
 * @prop {Array<Screen<Props>>} data This must be a writable array according to
 * react native's SectionList typings
 * @prop {string} title
 */

// keeps off typscript and eslint from buggin
export default {};
