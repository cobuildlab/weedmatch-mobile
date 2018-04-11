import React, {Component} from 'react';
// import {Alert, Image, Text, TouchableOpacity, View, AsyncStorage, ActivityIndicator} from 'react-native';
import {StackNavigator, SwitchNavigator} from 'react-navigation';
import Splash from './src/components/Splash';
import Terms from './src/components/Terms';
import Authentication from './src/components/Authentication/index';
import LoginPage from './src/components/Login';
import RegisterPage from './src/components/Register';
import HomePage from './src/components/Home';
import Profile from './src/components/Profile';
import PublicProfile from './src/components/PublicProfile';
// import {TOKEN_STATE} from "./src/State";

// class App extends Component {
//     constructor() {
//         super();
//         this.state = {hasToken: false, isLoaded: false};
//     }
//
//     componentWillMount() {
//         AsyncStorage.getItem('token').then((token) => {
//             this.setState({hasToken: token !== null})
//         })
//     }
//
//     componentDidMount() {
        // AsyncStorage.getItem('token')
        //     .then((token) => {
        //         if (token)
        //             this.props.navigation.navigate('App');
        //         else
        //             this.props.navigation.navigate('Auth');
        //     })
        //     .catch((error) => {
        //         console.log("Api call error");
        //         alert(error);
        //     });
//     }
//
//     render() {
//         return (
//             <View>
//                 <Text>Splash</Text>
//             </View>
//         );
//     }
// }

const AppStack = StackNavigator({Home: HomePage, Profile: Profile, PublicProfile: PublicProfile});
const AuthStack = StackNavigator({SignIn: Authentication, Register: RegisterPage, Terms: Terms, Login: LoginPage});

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
