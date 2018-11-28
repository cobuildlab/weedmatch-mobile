// @ts-check
import React, {Component} from 'react';
import {AppState, Image, View} from 'react-native';
import {toastMsg, WS_URL} from '../../utils';

import {APP_STORE} from '../../Store';
import styles from './style';
import {Bubble, GiftedChat, Send} from 'react-native-gifted-chat';
import {prepareData, chatAction} from './ChatActions';
import ChatTitle from '../../modules/chat/ChatTitle';
import {WHITE} from '../../styles/colors';
import {CHAT_ERROR_EVENT, CHAT_MESSAGES_EVENT, CHAT_USERNAME_EVENT} from "../../modules/chat/ChatStore";
import {dispatchEvent} from "../../utils/flux-state";
import store from '../../modules/chat/ChatStore';
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
 * @prop {boolean} socketOpen
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
            otherID: navigation.getParam('otherID'),
            otherUser: navigation.getParam('otherUser'),
        };

        const otherUserName = typeof otherUser != 'string' ? 'Chat' : otherUser;

        const onPress = otherID
            ? () => {
                navigation.navigate('PublicProfile', {userId: otherID});
            }
            : () => {
            };

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
            socketOpen: false,
        };
        this.numPage = 0;
        this.urlNextPage = '';
        this.socket = null;
        /**
         * The object representing the local user, "us".
         */
        this.localUser = {
            _id: Number(APP_STORE.getId()),
            avatar: '',
            name: APP_STORE.getUser(),
        };
        console.log("Chat:this.localUser", this.localUser);
    }

    /**
     * @param {any} nextAppState
     */
    _handleAppStateChange = nextAppState => {
        // eslint-disable-next-line no-console
        console.log('CHAT::_handleAppStateChange', nextAppState);

        if (nextAppState == 'active') this.getEarlyMessages();
    };

    connect = () => {
        const chat_id = this.getChatID();
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
        this.socket = new WebSocket(socketURL);

        // this.socket.onclose = this.onSocketClose;
        this.socket.onerror = this.onSocketError;
        this.socket.onmessage = this.onSocketMessage;
        this.socket.onopen = this.onSocketOpen;
    };

    componentDidMount() {
        dispatchEvent(CHAT_USERNAME_EVENT, this.getOtherUser());
        AppState.addEventListener('change', this._handleAppStateChange);

        this.chatErrorSubscription = store.subscribe(CHAT_ERROR_EVENT, err => toastMsg(err));

        // For receiving the latest messagues or if the user scrolls up in history
        this.chatMessagesSubscription = store.subscribe(CHAT_MESSAGES_EVENT, chat => {
            // eslint-disable-next-line no-console
            console.log('Chat::componentDidMount::chatMessagesSubscription', chat);

            const newMessages = prepareData(chat.results);

            let morePages = false;
            if (chat.next) {
                morePages = true;
                this.numPage = this.numPage + 1;
                this.urlNextPage = chat.next;
            }

            this.setState({
                isLoading: false,
                messages: GiftedChat.prepend(this.state.messages, newMessages),
                morePages,
            });
        });

        this.getEarlyMessages();
        this.connect();
    }

    componentWillUnmount() {
        // eslint-disable-next-line no-console
        console.log('Chat:componentWillUmmount');
        this.chatMessagesSubscription.unsubscribe();
        this.chatErrorSubscription.unsubscribe();
        dispatchEvent(CHAT_USERNAME_EVENT, null);
        AppState.removeEventListener('change', this._handleAppStateChange);
        this.socket.close();
        // garbage collect socket
        this.socket = null
    }

    /**
     * @returns {string}
     */
    getOtherUser() {
        const otherUser = this.props.navigation.getParam('otherUser');

        if (typeof otherUser != 'string') {
            console.warn(
                `Chat::getOtherUser, expected otherUser navigation parameter to be string, but got: ${typeof otherUser}`
            )

            this.handleAnyException();
        }

        return otherUser
    }

    /**
     * @returns {string}
     */
    getOtherID() {
        const otherID = this.props.navigation.getParam('otherID');

        if (typeof otherID != 'string') {


            console.warn(
                `Chat::getOtherUser, expected otherID navigation parameter to be string, but got: ${typeof otherID}`
            )

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
            console.warn(
                `Chat::getOtherUser, expected chatID navigation parameter to be string, but got: ${typeof chatID}`
            );

            this.handleAnyException();
        }

        return chatID;
    }

    getEarlyMessages = () => {
        this.setState({isLoading: true});
        chatAction(this.state, this.getChatID(), this.urlNextPage, this.numPage);
    };

    /**
     * @param {{ code: number }} e
     * @returns {void}
     */
    onSocketError = (e) => {
        console.log(`Chat::onSocketClose, code:${e.code}`, e);
        this.setState({
            socketOpen: false,
        });
        // https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent#Properties
        this.connect();
    };

    /**
     * @param {{ data: string }} e
     */
    onSocketMessage = ({data}) => {
        console.log('Chat::onSocketMessage, data: ', data);

        try {
            /**
             * @type {{ message: string }}
             */
            const json = JSON.parse(data);

            this.onReceive(json.message)
        } catch (e) {
            console.warn('Chat::onSocketMessage::error, message: ', e.message);

            this.handleAnyException();
        }
    }

    onSocketOpen = () => {
        console.log('Chat::onSocketOpen');


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
        console.log('Chat::onReceive:', messageText);
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
        console.log('Chat::onSend:', messages);

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
    renderSend = (props) => {
        let imgUrl = '../../assets/img/send.png';
        if (this.state.isLoading || !this.state.socketOpen)
            imgUrl = '../../assets/img/send.png';

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
    };

    render() {
        return (
            <View style={styles.root}>
                <GiftedChat
                    renderAvatar={null}
                    loadEarlier={this.state.morePages}
                    renderBubble={this.renderBubble}
                    onLoadEarlier={this.getEarlyMessages}
                    isLoadingEarlier={this.state.isLoading}
                    renderSend={this.renderSend}
                    messages={this.state.messages}
                    onSend={this.onSend}
                    user={this.localUser}
                />
            </View>
        );
    }
}
