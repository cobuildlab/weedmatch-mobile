import React, {Component} from 'react';
import {Alert, Image, Text, TouchableOpacity, View, AsyncStorage} from 'react-native';
import { StackNavigator } from 'react-navigation';

class Splash extends Component {
    constructor(){
        super();
    }

  componentDidMount(){
    //this.props.navigation.navigate('Auth');
    console.log('Splash')
    AsyncStorage.getItem('id_token')
        .then((token) => {
        if(token)
            this.props.navigation.navigate('App');
            // Actions.main()
        else
            this.props.navigation.navigate('Auth');
            // Actions.auth()
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

export default Splash;