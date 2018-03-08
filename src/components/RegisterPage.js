import React, {Component} from 'react';
import {Text, TextInput, TouchableOpacity, View, AsyncStorage, Alert, ScrollView, StyleSheet, Image} from 'react-native';
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
      <ScrollView style={{backgroundColor: '#fff'}}>
        <View style={styles.headerLogin}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={styles.imageStyle}>
              <Image
                style={styles.container}
                source={require('./logo-login.png')}
                 />
            </View>
          </View>
        </View>
        <View style={styles.contentRegister}>
        <TextInput
          style={styles.inputStyle}
            editable={true}
            onChangeText={(first_name) => this.setState({first_name})}
            placeholder='First Name'
            ref='first_name'
            returnKeyType='next'
            value={this.state.first_name}
          />
        <TextInput
          style={styles.inputStyle}
            editable={true}
            onChangeText={(last_name) => this.setState({last_name})}
            placeholder='Last Name'
            ref='last_name'
            returnKeyType='next'
            value={this.state.last_name}
          />
        <TextInput
          style={styles.inputStyle}
            editable={true}
            onChangeText={(email) => this.setState({email})}
            placeholder='Email'
            ref='email'
            returnKeyType='next'
            value={this.state.email}
          />
          <TextInput
            style={styles.inputStyle}
            editable={true}
            onChangeText={(username) => this.setState({username})}
            placeholder='Username'
            ref='username'
            returnKeyType='next'
            value={this.state.username}
          />
          <TextInput
            style={styles.inputStyle}
            editable={true}
            onChangeText={(password) => this.setState({password})}
            placeholder='Password'
            ref='password'
            returnKeyType='next'
            secureTextEntry={true}
            value={this.state.password}
          />
          <View style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={styles.buttomRegisterStyle}
              onPress={this.registerUser.bind(this)}>
              <Text style={styles.buttonText}> Register </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttomCancelStyle}
              onPress={this.registerCancel.bind(this)}>
              <Text style={styles.buttonTextCancel}> Cancel </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  headerLogin: {
    backgroundColor: '#9605CC',
    height: 40,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 2,
    justifyContent: 'center',
    width: null,
    resizeMode: 'contain',
  },
  imageStyle: {
    height: 300,
    flex: 3,
    width: null,
  },
  contentRegister: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 250,
  },
  inputStyle:{
    backgroundColor: '#ffffff',
    height: 40,
    width: 250,
    borderColor: '#ccc',
    borderRadius: 50,
    borderWidth: 1,
    paddingLeft: 20,
    paddingRight: 10,
    marginBottom: 10,
  },
  buttomRegisterStyle:{
    marginTop: 20,
    marginBottom: 10,
    width: 120,
    marginRight: 5,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 50,
    alignItems: 'center',
    backgroundColor: '#9605CC',

  },
  buttomCancelStyle:{
    marginTop: 20,
    marginBottom: 10,
    width: 120,
    marginLeft: 5,
    paddingTop: 10,
    paddingBottom: 10,
    borderColor: '#9605CC',
    borderWidth: 1,
    borderRadius: 50,
    alignItems: 'center',
    backgroundColor: 'transparent',

  },
  buttonTextCancel: {
    color: '#9605CC',
    fontSize: 16,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  buttomBackLogin:{
    marginTop: 30,
  },

});

export default RegisterPage;
