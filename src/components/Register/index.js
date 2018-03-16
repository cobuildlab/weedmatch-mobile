import React, {Component} from 'react';
import {Text, TextInput, TouchableOpacity, View, AsyncStorage, Alert, ScrollView, StyleSheet, Image, Picker} from 'react-native';
//import styles from './styles';
import { StackNavigator } from 'react-navigation';

import { userService } from '../../services';

class RegisterPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
        first_name: '',
        last_name: '',
        email: '',
        direction: '',
        country: '',
        username: '',
        password: '',
        latitud: '',
        longitud: '',
        countrys: [],
        age: '',
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
              console.log(this.state);
          },
          (error) => {
              console.log(error)
          },
          {enableHighAccuracy: true, timeout: 50000, maximumAge: 10000}
      );

      AsyncStorage.getItem('countrys')
          .then((response) => {
             this.setState({countrys: JSON.parse(response)})
          })
          .catch((error) => {
              console.log(error);
          });
    }

  registerUser() {
      console.log(this.props)
      //if (!this.state.first_name || !this.state.last_name || !this.state.email || !this.state.direction || !this.state.country_id || !this.state.username || !this.state.password) return Alert.alert('Register Fail','Todos los campos son obligatorios');
          // TODO: localhost doesn't work because the app is running inside an emulator. Get the IP address with ifconfig.
          let valueUser = {'first_name': this.state.first_name, 'last_name': this.state.last_name, 'email': this.state.email, 'country': JSON.stringify(this.state.country), 'direction': this.state.direction, 'username': this.state.username, 'password': this.state.password, 'latitud': this.state.latitud, 'longitud': this.state.longitud,  'age': '1984-09-30' }

          fetch('https://weedmatch.herokuapp.com/register/', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(valueUser),
          })
          .then(function(response){
                if (!response.ok) {
                    console.log("ERROR: " + JSON.stringify(response));

                }
             console.log(1)
             //this.props.navigation.navigate('SignIn');

             return response.json();
            })
          .then(function(data){
            if(data.ok){

            }
            console.log(2)
            Alert.alert(data.detail)
            console.log(data)
          })
          .catch((error) => {
            console.error(error);
            console.error('error');
          });

  }

  registerCancel() {
    this.props.navigation.navigate('SignIn');
  }

  render() {
    const { countrys } = this.state;
    return (
      <ScrollView style={{backgroundColor: '#fff'}}>
        <View style={styles.headerLogin}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={styles.imageStyle}>
              <Image
                style={styles.container}
                source={require('../../assets/img/logo-login.png')}
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
              onChangeText={(direction) => this.setState({direction})}
              placeholder='Address'
              ref='direction'
              returnKeyType='next'
              value={this.state.direction}
          />

          <Picker
              style={styles.inputStyle}
              selectedValue={this.state.country}
              onValueChange={itemValue => this.setState({ country: itemValue })}>
              {countrys.map((i, index) => (
                  <Picker.Item key={index} label={i.name} value={i.id} />
              ))}
          </Picker>
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
    height: 200,
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
    height: 200,
    flex: 3,
    width: null,
  },
  contentRegister: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
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
