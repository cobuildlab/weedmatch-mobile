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
import TopBar from './../../utils/TopBar';
import { publicProfileAction, publicImagesAction,getImages, publicImages420Action,appendData,Action420 } from './PublicProfileActions';
import {APP_STORE} from '../../Store';
import {connection, internet, checkConectivity } from '../../utils';
import ImageSlider from 'react-native-image-slider';

var { height, width } = Dimensions.get('window');

export default class PublicProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
          rowData:{},
          refreshing:false,
          publicImages: {},
          public420: {},
          isLoading: false,
          isDetail: false,
          urlPage: '',
          numPage: 0,
          dataSource: [],
        };
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
                this._publicImages();
              return;
            }
            if (state.error) {
              Alert.alert(state.error);
            }
        });

        this.images = APP_STORE.PUBLICIMAGES_EVENT.subscribe(state => {
          console.log("Public Images:componentDidMount:PUBLICIMAGES_EVENT", state);
          if (state.publicImages) {
              this.setState({
                  publicImages: state.publicImages
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
      console.log("Home420:componentWillUmmount");
      this.images.unsubscribe();
      this.images420.unsubscribe();
      this.images420Page.unsubscribe();
      this.public.unsubscribe();
    }

    _publicProfile() {
        const { params } = this.props.navigation.state;
        const userId = params ? params.userId : null;

        if (checkConectivity()) {
          publicProfileAction(APP_STORE.getToken(), userId)
        } else {
          internet();
        }
    }

    _get420Images() {
      const { params } = this.props.navigation.state;
      const userId = params ? params.userId : null;
      
      if (checkConectivity()) {
        Action420(APP_STORE.getToken(), this.state, userId);
      } else {
        internet();
      }
    }

    _publicImages() {
      const { params } = this.props.navigation.state;
      const userId = params ? params.userId : null;

      if (checkConectivity()) {
        publicImagesAction(APP_STORE.getToken(), userId)
      } else {
        internet();
      }
  }

    _changeView = () => {
      this.setState({
        isDetail: !this.state.isDetail
      })
    }

    showButtons() {
      return (
          <View style={{
              flex: 1,
              padding: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
            }}>
              <View>
                <TouchableOpacity>
                  <Image source={require('../../assets/img/actions/rejected.png')} style={{width: 50, height: 50}} />
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity>
                  <Image source={require('../../assets/img/actions/like.png')} style={{width: 50, height: 50}} />
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity>
                  <Image source={require('../../assets/img/actions/mach.png')} style={{width: 50, height: 50}} />
                </TouchableOpacity>
              </View>
            </View>
      );
    }

    renderiza() {
      const {rowData, country, publicImages} = this.state;

      return (
        <View>
        <View style={styles.viewBackground}>
        <ImageSlider
          autoPlayWithInterval={3000}
          images={getImages(publicImages)}
          customSlide={({ index, item, style, width }) => (
            // It's important to put style here because it's got offset inside
            <View key={index} style={[style, styles.customSlide]}>
              <Image source={{ uri: item }} style={styles.media} />
            </View>
          )}
          customButtons={(position, move) => (
            <View style={styles.buttons}>
              {getImages(publicImages).map((image, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    underlayColor="#fff"
                    onPress={() => move(index)}
                    style={styles.button}
                  >
                    <Text style={position === index && styles.buttonSelected}>
                      -
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
          />
          </View>
          <View style={styles.viewContainer}>
            <View style={styles.viewContainer}>
              <Text style={styles.textName}>{rowData.first_name}, {rowData.age} </Text>
            </View>
            <View style={styles.viewContainer}>
                {country &&
                    <Text style={styles.textContainer}>{country.name} </Text>
                }
                <TouchableOpacity activeOpacity={0.5} style={styles.TouchableOpacityStyle} onPress={this._changeView}>
                  <Image source={require('../../assets/img/down.png')} style={styles.ShowPublic} />
                </TouchableOpacity>
              </View>
            <View style={styles.viewContainer}>
              <Text style={styles.textContainer}>{rowData.distance} </Text>
            </View>
            <View style={styles.viewContainer}>
              <Text style={styles.textContainer}>{rowData.description} </Text>
            </View>
        </View>
        </View>
      );
    }
          
    render() {

        const {rowData,country,isLoading, isDetail,public420} = this.state;
        if(isLoading) {

          if(isDetail) {
            return (
              <View style={styles.viewFlex}>
                <FlatList
                  horizontal={false}
                  numColumns={3}
                  data={getImages(public420)}
                  style={{flex:1}}
                  ListHeaderComponent={this.renderiza()}
                  keyExtractor={( item , index ) => index}
                  onEndReached={this._get420Images.bind(this)}
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
          } else {
              return (
                <View style={styles.viewFlex}>
                    <TopBar title={ 'Feed'} navigate={this.props.navigation.navigate} />
                    <View style={styles.viewBackground}>
                        <Image style={styles.media} source={{uri: rowData.image_profile}} />
                    </View>
                    <View style={styles.viewContainer}>
                        <View style={styles.viewContainer}>
                            <Text style={styles.textName}>{rowData.first_name}, {rowData.age} </Text>
                        </View>
                        <View style={styles.viewContainer}>
                            {country &&
                                <Text style={styles.textContainer}>{country.name} </Text>
                            }
                            <TouchableOpacity activeOpacity={0.5} style={styles.TouchableOpacityStyle} onPress={this._changeView}>
                              <Image source={require('../../assets/img/plus.png')} style={styles.ShowDetail} />
                            </TouchableOpacity>
                          </View>
                        <View style={styles.viewContainer}>
                            <Text style={styles.textContainer}>{rowData.distance} </Text>
                        </View>
                        <View style={styles.viewContainer}>
                            <Text style={styles.textContainer}>{rowData.description} </Text>
                        </View>
                    </View>
                    {this.showButtons()}
                </View>
            );
          }
        } else {
            return (
                <View style={[styles.containers, styles.horizontal]}>
                    <ActivityIndicator size="large" color="#9605CC" />
                </View>
            )
        }
    }
}