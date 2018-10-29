import React from 'react';
/**
 * @template Props
 * @typedef {import('react').SFC<Props>} SFC
 */

import Screen from '../views/Screen';
/**
 * @typedef {import('../../definitions').NavigationScreenProp<ScreenParams>} NavigationScreenProp
 */
/**
 * @typedef {import('../sectionsData').Screen} Screen
 */

/**
 * @typedef {object} ScreenParams
 * @prop {Screen} screen
 */

/**
 * @typedef ScreenRouteProps
 * @prop {NavigationScreenProp} navigation
 */

/**
 * @type {SFC<ScreenRouteProps>}
 */
const ScreenRoute = ({ navigation }) => {
    if (typeof navigation !== 'object') {
        throw new Error('Navigation prop not found inside Screen route');
    }

    /**
     * @type {Screen|undefined}
     */
    const screen = navigation.getParam('screen');

    if (typeof screen === 'undefined') {
        throw new Error('Missing `screen` parameter in Screen route');
    }

    const { props, statelessFunctionalComponent } = screen;

    if (typeof props === 'undefined') {
        throw new Error(
            'Missing `props` inside screen parameter in Screen route'
        );
    }

    if (typeof props === 'undefined') {
        throw new Error(
            'Missing `statelessFunctionalComponent` inside screen parameter in Screen route'
        );
    }

    return (
        <Screen
            props={props}
            statelessFunctionalComponent={statelessFunctionalComponent}
        />
    );
};

// @ts-ignore
ScreenRoute.navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.title}`,
});

/**
 * Key used for react-navigation. E.g. navigate(SCREEN_ROUTE_KEY)
 */
export const SCREEN_ROUTE_KEY = 'SCREEN_ROUTE_KEY';

export default ScreenRoute;
