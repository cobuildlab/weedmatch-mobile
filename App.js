import React, {Component} from 'react';
import {Router, Scene, Stack} from 'react-native-router-flux';
import {ActivityIndicator, AsyncStorage} from 'react-native';

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

  render() {
    return(
      <Router>
        <Stack key='root'>
          <Scene
            component={Authentication}
            hideNavBar={true}
            initial={!this.state.hasToken}
            key='Authentication'
            title='Authentication'
          />
          <Scene
            component={HomePage}
            hideNavBar={true}
            key='HomePage'
            title='Home Page'
          />
          <Scene
            component={RegisterPage}
            hideNavBar={true}
            key='RegisterPage'
            title='Register Page'
          />
        </Stack>
      </Router>
    )
    
  } 
}

export default App;