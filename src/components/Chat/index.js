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
  TextInput,
  SafeAreaView,
  TouchableHighlight,
  Dimensions,
  Platform,
  FlatList,
  KeyboardAvoidingView,
  ScrollView
} from 'react-native';

import styles from './style';
import {APP_STORE} from '../../Store';
import {strings} from '../../i18n';
import {connection, internet, checkConectivity, toastMsg } from '../../utils';

var { height, width } = Dimensions.get('window');

import { GiftedChat } from 'react-native-gifted-chat'

export default class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      open: false,
      connected: false
    }

    const { navigation } = this.props;
    const chat_id = navigation.getParam('chat_id', '0');

    this.socket = new WebSocket("ws://dev-api.weedmatch.cl:8888/ws?"+'id_user='+APP_STORE.getId()+'&'+'username='+"danialepaco"+'&'+'chat_id='+chat_id+'&'+'token='+APP_STORE.getToken());
    this.socket.onopen = () => {
      this.setState({connected:true})
      this.testPusher()
    }; 
    this.socket.onmessage = (data) => {
      Alert.alert(data);
    }
    // this.socket.onmessage = ({data}) => Alert.alert(data);
    this.testPusher = this.testPusher.bind(this);
    console.log('Chat');
}

  testPusher() {
    console.log('testPusher');
    if( this.state.connected ) {
        // this.socket.send(JSON.stringify({
        //     messgaes: 'hello~!~!~!',
        // }))
        this.socket.send("~~~hello")
        this.setState(prevState => ({ open: !prevState.open }))
    }
  }

  componentDidMount() {

  }

  componentWillMount() { 
    
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ],
    })
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  render() {
    return (
      <GiftedChat
        renderAvatar={null}
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    )
  }
}

