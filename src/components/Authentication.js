import React, {Component} from 'react';
import {Text, TextInput, TouchableOpacity, View, AsyncStorage, Alert, ScrollView, StyleSheet, Image} from 'react-native';
import { StackNavigator } from 'react-navigation';

// import { LoginButton, AccessToken, LoginManager } from 'react-native-fbsdk';

import { userService } from '../services';

class Authentication extends Component {

  constructor() {
    super();
    this.state = { username: null, password: null };
  }

  static navigationOptions = { header: null };

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

  userProfile() {
      this.props.navigation.navigate('Profile');
      /*try {
        AsyncStorage.removeItem('id_token');
        Alert.alert('Logout Success!');
        Actions.Authentication();
      } catch (error) {
        console.log('AsyncStorage error: ' + error.message);
      }*/
    }

    userLoginPage() {
      this.props.navigation.navigate('Login');
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
                if (response && response.token) {
                    this.saveItem('id_token', response.token);
                    this.props.navigation.navigate('App');
                  }
            }
          })
          .catch(error => {
            console.log(error);
            Alert.alert('Login Fail');
          });
  }

  _facebookLogin() {
      LoginManager.logInWithReadPermissions(["public_profile"]).then(
        function(result) {
          if (result.isCancelled) {
            alert('Login cancelled');
          } else {
            AccessToken.getCurrentAccessToken().then(
                (data) => {
                    console.log(data.accessToken.toString())
                }
            )
            console.log(result);
          }
        },
        function(error) {
          alert('Login fail with error: ' + error);
        }
      );
  }

  render() {
    return (
      <ScrollView style={{backgroundColor: '#fff'}}>

      <View style={styles.headerLogin}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={styles.imageStyle}>
            <Image
              style={styles.container}
              source={require('./img/logo-login.png')}
              style={[{ width: null, height: 300}]}
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
              onPress={this._facebookLogin.bind(this)}>
              <Text style={styles.buttonTextFacebook}> Inicia Sesión con Facebook </Text>
          </TouchableOpacity>

               {/* <LoginButton
                    publishPermissions={["publish_actions"]}
                    onLoginFinished={
                      (error, result) => {
                        if (error) {
                          alert("login has error: " + result.error);
                        } else if (result.isCancelled) {
                          alert("login is cancelled.");
                        } else {
                          AccessToken.getCurrentAccessToken().then(
                            (data) => {
                              alert(data.accessToken.toString())
                            }
                          )
                        }
                      }
                    }
                    onLogoutFinished={() => alert("logout.")}/> */}

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

            <TouchableOpacity
                style={styles.buttomRegister}
                onPress={this.userProfile.bind(this)}>
              <Text style={styles.buttomTextRegister}>Profile</Text>
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
