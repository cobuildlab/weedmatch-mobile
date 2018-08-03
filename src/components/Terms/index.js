import React, {Component} from 'react';
import {
    Text,
    TextInput,
    TouchableOpacity,
    View,
    AsyncStorage,
    Alert,
    ScrollView,
    WebView,
    Image
} from 'react-native';
import {strings} from '../../i18n';
import {Logger} from "../../utils";
import styles from './style';

class Terms extends Component {

    static navigationOptions = {
        title: strings('register.terms'),
    };

    render() {
        return (
          <WebView
            source={{uri: 'https://weedmatch.cl/terminos-y-condiciones/'}}
          />
        );
      }
}

export default Terms;
