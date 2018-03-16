import React, {Component} from 'react';
import {Text, TextInput, TouchableOpacity, View, AsyncStorage, Alert, ScrollView, StyleSheet, Image, ActivityIndicator} from 'react-native';

import { userService } from '../../services';
//import styles from './styles';

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
                if (response && response.token) {
                    this.saveItem('id_token', response.token);
                    this.props.navigation.navigate('App');
                }
            }
          })
          .catch(error => {
            console.log(error);
          });
  }

  render() {
    const { isLoading } = this.state;

    if (isLoading){
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
                    <ActivityIndicator size="large" color="#0000ff" />
                <TouchableOpacity
                    style={styles.buttomLoginStyle}
                    onPress={this.userLogin.bind(this)}>
                    <Text style={styles.buttonText}>Inicia Sesión</Text>
                </TouchableOpacity>
                <TouchableOpacity  style={styles.buttomBackLogin} onPress={this.userAuthentication.bind(this)}>
                  <Text > Iniciar Sesión con Redes Sociales </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
        )
    }else{
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
        <TouchableOpacity  style={styles.buttomBackLogin} onPress={this.userAuthentication.bind(this)}>
          <Text > Iniciar Sesión con Redes Sociales </Text>
        </TouchableOpacity>
        </View>
      </ScrollView>
    );
    }
  }
}

const styles = StyleSheet.create({
  headerLogin: {
    backgroundColor: '#9605CC',
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
    marginTop: 25,
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
    marginTop: 30,
  },

});

export default LoginPage;
