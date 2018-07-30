import React, {Component} from 'react';
import {Image, View, AsyncStorage} from 'react-native';
import {APP_STORE} from "../../Store";
import {isValidText} from "../../utils";
import styles from './style';

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
        try {
            const token = await AsyncStorage.getItem('token');
            const id = APP_STORE.getId();
            console.log("TOKEN", token);
            console.log("ID", id);
            if (!isValidText(token)) {
                console.log(this.props.navigation);
                this.props.navigation.navigate('Auth');
                return;
            }
            console.log(this.props.navigation);
            this.props.navigation.navigate('App');

        } catch (error) {
            console.error('AsyncStorage error: ' + error.message);
            return undefined;
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Image source={require('../../assets/img/splash.png')} style={styles.imageStyle}/>
            </View>
        );
    }
}