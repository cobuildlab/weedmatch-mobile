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
import { getSuper } from './LikeActions';
import {APP_STORE} from '../../Store';
import {strings} from '../../i18n';
import {connection, internet, checkConectivity, toastMsg } from '../../utils';

var { height, width } = Dimensions.get('window');

export default class Like extends Component {
    constructor(props) {
        super(props);

        this.state = {
          refreshing:false,
          super: [],
          isLoading: false,
        };
    }

    static navigationOptions = ({ navigation }) => {
      const {params} = navigation.state;

      return {
        title: 'Me encanta',
      };
    };

    componentDidMount(){
      this.superVar = APP_STORE.SUPER_EVENT.subscribe(state => {
        console.log("Like:componentDidMount:superVar", state);
        if (state.super) {

          this.setState({
            super: state.super,
            isLoading: true,
          })
          return;
        }
        
        if (state.error) {
          toastMsg(state.error);
        }
      });
      getSuper()
    }

    componentWillUnmount() {
      this.superVar.unsubscribe();
    }

    render() {
      if(this.state.isLoading) {
        return (
          <View style={styles.viewContainer}>
          <FlatList
            horizontal={false}
            keyExtractor={( item , index ) => index.toString() }
            data={this.state.super}
            renderItem={({item}) =>
              <TouchableOpacity>
              <View style={styles.viewMsg}>
                <Image style={styles.imgProfileItem} 
                  source={{uri: item.image_profile}}
                />
                <View style={{flex: 1,
                  flexDirection: 'column',
                  alignItems: 'flex-start',}}>
                  <Text style={{marginLeft: 12, fontWeight: '500', fontSize: 16,}}>{item.username}</Text>
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
