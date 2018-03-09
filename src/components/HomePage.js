import React, {Component} from 'react';
import {Alert, Image, Text, TouchableOpacity, View, AsyncStorage} from 'react-native';
import { StackNavigator, SwitchNavigator } from 'react-navigation';

class HomePage extends Component {
  constructor(props){
    super(props)

    this.userLogout = this.userLogout.bind(this)
  }

  static navigationOptions = {
    title: 'Home Page',
  };

  userLogout() {
    const { navigate } = this.props.navigation;
    try {
      AsyncStorage.removeItem('id_token');
      navigate('Auth');
     Alert.alert('Logout Success!');
    } catch (error) {
      console.log(error);
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