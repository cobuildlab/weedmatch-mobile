import React, {Component} from 'react';
import {
    Text,
    Platform
} from 'react-native';

import styles from './style';
import {strings} from '../../i18n';
import {APP_STORE} from '../../Store';
import {Container, Tab, Tabs, TabHeading} from 'native-base';
import Chats from '../Message';
import ILikedNotifications from '../Like';
import logToServer from 'log-to-server'
export default class Notifications extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
        };
    }

    static navigationOptions = ({navigation}) => {
        const {params} = navigation.state;

        return {
            title: strings('main.noti'),
        };
    };

    componentWillUnmount() {
        logToServer("Notifications:componentDidMount");
        this.notificationSubscription.unsubscribe();
    }

    componentDidMount() {
        logToServer("Notifications:componentDidMount");
        this.notificationSubscription = APP_STORE.NOTI_EVENT.subscribe(state => {
            if (state.noti === true) {
                logToServer("Notifications:componentDidMount", "Someone told me that there is a notification");
                logToServer("Notifications:componentDidMount", "but i'm the notification Lord, do yo see my name?");
                logToServer("Notifications:componentDidMount", "So i'm gonna shut it down");
                APP_STORE.NOTI_EVENT.next({"noti": false});
            }
        });

        setTimeout(() => {
            // When we enter the Notifications screen we clear all notifications
            APP_STORE.NOTI_EVENT.next({"noti": false});
            this.setState({index: this.props.navigation.getParam('tabIndex', 0)})
        }, 0);

    }

    render() {
        return (
            <Container style={styles.tabContainer}>
                <Tabs
                    locked
                    page={this.state.index}
                    tabBarUnderlineStyle={styles.underLineColor}
                    tabContainerStyle={styles.tabContainerStyle}
                    edgeHitWidth={0}
                >
                    <Tab heading={<TabHeading style={styles.tabContainer}><Text
                        style={styles.textTab}>{strings('main.message')}</Text></TabHeading>}>
                        <Chats navigation={this.props.navigation}/>
                    </Tab>
                    <Tab heading={<TabHeading style={styles.tabContainer}><Text style={styles.textTab}>Me encanta</Text></TabHeading>}>
                        <ILikedNotifications navigation={this.props.navigation}/>
                    </Tab>
                </Tabs>
            </Container>
        );
    }
}
