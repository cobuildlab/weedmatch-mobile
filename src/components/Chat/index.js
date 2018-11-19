import React, {Component} from 'react';
import {ActivityIndicator, View, Image, AppState} from 'react-native';
import {WS_URL} from '../../utils';

import {APP_STORE} from '../../Store';
import {internet, checkConectivity, toastMsg} from '../../utils';
import styles from './style';
import {GiftedChat, Bubble, Send} from 'react-native-gifted-chat';
import {chatAction, appendData} from './ChatActions';
import WS from 'react-native-websocket';
import ChatTitle from '../../modules/chat/ChatTitle';
import {WHITE} from '../../styles/colors';

export default class Chat extends Component {
    static navigationOptions = ({navigation}) => {
        const {params} = navigation.state;
        const {name, imgProfile, otherID} = params;

        return {
            headerTitle: <ChatTitle src={imgProfile} name={name} onPress={() => {
                navigation.navigate('PublicProfile', {userId: otherID});
            }
            }/>,
        };
    };

    state = {
        connected: false,
        isLoading: true,
        messages: [],
        morePages: false,
        numPage: 0,
        open: false,
        refreshing: true,
        urlPage: '',
    };

    _handleAppStateChange = nextAppState => {
        // eslint-disable-next-line no-console
        console.log('TOPBAR:_handleAppStateChange', nextAppState);

        if (nextAppState == 'active') this.getEarlyMessages();
    };

    componentDidMount() {
        this.props.navigation.setParams({
            imgProfile: this.getImgProfile(),
            name: this.getOtherUser(),
        });

        APP_STORE.CHATNOTIF_EVENT.next({chatNotif: this.getOtherUser()});
        AppState.addEventListener('change', this._handleAppStateChange);

        // For receiving the latest messagues or if the user scrolls up in history
        this.chatMsg = APP_STORE.CHATMSG_EVENT.subscribe(state => {
            // eslint-disable-next-line no-console
            console.log('Chat:componentDidMount:CHATMSG_EVENT');

            if (state.error) {
                toastMsg(state.error);
                return;
            }

            if (!state.chatMsg)
                return;

            const newState = {
                isLoading: false,
            };

            const fullChat = appendData(
                this.state.messages,
                state.chatMsg,
                this.getOtherID()
            );

            if (this.state.numPage > 0) {
                newState['messages'] = GiftedChat.prepend([], fullChat);
            } else {
                newState['messages'] = GiftedChat.append([], fullChat);
                newState['refreshing'] = false;
            }

            this.setState(newState);
        });

        this.chatPage = APP_STORE.CHATPAGE.subscribe(state => {
            // eslint-disable-next-line no-console
            console.log('Chat:componentDidMount:CHATPAGE');

            if (state.chatMsgPage) {
                this.setState({
                    morePages: true,
                    numPage: this.state.numPage + 1,
                    urlPage: state.chatMsgPage,
                });
                return;
            } else {
                this.setState({
                    morePages: false,
                    urlPage: '',
                });
            }
            if (state.error) {
                toastMsg(state.error);
            }
        });

        this.getEarlyMessages();
    }

    componentWillUnmount() {
        // eslint-disable-next-line no-console
        console.log('Chat:componentWillUmmount');

        APP_STORE.CHATNOTIF_EVENT.next({chatNotif: ''});
        this.chatMsg.unsubscribe();
        this.chatPage.unsubscribe();
        // this.close()
        AppState.removeEventListener('change', this._handleAppStateChange);
    }

    getOtherUser() {
        return this.props.navigation.getParam('otherUser', '0');
    }

    getImgProfile() {
        return this.props.navigation.getParam('imgProfile', '');
    }

    getOtherID() {
        return this.props.navigation.getParam('otherID', '0');
    }

    getChatID() {
        return this.props.navigation.getParam('chat_id', '0');
    }

    getEarlyMessages() {
        if (checkConectivity()) {
            this.setState({isLoading: true});
            chatAction(this.state, this.getChatID());
        } else {
            internet();
        }
    }

    onReceive(messages) {
        const message = {
            _id: Math.round(Math.random() * 1000000),
            createdAt: new Date(),
            text: messages,
            user: {
                _id: this.getOtherID(),
                avatar: '',
                name: 'React Native',
            },
        };

        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, message),
        }));
    }

    onSend(messages = []) {
        // eslint-disable-next-line no-console
        console.log('onSend:SOCKET CONNECTED');

        const payload = {
            chat_id: this.getChatID(),
            id_user_send: this.getOtherID(),
            message: messages[0].text,
            user: APP_STORE.getUser(),
        };
        this.WS.send(JSON.stringify(payload));
        // this.setState(prevState => ({open: !prevState.open}))
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }));
    }

    renderBubble(props) {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    left: {
                        backgroundColor: WHITE,
                    },
                    right: {
                        backgroundColor: '#9605CC',
                    },
                }}
            />
        );
    }

    renderTime() {
        return null;
    }

    renderSend(props) {
        return (
            <Send {...props}>
                <View style={styles.sendInnerView}>
                    <Image
                        source={require('../../assets/img/send.png')}
                        resizeMode={'center'}
                    />
                </View>
            </Send>
        );
    }

    render() {
        if (this.state.refreshing) {
            return (
                <View style={[styles.containers, styles.horizontal]}>
                    <ActivityIndicator size="large" color="#9605CC"/>
                </View>
            );
        }
        const {navigation} = this.props;
        const chat_id = navigation.getParam('chat_id', '0');
        let queryString =
            'id_user=' +
            APP_STORE.getId() +
            '&' +
            'username=' +
            APP_STORE.getUser() +
            '&' +
            'chat_id=' +
            chat_id +
            '&' +
            'token=' +
            APP_STORE.getToken();
        const url = WS_URL + '?' + queryString;
        const that = this;

        return (
            <View style={styles.root}>
                <WS
                    ref={ref => {
                        this.ws = ref;
                        that.WS = ref;
                    }}
                    url={url}
                    onOpen={() => {
                        // eslint-disable-next-line no-console
                        console.log('Open!');
                        // const payload = {
                        //     "message": "HOLA",
                        //     "user": APP_STORE.getUser(),
                        //     "id_user_send": that.getOtherID(),
                        //     "chat_id": that.getChatID(),
                        // }
                        // this.ws.send(JSON.stringify(payload));
                    }}
                    onMessage={data => {
                        // eslint-disable-next-line no-console
                        console.log(
                            'CHAT:_handleWebSocketSetup:onmesage',
                            data
                        );
                        // eslint-disable-next-line no-console
                        console.log(
                            'CHAT:_handleWebSocketSetup:onmesage',
                            data.data
                        );
                        const json = JSON.parse(data.data);
                        that.onReceive(json.message);
                    }}
                    // eslint-disable-next-line no-console
                    onError={console.error}
                    // eslint-disable-next-line no-console
                    onClose={console.log}
                    reconnect // Will try to reconnect onClose
                />
                <GiftedChat
                    renderAvatar={null}
                    loadEarlier={this.state.morePages}
                    // renderTime={this.renderTime}
                    renderBubble={this.renderBubble}
                    onLoadEarlier={() => this.getEarlyMessages()}
                    isLoadingEarlier={this.state.isLoading}
                    renderSend={this.renderSend}
                    messages={this.state.messages}
                    onSend={messages => this.onSend(messages)}
                    user={{
                        _id: APP_STORE.getId(),
                    }}
                />
            </View>
        );
    }
}
