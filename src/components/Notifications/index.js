import React, { Component } from 'react';
import {
  Text,
  Platform
} from 'react-native';

import styles from './style';
import {strings} from '../../i18n';
import {APP_STORE} from '../../Store';
import { Container, Tab, Tabs,TabHeading } from 'native-base';
import Tab1 from '../Message';
import Tab2 from '../Like';

export default class Notifications extends Component {
    constructor(props) {
        super(props);
        this.state = {
          index: 0,
        };
      }

    static navigationOptions = ({ navigation }) => {
      const {params} = navigation.state;

      return {
        title: strings('main.noti'),
      };
    };

    componentDidMount() {

      setTimeout(()=>{
        APP_STORE.NOTI_EVENT.next({"noti": "false"});
        this.setState({index: this.props.navigation.getParam('tabIndex', 0)})
      },0)
    }

    render() {
      return (
        <Container style={styles.tabContainer}>
        <Tabs
          locked
          page={this.state.index}
          ref={(index) => this._tabs = index}
          tabBarUnderlineStyle={styles.underLineColor}
          tabContainerStyle={styles.tabContainerStyle}
          edgeHitWidth={0}
          >
          <Tab heading={<TabHeading style={styles.tabContainer}><Text style={styles.textTab}>{strings('main.message')}</Text></TabHeading>}>
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
