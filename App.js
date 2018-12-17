import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import Splash from './src/components/Splash';
import Terms from './src/components/Terms';
import Authentication from './src/components/Authentication/index';
import LoginPage from './src/components/Login';
import RegisterPage from './src/components/Register';
import Profile from './src/components/Profile';
import Message from './src/components/Message';
import Chat from './src/components/Chat';
import Like from './src/components/Like';
import EditProfile from './src/components/EditProfile';
import PublicProfile from './src/components/PublicProfile';
import LikeProfile from './src/components/LikeProfile';
import ForgotPage from './src/components/Forgot';
import Topbar from './src/utils/TopBar';
import Notifications from './src/components/Notifications';

import Report from './src/modules/report/Report';
import REPORT_ROUTE_KEY from './src/modules/report/index';

const AppStack = createStackNavigator(
    {
        Bar: Topbar,
        Profile: Profile,
        EditProfile: EditProfile,
        PublicProfile: PublicProfile,
        LikeProfile: LikeProfile,
        Notifications: Notifications,
        Chat: Chat,
        Message: Message,
        Like: Like,
        [REPORT_ROUTE_KEY]: Report,
    },
    {
        initialRouteName: 'Bar',
    }
);

const AuthStack = createStackNavigator({
    SignIn: Authentication,
    Register: RegisterPage,
    Terms: Terms,
    Login: LoginPage,
    Forgot: ForgotPage,
});

// const NotificationsStack = createStackNavigator({
//
// });

export default createSwitchNavigator(
    {
        AuthLoading: Splash,
        App: AppStack,
        Auth: AuthStack,
    },
    {
        initialRouteName: 'AuthLoading',
    }
);
