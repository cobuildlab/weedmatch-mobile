import React, {Component} from 'react';
import {Container, Tab, Tabs, TabHeading} from 'native-base';
import {Image, TouchableOpacity, AsyncStorage, Platform, Alert, AppState} from 'react-native';
import {changeToken, validateToken} from './TopBarActions'
import {NavigationActions} from 'react-navigation'
import firebase from 'react-native-firebase';
import Home from '../../components/Home';
import {APP_STORE} from '../../Store';
import Swiper from '../../components/Swiper';
import styles from './style';
// Optional: Flow type
import type {Notification, NotificationOpen} from 'react-native-firebase';

export default class TopBar extends Component {

    static navigationOptions = {header: null};

    constructor() {
        super();
        this.state = {
            activePage: 0,
            notification: "false",
            like: "false",
            currentChatUsername: ""
        };

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

    componentDidMount() {
        // check if there is unread messages
        this.popNoti();

        // console.log("TOPBAR:componentDidMount", AppState.currentState);
        AppState.addEventListener('change', this._handleAppStateChange);

        // Clean all indications of notifications when we start the App
        firebase.notifications().removeAllDeliveredNotifications();

        // this event gets trigger when the user open a chats
        this.chatUser = APP_STORE.CHATNOTIF_EVENT.subscribe(state => {
            this.setState({currentChatUsername: state.chatNotif})
        });

        // This is when a notification arrives
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
            .then((notificationOpen: NotificationOpen) => {
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

            // if i'm talking with this guy, don't show it
            if (this.state.currentChatUsername === notification.data.username) {
                return;
            }

            // Any other scenario, show the notification
            firebase.notifications().displayNotification(localNotification);
            // A signal to tell the system there is a new notification
            APP_STORE.NOTI_EVENT.next({"noti": true});
            // console.log('onNotification:', notification)

            // If the App is open, clear the notifications tray
            if (AppState.currentState === "active") {
                setTimeout(() => {
                    firebase.notifications().removeAllDeliveredNotifications();
                }, 1000);
            }

        });

        // this is when someone taps on the notification
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
    }

    notifHandler(data) {
        switch (data.type_notification) {
            case "ME":
                if (this.state.like == "false") {
                    this.props.navigation.navigate('Notifications', {tabIndex: 1});
                    break;
                }
            default:
                if (this.state.currentChatUsername != data.username) {
                    this.props.navigation.navigate('Notifications', {tabIndex: 0, data: data});
                    break;
                }
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


        AppState.removeEventListener('change', this._handleAppStateChange);
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

    render() {
        return (
            <Container style={styles.bgColor}>
                <TouchableOpacity style={styles.buttomIconProfile} onPress={() => this.showProfile()}>
                    <Image style={styles.imgIconProfile} source={require('../../assets/img/profile.png')}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttomIconMsg} onPress={() => this.showMessage()}>
                    <Image style={styles.imgIconMsg}
                           source={this.state.notification ? require('../../assets/img/msjActi.png') : require('../../assets/img/msj.png')}/>
                </TouchableOpacity>
                <Tabs
                    initialPage={0}
                    locked={true}
                    onChangeTab={(event) => {
                        this.setState({activePage: event.i})
                    }}
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
