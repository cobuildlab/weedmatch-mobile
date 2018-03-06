import React, {Component} from 'react';
import {Alert, Image, Text, TouchableOpacity, View, AsyncStorage} from 'react-native';
import { StackNavigator, SwitchNavigator } from 'react-navigation';

class HomePage extends Component {

  getProtectedQuote() {
    Alert.alert('We will print a Chuck Norris quote')
  }

  static navigationOptions = {
    title: 'Home Page',
  };

  userLogout() {
    try {
      AsyncStorage.removeItem('id_token');
      this.props.navigation.navigate('SignIn');
      Alert.alert('Logout Success!');
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }

  render() {
    return (
      <View>
        <TouchableOpacity onPress={this.getProtectedQuote}>
          <Text> Get Chuck Norris quote! </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.userLogout}>
          <Text> Log out </Text>
        </TouchableOpacity>

      </View>
    );
  }
}

export default HomePage;