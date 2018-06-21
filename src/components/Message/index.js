import React, { Component } from 'react';
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
  ScrollView
} from 'react-native';

import styles from './style';
import { getChat } from './MessageActions';
import {APP_STORE} from '../../Store';
import {strings} from '../../i18n';
import {connection, internet, checkConectivity, toastMsg } from '../../utils';

export default class Message extends Component {
    constructor(props) {
        super(props);

        this.state = {
          refreshing:false,
          chats: [],
          isLoading: false,
        };
    }

    componentDidMount() {
      this.chatsVar = APP_STORE.CHAT_EVENT.subscribe(state => {
        console.log("Messages:componentDidMount:chatsVar", state);
        if (state.chats) {

          this.setState({
            chats: state.chats,
            isLoading: true,
          })
          return;
        }
        
        if (state.error) {
          toastMsg(state.error);
        }
      });
      getChat()
    }

    componentWillUnmount() {
      this.chatsVar.unsubscribe();
    }

    showChat() {
      this.props.navigation.navigate('Chat');
    }

    render() {
      if(this.state.isLoading) {
        return (
          <View style={styles.viewContainer}>
            <FlatList
              horizontal={false}
              keyExtractor={( item , index ) => index.toString() }
              data={this.state.chats}
              renderItem={({item}) =>
                <TouchableOpacity onPress={ () => this.showChat()}>
                <View style={styles.viewMsg}>
                  <Image style={styles.imgProfileItem} 
                    source={{uri: item.image_profile}}
                  />
                  <View style={{flex: 1,
                    flexDirection: 'column',
                    alignItems: 'flex-start',}}>
                    <Text style={{marginLeft: 12, fontWeight: '500', fontSize: 16,}}>{item.user}</Text>
                  <Text style={{marginLeft: 12, fontSize: 14,}}>{item.message}</Text>
                  </View>
                </View>
                </TouchableOpacity>
              }
            />
          </View>
        );
      } else {
          return (
              <View style={[styles.containers, styles.horizontal]}>
                  <ActivityIndicator size="large" color="#9605CC" />
              </View>
          )
      }
    }
}
