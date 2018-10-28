import React, {Component} from 'react';
import {ActivityIndicator, View, Image, AppState} from 'react-native';
import {WS_URL} from '../../utils';

import {APP_STORE} from '../../Store';
import {strings} from '../../i18n';
import {internet, checkConectivity, toastMsg} from '../../utils';
import styles from './style';
import {GiftedChat, Bubble, Send} from 'react-native-gifted-chat';
import {chatAction, appendData} from './ChatActions';
import WS from 'react-native-websocket';

export default class Chat extends Component {
    constructor(props) {
        super(props);

        this.state = {
            connected: false,
            isLoading: true,
            messages: [],
            morePages: false,
            numPage: 0,
            open: false,
            refreshing: true,
            urlPage: '',
        };

        this.reconnect = true;
    }

    static navigationOptions = ({navigation}) => {
        const {params} = navigation.state;

        return {
            // title: navigation.getParam('otherUser', '0'),
            title: params.name,
        };
    };

    _handleWebSocketSetup() {
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
        this.socket = new WebSocket(WS_URL + '?' + queryString);

        this.socket.onopen = () => {
            // eslint-disable-next-line no-console
            console.log('CHAT:_handleWebSocketSetup:onopen');

            this.setState({connected: true});
            this.props.navigation.setParams({
                name: this.getOtherUser(),
            });
        };

        this.socket.onmessage = ({data}) => {
            // eslint-disable-next-line no-console
            console.log('CHAT:_handleWebSocketSetup:onmesage', data);

            const json = JSON.parse(data);

            this.onReceive(json.message);
        };

        this.socket.onerror = e => {
            // eslint-disable-next-line no-console
            console.error('CHAT:_handleWebSocketSetup:onerror', e);
            // eslint-disable-next-line no-console
            console.error(
                'CHAT:_handleWebSocketSetup:onerror',
                JSON.stringify(e)
            );
        };

        this.socket.onclose = e => {
            // eslint-disable-next-line no-console
            console.log('CHAT:_handleWebSocketSetup:onclose');
            // eslint-disable-next-line no-console
            console.log(e.code, e.reason);

            if (this.reconnect) {
                this.props.navigation.setParams({
                    name: strings('chat.reconnect'),
                });

                setTimeout(() => {
                    this._handleWebSocketSetup();
                }, 3000);
            }
        };
    }

    _handleAppStateChange = nextAppState => {
        // eslint-disable-next-line no-console
        console.log('TOPBAR:_handleAppStateChange', nextAppState);

        if (nextAppState == 'active') this.getEarlyMessages();
    };

    UNSAFE_componentWillMount() {
        this.props.navigation.setParams({
            name: this.getOtherUser(),
        });
    }

    componentDidMount() {
        APP_STORE.CHATNOTIF_EVENT.next({chatNotif: this.getOtherUser()});

        // For some reason this stop working so i change it to a plugin
        // this._handleWebSocketSetup();

        AppState.addEventListener('change', this._handleAppStateChange);

        this.chatMsg = APP_STORE.CHATMSG_EVENT.subscribe(state => {
            // eslint-disable-next-line no-console
            console.log('Chat:componentDidMount:CHATMSG_EVENT');

            if (state.chatMsg) {
                // console.log(this.state);
                if (this.state.numPage > 0) {
                    this.setState(prevState => ({
                        isLoading: false,
                        messages: GiftedChat.prepend(
                            [],
                            appendData(
                                prevState.messages,
                                state.chatMsg,
                                this.getOtherUser()
                            )
                        ),
                    }));
                } else {
                    this.setState(prevState => ({
                        isLoading: false,
                        messages: GiftedChat.append(
                            [],
                            appendData(
                                prevState.messages,
                                state.chatMsg,
                                this.getOtherUser()
                            )
                        ),
                        refreshing: false,
                    }));
                }

                return;
            }
            if (state.error) {
                toastMsg(state.error);
            }
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

    close() {
        this.reconnect = false;
        this.socket.close();
    }

    getOtherUser() {
        return this.props.navigation.getParam('otherUser', '0');
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
                        backgroundColor: 'white',
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
