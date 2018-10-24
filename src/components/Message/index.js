import React, {Component} from 'react';
import {
    AppRegistry,
    Text,
    View,
    Image,
    AsyncStorage,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
    SafeAreaView,
    TouchableHighlight,
    Dimensions,
    FlatList,
    ScrollView,
} from 'react-native';

import styles from './style';
import {getChat} from './MessageActions';
import {APP_STORE} from '../../Store';
import {strings} from '../../i18n';
import {connection, internet, checkConectivity, toastMsg} from '../../utils';

export default class Message extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            chats: [],
            isLoading: false,
        };
    }

    componentDidMount() {
        this.showChatNotif();

        this.chatsVar = APP_STORE.CHAT_EVENT.subscribe((state) => {
            console.log('Messages:componentDidMount:chatsVar', state);
            if (state.chats) {
                this.setState({
                    chats: state.chats,
                    isLoading: true,
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

    showChat(id, user, other) {
        this.props.navigation.navigate('Chat', {
            chat_id: id,
            otherUser: other,
            otherID: user,
        });
    }

    render() {
        if (this.state.isLoading) {
            if (this.state.chats.length > 0) {
                return (
                    <View style={styles.viewContainer}>
                        <FlatList
                            horizontal={false}
                            keyExtractor={(item, index) => index.toString()}
                            data={this.state.chats}
                            renderItem={({item}) =>
                                <TouchableOpacity onPress={() => this.showChat(item.id, item.id_user, item.user)}>
                                    <View style={styles.viewMsg}>
                                        <Image style={styles.imgProfileItem}
                                               source={{uri: item.image_profile}}
                                        />
                                        <View style={styles.viewTexts}>
                                            <Text style={styles.textUser}>{item.user}</Text>
                                            <Text
                                                style={styles.textChat}>{item.message ? item.message : strings('chat.write')}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            }
                        />
                    </View>
                );
            } else {
                return (
                    <View style={styles.containerLoader}>
                        <Text>{strings('chat.nomsg')}</Text>
                    </View>
                );
            }
        } else {
            return (
                <View style={[styles.containers, styles.horizontal]}>
                    <ActivityIndicator size="large" color="#9605CC"/>
                </View>
            );
        }
    }
}
