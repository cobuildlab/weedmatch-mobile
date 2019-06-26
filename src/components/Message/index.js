import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    ActivityIndicator,
    ScrollView,
} from 'react-native';
import styles from './style';
import { getChat } from './MessageActions';
import { APP_STORE } from '../../Store';
import { strings } from '../../i18n';
import { toastMsg } from '../../utils';
import chatStore, { CHAT_DELETED_EVENT, CHAT_ERROR_EVENT } from '../../modules/chat/ChatStore';
import FastImage from 'react-native-fast-image';
import { Platform } from 'react-native';
import { Image as RNImage } from 'react-native';
import { Alert } from 'react-native';
import { ActionSheet } from 'native-base';
const IMG_DELETE = require('../../assets/img/delete.png');
import { deleteChatMessages, deleteChat } from '../../modules/chat/chat-actions';
const Image = Platform.OS === 'ios' ? RNImage : FastImage;

/**
 * Components that shows the List of Chats
 */
export default class Message extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            chats: [],
            isLoading: true,
        };
    }

    componentDidMount() {
        this.showChatNotif();

        this.chatsVar = APP_STORE.CHAT_EVENT.subscribe(state => {
            console.log('Messages:componentDidMount:chatsVar', state);
            if (state.chats) {
                this.setState({
                    chats: state.chats,
                    isLoading: false,
                });
                return;
            }

            if (state.error) {
                toastMsg(state.error);
            }
        });
        getChat();
        chatStore.subscribe(CHAT_DELETED_EVENT, () => getChat());
        chatStore.subscribe(CHAT_ERROR_EVENT, (msg) => Alert.alert(msg));
    }

    showChatNotif() {
        getChat();
        if (this.props.navigation.getParam('data', undefined) != null) {
            const data = this.props.navigation.getParam('data', undefined);
            this.showChat(data.chat_id, data.id_match, data.username_match);
        }
    }

    componentWillUnmount() {
        this.chatsVar.unsubscribe();
    }

    showChat(id, user, other, imgProfile) {
        this.props.navigation.navigate('Chat', {
            chat_id: id,
            otherUser: other,
            otherID: user,
            imgProfile,
        });
    }

    showOptions = (chatId, otherUserId, otherUsername) => {
        ActionSheet.show(
            {
                options: [strings('chat.deleteChat'), strings('chat.cancel')],
                cancelButtonIndex: 1,
                title: strings('chat.options')
            },
            buttonIndex => {
                if (buttonIndex === 1) return;
                let text = strings('chat.confirmDeleteChat', { name: otherUsername });
                let action = () => {
                    deleteChat(chatId);
                };
                Alert.alert(
                    strings('chat.options'),
                    text,
                    [
                        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                        { text: 'OK', onPress: () => action() },
                    ],
                    { cancelable: false }
                );
            }
        );
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

                    <View style={styles.viewMsg} key={i}>
                        <TouchableOpacity
                            style={styles.chatLine}
                            onPress={() =>
                                this.showChat(
                                    item.id,
                                    item.id_user,
                                    item.user,
                                    item.image_profile
                                )
                            }
                        >
                            <Image
                                style={styles.imgProfileItem}
                                source={{ uri: item.image_profile }}
                            />
                            <View style={styles.viewTexts}>
                                <Text style={styles.textUser}>{item.user}</Text>
                                <Text style={styles.textChat}>
                                    {item.message
                                        ? item.message
                                        : strings('chat.write')}
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                        style={[styles.deleteChat]}
                            onPress={() =>
                                this.showOptions(
                                    item.id,
                                    item.id_user,
                                    item.user,
                                )
                            }
                        >
                            <RNImage
                                source={IMG_DELETE}
                            />
                        </TouchableOpacity>
                    </View>

                ))}
            </ScrollView>
        );
    }
}
