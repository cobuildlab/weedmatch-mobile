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
import { getChat, touchChatMessage } from './MessageActions';
import { APP_STORE } from '../../Store';
import { strings } from '../../i18n';
import { connection, toastMsg } from '../../utils';
import FastImage from 'react-native-fast-image';

const Image = Platform.OS === 'ios' ? RNImage : FastImage;

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
        touchChatMessage(id);
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
                                item.image_profile
                            )
                        }
                    >
                        <View style={styles.viewMsg}>
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
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        );
    }
}
