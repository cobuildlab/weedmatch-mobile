import React, {Component} from 'react';
import {Container, Tab, Tabs, TabHeading} from 'native-base';
import {Modal, Image, TouchableOpacity, AsyncStorage, Platform, Alert, AppState, SafeAreaView} from 'react-native';
import {updatelocation, validateToken} from './TopBarActions'
import firebase from 'react-native-firebase';
import Home from '../../components/Home';
import {APP_STORE} from '../../Store';
import Swiper from '../../components/Swiper';
import styles from './style';
// Optional: Flow type
// import { Notification } from 'react-native-firebase';
import ForceRerenderContainer from '../ForceRerenderContainer';
/**
 * @typedef {import('react-native-firebase').RNFirebase.notifications.NotificationOpen} NotificationOpen
 */
import MatchUsersScreen from "../../modules/swiper/MatchUsersScreen";
import GeoLocationProvider from "../geolocation/GeoLocationProvider";
import {strings} from "../../i18n";

import AuthStore,
{events as authStoreEvents} from '../../modules/auth/AuthStore'
import store, {CHAT_USERNAME_EVENT} from '../../modules/chat/ChatStore';
import {getProfileImages} from "../../modules/auth/authActions";
import {GenericNotification} from "../../modules/notifications/GenericNotification";

/**
 * @typedef {import('../../modules/auth/AuthStore').UserObject} UserObject
 *
 */


export default class TopBar extends Component {

  static navigationOptions = {header: null};

  constructor() {
    super();

    this.state = {
      activePage: 0,
      like: "false",
      matchData: {},
      genericData: {},
      modalVisible: false,
      genericNotificationModalVisible: false,
      notification: "false",
      userImageURL: null,
    };
    this.currentChatUsername = null;
    this.swiper = null;
    this.feed = null;
  }

  popNoti() {
    AsyncStorage.getItem('noti').then((value) => {
      console.log("TopBar:popNotification:", value);
      value = (value === "true") ? true : false;
      this.setState({notification: value})
    }).catch(err => {
      console.error("TopBar:popNotification:", err);
    });
  }

  _handleAppStateChange = (nextAppState) => {
    console.log("TOPBAR:_handleAppStateChange", nextAppState);
    if (nextAppState == "active")
      firebase.notifications().removeAllDeliveredNotifications();
  };

  async componentDidMount() {
    // check if there is unread messages
    this.popNoti();

    // console.log("TOPBAR:componentDidMount", AppState.currentState);
    AppState.addEventListener('change', this._handleAppStateChange);

    // Clean all indications of notifications when we start the App
    firebase.notifications().removeAllDeliveredNotifications().then(some => console.log("TopBar:componentDidMount", some));

    // this event gets trigger when the user open a chats
    this.chatUsernameSubscription = store.subscribe(CHAT_USERNAME_EVENT, username => this.currentChatUsername = username);


    // This is when a notification arrives to check the purple dot in the UI
    this.noti = APP_STORE.NOTI_EVENT.subscribe(state => {
      this.setState({notification: state.noti})
    });

    // This is for refreshing the token if FIREBASE dares to change it
    this.onTokenRefreshListener = firebase.messaging().onTokenRefresh(fcmToken => {
      validateToken(fcmToken)
    });

    // For Android we need to create this channel
    const channel = new firebase.notifications.Android.Channel(
      "general",
      "General Notifications",
      firebase.notifications.Android.Importance.Default
    ).setDescription("General Notifications");

    firebase.notifications().android.createChannel(channel);

    // Do we need this here? REALLY?
    // this.fcmMessageListener = firebase.messaging().onMessage(message => {
    //     console.log("TopBar:componentDidMount:onMessague", message);
    // });

    // This initialNotification if for when the App it's opened from tapping in a notification
    firebase.notifications().getInitialNotification()
      .then((/** @type {NotificationOpen} */ notificationOpen) => {
        console.log("TOPBAR:getInitialNotification", notificationOpen);

        if (notificationOpen) {
          this.notifHandler(notificationOpen.notification.data);
        }
      });

    // When we receive a notification
    this.notificationListener = firebase.notifications().onNotification(notification => {
      console.log("TOPBAR:onNotification", notification.data);

      let localNotification = notification;
      if (Platform.OS === 'android') {
        localNotification = new
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
          .android.setAutoCancel(true)
          .android.setColor('#000000')
          .android.setPriority(firebase.notifications.Android.Priority.High);

      }
      console.log("ANGELLLLL", this.props.navigation.getParam('otherUser', null));
      // if i'm talking with this guy, don't show it
      if (this.currentChatUsername === notification.data.username) {
        return;
      }
      ;

      // If the notification is about a Match
      if (notification.data.type_notification === "MC") {
        firebase.analytics().logEvent("user_match");
        this.setState({modalVisible: true, matchData: notification.data});
        return;
      }

      // If the notification is Generic
      if (notification.data.type_notification === "GENERIC") {
        this.setState({genericNotificationModalVisible: true, genericData: notification.data});
        return;
      }

      // Any other scenario, show the notification
      firebase.notifications().displayNotification(localNotification);
      // A signal to tell the APP there is a new notification
      APP_STORE.NOTI_EVENT.next({"noti": true});
      // console.log('onNotification:', notification)

      // If the App is open, clear the notifications tray
      if (AppState.currentState === "active") {
        setTimeout(() => {
          firebase.notifications().removeAllDeliveredNotifications();
        }, 1000);
      }

    });

    // this is when someone taps on the notification with the app Open
    this.notificationOpenedListener = firebase.notifications().onNotificationOpened(notificationOpen => {
      console.log("TOPBAR:OnNotificationopen", notificationOpen);
      this.notifHandler(notificationOpen.notification.data);
      // And i need to remove it
      // Better, let's remove it all
      firebase.notifications().removeAllDeliveredNotifications();
    });

    // this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed(notification => {
    //     // console.log("TopBar:componentDidMount:onNotificationDisplayed", notification);
    // });

    // for the user pic
    this.userSubscription = AuthStore.subscribe(authStoreEvents.PROFILE_IMAGE,
      (/** @type {UserObject} */imgProfile) => {
        if (typeof imgProfile === 'string') {
          if (imgProfile.length > 0) {
            this.setState({
              userImageURL: imgProfile
            })
          }
        }
      });

    await getProfileImages(APP_STORE.getToken(), APP_STORE.getId());
  }

  /**
   * Method to handle the touch of a notification
   **/
  notifHandler(data) {
    console.log("TopBar:index:notifHandler", data);
    switch (data.type_notification) {
      case "ME": // I like it Notification
        if (this.state.like == "false") { // Like notification
          this.props.navigation.navigate('Notifications', {tabIndex: 1});
        }
        break;
      case "MC": // Match notification
        firebase.analytics().logEvent("user_match");
        this.props.navigation.navigate('Notifications', {tabIndex: 0, data: data});
        break;
      case "GENERIC": // Generic notification
        this.setState({genericNotificationModalVisible: true, genericData: data});
        return;
      case "AC": // Accept I love
        Alert(`ACCEPT I LOVE IT: ${JSON.stringify(data)}`);
        if (this.currentChatUsername != data.username) { // Match Notification
          this.setState({modalVisible: true, matchData: data});
          break;
        }
        break;
      default:
        console.warn("UNHANDLED NOTIFICATION TYPE:", JSON.stringify(data));
    }
    APP_STORE.NOTI_EVENT.next({"noti": false});
  }


  componentWillUnmount() {
    // this.fcmMessageListener();
    this.notificationListener();
    // this.notificationDisplayedListener();
    this.notificationOpenedListener();
    this.onTokenRefreshListener();
    this.noti.unsubscribe();
    this.chatUser.unsubscribe();
    this.chatUsernameSubscription.unsubscribe();
    AppState.removeEventListener('change', this._handleAppStateChange);
    this.userSubscription.unsubscribe();
  }

  getSwiperImage() {
    const image = this.state.activePage == 0 ?
      <Image source={require('../../assets/img/mariOn.png')} style={styles.imageContainerLeft}/> :
      <Image source={require('../../assets/img/mari.png')} style={styles.imageContainerLeft}/>;
    return (
      image
    )
  }

  getFeedImage() {
    const image = this.state.activePage == 1 ?
      <Image source={require('../../assets/img/420On.png')} style={styles.imageContainerRight}/> :
      <Image source={require('../../assets/img/420.png')} style={styles.imageContainerRight}/>;
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

  onLocation = position => {
    console.log('TopBar:onLocation', position);
    updatelocation(position);
  };

  onChangeTab = event => {
    this.setState({activePage: event.i});
    if (event.i === 0) {// Swiper
      this.swiper.forceRenderOfChilds();
      this.feed.forceUnmountOfChilds();
    }
    if (event.i === 1) {// Feed
      this.feed.forceRenderOfChilds();
      this.swiper.forceUnmountOfChilds();
    }
  };

  render() {
    return (
      <SafeAreaView style={[styles.background]}>
        <GeoLocationProvider dialogMessage={strings('register.locationMessage')}
                             dialogTitle={strings('register.locationTitle')} onLocation={this.onLocation}
                             active={true}
        />
        <Container style={styles.bgColor}>

          <TouchableOpacity style={styles.buttomIconProfile} onPress={() => this.showProfile()}>
            {
              this.state.userImageURL == null
                ?
                <Image style={styles.imgIconProfile} source={require('../../assets/img/profile.png')}/>
                : <Image style={styles.imgIconProfile} source={{uri: this.state.userImageURL}}/>
            }
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttomIconMsg} onPress={() => this.showMessage()}>
            <Image style={styles.imgIconMsg}
                   source={this.state.notification ? require('../../assets/img/msjActi.png') : require('../../assets/img/msj.png')}/>
          </TouchableOpacity>
          <Tabs
            initialPage={0}
            locked={true}
            onChangeTab={this.onChangeTab}
            tabBarUnderlineStyle={styles.containerColor}
            tabContainerStyle={styles.tabContainerStyle}
            edgeHitWidth={0}
          >
            <Tab heading={<TabHeading style={styles.tabContainer}>{this.getSwiperImage()}</TabHeading>}>
              <ForceRerenderContainer ref={ref => this.swiper = ref}>
                <Swiper navigation={this.props.navigation}/>
              </ForceRerenderContainer>
            </Tab>
            <Tab heading={<TabHeading style={styles.tabContainer}>{this.getFeedImage()}</TabHeading>}>
              <ForceRerenderContainer ref={ref => this.feed = ref}>
                <Home navigation={this.props.navigation}/>
              </ForceRerenderContainer>
            </Tab>
          </Tabs>

          {/*MATCHM MODAL*/}
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {
            }}>
            <MatchUsersScreen
              data={this.state.matchData}
              onPress={() => {
                this.props.navigation.navigate('Notifications', {
                  tabIndex: 0,
                  data: this.state.matchData
                });
                this.setState({modalVisible: false});
              }}
              onClose={() => this.setState({modalVisible: false})}/>
          </Modal>

          {/*Generic MODAL*/}
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.genericNotificationModalVisible}
            onRequestClose={() => {
            }}>
            <GenericNotification
              data={this.state.genericData}
              onClose={() => this.setState({genericNotificationModalVisible: false})}/>
          </Modal>
        </Container>
      </SafeAreaView>

    );
  }
}
