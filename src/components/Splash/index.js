import React, {Component} from 'react';
import {Image, View, StyleSheet} from 'react-native';
import {APP_STORE} from "../../Store";
import {isValidText} from "../../utils";

class Splash extends Component {
    constructor() {
        super();
    }

    componentDidMount() {
        setTimeout(() => {
            const token = APP_STORE.getToken();
            console.log("TOKEN", token);
            if (!isValidText(token)) {
                this.props.navigation.navigate('Auth');
                return;
            }
            this.props.navigation.navigate('App');
        }, 1000)
    }

    render() {
        return (
            <View style={styles.container}>
                <Image source={require('./splash.png')} style={styles.imageStyle}/>
            </View>
        );
    }
}

// TODO: Styles outside the view
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
