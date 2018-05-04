import React, { Component } from 'react';
import { Container, Header, Content, Tab, Tabs,TabHeading,Text, Left, Body, Right, Button, Icon, Title } from 'native-base';
import { Image, TouchableOpacity } from 'react-native';
import Home from './src/components/Home';
import Swiper from './src/components/Swiper';
import Profile from './src/components/Profile';
import styles from './src/components/Authentication/styles';

export default class TopBar extends Component {

  static navigationOptions = { header: null };

  render() {
    return (
      <Container>
        <Tabs 
        initialPage={0}
        locked={true}
        >
          <Tab heading={<TabHeading><Image source={require('./src/assets/img/swiper.png')} style={{height:20,width:20}} /></TabHeading>}>
            <Swiper navigation={this.props.navigation}/>
          </Tab>
          <Tab heading={<TabHeading><Image source={require('./src/assets/img/420.png')} style={{height:20,width:20}} /></TabHeading>}>
            <Home navigation={this.props.navigation}/>
          </Tab>
      </Tabs>
      </Container>
    );
  }
}