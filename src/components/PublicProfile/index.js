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
    Dimensions
} from 'react-native';

import styles from './style';
import TopBar from './../../utils/TopBar';
import { publicProfileAction } from './PublicProfileActions';
import {APP_STORE} from '../../Store';
import {connection, internet, checkConectivity } from '../../utils';
import ImageSlider from 'react-native-image-slider';

var images = [
  require('../../images/p1.jpg'),
  require('../../images/p2.jpg'),
  require('../../images/p3.jpg'),
  require('../../images/p4.jpg'),
  require('../../images/p5.jpg'),
  require('../../images/p6.jpg')
]

var { height, width } = Dimensions.get('window');

export default class PublicProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
          rowData:{},
          refreshing:false,
          publicImage: {},
          isLoading: false,
          isDetail: false,
        };
    }

    static navigationOptions = { header: null };

    componentDidMount(){

        this.public = APP_STORE.PUBLICPROFILE_EVENT.subscribe(state => {
            console.log("Public Profile:componentDidMount:PUBLICPROFILE_EVENT", state);
            if (state.publicProfile) {
                this.setState({
                    isLoading: true,
                    rowData: state.publicProfile,
                    country: state.publicProfile.country
                })
              return;
            }
            if (state.error) {
              Alert.alert(state.error);
            }
        });

        this._publicProfile();
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

    onPress = () => {
      this.setState({
        isDetail: !this.state.isDetail
      })
    }

    renderSection() {
      return (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {this.renderSectionOne()}
          </View>
      )
    }

    renderSectionOne() {
      return images.map((image, index) => {
          return (
              <View key={index} style={[{ width: (width) / 3 }, { height: (width) / 3 }, { marginBottom: 2 }, index % 3 !== 0 ? { paddingLeft: 2 } : { paddingLeft: 0 }]}>
                  <Image style={{
                      flex: 1,
                      alignSelf: 'stretch',
                      width: undefined,
                      height: undefined,
  
                  }}
                      source={image}>
                  </Image>
  
              </View>
          )
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
          
    render() {
      const images = [
        'https://placeimg.com/640/640/nature',
        'https://placeimg.com/640/640/people',
        'https://placeimg.com/640/640/animals',
        'https://placeimg.com/640/640/beer',
      ];
        const {rowData, country, publicImage, isLoading, isDetail} = this.state;
        if(isLoading) {

          if(isDetail) {
            return (
              <View style={styles.viewFlex}>
              <View style={styles.viewBackground}>
                <ImageSlider
                  loopBothSides
                  autoPlayWithInterval={3000}
                  images={images}
                  customSlide={({ index, item, style, width }) => (
                    // It's important to put style here because it's got offset inside
                    <View key={index} style={[style, styles.customSlide]}>
                      <Image source={{ uri: item }} style={styles.media} />
                    </View>
                  )}
                  customButtons={(position, move) => (
                    <View style={styles.buttons}>
                      {images.map((image, index) => {
                        return (
                          <TouchableHighlight
                            key={index}
                            underlayColor="#ccc"
                            onPress={() => move(index)}
                            style={styles.button}
                          >
                            <Text style={position === index && styles.buttonSelected}>
                              -
                            </Text>
                          </TouchableHighlight>
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
                        <TouchableOpacity activeOpacity={0.5} style={styles.TouchableOpacityStyle} onPress={this.onPress}>
                          <Image source={require('../../assets/img/down.png')} style={styles.FloatingButtonStyle} />
                        </TouchableOpacity>
                      </View>
                    <View style={styles.viewContainer}>
                      <Text style={styles.textContainer}>{rowData.distance} </Text>
                    </View>
                    <View style={styles.viewContainer}>
                      <Text style={styles.textContainer}>{rowData.description} </Text>
                    </View>
                </View>
                {this.renderSection()}
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
                            <TouchableOpacity activeOpacity={0.5} style={styles.TouchableOpacityStyle} onPress={this.onPress}>
                              <Image source={require('../../assets/img/plus.png')} style={styles.FloatingButtonStyle} />
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