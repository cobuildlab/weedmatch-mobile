import React, {Component} from 'react';
import {Text, TextInput, TouchableOpacity, View, AsyncStorage, Alert, ScrollView, Picker, ActivityIndicator, StyleSheet} from 'react-native';
import { SwitchNavigator } from 'react-navigation';
import { userService } from '../services';

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
        longitude: '',
        countrys: [],
        isLoaded: false
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

      userService.getCountry()
        .then(response => {
            this.setState({countrys: response, isLoaded: true});
        })
        .catch(error => {
            console.log(error);
        });

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
    this.props.navigation.navigate.goBack();
  }

  render() {
    console.log('----------');
    const { countrys } = this.state;
    console.log(this.state)

    if (!this.state.isLoaded) {
          return (
            <View style={[styles.container, styles.horizontal]}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
          )
    } else {

    return (

      <ScrollView style={{padding: 20}}>
        <View>
        <TextInput
            editable={true}
            onChangeText={(first_name) => this.setState({first_name})}
            placeholder='First Name'
            ref='first_name'
            returnKeyType='next'
            value={this.state.first_name}
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

        <TextInput
            editable={true}
            onChangeText={(country_id) => this.setState({country_id})}
            placeholder='Country'
            ref='country'
            returnKeyType='next'
            value={this.state.country_id}
        />

        <Picker
            selectedValue={this.state.country_id}
            onValueChange={itemValue => this.setState({ country_id: itemValue })}>
            {countrys.map((i, index) => (
                <Picker.Item key={index} label={i.name} value={i.id} />
            ))}
        </Picker>

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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  }
})

export default RegisterPage;