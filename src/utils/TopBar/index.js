import React, {Component} from 'react';
import {Container, Tab, Tabs, TabHeading} from 'native-base';
import {Image, TouchableOpacity, AsyncStorage, Platform, Alert} from 'react-native';
import {changeToken} from './TopBarActions'
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
            chat: ""
        };

    }

    popNoti() {
        AsyncStorage.getItem('noti').then((value) => {
            console.log("TopBar:popNotification:", value);
            this.setState({notification: value})
        }).catch(err => {
            console.error("TopBar:popNotification:", err);
        });
    }

    componentDidMount() {
        // TODO: Algo de aqui esta fallando
        this.popNoti();

        this.chatUser = APP_STORE.CHATNOTIF_EVENT.subscribe(state => {
            this.setState({chat: state.chatNotif})
        });

        this.noti = APP_STORE.NOTI_EVENT.subscribe(state => {
            console.log("TopBar:componentDidMount:noti", state);
            this.setState({notification: state.noti})
        });

        const channel = new firebase.notifications.Android.Channel(
            "general",
            "General Notifications",
            firebase.notifications.Android.Importance.Default
        ).setDescription("General Notifications");

        firebase.notifications().android.createChannel(channel);

        this.onTokenRefreshListener = firebase.messaging().onTokenRefresh(fcmToken => {
            console.log("TopBar:componentDidMount:onTokenRefresh", fcmToken);

            this.validateToken(fcmToken)
        });

        this.fcmMessageListener = firebase.messaging().onMessage(message => {
            console.log("TopBar:componentDidMount:onMessague", message);
        })

        firebase.notifications().getInitialNotification()
            .then((notificationOpen: NotificationOpen) => {
                console.log("TOPBAR:getInitialNotification", notificationOpen);
                console.log("TOPBAR:getInitialNotification", NotificationOpen);
                if (notificationOpen) {
                    this.notifHandler(notificationOpen.notification.data)
                } else {
                    console.error("TOPBAR:getInitialNotification", "No notificacion");
                }
            });

        this.notificationListener = firebase.notifications().onNotification(notification => {
            console.log("TOPBAR:onNotification");

            if (Platform.OS === 'android') {
                console.log("TOPBAR:onNotification:Android");
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
                    .android.setAutoCancel(true)
                    .android.setColor('#000000')
                    .android.setPriority(firebase.notifications.Android.Priority.High);

                if (this.state.chat != localNotification.data.username) {
                    firebase.notifications().displayNotification(localNotification)
                } else {
                    console.log("TOPBAR:onNotification:Android", "In chat, won't show")
                }
            } else {
                if (this.state.chat != notification.data.username) {
                    firebase.notifications().displayNotification(notification)
                }
            }
            APP_STORE.NOTI_EVENT.next({"noti": "true"});
            // console.log('onNotification:', notification)
        });

        this.notificationOpenedListener = firebase.notifications().onNotificationOpened(notificationOpen => {
            console.log("TopBar:componentDidMount:onNotificationOpen", notificationOpen);

            this.notifHandler(notificationOpen.notification.data)
        });

        this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed(notification => {
            console.log("TopBar:componentDidMount:onNotificationDisplayed", notification);
        });
    }

    notifHandler(data) {
        console.log(data)
        switch (data.type_notification) {
            case "ME":
                if (this.state.like == "false") {
                    this.props.navigation.navigate('Notifications', {tabIndex: 1});
                    break;
                }
            default:
                if (this.state.chat != data.username) {
                    this.props.navigation.navigate('Notifications', {tabIndex: 0, data: data});
                    break;
                }
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
        this.chatUser.unsubscribe();
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
                           source={this.state.notification == "true" ? require('../../assets/img/msjActi.png') : require('../../assets/img/msj.png')}/>
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
