import { StackNavigator } from 'react-navigation';

import Screen, { SCREEN_ROUTE_KEY } from './routes/Screen';
import SectionList, { SECTION_LIST_ROUTE_KEY } from './routes/SectionList';
import Main, { MAIN_ROUTE_KEY } from './routes/Main';

const stackNavigator = StackNavigator(
    {
        [MAIN_ROUTE_KEY]: Main,
        [SCREEN_ROUTE_KEY]: Screen,
        [SECTION_LIST_ROUTE_KEY]: SectionList,
    },
    {
        initialRouteName: MAIN_ROUTE_KEY,
    }
);

export default stackNavigator;
