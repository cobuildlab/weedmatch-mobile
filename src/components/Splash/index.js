import React, {Component} from 'react';
import {Alert, Image, Text, TouchableOpacity, View, AsyncStorage, StyleSheet} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { userService } from '../../services';

class Splash extends Component {
    constructor(){
        super();
    }

    componentDidMount(){
        //AsyncStorage.removeItem('id_token');
        setTimeout(() =>{
            AsyncStorage.getItem('id_token')
                .then((token) => {
                    if(token){
                        this.props.navigation.navigate('App');
                    }else{
                        this.props.navigation.navigate('Auth');
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },1000)
    }

    render() {
        return (
            <View style={styles.container}>
                <Image source={require('./splash.png')} style={styles.imageStyle} />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    imageStyle: {
        height: '100%',
        width: null,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default Splash;
