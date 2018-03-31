import React, { Component } from 'react';
import { Text, TextInput, TouchableOpacity, View, AsyncStorage, Alert, ScrollView, StyleSheet, Image, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { userService } from '../../services';
import { LOGINSTATE, APPSTATE } from '../../State'
import {loginAction} from '../../actions/AuthActions'
import styles from './style'
import { strings } from '../../i18n';

class LoginPage extends Component {

  constructor() {
    super();
    this.state = {
      username: null,
      password: null,
      isLoading: false
    };
  }
  componentDidMount() {
    this.appSubscription = APPSTATE.subscribe(state => Alert.alert(state.error))
    this.loginSubscription = LOGINSTATE.subscribe(
      state => console.log(state)
    );
  }
  componentWillUnmount() {
    this.loginSubscription.unsubscribe();
    this.appSubscription.unsubscribe();
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
    loginAction(this.state.username, this.state.password)
  }

  render() {
    const { isLoading } = this.state;

    if (isLoading) {
      return (
        <KeyboardAvoidingView style={styles.teclado} behavior="height">
          <Image
            style={styles.container}
            source={require('./logo-login.png')}
            style={[{ width: null, height: 300 }]}
          />

          <Text style={styles.textLight}>
          {strings('main.title')}
                  </Text>
          <Text style={styles.textBold}>
          {strings('wmatch')}
                  </Text>
          <ActivityIndicator size="large" color="#0000ff" />
          <TouchableOpacity
            style={styles.buttomLoginStyle}
            onPress={this.userLogin.bind(this)}>
            <Text style={styles.buttonText}>Inicia Sesión</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttomBackLogin} onPress={this.userAuthentication.bind(this)}>
            <Text > Iniciar Sesión con Redes Sociales </Text>
          </TouchableOpacity>

          <View style={{ height: 0 }} />

        </KeyboardAvoidingView>
      )
    } else {
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
            {strings('main.title')}
              </Text>
            <Text style={styles.textBold}>
            {strings('wmatch')}
              </Text>
          </View>
          <TextInput
            style={styles.inputStyle}
            editable={true}
            onChangeText={(username) => this.setState({ username })}
            placeholder='Username'
            ref='username'
            returnKeyType='next'
            value={this.state.username}
          />

          <TextInput
            style={styles.inputStyle}
            editable={true}
            onChangeText={(password) => this.setState({ password })}
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
          <TouchableOpacity style={styles.buttomBackLogin} onPress={this.userAuthentication.bind(this)}>
            <Text > Iniciar Sesión con Redes Sociales </Text>
          </TouchableOpacity>
          <View style={{ height: 0 }} />

        </KeyboardAvoidingView>
      );
    }
  }
}

export const IMAGE_HEIGHT = window.width / 2;
export const IMAGE_WIDTH = window.width;
export default LoginPage;
