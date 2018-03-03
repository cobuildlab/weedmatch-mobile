import React, {Component} from 'react';
import {Alert, Image, Text, TouchableOpacity, View, AsyncStorage} from 'react-native';
import {Actions} from 'react-native-router-flux';

class Splash extends Component {
    constructor(){
        super();
    }


  componentDidMount(){
    AsyncStorage.getItem('id_token').then((token) => {
        if(token)
            Actions.main()
        else
            Actions.auth()
      })
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