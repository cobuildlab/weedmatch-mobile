import React, {Component} from 'react';
import {Text, TextInput, TouchableOpacity, View, AsyncStorage, Alert, ScrollView, StyleSheet, Image, ActivityIndicator, KeyboardAvoidingView, Platform} from 'react-native';

import { StackNavigator } from 'react-navigation';

import { userService } from '../../services';
//import styles from './styles';

export const IMAGE_HEIGHT = window.width / 2;
export const IMAGE_WIDTH = window.width;

class LoginPage extends Component {

  constructor() {
    super();
    this.state = { username: null, password: null, isLoading: false };
  }

  static navigationOptions = { header: null };

  async saveItem(item, selectedValue) {
      try {
        await AsyncStorage.setItem(item, selectedValue);
      } catch (error) {
        console.error('AsyncStorage error: ' + error.message);
      }
  }

  userAuthentication() {
    this.props.navigation.navigate('SignIn');
  }


  userLogin() {
      if (!this.state.username || !this.state.password) return Alert.alert('Login Fail','Revise el usuario y contraseña');
          this.setState({ isLoading: true})
          userService.login(this.state.username, this.state.password)
          .then(response => {
            if (response) {
              console.log(response.token);
              console.log(response.id.toString());
                if (response && response.token) {
                  this.saveItem('id_token', response.token);
                  this.saveItem('id_user', response.id.toString());
                    this.props.navigation.navigate('App');
                }
            }
          })
          .catch(error => {
            this.setState({ isLoading: false})
            Alert.alert(error.detail)
            console.log(error);
          });
  }

  render() {
    const { isLoading } = this.state;

    if (isLoading){
    return (
      <KeyboardAvoidingView style={styles.teclado}
        behavior="height"
      >

                    <Image
                      style={styles.container}
                      source={require('./logo-login.png')}
                      style={[{ width: null, height: 300}]}
                       />

                  <Text style={styles.textLight}>
                    ENCUENTRA TU MEDIO
                  </Text>
                  <Text style={styles.textBold}>
                    COGOLLO
                  </Text>
                    <ActivityIndicator size="large" color="#0000ff" />
                <TouchableOpacity
                    style={styles.buttomLoginStyle}
                    onPress={this.userLogin.bind(this)}>
                    <Text style={styles.buttonText}>Inicia Sesión</Text>
                </TouchableOpacity>
                <TouchableOpacity  style={styles.buttomBackLogin} onPress={this.userAuthentication.bind(this)}>
                  <Text > Iniciar Sesión con Redes Sociales </Text>
                </TouchableOpacity>

            <View style={{ height: 0 }} />

          </KeyboardAvoidingView>
        )
    }else{
        return (
          <KeyboardAvoidingView style={styles.teclado}
            behavior="height"
          >

            <Image
              style={styles.container}
              source={require('../../assets/img/logo-b.png')}
               />

              <View style={styles.contentLogin}>
              <Text style={styles.textLight}>
                ENCUENTRA TU MEDIO
              </Text>
              <Text style={styles.textBold}>
                COGOLLO
              </Text>
        </View>
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
        <TouchableOpacity  style={styles.buttomBackLogin} onPress={this.userAuthentication.bind(this)}>
          <Text > Iniciar Sesión con Redes Sociales </Text>
        </TouchableOpacity>
        <View style={{ height: 0 }} />

      </KeyboardAvoidingView>
    );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '80%',
    resizeMode: 'contain',
    justifyContent: 'center',
  },
  contentLogin: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textLight:{
    fontSize: 20,
    color: '#9605CC',
  },
  textBold:{
    fontSize: 20,
    fontWeight: 'bold',
    color: '#9605CC',
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
  buttomLoginStyle:{
    marginTop: 20,
    marginBottom: 10,
    width: 250,
    paddingTop: 14,
    paddingBottom: 14,
    borderRadius: 50,
    alignItems: 'center',
    backgroundColor: '#9605CC',

  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500'
  },
  buttomBackLogin:{
    marginTop: 20,
    marginBottom: 10
  },
  teclado:{
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

    ...Platform.select({
      ios: {

      },
      android: {

      },
    }),
  }

});

export default LoginPage;
