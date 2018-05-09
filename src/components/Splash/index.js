import React, {Component} from 'react';
import {Image, View, StyleSheet} from 'react-native';
import {APP_STORE} from "../../Store";
import {isValidText} from "../../utils";
import styles from './style';

export default class Splash extends Component {
    constructor() {
        super();
    }

    componentDidMount() {
        setTimeout(() => {
            const token = APP_STORE.getToken();
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
        }, 1000)
    }

    render() {
        return (
            <View style={styles.container}>
                <Image source={require('../../assets/img/splash.png')} style={styles.imageStyle}/>
            </View>
        );
    }
}