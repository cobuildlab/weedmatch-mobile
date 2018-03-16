import React, {Component} from 'react';
import {Alert, Image, Text, TouchableOpacity, View, AsyncStorage} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { userService } from '../../services';

class Splash extends Component {
    constructor(){
        super();
    }

  componentDidMount(){
    //AsyncStorage.removeItem('countrys');
    AsyncStorage.getItem('countrys')
        .then((response) => {
            if(response)
               AsyncStorage.getItem('id_token')
                   .then((token) => {
                       if(token)
                           this.props.navigation.navigate('App');
                           // Actions.main()
                       else
                           this.props.navigation.navigate('Auth');
                           // Actions.auth()
                   })
                   .catch((error) => {
                       console.log(error);
                       alert(error);
                   });
            else
            userService.getCountry()
                .then(response => {
                    AsyncStorage.setItem('countrys', JSON.stringify(response));
                    this.props.navigation.navigate('Auth');
                })
                .catch(error => {
                    console.log(error);
                });
        })
        .catch((error) => {
          console.log(error);
       });
    AsyncStorage.removeItem('id_token')
    console.log('Splash')

  }

  render() {
    return (
      <View>
            <Text>Splash</Text>
      </View>
    );
  }
}

export default Splash;