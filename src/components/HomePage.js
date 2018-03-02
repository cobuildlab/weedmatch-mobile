import React, {Component} from 'react';
import {Alert, Image, Text, TouchableOpacity, View, AsyncStorage} from 'react-native';
import {Actions} from 'react-native-router-flux';

class HomePage extends Component {

  getProtectedQuote() {
    Alert.alert('We will print a Chuck Norris quote')
  }


  async userLogout() {
    try {
      await AsyncStorage.removeItem('id_token');
      Alert.alert('Logout Success!');
      Actions.Authentication();
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