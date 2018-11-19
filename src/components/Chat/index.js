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


    socket = null

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

        const chat_id = this.props.navigation.getParam('chat_id');
        
        if (typeof chat_id != 'number') {
            // nothing to do here, just go back
            this.handleAnyException()

            if (__DEV__) {
                // eslint-disable-next-line no-console
                console.warn(
                    `Chat id route parameter not a number, instead got: ${typeof chat_id}`
                )
            }
        }

        const socketURL =
            WS_URL +
            '?' +
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
        

        this.socket = new WebSocket(socketURL)

        this.socket.onclose = this.onSocketClose
        this.socket.onerror = this.onSocketError
        this.socket.onmessage = this.onSocketMessage
        this.socket.onopen = this.onSocketOpen

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
        
        this.socket.close()
        // garbage collect socket
        this.socket = null
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

    /**
     * @param {{ code: number }} e
     */
    onSocketClose = (e) => {
        if (__DEV__) {
            // eslint-disable-next-line no-console
            console.log('chat socket -> onClose')
        }
        // https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent#Properties
        
        // 1000 = normal close
        // 1001 = socket closed by server or by navigating away
        
        if (e.code > 1001) {
            if (__DEV__) {
                // eslint-disable-next-line no-console
                console.warn(
                    `socket closed with code greater than 1001, got code: ${e.code}`
                )
            }
            this.handleAnyException()
        }
    }

    /**
     * @param {{ message: string }} e
     */
    onSocketError = ({ message }) => {
        if (__DEV__) {
            // eslint-disable-next-line no-console
            console.warn(`socket error, e.message: ${message}`)
        }
        this.handleAnyException()
    }

    /**
     * @param {{ data: any }} e
     */
    onSocketMessage = ({ data }) => {
        if (__DEV__) {
            // eslint-disable-next-line no-console
            console.log('onSocketMessage:', data);
        }
        try {
            const json = JSON.parse(data);
            
            this.onReceive(json.message)
        } catch (e) {
            if (__DEV__) {
                // eslint-disable-next-line no-console
                console.warn('onSocketMessage()::', e.message);
            }
            this.handleAnyException();
        }
    }

    onSocketOpen = () => {
        if (__DEV__) {
            // eslint-disable-next-line no-console
            console.log('socket open');
        }
    }

    handleAnyException = () => {
        this.props.navigation.goBack()
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
        this.socket.send(JSON.stringify(payload));
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

        return (
            <View style={styles.root}>
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
