import React from 'react';
import { Container, Content, Button, Text } from 'native-base';

/**
 * @typedef {import('../../definitions').NavigationScreenProp<{}>} NavigationScreenProp
 */

import { SECTION_LIST_ROUTE_KEY } from './SectionList';

/**
 * @typedef {object} MainRouteProps
 * @prop {NavigationScreenProp} navigation
 */

/**
 * @type {React.SFC<MainRouteProps>}
 */
const MainRoute = ({ navigation }) => (
    <Container>
        <Content padder>
            <Button
                onPress={() => {
                    navigation.navigate('AuthLoading');
                }}
            >
                <Text>Go to main non-debug screen</Text>
            </Button>

            <Button
                onPress={() => {
                    navigation.navigate(SECTION_LIST_ROUTE_KEY);
                }}
            >
                <Text>Screens</Text>
            </Button>
        </Content>
    </Container>
);

// @ts-ignore
MainRoute.navigationOptions = {
    title: 'Debug Menu',
};

export const MAIN_ROUTE_KEY = 'MAIN_ROUTE_KEY';

export default MainRoute;
