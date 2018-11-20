// @ts-check
import React, {Component} from 'react';
import {ActivityIndicator, View, Image, AppState} from 'react-native';
import {WS_URL} from '../../utils';

import {APP_STORE} from '../../Store';
import {internet, checkConectivity, toastMsg} from '../../utils';
import styles from './style';
import {GiftedChat, Bubble, Send} from 'react-native-gifted-chat';
import {chatAction, appendData} from './ChatActions';
import ChatTitle from '../../modules/chat/ChatTitle';
import {WHITE} from '../../styles/colors';
/**
 * @typedef {import('../../definitions').NavigationScreenProp<ChatParams>} NavigationScreenProp
 */

/**
 * @typedef {object} ChatParams
 * @prop {number} chat_id
 * @prop {string} imgProfile
 * @prop {string} otherID
 * @prop {string} otherUser Screen name of the other user
 */

/**
 * @typedef {object} ChatProps
 * @prop {NavigationScreenProp} navigation
 */

/**
 * @typedef {object} ChatState
 * @prop {boolean} isLoading
 * @prop {Array<any>} messages
 * @prop {boolean} morePages
 * @prop {number} numPage
 * @prop {boolean} refreshing
 * @prop {boolean} socketOpen
 * @prop {string} urlPage
 */

/**
 * @augments Component<ChatProps, ChatState>
 */
export default class Chat extends Component {
    /**
     * @param {{ navigation: NavigationScreenProp }} args
     */
    static navigationOptions = ({navigation}) => {
        const {otherUser, imgProfile, otherID} = {
            imgProfile: navigation.getParam('imgProfile'),
            otherID: navigation.getParam('otherUser'),
            otherUser: navigation.getParam('otherUser'),
        };

        const otherUserName = typeof otherUser != 'string' ? 'Chat' : otherUser

        const onPress = otherID
            ? () => {
                navigation.navigate('PublicProfile', {userId: otherID});
            }
            : () => {}

        return {
            headerTitle: <ChatTitle src={imgProfile} name={otherUserName} onPress={onPress}/>,
        };
    };

    /**
     * @param {ChatProps} props
     */
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            messages: [],
            morePages: false,
            numPage: 0,
            refreshing: true,
            socketOpen: false,
            urlPage: '',
        };

        this.socket = null
    }

    /**
     * @param {any} nextAppState
     */
    _handleAppStateChange = nextAppState => {
        // eslint-disable-next-line no-console
        console.log('CHAT::_handleAppStateChange', nextAppState);

        if (nextAppState == 'active') this.getEarlyMessages();
    };

    componentDidMount() {
        this.props.navigation.setParams({
            imgProfile: this.getImgProfile(),
        });

        const chat_id = this.getChatID()

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

        // @ts-ignore TODO: Fix WebSocket not being defined globally
        this.socket = new WebSocket(socketURL)

        this.socket.onclose = this.onSocketClose
        this.socket.onerror = this.onSocketError
        this.socket.onmessage = this.onSocketMessage
        this.socket.onopen = this.onSocketOpen

        APP_STORE.CHATNOTIF_EVENT.next({chatNotif: this.getOtherUser()});
        AppState.addEventListener('change', this._handleAppStateChange);

        // For receiving the latest messagues or if the user scrolls up in history
        this.chatMsg = APP_STORE.CHATMSG_EVENT.subscribe(state => {
            if (__DEV__) {
                // eslint-disable-next-line no-console
                console.log('Chat::componentDidMount::CHATMSG_EVENT', state);
            }

            if (state.error) {
                toastMsg(state.error);
                this.handleAnyException();
                return;
            }

            if (!state.chatMsg)
                return;

            /**
             * @type {Partial<ChatState>}
             */
            let newState = {
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

            this.setState(/** @type {ChatState} */ (newState));
        });

        this.chatPage = APP_STORE.CHATPAGE.subscribe(state => {
            // eslint-disable-next-line no-console
            console.log('Chat::componentDidMount::CHATPAGE:', state);

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
        // @ts-ignore not undefined
        this.chatMsg.unsubscribe();
        // @ts-ignore not undefined
        this.chatPage.unsubscribe();
        // this.close()
        AppState.removeEventListener('change', this._handleAppStateChange);
        
        this.socket.close()
        // garbage collect socket
        this.socket = null
    }

    /**
     * @returns {string}
     */
    getOtherUser() {
        const otherUser = this.props.navigation.getParam('otherUser');

        if (typeof otherUser != 'string') {
            if (__DEV__) {
                // eslint-disable-next-line no-console
                console.warn(
                    `Chat::getOtherUser, expected otherUser navigation parameter to be string, but got: ${typeof otherUser}`
                )
            }
            this.handleAnyException();
        }

        return otherUser
    }

    /**
     * @returns {string}
     */
    getImgProfile() {
        const imgProfile = this.props.navigation.getParam('imgProfile');

        if (typeof imgProfile != 'string') {
            if (__DEV__) {
                // eslint-disable-next-line no-console
                console.warn(
                    `Chat::getOtherUser, expected imgProfile navigation parameter to be string, but got: ${typeof imgProfile}`
                )
            }
            this.handleAnyException();
        }

        return imgProfile
    }

    /**
     * @returns {string}
     */
    getOtherID() {
        const otherID = this.props.navigation.getParam('otherID');

        if (typeof otherID != 'string') {
            if (__DEV__) {
                // eslint-disable-next-line no-console
                console.warn(
                    `Chat::getOtherUser, expected otherID navigation parameter to be string, but got: ${typeof otherID}`
                )
            }
            this.handleAnyException();
        }

        return otherID
    }

    /**
     * @returns {number}
     */
    getChatID() {
        const chatID = this.props.navigation.getParam('chat_id');

        if (typeof chatID != 'number') {
            if (__DEV__) {
                // eslint-disable-next-line no-console
                console.warn(
                    `Chat::getOtherUser, expected chatID navigation parameter to be string, but got: ${typeof chatID}`
                )
            }
            this.handleAnyException();
        }

        return chatID
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
     * @returns {void}
     */
    onSocketClose = (e) => {
        this.setState({
            socketOpen: false,
        })

        if (__DEV__) {
            // eslint-disable-next-line no-console
            console.log(`Chat::onSocketClose, code:${e.code}`)
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
            console.warn('Chat::onSocketError, message:', message)
        }
        this.handleAnyException()
    }

    /**
     * @param {{ data: string }} e
     */
    onSocketMessage = ({ data }) => {
        if (__DEV__) {
            // eslint-disable-next-line no-console
            console.log('Chat::onSocketMessage, data: ', data);
        }
        try {
            /**
             * @type {{ message: string }}
             */
            const json = JSON.parse(data);
            
            this.onReceive(json.message)
        } catch (e) {
            if (__DEV__) {
                // eslint-disable-next-line no-console
                console.warn('Chat::onSocketMessage::error, message: ', e.message);
            }
            this.handleAnyException();
        }
    }

    onSocketOpen = () => {
        if (__DEV__) {
            // eslint-disable-next-line no-console
            console.log('Chat::onSocketOpen');
        }

        this.setState({
            socketOpen: true,
        })
    }

    handleAnyException = () => {
        this.props.navigation.goBack()
    }

    /**
     * @param {string} messageText
     */
    onReceive(messageText) {
        if (__DEV__) {
            // eslint-disable-next-line no-console
            console.log('Chat::onReceive:', messageText);
        }

        if (messageText.length === 0) return;

        const message = {
            // todo: Either receive the ID from the server or use an UUID
            _id: Math.round(Math.random() * 1000000),
            createdAt: new Date(),
            text: messageText,
            user: {
                _id: this.getOtherID(),
                avatar: '',
                name: this.getOtherUser(),
            },
        };

        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, message),
        }));
    }

    /**
     * @param {Array<object>} messages
     */
    onSend = (messages = []) => {
        if (__DEV__) {
            // eslint-disable-next-line no-console
            console.log('Chat::onSend:', messages)
        }

        if (messages.length < 1) return;
        // if empty string dont send
        if (!messages[0].text.length) return;

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

    /**
     * @param {object} props
     */
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

    /**
     * @param {object} props
     */
    renderSend(props) {
        return (
            <Send {...props}>
                <View style={styles.sendInnerView}>
                    <Image
                        // @ts-ignore
                        source={require('../../assets/img/send.png')}
                        resizeMode={'center'}
                    />
                </View>
            </Send>
        );
    }

    render() {
        const socketStillNotOpen = !this.state.socketOpen

        if (this.state.refreshing || socketStillNotOpen) {
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
                    onSend={this.onSend}
                    user={{
                        _id: APP_STORE.getId(),
                    }}
                />
            </View>
        );
    }
}
