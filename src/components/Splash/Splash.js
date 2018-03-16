import React, {Component} from 'react';
import {Alert, Image, Text, TouchableOpacity, View, AsyncStorage} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { userService } from '../../services';

class Splash extends Component {
    constructor(){
        super();
    }

  componentWillMount(){
    console.log(1)
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