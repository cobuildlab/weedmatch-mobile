import React, { Component } from 'react';
import {
  Alert,
  Dimensions,
  AppState
} from 'react-native';

import {APP_STORE} from '../../Store';
import {strings} from '../../i18n';
import {connection, internet, checkConectivity, toastMsg } from '../../utils';

var { height, width } = Dimensions.get('window');

import { GiftedChat } from 'react-native-gifted-chat'
import { chatAction,appendData } from './ChatActions'


export default class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      open: false,
      connected: false,
      appState: AppState.currentState,

      urlPage: '',
      numPage: 0,
      isLoading: true,
    }

    const { navigation } = this.props;
    const chat_id = navigation.getParam('chat_id', '0');

    this.socket = new WebSocket("ws://dev-api.weedmatch.cl:8888/ws?"+'id_user='+APP_STORE.getId()+'&'+'username='+APP_STORE.getUser()+'&'+'chat_id='+chat_id+'&'+'token='+APP_STORE.getToken());
    this.socket.onopen = () => {
      this.setState({connected:true})
    }; 

    this.socket.onmessage = ({data}) => {
      const json = JSON.parse(data)
      this.onReceive(json.message)
    }

    this.socket.onerror = ({data}) => {
      const json = JSON.parse(data)
      Alert.alert(json.message)
    }

    this.socket.onclose = (e) => {
      console.log(e)
      this.close()
    };

    this.onReceive = this.onReceive.bind(this);
    this.close = this.close.bind(this);
    console.log('Chat');
}

componentDidMount() {
  AppState.addEventListener('change', this._handleAppStateChange);

  this.chatMsg = APP_STORE.CHATMSG_EVENT.subscribe(state => {
    console.log("Chat:componentDidMount:chatMsgSuscription", state);
    if (state.chatMsg) {

      console.log(this.state)

      if(this.state.numPage > 0) {
        this.setState(prevState => ({
          messages: GiftedChat.prepend([], appendData(prevState.messages, state.chatMsg,this.getOtherID)),
          isLoading: false,
        }))
      } else {
        this.setState(prevState => ({
          messages: GiftedChat.append([], appendData(prevState.messages, state.chatMsg,this.getOtherID)),
          isLoading: false,
        }))
      }


      return;
    }
    if (state.error) {
      toastMsg(state.error);
    }
  });

    this.chatPage = APP_STORE.CHATPAGE.subscribe(state => {
      console.log("Chat:componentDidMount:chatPageSuscription", state);
      if (state.chatMsgPage) {

        this.setState({
          urlPage: state.chatMsgPage,
          numPage: this.state.numPage + 1
        })
        return;
      } else {
        this.setState({
          urlPage: '',
        })
      }
      if (state.error) {
        toastMsg(state.error);
      }
    });
    this.getEarlyMessages()
}

componentWillUnmount() {
  console.log("Chat:componentWillUmmount");
  this.chatMsg.unsubscribe();
  this.chatPage.unsubscribe();
  this.close()
  AppState.removeEventListener('change', this._handleAppStateChange);
}

close() {
  this.socket.close()
}

getOtherUser() {
  return this.props.navigation.getParam('otherUser', '0')
}

getOtherID() {
  return this.props.navigation.getParam('otherID', '0')
}

getChatID() {
  return this.props.navigation.getParam('chat_id', '0')
}

getEarlyMessages() {
  if (checkConectivity()) {
    this.setState({isLoading:true})
    chatAction(this.state,this.getChatID());
  } else {
    internet();
  }
}

  _handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      console.log('App has come to the foreground!')
    }
    this.setState({appState: nextAppState});
  }

  onReceive(messages) {

    const message = {
      _id: Math.round(Math.random() * 1000000),
      text: messages,
      createdAt: new Date(),
      user: {
        _id: this.getOtherUser(),
        name: 'React Native',
        avatar: '',
      },
    }

    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, message),
    }))
  }

  onSend(messages = []) {
    if( this.state.connected ) {
      console.log('SOCKET CONNECTED');
      var payload = {
        "message": messages[0].text,
        "user": APP_STORE.getUser(),
        "id_user_send": this.getOtherUser(),
        "chat_id": this.getChatID(),
    }
    this.socket.send(JSON.stringify(payload));
    this.setState(prevState => ({ open: !prevState.open }))
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
    }
  }

  render() {
    return (
      <GiftedChat
        renderAvatar={null}
        loadEarlier={true}
        onLoadEarlier={ () => this.getEarlyMessages()}
        isLoadingEarlier={this.state.isLoading}
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: APP_STORE.getId(),
        }}
      />
    )
  }
}

