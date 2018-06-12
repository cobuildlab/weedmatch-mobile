import React, { Component } from 'react';
import { Container, Header, Content, Tab, Tabs,TabHeading,Text, Left, Body, Right, Button, Icon, Title } from 'native-base';
import { Image, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import Home from '../../components/Home';
import Swiper from '../../components/Swiper';
import Profile from '../../components/Profile';
import styles from './style';

export default class TopBar extends Component {

  static navigationOptions = { header: null };

  constructor() {
    super();
    this.state = {
      activePage: 0
    };
  }

  getSwiperImage(){

    const image = this.state.activePage == 0 ? <Image source={require('../../assets/img/mariOn.png')} style={styles.imageContainerLeft} /> : <Image source={require('../../assets/img/mari.png')} style={styles.imageContainerLeft} />;

    return (
      image
    )
  }

  getFeedImage(){

    const image = this.state.activePage == 1 ? <Image source={require('../../assets/img/420On.png')} style={styles.imageContainerRight} /> : <Image source={require('../../assets/img/420.png')} style={styles.imageContainerRight} />;

    return (
      image
    )
  }

  showProfile() {
    this.props.navigation.navigate('Profile');
  }
  showMessage() {
    this.props.navigation.navigate('Message');
  }

  showChat() {
    // this.props.navigation.navigate('Chat');
  }

  render() {
    return (
      <Container style={styles.bgColor}>
        <TouchableOpacity style={styles.buttomIconProfile} onPress={ () => this.showProfile()}>
          <Image style={styles.imgIconProfile} source={require('../../assets/img/profile.png')}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttomIconMsg} onPress={ () => this.showMessage()}>
          <Image style={styles.imgIconMsg} source={require('../../assets/img/msj.png')}/>
        </TouchableOpacity>
        <Tabs
          initialPage={0}
          locked={true}
          onChangeTab={ (event) => {this.setState({ activePage: event.i })} }
          tabBarUnderlineStyle={styles.containerColor}
          tabContainerStyle={styles.tabContainerStyle}
          edgeHitWidth={0}
        >
          <Tab heading={<TabHeading style={styles.tabContainer}>{this.getSwiperImage()}</TabHeading>}>
            <Swiper navigation={this.props.navigation}/>
          </Tab>
          <Tab heading={<TabHeading style={styles.tabContainer}>{this.getFeedImage()}</TabHeading>}>
            <Home navigation={this.props.navigation}/>
          </Tab>
        </Tabs>
      </Container>
    );
  }
}
