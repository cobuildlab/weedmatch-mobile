import React, { Component } from 'react';
import {
      AppRegistry,
      StyleSheet,
      Text,
      View,
      ListView,
      ScrollView,
      RefreshControl,
      Image,
      ActivityIndicator,
      Dimensions,
      AsyncStorage,
      TouchableOpacity,
      TouchableHighlight,
      Modal,
      Button,
      TextInput,
      ToastAndroid,
      Alert,
      } from 'react-native';

import moment from 'moment';
import moment_timezone from 'moment-timezone';
import DeviceInfo from 'react-native-device-info';
import ImagePicker from 'react-native-image-crop-picker';
import ActionSheet from 'react-native-actionsheet'
import { userService } from '../../services';
import TopBar from '../../utils/TopBar';
import styles from './styles'
import {strings} from '../../i18n';
import {APP_STORE} from '../../Store'
import {feedAction, uploadAction, likeAction} from './HomeActions'

const ds1 = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
var width = Dimensions.get('window').width;

export default class HomePage extends Component {

  constructor(props) {
      super(props);

      this.state = {
        latitud: '',
        longitud: '',
        feedData: ds1.cloneWithRows([]),
        loading: true,
        refreshing: false,
        topBarShow: true,
        totalPages: '',
        nextPage: '',
        image: '',
        time: '',
        comment: '',
        modalVisible: false,
        photos: [],
        isLoaded: false,
        load: false
      };
  }

    componentDidMount(){

      this.feedData = APP_STORE.FEED_EVENT.subscribe(state => {
        console.log("Home420:componentDidMount:feedDataSuscription", state);
        if (state.feed) {
          this.setState({
            feedData: ds1.cloneWithRows(state.feed),
            loading: false,
            isLoaded: true
          })
          return;
        }
        if (state.error) {
          Alert.alert(state.error);
        }
    });

      this.event = APP_STORE.APP_EVENT.subscribe(state => {
        this.setState({isLoading: true});
        console.log(state);
        if (state.error) {
          Alert.alert(state.error);
            return;
        }
        if (state.success) {
            this.setState({load: false});
            Alert.alert(
              strings("home.alerta"),
              state.success,
              [{ text: 'OK', onPress: () => this.setState({ modalVisible: false })}],
              { cancelable: false }
            )
        }
    });

      this._feedPosition()
<<<<<<< HEAD
=======

>>>>>>> 4126836306223488ff3628e94a7a11ff1a6f296b
    }

    componentWillUnmount() {
      console.log("Home420:componentWillUmmount");
      this.feedData.unsubscribe();
      this.event.unsubscribe();
    }

    _feedData() {
      AsyncStorage.getItem('token').then((token) => {
        feedAction(token, this.state)
      })
    }

    _uploadPhoto() {
      this.setState({load: true,
                     time: moment().format()
                    });
      AsyncStorage.getItem('token').then((token) => {
        uploadAction(token, this.state)
      })
    }

    _feedPosition() {
      navigator.geolocation.getCurrentPosition(
        (position) => {
            this.setState({
              latitud: position.coords.latitude.toFixed(6),
              longitud: position.coords.longitude.toFixed(6),
            })
<<<<<<< HEAD
            this._feedData()
=======
            this._feedData();
>>>>>>> 4126836306223488ff3628e94a7a11ff1a6f296b
        },
        (error) => {
            this._feedData();
            console.log(error)
        },
        {enableHighAccuracy: true, timeout: 50000, maximumAge: 10000}
      );
    }

    _like(idImage,id_user,like) {
      AsyncStorage.getItem('token').then((token) => {
        likeAction(token,idImage,id_user,like)
      })
    }

  static navigationOptions = { header: null };

  _getPhoto() {
    ImagePicker.openPicker({
      cropping: false,
      width: 500,
      height: 500,
      compressImageQuality: 0.5,
      includeExif: true,
      }).then(image => {
      console.log('received image', image.path);
      console.log(image);
      this.setState({
        image: image.path
      });
      this.toggleModal();
    }).catch(e => alert(e));
  }

  _takePhoto() {
    ImagePicker.openCamera({
      cropping: false,
      width: 500,
      height: 500,
      compressImageQuality: 0.5,
      includeExif: true,
      }).then(image => {
      console.log('received image', image.path);
      console.log(image);
      this.setState({
        image: image.path
      });
      this.toggleModal();
    }).catch(e => alert(e));
  }

  showActivity() {
    return (
      <View>
        <ActionSheet
          ref={o => this.ActionSheet = o}
          title={strings("home.actionSheet")}
          options={[
            strings("home.camera"),
            strings("home.biblio"),
            strings("home.cancel"),
          ]}
          cancelButtonIndex={2}
          onPress={(index) => { 
            
            switch(index) {
              case 0:
                this._takePhoto();
                break;
              case 1:
                this._getPhoto();
                break;
              default:
                break;
            }
           }}
        />
      </View>
    );
  }

  showButton() {
    return (
    <TouchableOpacity activeOpacity={0.5} style={styles.TouchableOpacityStyle}  onPress={() => this.ActionSheet.show() }>
      <Image source={{uri : 'data:image/png;base64,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'}}
      style={styles.FloatingButtonStyle} />
    </TouchableOpacity>
    );
  }

  toggleModal = () => {
    this.setState({ modalVisible: !this.state.modalVisible });
  }

  setIndex = (index) => {
    if (index === this.state.index) {
      index = null
    }
    this.setState({ index })
  }

  _share() {
    this._uploadPhoto()
  }

    renderFeed(data){
        return(
              <View style={{flex:1}}>
                 <ListView
                    style={styles.listView}
                    // initialListSize={5}
                    enableEmptySections={true}
                    dataSource={data}
                    renderRow={this._renderRow.bind(this)}
                    // showsHorizontalScrollIndicator={false}
                    // stickyHeaderIndices = {[0]}
                    //renderSectionHeader={this.sectionHeader}
                    // stickySectionHeadersEnabled={true}
                    // onChangeVisibleRows={(changedRows) => console.log(changedRows)}
                    automaticallyAdjustContentInsets={false}
                    refreshControl={
                        <RefreshControl
                          refreshing={this.state.refreshing}
                          onRefresh={this._feedData.bind(this)}
                        />
                      }
                  />
              </View>
        )
      }

    _onPressButton(rowData){
        this.props.navigation.navigate('PublicProfile', { userId: rowData.id_user });
    }

    _renderRow(rowData, rowID, sectionID, highlightRow){

      console.log(moment(rowData.time).tz(DeviceInfo.getTimezone()).format('YYYY-MM-DD HH:mm'));
      return(
          <View style={{backgroundColor: '#FFF'}}>
            <View style={styles.mediaUser}>

                <TouchableOpacity onPress={()=>this._onPressButton(rowData)}>
                    <Image style={styles.picture} source={{uri: rowData.image_profile}} />
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>this._onPressButton(rowData)}>
                    <Text style={styles.username}>{rowData.username}</Text>
                </TouchableOpacity>

            </View>
            <Image
              style={styles.media}
              source={{uri: rowData.image}}
            />

          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', paddingTop: 5, paddingBottom: 5,}}>
            <TouchableOpacity
              onPress = {() => this._like(rowData.id,rowData.id_user,!rowData.band)}
            >
              <Image style={styles.icons} source={{uri: 'data:image/png;base64,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'}}/>
            </TouchableOpacity>

            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end',}}>
              <Text style={styles.time}>{rowData.like} weedy-likes</Text>
            </View>
          </View>
          <View style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'flex-end',
          }}>
          <View style={{height: 1, backgroundColor: '#B2B2B2', marginBottom: 8, marginLeft: 16, marginRight: 20, marginTop: 5,}} />
          </View>
        </View>
      )
    }

  render() {
    console.log(this.state);
    const { isLoaded, image, load } = this.state;
    if(isLoaded){
      return (
        <View style={{flex:1}}>
          <TopBar title={'Feed'} navigate={this.props.navigation.navigate} />
          {this.renderFeed(this.state.feedData)}
          {this.showButton()}
          {this.showActivity()}
            <Modal
              animationType={"slide"}
              transparent={false}
              visible={this.state.modalVisible}
              onRequestClose={() => console.log('closed')}>
              <View style={styles.modalContainer}>
                <Button
                  title='Close'
                  color= '#9605CC'
                  onPress={this.toggleModal}
                />
                <ScrollView contentContainerStyle={styles.scrollView}>
                  { load &&
                    <ActivityIndicator size="large" color="#9605CC" hidesWhenStopped={this.state.isLoaded} />
                  }
                  {!load &&
                      <View>
                          { image != '' &&
                              <TouchableHighlight>
                                  <Image
                                      style={{
                                      width: width,
                                      height: width
                                      }}
                                      source={{uri: image}}
                                  />

                              </TouchableHighlight>
                          }
                              <TextInput
                                  style={styles.inputStyle}
                                  editable={true}
                                  onChangeText={(comment) => this.setState({comment})}
                                  placeholder = {strings("home.comment")}
                                  ref='comment'
                                  returnKeyType='next'
                                  value={this.state.comment}
                              />
                      </View>
                  }

                </ScrollView>
                {
                  this.state.index !== null  && (
                    <View style={styles.shareButton}>
                      <Button
                        color = '#9605CC'
                        title = { strings("home.upload") }
                        onPress={this._share.bind(this)}
                      />
                    </View>
                  )
                }
              </View>
            </Modal>
        </View>
      );
    } else {
      return (
        <View style={{flex:1}}>
          <TopBar title={'Feed'} navigate={this.props.navigation.navigate} />
          <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" color="#9605CC" />
          </View>
        </View>
      );
    }
  }
}
