import React from 'react';
/**
 * @template Props
 * @typedef {import('react').SFC<Props>} SFC
 */

import SectionList from '../views/SectionList';
import sections from '../sectionsData';
/**
 * @typedef {import('../../definitions').NavigationScreenProp<{}>} NavigationScreenProp
 */
/**
 * @typedef {import('../sectionsData').Screen} Screen
 */

import { SCREEN_ROUTE_KEY } from './Screen';

/**
 * @typedef SectionListRouteProps
 * @prop {NavigationScreenProp} navigation
 */

/**
 * Key used for react-navigation. E.g. navigate(SECTION_LIST_ROUTE_KEY)
 */
export const SECTION_LIST_ROUTE_KEY = 'SECTION_LIST_ROUTE_KEY';

/**
 * @type {SFC<SectionListRouteProps>}
 */
const SectionListRoute = ({ navigation }) => {
    if (typeof navigation !== 'object') {
        throw new Error('Navigation prop not found inside SectionList route');
    }

    return (
        <SectionList
            onPressItem={(/** @type {Screen} */ item) => {
                navigation.navigate(SCREEN_ROUTE_KEY, {
                    screen: item,
                    title: item.name,
                });
            }}
            sections={sections}
        />
    );
};

// @ts-ignore
SectionListRoute.navigationOptions = {
    title: 'Debug Screens',
};

export default SectionListRoute;
