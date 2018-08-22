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
  AppState
} from 'react-native';

import styles from './style';
import {APP_STORE} from '../../Store';
import {strings} from '../../i18n';
import {connection, internet, checkConectivity, toastMsg } from '../../utils';
import { publicProfileAction,getImages, publicImages420Action,appendData,Action420,logOut } from './ProfileActions';

var { height, width } = Dimensions.get('window');

export default class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
          rowData:{},
          refreshing:false,
          public420: [],
          isLoading: false,
          urlPage: '',
          numPage: 0,
        };
        console.log('Profile');
    }

    static navigationOptions = ({ navigation }) => {
      const {params} = navigation.state;

      return {
        title: strings('main.profile'),
        headerRight: <TouchableOpacity style={styles.buttonRight} onPress={() => params.logout && params.logout()}><Image style={styles.navRight} source={require('../../assets/img/logout.png')} /></TouchableOpacity>
      };
    };

    componentDidMount(){
      this.props.navigation.setParams({logout: () => this._logout()});
      this.props.navigation.setParams({update: () => this.update ()});

      this.appSubscription = APP_STORE.APP_EVENT.subscribe(state => {
        console.log("Profile:componentDidMount:appSubscription", state);
        if (state.error) {
          this.setState({isLoading: true});
          toastMsg(state.error);
        return;
        }
        if (state.success)
          this.props.navigation.navigate('Auth');
        });

        this.public = APP_STORE.PROFILE_EVENT.subscribe(state => {
            console.log("Profile:componentDidMount:PROFILE_EVENT", state);
            if (state.profile) {
                this.setState({
                    rowData: state.profile,
                    country: state.profile.country
                })
                this._get420Images();
                return;
            }
            if (state.error) {
              toastMsg(state.error);
            }
        });

      this.images420 = APP_STORE.PROFILEIMAGES_EVENT.subscribe(state => {
        console.log("Profile:componentDidMount:images420Suscription", state);
        if (state.profileImages420) {

          this.setState(prevState => ({
            public420: appendData(prevState.public420, state.profileImages420),
            isLoading: true,
          }))

          console.log(getImages(this.state.public420));

          return;
        }
        if (state.error) {
          toastMsg(state.error);
        }
      });

        this.images420Page = APP_STORE.PROFILEPAGE_EVENT.subscribe(state => {
          console.log("Profile:componentDidMount:images420PageSuscription", state);
          if (state.profileImages420Page) {

            this.setState({
              urlPage: state.profileImages420Page,
              numPage: this.state.numPage + 1
            })
            return;
          } else {
            this.setState({
              urlPage: '',
            })
          }
          if (state.error) {
            Alert.alert(state.error);
          }
        });

        this._publicProfile();
    }

    componentWillUnmount() {
      console.log("Profile:componentWillUmmount");
      this.images420.unsubscribe();
      this.images420Page.unsubscribe();
      this.appSubscription.unsubscribe();
      this.public.unsubscribe();
    }

    update = () => {
      this.setState({isLoading: false,
                     public420: [],
                     urlPage: '',
                     numPage: 0});
      if (checkConectivity()) {
        publicProfileAction(APP_STORE.getToken(), APP_STORE.getId())
      } else {
        internet();
      }
    }

    _logout = () => {

        if (checkConectivity()) {
          this.appSubscription = APP_STORE.APP_EVENT.subscribe(state => {
            console.log("Profile:componentDidMount:appSubscription", state);
            if (state.error) {
              this.setState({isLoading: true});
              toastMsg(state.error);
            return;
            }
            if (state.success)
              APP_STORE.NOTI_EVENT.next({"noti": "false"});
              this.props.navigation.navigate('Auth');
          });
          this.setState({isLoading: false});
          logOut();      
        } else {
          internet();
        }
    }

    _publicProfile() {
        if (checkConectivity()) {
          publicProfileAction(APP_STORE.getToken(), APP_STORE.getId())
        } else {
          internet();
        }
    }

    _get420Images() {
      if (checkConectivity()) {
        Action420(APP_STORE.getToken(), this.state, APP_STORE.getId());
      } else {
        internet();
      }
    }

    _editProfile() {
      this.appSubscription.unsubscribe();
      this.props.navigation.navigate('EditProfile',{refresh: this.update});
    }

    renderiza() {
      const {rowData, country} = this.state;

      return (
        <View>
          <View style={styles.viewBackground}>
            <Image style={styles.media} source={{uri: rowData.image_profile}} />
          </View>
          <View style={styles.viewContainer}>
            <View style={styles.viewContainerPlus}>
              <Text style={styles.textName}>{rowData.first_name}, {rowData.age} </Text>
                {country &&
                    <Text style={styles.textContainer}>{country.name} </Text>
                }
              <Text style={styles.textContainer}>{rowData.distance} </Text>
              <Text style={styles.textContainer}>{rowData.description} </Text>
            </View>
              <TouchableOpacity style={styles.buttomCerrarStyle} onPress={this._editProfile.bind(this)}>
              <Image source={require('../../assets/img/edit.png')} style={styles.buttomOpt}/>
              </TouchableOpacity>
          </View>
        </View>
      );
    }

    onEndReached = () => {
      if (!this.onEndReachedCalledDuringMomentum && this.state.numPage > 0) {
        this._get420Images();
        this.onEndReachedCalledDuringMomentum = true;
      }
    };

    render() {

        const {rowData,country,isLoading, isDetail,public420} = this.state;
        if(isLoading) {
          return (
            <View style={styles.viewFlex}>
              <FlatList
                horizontal={false}
                numColumns={3}
                bounces={false}
                data={getImages(public420)}
                ListHeaderComponent={this.renderiza()}
                keyExtractor={( item , index ) => index}
                onEndReachedThreshold={0.5}
                onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
                onEndReached={() => this.onEndReached()}
                renderItem={({ item, index }) =>
                    <View style={[{ width: (width) / 3 }, { height: (width) / 3 }, { marginBottom: 2 }, index % 3 !== 0 ? { paddingLeft: 2 } : { paddingLeft: 0 }]}>
                        <Image style={styles.imageView}
                            source={{uri: getImages(public420)[index]}}>
                        </Image>
                    </View>
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
