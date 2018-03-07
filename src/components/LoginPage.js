import React, {Component} from 'react';
import {Text, TextInput, TouchableOpacity, View, AsyncStorage, Alert, ScrollView, StyleSheet, Image} from 'react-native';
import { Actions } from 'react-native-router-flux';

import { userService } from '../services';
//import styles from './styles';

class LoginPage extends Component {

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
      if (!this.state.username || !this.state.password) return Alert.alert('Login Fail','Revise el usuario y contraseña');
          userService.login(this.state.username, this.state.password)
          .then(response => {
            if (response) {
                if (response && response.Token) {
                    this.saveItem('id_token', response.Token);
                    Actions.HomePage();
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
        <View style={styles.contentLogin}>
          <Text style={styles.textLight}>
            ENCUENTRA TU MEDIO
          </Text>
          <Text style={styles.textBold}>
            COGOLLO
          </Text>
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

        <TouchableOpacity
            style={styles.buttomLoginStyle}
            onPress={this.userLogin.bind(this)}>
            <Text style={styles.buttonText}>Inicia Sesión</Text>
          </TouchableOpacity>


            <TouchableOpacity
                style={styles.buttomFacebookStyle}
                onPress={this.userRegister.bind(this)}>
              <Text style={styles.buttonTextFacebook}> Inicia Sesión con Facebook </Text>
            </TouchableOpacity>

            <TouchableOpacity  onPress={this.userRegisters.bind(this)}>
              <Text > Register </Text>
            </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  headerLogin: {
    backgroundColor: '#9605CC',
    height: 50,
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
  contentLogin: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 250,
  },
  textLight:{
    fontSize: 20,
    color: '#9605CC',
  },
  textBold:{
    fontSize: 20,
    fontWeight: 'bold',
    color: '#9605CC',
    marginBottom: 40,
  },
  inputStyle:{
    backgroundColor: '#f5f5f5',
    height: 40,
    width: 250,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 10,
  },
  buttomLoginStyle:{
    marginTop: 5,
    marginBottom: 10,
    width: 300,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 50,
    borderColor: '#9605CC',
    borderWidth: 1,
    alignItems: 'center',
    backgroundColor: 'transparent',

  },
  buttonText: {
    color: '#9605CC',
    fontSize: 16,
  },
  buttomFacebookStyle:{
    marginTop: 10,
    marginBottom: 10,
    width: 250,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 50,
    alignItems: 'center',
    backgroundColor: '#3b5998',
  },
  buttonTextFacebook: {
    color: 'white',
    fontSize: 16,
  },

});

export default LoginPage;
