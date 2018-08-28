import React, {Component} from 'react';
import {
    ActivityIndicator,
    View,
    Image, AppState
} from 'react-native';
import {WS_URL} from '../../utils';

import {APP_STORE} from '../../Store';
import {strings} from '../../i18n';
import {internet, checkConectivity, toastMsg} from '../../utils';
import styles from './style';
import {GiftedChat, Bubble, Send} from 'react-native-gifted-chat'
import {chatAction, appendData} from './ChatActions';
import WS from 'react-native-websocket';
import firebase from "react-native-firebase";


export default class Chat extends Component {
    constructor(props) {
        super(props);

        this.state = {
            messages: [],
            open: false,
            connected: false,
            urlPage: '',
            numPage: 0,
            morePages: false,
            isLoading: true,
            refreshing: true
        }

        this.reconnect = true
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
        let queryString = 'id_user=' + APP_STORE.getId() + '&' + 'username=' + APP_STORE.getUser() + '&' + 'chat_id=' + chat_id + '&' + 'token=' + APP_STORE.getToken();
        this.socket = new WebSocket(WS_URL + "?" + queryString);

        this.socket.onopen = () => {
            console.log("CHAT:_handleWebSocketSetup:onopen");
            this.setState({connected: true});
            this.props.navigation.setParams({
                name: this.getOtherUser()
            });
        };

        this.socket.onmessage = ({data}) => {
            console.log("CHAT:_handleWebSocketSetup:onmesage", data);
            const json = JSON.parse(data);
            this.onReceive(json.message)
        }

        this.socket.onerror = (e) => {
            console.error("CHAT:_handleWebSocketSetup:onerror", e);
            console.error("CHAT:_handleWebSocketSetup:onerror", JSON.stringify(e));
        }

        this.socket.onclose = (e) => {
            console.log("CHAT:_handleWebSocketSetup:onclose");
            console.log(e.code, e.reason);
            if (this.reconnect) {
                this.props.navigation.setParams({
                    name: strings("chat.reconnect")
                });

                setTimeout(() => {
                    this._handleWebSocketSetup()
                }, 3000)
            }
        };
    }

    _handleAppStateChange = (nextAppState) => {
        console.log("TOPBAR:_handleAppStateChange", nextAppState);
        if (nextAppState == "active")
            this.getEarlyMessages();
    };


    componentWillMount() {
        this.props.navigation.setParams({
            name: this.getOtherUser()
        });

    }

    componentDidMount() {
        APP_STORE.CHATNOTIF_EVENT.next({"chatNotif": this.getOtherUser()});

        // For some reason this stop working so i change it to a plugin
        // this._handleWebSocketSetup();

        AppState.addEventListener('change', this._handleAppStateChange);

        this.chatMsg = APP_STORE.CHATMSG_EVENT.subscribe(state => {
            console.log("Chat:componentDidMount:CHATMSG_EVENT");
            if (state.chatMsg) {
                // console.log(this.state);
                if (this.state.numPage > 0) {
                    this.setState(prevState => ({
                        messages: GiftedChat.prepend([], appendData(prevState.messages, state.chatMsg, this.getOtherUser)),
                        isLoading: false,
                    }))
                } else {
                    this.setState(prevState => ({
                        refreshing: false,
                        messages: GiftedChat.append([], appendData(prevState.messages, state.chatMsg, this.getOtherUser)),
                        isLoading: false,
                    }))
                }

                return;
            }
            if (state.error) {
                toastMsg(state.error);
            }
        });

        this.chatPage = APP_STORE.CHATPAGE.subscribe(state => {
            console.log("Chat:componentDidMount:CHATPAGE");
            if (state.chatMsgPage) {

                this.setState({
                    urlPage: state.chatMsgPage,
                    numPage: this.state.numPage + 1,
                    morePages: true
                })
                return;
            } else {
                this.setState({
                    urlPage: '',
                    morePages: false
                })
            }
            if (state.error) {
                toastMsg(state.error);
            }
        });

        this.getEarlyMessages();
    }

    componentWillUnmount() {
        console.log("Chat:componentWillUmmount");
        APP_STORE.CHATNOTIF_EVENT.next({"chatNotif": ""});
        this.chatMsg.unsubscribe();
        this.chatPage.unsubscribe();
        // this.close()
        AppState.removeEventListener('change', this._handleAppStateChange);
    }

    close() {
        this.reconnect = false
        this.socket.close()
    }

    getOtherUser() {
        return this.props.navigation.getParam('otherUser', '0')
    }

    getOtherID() {
        return this.props.navigation.getParam('otherID', '0')
    }

    getChatID() {
        return this.props.navigation.getParam('chat_id', '0')
    }

    getEarlyMessages() {
        if (checkConectivity()) {
            this.setState({isLoading: true})
            chatAction(this.state, this.getChatID());
        } else {
            internet();
        }
    }

    onReceive(messages) {

        const message = {
            _id: Math.round(Math.random() * 1000000),
            text: messages,
            createdAt: new Date(),
            user: {
                _id: this.getOtherID(),
                name: 'React Native',
                avatar: '',
            },
        }

        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, message),
        }))
    }

    onSend(messages = []) {
        console.log('onSend:SOCKET CONNECTED');
        const payload = {
            "message": messages[0].text,
            "user": APP_STORE.getUser(),
            "id_user_send": this.getOtherID(),
            "chat_id": this.getChatID(),
        }
        this.WS.send(JSON.stringify(payload));
        // this.setState(prevState => ({open: !prevState.open}))
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }))
    }

    renderBubble(props) {
        return (<Bubble {...props}
                        wrapperStyle={{
                            left: {
                                backgroundColor: 'white',
                            },
                            right: {
                                backgroundColor: '#9605CC'
                            }
                        }}/>
        )
    }

    renderTime(props) {
        return (null)
    }

    renderSend(props) {
        return (
            <Send
                {...props}
            >
                <View style={{marginRight: 5, marginBottom: -10}}>
                    <Image source={require('../../assets/img/send.png')} resizeMode={'center'}/>
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
            )
        } else {
            const {navigation} = this.props;
            const chat_id = navigation.getParam('chat_id', '0');
            let queryString = 'id_user=' + APP_STORE.getId() + '&' + 'username=' + APP_STORE.getUser() + '&' + 'chat_id=' + chat_id + '&' + 'token=' + APP_STORE.getToken();
            const url = WS_URL + "?" + queryString;
            const that = this;

            return (
                <View style={{flex: 1}}>
                    <WS
                        ref={ref => {
                            this.ws = ref;
                            that.WS = ref;
                        }}
                        url={url}
                        onOpen={() => {
                            console.log('Open!')
                            // const payload = {
                            //     "message": "HOLA",
                            //     "user": APP_STORE.getUser(),
                            //     "id_user_send": that.getOtherID(),
                            //     "chat_id": that.getChatID(),
                            // }
                            // this.ws.send(JSON.stringify(payload));
                        }}
                        onMessage={data => {
                            console.log("CHAT:_handleWebSocketSetup:onmesage", data);
                            console.log("CHAT:_handleWebSocketSetup:onmesage", data.data);
                            const json = JSON.parse(data.data);
                            that.onReceive(json.message)
                        }}
                        onError={console.error}
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
            )
        }
    }
}

