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
import {APP_STORE} from '../../Store';
import TopBar from './../../utils/TopBar';
import {connection, internet, checkConectivity } from '../../utils';
import { publicProfileAction,getImages, publicImages420Action,appendData,Action420 } from './ProfileActions';
import ImageSlider from 'react-native-image-slider';

var { height, width } = Dimensions.get('window');

export default class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
          rowData:{},
          refreshing:false,
          public420: {},
          isLoading: false,
          urlPage: '',
          numPage: 0,
          dataSource: [],
        };
        console.log('PublicProfile');
    }

    static navigationOptions = { header: null };

    componentDidMount(){

        this.public = APP_STORE.PUBLICPROFILE_EVENT.subscribe(state => {
            console.log("Public Profile:componentDidMount:PUBLICPROFILE_EVENT", state);
            if (state.publicProfile) {
                this.setState({
                    rowData: state.publicProfile,
                    country: state.publicProfile.country
                })
                this._get420Images();
                return;
            }
            if (state.error) {
              Alert.alert(state.error);
            }
        });

      this.images420 = APP_STORE.PUBLICIMAGES420_EVENT.subscribe(state => {
        console.log("Public Profile:componentDidMount:images420Suscription", state);
        if (state.publicImages420) {

          this.setState(prevState => ({
            dataSource: appendData(prevState.dataSource, state.publicImages420),
            public420: this.state.dataSource,
            isLoading: true,
          }))

          console.log(getImages(this.state.public420));

          return;
        }
        if (state.error) {
          Alert.alert(state.error);
        }
      });

        this.images420Page = APP_STORE.PUBLICIMAGES420PAGE_EVENT.subscribe(state => {
          console.log("Public Profile:componentDidMount:images420PageSuscription", state);
          if (state.publicImages420Page) {

            this.setState({
              urlPage: state.publicImages420Page,
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
      console.log("PublicProfile:componentWillUmmount");
      this.images420.unsubscribe();
      this.images420Page.unsubscribe();
      this.public.unsubscribe();
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

    _changeView = () => {
      this.setState({
        isDetail: !this.state.isDetail
      })
    }

    _editProfile() {
      this.props.navigation.navigate('EditProfile');
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
              {/* <TouchableOpacity activeOpacity={0.5} style={styles.TouchableOpacityStyle} onPress={this._changeView}>
                <Image source={require('../../assets/img/down.png')} style={styles.ShowPublic} />
              </TouchableOpacity> */}
              <TouchableOpacity style={styles.buttomCerrarStyle} onPress={this._editProfile.bind(this)}>
              <Image source={require('../../assets/img/edit.png')} style={styles.buttomOpt}/>
              </TouchableOpacity>
        </View>
        </View>
      );
    }

    render() {

        const {rowData,country,isLoading, isDetail,public420} = this.state;
        if(isLoading) {
          return (
            <View style={styles.viewFlex}>
              <FlatList
                horizontal={false}
                numColumns={3}
                data={getImages(public420)}
                style={{flex:1}}
                ListHeaderComponent={this.renderiza()}
                keyExtractor={( item , index ) => index}
                // onEndReached={this._get420Images.bind(this)}
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