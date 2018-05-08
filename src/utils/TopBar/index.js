import React, { Component } from 'react';
import { Container, Header, Content, Tab, Tabs,TabHeading,Text, Left, Body, Right, Button, Icon, Title } from 'native-base';
import { Image, TouchableOpacity,Alert } from 'react-native';
import Home from '../../components/Home';
import Swiper from '../../components/Swiper';
import Profile from '../../components/Profile';
import styles from '../../components/Authentication/styles';

export default class TopBar extends Component {

  static navigationOptions = { header: null };

  constructor() {
    super();
    this.state = {
      activePage: 0
    };
  }

  getSwiperImage(){

    const image = this.state.activePage == 0 ? <Image source={require('../../assets/img/mariOn.png')} style={{height:20,width:20}} /> : <Image source={require('../../assets/img/mari.png')} style={{height:20,width:20}} />;

    return (
      image
    )
  }

  getFeedImage(){

    const image = this.state.activePage == 1 ? <Image source={require('../../assets/img/420On.png')} style={{height:20,width:20}} /> : <Image source={require('../../assets/img/420.png')} style={{height:20,width:20}} />;

    return (
      image
    )
  }

  render() {
    return (
      <Container style={{backgroundColor: '#fff'}}>
        <Tabs
          initialPage={0}
          locked={true}
          onChangeTab={ (event) => {this.setState({ activePage: event.i })} }
          tabBarUnderlineStyle={{backgroundColor: '#fff'}}
          tabContainerStyle={{paddingTop: 35, paddingBottom: 20, marginRight: 130, marginLeft: 130, backgroundColor: '#fff', borderColor: 'transparent', }}
          >
            <Tab heading={<TabHeading>{this.getSwiperImage()}</TabHeading>}>
              <Swiper navigation={this.props.navigation}/>
            </Tab>
            <Tab heading={<TabHeading>{this.getFeedImage()}</TabHeading>}>
              <Home navigation={this.props.navigation}/>
            </Tab>
        </Tabs>
      </Container>
    );
  }
}
