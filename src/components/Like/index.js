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

export default class Like extends Component {
    constructor(props) {
        super(props);
    }

    static navigationOptions = ({ navigation }) => {
      const {params} = navigation.state;

      return {
        title: 'Me encanta',
      };
    };

    componentDidMount(){

    }

    componentWillUnmount() {
    }

    render() {
      return (

        <View style={styles.viewContainer}>
          <FlatList
            horizontal={false}
            data={[{key: 'Username'}, {key: 'Username'}, {key: 'Username'},]}
            renderItem={({item}) =>
              <TouchableOpacity>
              <View style={styles.viewMsg}>
                <Image style={styles.imgProfileItem} source={require('../../assets/img/profile.png')}/>
              <View style={styles.viewTexts}>
                    <Text style={styles.textUser}>{item.key} quiere contactar</Text>
                  <Text style={styles.textUser}>contigo</Text>
                <Text style={styles.textTime}>24h.</Text>
                </View>
                <View style={styles.viewOption}>
                  <View style={styles.viewButtom}>
                    <TouchableOpacity style={styles.Buttom}>
                    <Image source={require('../../assets/img/actions/mach.png')} style={styles.imageSize} />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.viewButtom}>
                    <TouchableOpacity style={styles.Buttom}>
                    <Image source={require('../../assets/img/actions/rejected.png')} style={styles.imageSize} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
            }
          />
        </View>
      );
    }
}
