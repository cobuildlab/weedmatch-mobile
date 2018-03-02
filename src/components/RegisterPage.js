import React, {Component} from 'react';
import {Text, TextInput, TouchableOpacity, View, AsyncStorage, Alert, ScrollView} from 'react-native';
import { Actions } from 'react-native-router-flux';
//import styles from './styles';

class RegisterPage extends Component {

  constructor() {
    super();
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      username: '',
      password: ''
        
    };
    const URL = 'https://ezonsellerbackend.herokuapp.com';

  }

  registerUser() {
    Alert.alert(this.state.user),
    Actions.Authentication();
    
    //Alert.alert(this.state.user);
/*      if (!this.state.username || !this.state.password) return;
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
            this.saveItem('id_token', responseData.id_token),

          })
      .done();*/
  }

  registerCancel() {
    Actions.Authentication();
  }

  render() {
    return (
      <ScrollView style={{padding: 20}}>
        <View>

        <TextInput
            editable={true}
            onChangeText={(first_name) => this.setState({first_name})}
            placeholder='First Name'
            ref='first_name'
            returnKeyType='next'
            value={this.state.first_name}
          />


        <TextInput
            editable={true}
            onChangeText={(last_name) => this.setState({last_name})}
            placeholder='Last Name'
            ref='last_name'
            returnKeyType='next'
            value={this.state.last_name}
          />

       
        <TextInput
            editable={true}
            onChangeText={(email) => this.setState({email})}
            placeholder='Email'
            ref='email'
            returnKeyType='next'
            value={this.state.email}
          />


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

          <TouchableOpacity  onPress={this.registerUser.bind(this)}>
            <Text > Register </Text>
          </TouchableOpacity>

          <TouchableOpacity  onPress={this.registerCancel.bind(this)}>
            <Text > Cancel </Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    );
  }
}

export default RegisterPage;