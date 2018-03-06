import Splash from "./Splash";
import HomePage from "./HomePage";
import Authentication from "./Authentication";
import RegisterPage from "./RegisterPage";
import { StackNavigator } from 'react-navigation';

const AppStack = StackNavigator({ Home: HomePage });
const AuthStack = StackNavigator({ SignIn: Authentication, Register: RegisterPage });

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
