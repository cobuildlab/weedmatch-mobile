import React, { Component } from 'react';
import { Container, Tab, Tabs,TabHeading } from 'native-base';
import { Image, TouchableOpacity,AsyncStorage } from 'react-native';
import {changeToken} from './TopBarActions'
import firebase from 'react-native-firebase';
import Home from '../../components/Home';
import Swiper from '../../components/Swiper';
import styles from './style';
import {NavigationActions} from 'react-navigation'
// Optional: Flow type
import type { Notification, NotificationOpen } from 'react-native-firebase';

export default class TopBar extends Component {

  static navigationOptions = { header: null };

  constructor() {
    super();
    this.state = {
      activePage: 0,
    };
  }

  componentDidMount() {

    this.onTokenRefreshListener = firebase.messaging().onTokenRefresh(fcmToken => {
      console.log('FCM: ' + fcmToken)

      this.validateToken(fcmToken)

    });

    this.fcmMessageListener = firebase.messaging().onMessage(message => {
      console.log('onMessage:', message)
    })

    firebase.notifications().getInitialNotification()
      .then((notificationOpen: NotificationOpen) => {
        if (notificationOpen) {
          // App was opened by a notification
          // Get the action triggered by the notification being opened
          const action = notificationOpen.action;

          // Get information about the notification that was opened
          const notification: Notification = notificationOpen.notification;  

        }
      });

    this.notificationListener = firebase.notifications().onNotification(notification => {
      firebase.notifications().displayNotification(notification)
      console.log('onNotification:', notification)
    })

    this.notificationOpenedListener = firebase.notifications().onNotificationOpened(notificationOpen => {
      console.log('onNotificationOpened:', notificationOpen)

      this.props.navigation.popToTop()
      this.notifHandler(notificationOpen.notification.data)
      // this.props.navigation.dispatch(NavigationActions.back( this.notifHandler(notificationOpen.notification.data) ))
    })

    this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed(notification => {
      console.log('onNotificationDisplayed:', notification)
    })
  }

  notifHandler(data) {
    console.log(data)
    switch(data.type_notification) {
      case "ME":
        this.props.navigation.navigate('Notifications', { tabIndex: 1 });
        break;
      case "MC":
        this.props.navigation.navigate('Notifications', { tabIndex: 0, chat_id: data.chat_id });
        break;  
      case "AC":
        this.props.navigation.navigate('Notifications', { tabIndex: 0, chat_id: data.chat_id });
        break;  
      case "MS":
        this.props.navigation.navigate('Notifications', { tabIndex: 0, chat_id: data.chat_id });
        break; 
      default:
        break;
    }
}

  async validateToken(newToken) {
    try {
        const token = await AsyncStorage.getItem('firebase');
        if (token) {
            console.log("Firebase Token:", token);

            if (token != newToken) {
              changeToken(newToken)
            }
        }
    } catch (error) {
        console.error('AsyncStorage error: ' + error.message);
        return undefined;
    }
}

  componentWillUnmount() {
    this.fcmMessageListener()
    this.notificationListener()
    this.notificationDisplayedListener()
    this.notificationOpenedListener()
    this.onTokenRefreshListener();
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
    this.props.navigation.navigate('Notifications');
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
