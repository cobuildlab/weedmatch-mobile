import React, {Component} from 'react';
import {Router, Scene, Stack} from 'react-native-router-flux';
import {ActivityIndicator, AsyncStorage} from 'react-native';

import Splash from './src/components/Splash';
import Authentication  from './src/components/Authentication';
import LoginPage  from './src/components/LoginPage';
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

  render() {
    return(
      <Router>
        <Stack key='root'>

        <Scene
           key="splash"
           component={Splash}
           timeout={5000}
           nextScene={'main'}
           initial
        />
        <Scene key="auth" >
          <Scene
            component={Authentication}
            hideNavBar={true}
            key='Authentication'
            title='Authentication'
          />
          <Scene
            component={LoginPage}
            hideNavBar={true}
            key='LoginPage'
            title='Login'
          />
          <Scene
            component={RegisterPage}
            hideNavBar={true}
            key='RegisterPage'
            title='Register Page'
          />
        </Scene>
        <Scene key="main" >
          <Scene
            component={HomePage}
            hideNavBar={true}
            key='HomePage'
            title='Home Page'
            initial={this.state.hasToken}
          />
        </Scene>

        </Stack>
      </Router>
    )

  }
}

export default App;
