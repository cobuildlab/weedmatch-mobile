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

export default class Message extends Component {
    constructor(props) {
        super(props);
    }

    static navigationOptions = ({ navigation }) => {
      const {params} = navigation.state;

      return {
        title: strings('main.message'),
      };
    };

    componentDidMount(){

    }

    componentWillUnmount() {
    }

    showMeEncanta() {
      this.props.navigation.navigate('Like');
    }

    showChat() {
      this.props.navigation.navigate('Chat');
    }

    render() {
      return (
        <View style={styles.viewContainer}>
          <TouchableOpacity onPress={ () => this.showMeEncanta()}>
            <Text>me encanta</Text>
          </TouchableOpacity>
          <FlatList
            horizontal={false}
            data={[{key: 'User Name'}, {key: 'User Name'}, {key: 'User Name'},]}
            renderItem={({item}) =>
              <TouchableOpacity onPress={ () => this.showChat()}>
              <View style={styles.viewMsg}>
                <Image style={styles.imgProfileItem} source={require('../../assets/img/profile.png')}/>
                <View style={{flex: 1,
                  flexDirection: 'column',
                  alignItems: 'flex-start',}}>
                  <Text style={{marginLeft: 12, fontWeight: '500', fontSize: 16,}}>{item.key}</Text>
                <Text style={{marginLeft: 12, fontSize: 14,}}>{item.key}</Text>
                </View>
              </View>
              </TouchableOpacity>
            }
          />
        </View>
      );
    }
}
