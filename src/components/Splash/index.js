import React, {Component} from 'react';
import {Image, View, AsyncStorage} from 'react-native';
import {APP_STORE} from "../../Store";
import {isValidText} from "../../utils";
import styles from './style';
import {Alert} from 'react-native';

export default class Splash extends Component {
    constructor() {
        super();
    }

    componentDidMount() {
        setTimeout(() => {
            this.popToken()
        }, 1000)
    }

    async popToken() {
        let token;
        try {
            token = await AsyncStorage.getItem('token');
        } catch (error) {
            console.error('Splash:AsyncStorage:error: ' + error.message);
            Alert.alert(error.message);
            return;
        }

        const id = APP_STORE.getId();
        console.log("Splash:TOKEN", token);
        console.log("Splash:USER-ID", id);
        if (!isValidText(token)) {
            // To MatchUsersScreen Page
            this.props.navigation.navigate('Auth');
            return;
        }
        // A user is logged in
        this.props.navigation.navigate('App');
    }

    render() {
        return (
            <View style={styles.container}>
                <Image source={require('../../assets/img/splash.png')} style={styles.imageStyle}/>
            </View>
        );
    }
}
