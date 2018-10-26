/**
 * @file This file contains type definitions which don't belong in any other
 * specific file. If this were a typescript-files project, we'd have a file
 * exporting interfaces, however, here we are leveraging typescript's support of
 * JSDoc including importing JSDoc typedefs from other files.
 * @author danlugo92
 */

/**
 * Navigation Screen Prop from react-navigation which gets passed into children
 * of navigators
 * @template Params Parameters used by the route
 * @typedef {import('react-navigation').NavigationScreenProp<import('react-navigation').NavigationLeafRoute<Params>, Params>} NavigationScreenProp
 */

// keeps off typscript and eslint from buggin
export default {};
