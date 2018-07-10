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
  RefreshControl
} from 'react-native';

import styles from './style';
import { getSuper,calculateTime,likeAction } from './LikeActions';
import {APP_STORE} from '../../Store';
import {strings} from '../../i18n';
import { internet, checkConectivity, toastMsg } from '../../utils';

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
            refreshing: false
          })
          return;
        }
        
        if (state.error) {
          toastMsg(state.error);
        }
      });

      this.like = APP_STORE.LIKEACTION_EVENT.subscribe(state => {
        console.log("Like:componentDidMount:like", state);
        if (state.likeAction) {
          this._onRefresh()
          Alert.alert(state.likeAction);
          return;
        }
        if (state.error) {
          this._onRefresh()
          Alert.alert(state.error);
        }
      });

      getSuper()
    }

    _onRefresh() {
      this.setState({
        super: [],
        refreshing: true,
      },() => { 
        getSuper();
      })
    }

    tap(id) {
      this.props.navigation.navigate('LikeProfile', {id})
    };

    componentWillUnmount() {
      this.superVar.unsubscribe();
    }

    likeTap(action,id) {
      if (checkConectivity()) {
        likeAction(action,id)
      } else {
        internet();
      }
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
              <TouchableOpacity onPress={() => this.tap(item.id_user)}>
              <View style={styles.viewMsg}>
              <Image style={styles.imgProfileItem}
                source={{uri: item.image_profile}}
              />
              <View style={styles.viewTexts}>
                    <Text style={styles.textUser}>{item.username} quiere contactar</Text>
                  <Text style={styles.textUser}>contigo</Text>
                <Text style={styles.textTime}>Hace {calculateTime(item.time)}</Text>
                </View>
                <View style={styles.viewOption}>
                  <View style={styles.viewButtom}>
                    <TouchableOpacity style={styles.Buttom} onPress={() => this.likeTap("True",item.id)}>
                      <Image source={require('../../assets/img/actions/mach.png')} style={styles.imageSize} />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.viewButtom}>
                    <TouchableOpacity style={styles.Buttom} onPress={() => this.likeTap("False",item.id)}>
                      <Image source={require('../../assets/img/actions/rejected.png')} style={styles.imageSize} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
            }
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={() => this._onRefresh()}
              />
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
