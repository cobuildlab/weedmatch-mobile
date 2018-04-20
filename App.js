import React, {Component} from 'react';
import {StackNavigator, SwitchNavigator} from 'react-navigation';
import Splash from './src/components/Splash';
import Terms from './src/components/Terms';
import Authentication from './src/components/Authentication/index';
import LoginPage from './src/components/Login';
import RegisterPage from './src/components/Register';
import HomePage from './src/components/Home';
import Profile from './src/components/Profile';
import PublicProfile from './src/components/PublicProfile';
import ForgotPage from './src/components/Forgot';

const AppStack = StackNavigator({Home: HomePage, Profile: Profile, PublicProfile: PublicProfile});
const AuthStack = StackNavigator({SignIn: Authentication, Register: RegisterPage, Terms: Terms, Login: LoginPage,Forgot:ForgotPage});

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
