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
import ChatStore from '../../modules/chat/ChatStore';
import { fetchChat, touchChatMessage } from '../../modules/chat/ChatActions';

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
        console.log('DID MOUNT');
        this.showChatNotif();

        this.chatListSubscription = ChatStore.subscribe('ChatList', (chats) => {
            this.setState({
                chats,
                isLoading: false
            })
        });

        this.chatReadSubscription = ChatStore.subscribe('ChatRead', (chats) => {
            this.setState({
                chats,
                isLoading: false
            })
        });

        this.chatErrorSubscription = ChatStore.subscribe('ChatError', error => toastMsg(error));

    }

    showChatNotif() {
        fetchChat();
        if (this.props.navigation.getParam('data', undefined) != null) {
            const data = this.props.navigation.getParam('data', undefined);
            this.showChat(data.chat_id, data.id_match, data.username_match);
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
        if (this.isLastMessageUntouched(lastMessage)) {
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
                    <TouchableOpacity
                        key={i}
                        onPress={() =>
                            this.showChat(
                                item.id,
                                item.id_user,
                                item.user,
                                item.image_profile,
                                item.last_message
                            )
                        }
                    >
                        <View style={styles.viewMsg}>
                            <View style={styles.imgProfileBox}>
                                <Image
                                    style={styles.imgProfileItem}
                                    source={{ uri: item.image_profile }}
                                />
                                {this.isLastMessageUntouched(item.last_message) && (
                                    <View style={styles.statusIndicator}/>
                                )}
                            </View>
                            <View style={styles.viewTexts}>
                                <Text style={styles.textUser}>{item.user}</Text>
                                <Text style={styles.textChat}>
                                    {(item.last_message.message)
                                        ? item.last_message.message
                                        : strings('chat.write')}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        );
    }
}
