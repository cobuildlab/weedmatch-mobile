import React, {Component} from 'react';
import {Text, TextInput, TouchableOpacity, View, AsyncStorage, Alert, ScrollView} from 'react-native';
import { StackNavigator } from 'react-navigation';

import { userService } from '../services';
//import styles from './styles';

class Authentication extends Component {

  constructor() {
    super();
    this.state = { username: null, password: null };
    const URL = 'https://ezonsellerbackend.herokuapp.com';

  }

  async saveItem(item, selectedValue) {
    try {
      await AsyncStorage.setItem(item, selectedValue);
    } catch (error) {
      console.error('AsyncStorage error: ' + error.message);
    }
  }

  userRegister() {
    this.props.navigation.navigate('Register');
    /*try {
      AsyncStorage.removeItem('id_token');
      Alert.alert('Logout Success!');
      Actions.Authentication();
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }*/
  }

  userLogin() {
      if (!this.state.username || !this.state.password) return Alert.alert('Login Fail','Revise el usuario y contraseña');
          userService.login(this.state.username, this.state.password)
          .then(response => {
            console.log(response);
            if (response) {
                if (response && response.Token) {
                    this.saveItem('id_token', response.Token);
                    this.props.navigation.navigate('App');
                  }
            }
          })
          .catch(error => {
            console.log(error);
            Alert.alert('Login Fail');
          });
  }

  render() {
    return (
      <ScrollView style={{padding: 20}}>
        <View >
          <TextInput
            editable={true}
            onChangeText={(username) => this.setState({username})}
            placeholder='Username'
            ref='username'
            returnKeyType='next'
            value={this.state.username}
          />

          <TextInput
            editable={true}
            onChangeText={(password) => this.setState({password})}
            placeholder='Password'
            ref='password'
            returnKeyType='next'
            secureTextEntry={true}
            value={this.state.password}
          />

          <TouchableOpacity  onPress={this.userLogin.bind(this)}>
            <Text > Log In </Text>
          </TouchableOpacity>

          <TouchableOpacity  onPress={this.userRegister.bind(this)}>
            <Text > Register </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

export default Authentication;