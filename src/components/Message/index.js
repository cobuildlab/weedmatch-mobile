import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    ActivityIndicator,
    ScrollView,
    Platform,
} from 'react-native';
import { Image as RNImage } from 'react-native';
import styles from './style';
import { APP_STORE } from '../../Store';
import { strings } from '../../i18n';
import { toastMsg } from '../../utils';
import FastImage from 'react-native-fast-image';
import ChatStore, {
    CHAT_LIST_EVENT,
    CHAT_MESSAGE_READ_EVENT,
    CHAT_ERROR_EVENT
} from '../../modules/chat/ChatStore';
import { fetchChat, touchChatMessage } from '../../modules/chat/ChatActions';
import ChatListItem from '../../modules/chat/ChatListItem';

const Image = Platform.OS === 'ios' ? RNImage : FastImage;

export default class Message extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chats: [],
            isLoading: true,
            refreshing: false,
        };
    }

    componentDidMount() {
        this.showChatNotif();

        this.chatListSubscription = ChatStore.subscribe(CHAT_LIST_EVENT, (chats) => {
            this.setState({
                chats,
                isLoading: false
            })
        });

        this.chatReadSubscription = ChatStore.subscribe(CHAT_MESSAGE_READ_EVENT, (chats) => {
            this.setState({
                chats,
                isLoading: false
            })
        });

        this.props.navigation.addListener('didFocus', () => fetchChat());

        this.chatErrorSubscription = ChatStore.subscribe(CHAT_ERROR_EVENT, error => toastMsg(error));
    }

    showChatNotif() {
        fetchChat();
        if (this.props.navigation.getParam('data', undefined) != null) {
            const data = this.props.navigation.getParam('data', undefined);
            console.log(data);
            this.showChat(data.chat_id, data.id, data.username);
        }
    }

    componentWillUnmount() {
        this.chatListSubscription.unsubscribe();
        this.chatReadSubscription.unsubscribe();
        this.chatErrorSubscription.unsubscribe();
    }

    isLastMessageUntouched = (lastMessage) =>
        (lastMessage.status && lastMessage.status !== 're')
        && (APP_STORE.getId() !== lastMessage.user_id);

    showChat(id, user, other, imgProfile, lastMessage) {
        if (lastMessage && this.isLastMessageUntouched(lastMessage)) {
            touchChatMessage(lastMessage.id);
        }
        this.props.navigation.navigate('Chat', {
            chat_id: id,
            otherUser: other,
            otherID: user,
            imgProfile,
        });
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={[styles.containers, styles.horizontal]}>
                    <ActivityIndicator size="large" color="#9605CC" />
                </View>
            );
        }

        if (this.state.chats.length === 0) {
            return (
                <View style={styles.containerLoader}>
                    <Text>{strings('chat.nomsg')}</Text>
                </View>
            );
        }

        return (
            <ScrollView
                style={styles.viewContainer}
                keyboardDismissMode={'on-drag'}
                keyboardShouldPersistTaps={'always'}
            >
                {this.state.chats.map((item, i) => (
                    <ChatListItem
                        key={i}
                        item={item}
                        onPress={item => {
                            this.showChat(
                                item.id,
                                item.id_user,
                                item.user,
                                item.image_profile,
                                item.last_message
                            )
                        }}
                        isUntouched={this.isLastMessageUntouched}
                    />
                ))}
            </ScrollView>
        );
    }
}
