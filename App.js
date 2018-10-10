import {StackNavigator, SwitchNavigator} from 'react-navigation';
import Splash from './src/components/Splash';
import Terms from './src/components/Terms';
import Authentication from './src/components/Authentication/index';
import LoginPage from './src/components/Login';
import RegisterPage from './src/components/Register';
import HomePage from './src/components/Home';
import SwiperView from './src/components/Swiper';
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
import MatchUsersScreen from "./src/screens/swiper/MatchUsersScreen";

const AppStack = StackNavigator({
    Bar: Topbar,
    Home: HomePage,
    Profile: Profile,
    Message: Message,
    Chat: Chat,
    Like: Like,
    EditProfile: EditProfile,
    PublicProfile: PublicProfile,
    MatchUsersScreen: MatchUsersScreen,
    Notifications: Notifications,
    LikeProfile: LikeProfile
});
const AuthStack = StackNavigator({
    SignIn: Authentication,
    Register: RegisterPage,
    Terms: Terms,
    Login: LoginPage,
    Forgot: ForgotPage
});

export default SwitchNavigator(
    {
        AuthLoading: Splash,
        App: AppStack,
        Auth: AuthStack,
    },
    {
        initialRouteName: 'AuthLoading',
    }
);
