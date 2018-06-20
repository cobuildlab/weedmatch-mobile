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
import { Container, Header, Content, Tab, Tabs, TabHeading } from 'native-base';
import Tab1 from '../Message';
import Tab2 from '../Like';

export default class Notifications extends Component {
    constructor(props) {
        super(props);
    }

    static navigationOptions = ({ navigation }) => {
      const {params} = navigation.state;

      return {
        title: strings('main.noti'),
      };
    };

    componentDidMount(){

    }

    componentWillUnmount() {
    }

    render() {
      return (
        <Container style={styles.tabContainer}>
        <Tabs
          initialPage={0}
          tabBarUnderlineStyle={styles.underLineColor}
          tabContainerStyle={styles.tabContainerStyle}
          edgeHitWidth={0}
          >
          <Tab heading={<TabHeading style={styles.tabContainer}><Text style={styles.textTab}>Mensajes</Text></TabHeading>}>
            <Tab1 navigation={this.props.navigation}/>
          </Tab>
          <Tab heading={<TabHeading style={styles.tabContainer}><Text style={styles.textTab}>Me encanta</Text></TabHeading>}>
            <Tab2 navigation={this.props.navigation}/>
          </Tab>
        </Tabs>
      </Container>
      );
    }
}
