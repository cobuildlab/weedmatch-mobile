import React, { Component } from 'react';
import { Container, Tab, Tabs,TabHeading } from 'native-base';
import { Image, TouchableOpacity,AsyncStorage,Platform,Alert } from 'react-native';
import {changeToken} from './TopBarActions'
import {NavigationActions} from 'react-navigation'
import firebase from 'react-native-firebase';
import Home from '../../components/Home';
import {APP_STORE} from '../../Store';
import Swiper from '../../components/Swiper';
import styles from './style';
// Optional: Flow type
import type { Notification, NotificationOpen } from 'react-native-firebase';

export default class TopBar extends Component {

  static navigationOptions = { header: null };

  constructor() {
    super();
    this.state = {
      activePage: 0,
      notification: "false",
      like: "false"
    };

  }

async popNoti() {
    try {
        await AsyncStorage.getItem('noti').then((value) => {
            console.log("popNotification:", value);
            this.setState({notification: value})
          });

    } catch (error) {
        console.error('AsyncStorage error: ' + error.message);
        return undefined;
    }
}

  componentDidMount() {

    this.popNoti()

    this.like = APP_STORE.LIKENOTIF_EVENT.subscribe(state => {
      if (state.likeNotif) {
        this.setState({like: "true"})
        return;
      }
    });

    this.noti = APP_STORE.NOTI_EVENT.subscribe(state => {
      console.log("TopBar:componentDidMount:noti", state);
      this.setState({notification: state.noti})
    });

    const channel = new firebase.notifications.Android.Channel(
      "general",
      "General Notifications",
      firebase.notifications.Android.Importance.Default
    ).setDescription("General Notifications")
    firebase.notifications().android.createChannel(channel)

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
          this.notifHandler(notificationOpen.notification.data)
        }
      });

    this.notificationListener = firebase.notifications().onNotification(notification => {

      if (Platform.OS === 'android') {
        const localNotification = new
        firebase.notifications.Notification({
                 sound: 'default',
                 icon: "ic_launcher",
                 show_in_foreground: true,
             })
                 .setNotificationId(notification.notificationId)
                 .setTitle(notification.title)
                 .setSubtitle(notification.subtitle)
                 .setBody(notification.body)
                 .setData(notification.data)
                 .android.setSmallIcon('ic_launcher')
                 .android.setChannelId('general')
                 .android.setPriority(firebase.notifications.Android.Priority.High);
        firebase.notifications().displayNotification(localNotification)
      } else {
        firebase.notifications().displayNotification(notification)
      }
      APP_STORE.NOTI_EVENT.next({"noti": true});
      console.log('onNotification:', notification)
    })

    this.notificationOpenedListener = firebase.notifications().onNotificationOpened(notificationOpen => {
      console.log('onNotificationOpened:', notificationOpen)

        this.notifHandler(notificationOpen.notification.data)
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
      default:
        this.props.navigation.navigate('Notifications', { tabIndex: 0, data: data });
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
    this.noti.unsubscribe();
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
          <Image style={styles.imgIconMsg} source={this.state.notification == "true" ? require('../../assets/img/msjActi.png') : require('../../assets/img/msj.png')}/>
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
