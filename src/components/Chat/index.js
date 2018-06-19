import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  Image,
  AsyncStorage,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  TextInput,
  SafeAreaView,
  TouchableHighlight,
  Dimensions,
  FlatList,
  ScrollView
} from 'react-native';

import styles from './style';
import {APP_STORE} from '../../Store';
import {strings} from '../../i18n';
import {connection, internet, checkConectivity, toastMsg } from '../../utils';

var { height, width } = Dimensions.get('window');

export default class Chat extends Component {
    constructor(props) {
        super(props);
    }

    static navigationOptions = ({ navigation }) => {
      const {params} = navigation.state;

      return {
        title: 'Chat Persona',
      };
    };

    componentDidMount(){

    }

    componentWillUnmount() {
    }

    render() {
      return (
        <View style={styles.viewContainer}>
          <View style={styles.viewLeft}>
            <View style={styles.viewTextLeft}>
              <Text>hola bot que tal!</Text>
            </View>
            <View style={styles.viewTextLeft}>
              <Text>hola bot que tal!</Text>
            </View>
            <View style={styles.viewTextLeft}>
              <Text>hola bot que tal!</Text>
            </View>
            <View style={styles.viewTextLeft}>
              <Text>hola bot que tal!</Text>
            </View>
            <View style={styles.viewTextLeft}>
              <Text>hola bot que tal!</Text>
            </View>
            <View style={styles.viewTextLeft}>
              <Text>hola bot que tal!</Text>
            </View>
            <View style={styles.viewTextLeft}>
              <Text>hola bot que tal!</Text>
            </View>
          </View>
          <View style={styles.viewRight}>
            <View style={styles.viewTextRight}>
              <Text style={styles.styleTextRight}>hola</Text>
            </View>
          </View>
          <View style={styles.viewContainerInput}>
            <View style={styles.viewInput}>
              <TextInput
                  style={styles.inputStyle}
                  underlineColorAndroid='transparent'
                  editable={true}
                  multiline = {true}
                  numberOfLines = {4}
                  placeholder='Escribe un mensaje'
                  returnKeyType = {"send"}
                  onSubmitEditing={() => { this.passwordInput.focus(); }}
                  blurOnSubmit={false}
              />
            <TouchableOpacity style={styles.viewIconSend}>
                <Image style={styles.iconSend} source={require('../../assets/img/send.png')}/>
              </TouchableOpacity>
            </View>
          </View>
        </View>

      );
    }
}
