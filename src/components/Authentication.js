import React, {Component} from 'react';
import {Text, TextInput, TouchableOpacity, View, AsyncStorage, Alert, ScrollView} from 'react-native';
import { Actions } from 'react-native-router-flux';
//import styles from './styles';

class Authentication extends Component {

  constructor() {
    super();
    this.state = { username: null, password: null };
    const URL = 'https://ezonsellerbackend.herokuapp.com';

  }

  async saveItem(item, selectedValue) {
    console.log(item)
    console.log(selectedValue)

    try {
      await AsyncStorage.setItem(item, selectedValue);
    } catch (error) {
      console.error('AsyncStorage error: ' + error.message);
    }
  }

  userRegister() {
    Actions.RegisterPage();
    /*try {
      AsyncStorage.removeItem('id_token');
      Alert.alert('Logout Success!');
      Actions.Authentication();
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }*/
  }

  userRegisters() {
    Actions.HomePage();
    /*try {
      AsyncStorage.removeItem('id_token');
      Alert.alert('Logout Success!');
      Actions.Authentication();
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }*/
  }

  userLogin() {
      if (!this.state.username || !this.state.password) return;
          // TODO: localhost doesn't work because the app is running inside an emulator. Get the IP address with ifconfig.
          fetch('https://ezonsellerbackend.herokuapp.com/login/', {
            method: 'POST',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify({
              username: this.state.username,
              password: this.state.password,
            })
          })
          .then((response) => response.json())
          .then((responseData) => {
            console.log(responseData);
            this.saveItem('id_token', responseData.Token),
            Actions.HomePage();
          })
          .catch((error) => {
            console.log(error)
          })
      .done();
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

          <TouchableOpacity  onPress={this.userRegisters.bind(this)}>
            <Text > Register </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

export default Authentication;