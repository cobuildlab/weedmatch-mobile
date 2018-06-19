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
import {strings} from '../../i18n';
import { Container, Header, Content, Tab, Tabs } from 'native-base';
import Tab1 from '../Message';
import Tab2 from '../Like';

export default class Notifications extends Component {
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

    render() {
      return (
        <Container>
        <Tabs initialPage={0}>
          <Tab heading="Tab1">
            <Tab1 navigation={this.props.navigation}/>
          </Tab>
          <Tab heading="Tab2">
            <Tab2 navigation={this.props.navigation}/>
          </Tab>
        </Tabs>
      </Container>
      );
    }
}
