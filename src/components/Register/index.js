import React, {Component} from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  AsyncStorage,
  Alert,
  ScrollView,
  StyleSheet,
  Image,
  Picker,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator
} from 'react-native';
//import styles from './styles';
import { StackNavigator } from 'react-navigation';

import { userService } from '../../services';

export const IMAGE_HEIGHT = window.width / 2;
export const IMAGE_WIDTH = window.width;

class RegisterPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
        first_name: '',
        email: '',
        username: '',
        password: '',
        latitud: '',
        longitud: '',
        age: '',
        sexo: 'Hombre',
        isLoaded: false
    };
  }

    static navigationOptions = { header: null };

    componentWillMount() {
      navigator.geolocation.getCurrentPosition(
          (position) => {
              this.setState({
                latitud: position.coords.latitude,
                longitud: position.coords.longitude
              })
          },
          (error) => {
              console.log(error)
          },
          {enableHighAccuracy: true, timeout: 50000, maximumAge: 10000}
      );
    }

  _registerUser() {
      if (!this.state.first_name || !this.state.email || !this.state.username || !this.state.password) return Alert.alert('Register Fail','Todos los campos son obligatorios');
          // TODO: localhost doesn't work because the app is running inside an emulator. Get the IP address with ifconfig.
          let valueUser = {'first_name': this.state.first_name, 'email': this.state.email, 'username': this.state.username, 'password': this.state.password, 'latitud': parseFloat(this.state.latitud).toFixed(6), 'longitud': parseFloat(this.state.longitud).toFixed(6), 'sex': this.state.sexo, 'age': '1988-05-19' }
          this.setState({ isLoading: true})
          console.log(valueUser);
          fetch('https://weedmatch.herokuapp.com/register/', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: (valueUser),
          })
          .then((response) => {
            console.log(response)
          })
          .then((responseData) =>
          {

         /*   if(responseData.detail){
              this.setState({ isLoading: false});

            }else{
              this.props.navigation.navigate('Login');
            }*/
            console.log(responseData);
          })
          .catch((error) => {
            this.setState({ isLoading: false});
            console.error(error);
          });
  }

  registerCancel() {
    this.props.navigation.navigate('SignIn');
  }

  render() {
    const { countrys, isLoading } = this.state;
    if (!isLoading){
    return (
      <KeyboardAvoidingView style={styles.teclado}
        behavior="height"
      >

      <Image
          style={styles.container}
          source={require('../../assets/img/logo-b.png')}
      />
      <Text style={styles.textLight}>
        ENCUENTRA TU MEDIO
      </Text>
      <Text style={styles.textBold}>
        COGOLLO
      </Text>

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

          <TouchableOpacity
              style={styles.buttomRegisterStyle}
              onPress={this._registerUser.bind(this)}>
              <Text style={styles.buttonText}> Register </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttomCancelStyle}
              onPress={this.registerCancel.bind(this)}>
              <Text style={styles.buttonTextCancel}> Cancel </Text>
            </TouchableOpacity>
        <View style={{ height: 0 }} />

      </KeyboardAvoidingView>
    );
    }else{
      return (
        <KeyboardAvoidingView style={styles.teclado}
        behavior="height">

        <Image
            style={styles.container}
            source={require('../../assets/img/logo-b.png')}
        />
        <Text style={styles.textLight}>
          ENCUENTRA TU MEDIO
        </Text>
        <Text style={styles.textBold}>
          COGOLLO
        </Text>
        <ActivityIndicator size="large" color="#0000ff" />



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

  contentRegister: {
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
    marginTop: 0,
    marginBottom: 10,
    width: 250,
    marginRight: 5,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 50,
    alignItems: 'center',
    backgroundColor: '#9605CC',

  },
  buttomCancelStyle:{
    marginTop: 2,
    marginBottom: 10,
    width: 220,
    paddingTop: 5,
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

export default RegisterPage;
