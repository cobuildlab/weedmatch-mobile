import React, {Component} from 'react';
import {Text, TextInput, TouchableOpacity, View, AsyncStorage, Alert, ScrollView, Picker} from 'react-native';
import { Actions } from 'react-native-router-flux';
//import styles from './styles';

class RegisterPage extends Component {

  constructor() {
    super();
    this.state = {
        first_name: '',
        last_name: '',
        email: '',
        address: '',
        country_id: '',
        username: '',
        password: '',
        latitude: '',
        longitude: ''
    };
  }

  componentWillMount() {
      navigator.geolocation.getCurrentPosition(
          (position) => {
              this.setState({
                latitud: position.latitude,
                longitud: position.longitude
              })
              console.log(position);
          },
          (error) => {
              console.log(error)
          },
          {enableHighAccuracy: true, timeout: 50000, maximumAge: 10000}
        );
  }

  registerUser() {
      if (!this.state.first_name || !this.state.last_name || !this.state.email || !this.state.address || !this.state.country_id || !this.state.username || !this.state.password) return Alert.alert('Register Fail','Todos los campos son obligatorios');
          // TODO: localhost doesn't work because the app is running inside an emulator. Get the IP address with ifconfig.
          console.log(this.state.latitude);
          console.log(this.state.longitude);
          console.log(this.state.first_name);

     // .done();
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
            value={this.state.user.first_name}
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
            onChangeText={(address) => this.setState({address})}
            placeholder='Address'
            ref='address'
            returnKeyType='next'
            value={this.state.address}
        />

        <Picker
          selectedValue={this.state.country_id}
          onValueChange={(itemValue, itemIndex) => this.setState({country_id: itemValue})}>
          <Picker.Item label="Chile" value="42" />
          <Picker.Item label="Venezuela" value="222" />
        </Picker>

        <TextInput
            editable={true}
            onChangeText={(country_id) => this.setState({country_id})}
            placeholder='Country'
            ref='country'
            returnKeyType='next'
            value={this.state.country_id}
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