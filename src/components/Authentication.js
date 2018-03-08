import React, {Component} from 'react';
import {Text, TextInput, TouchableOpacity, View, AsyncStorage, Alert, ScrollView, StyleSheet, Image} from 'react-native';
import { Actions } from 'react-native-router-flux';

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
    Actions.RegisterPage();
    /*try {
      AsyncStorage.removeItem('id_token');
      Alert.alert('Logout Success!');
      Actions.Authentication();
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }*/
  }

  userLoginPage() {
    Actions.LoginPage();
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
          <TouchableOpacity
            style={styles.buttomLoginIntagramStyle}
            onPress={this.userLogin.bind(this)}>
          <Text style={styles.buttonInstagramText}> Inicia Sesión con Instagram </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttomFacebookStyle}
            onPress={this.userLogin.bind(this)}>
          <Text style={styles.buttonTextFacebook}> Inicia Sesión con Facebook </Text>
          </TouchableOpacity>
        <TouchableOpacity
            style={styles.buttomLoginStyle}
            onPress={this.userLoginPage.bind(this)}>
            <Text style={styles.buttonText}>Inicia Sesión</Text>
          </TouchableOpacity>
          <View>
            <TouchableOpacity
                style={styles.buttomRegister}
                onPress={this.userRegister.bind(this)}>
              <Text style={styles.buttomTextRegister}>¿No tienes cuenta? ¡Únete!</Text>
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

  buttomLoginIntagramStyle:{
    marginTop: 5,
    marginBottom: 10,
    width: 300,
    paddingTop: 14,
    paddingBottom: 14,
    borderRadius: 50,
    alignItems: 'center',
    backgroundColor: '#9605CC',
  },
  buttonInstagramText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttomRegister:{
    marginTop: 20,
  },
  buttonTextRegister: {
    color: '#333333',
    fontSize: 16,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  buttomFacebookStyle:{
    marginTop: 5,
    marginBottom: 10,
    width: 280,
    paddingTop: 14,
    paddingBottom: 14,
    borderRadius: 50,
    alignItems: 'center',
    backgroundColor: '#b22abf',
  },
  buttonTextFacebook: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  buttomLoginStyle:{
    marginTop: 5,
    marginBottom: 10,
    width: 260,
    paddingTop: 14,
    paddingBottom: 14,
    borderRadius: 50,
    alignItems: 'center',
    backgroundColor: '#c646b6',
  },

});

export default Authentication;
