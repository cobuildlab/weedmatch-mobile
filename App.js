import React, {Component} from 'react';
import {Alert, Image, Text, TouchableOpacity, View, AsyncStorage, ActivityIndicator } from 'react-native';
import { StackNavigator, SwitchNavigator } from 'react-navigation';
import Splash from './src/components/Splash';
import Authentication  from './src/components/Authentication';
import RegisterPage  from './src/components/RegisterPage';
import HomePage  from './src/components/HomePage';

class App extends Component {

  constructor() {
    super();
    this.state = { hasToken: false, isLoaded: false };
  }

  componentWillMount() {
      AsyncStorage.getItem('id_token').then((token) => {
          this.setState({ hasToken: token !== null })
      })
  }

  componentDidMount(){
    AsyncStorage.getItem('id_token')
        .then((token) => {
        if(token)
            this.props.navigation.navigate('App');
        else
            this.props.navigation.navigate('Auth');
      })
      .catch((error) => {
        console.log("Api call error");
        alert(error);
     });
  }

  render() {
    return (
      <View>
            <Text>Splash</Text>
      </View>
    );
  }
}

const AppStack  = StackNavigator({ Home: HomePage });
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