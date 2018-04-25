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
    TouchableHighlight
} from 'react-native';

import styles from './style';
import TopBar from './../../utils/TopBar';
import { publicProfileAction } from './PublicProfileActions';
import {APP_STORE} from '../../Store';
import {connection, internet } from '../../utils';
import ImageSlider from 'react-native-image-slider';

export default class PublicProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
          rowData:{},
          refreshing:false,
          publicImage: {},
          isLoading: false
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

        if (connection) {
            publicProfileAction(APP_STORE.getToken(), userId)
        } else {
          internet();
        }
    }

    showButton() {
      return (
        <TouchableOpacity activeOpacity={0.5} style={styles.TouchableOpacityStyle} >
        <Image source={{uri : 'https://reactnativecode.com/wp-content/uploads/2017/11/Floating_Button.png'}}
        style={styles.FloatingButtonStyle} />
        </TouchableOpacity>
      );
    }
          
    render() {
      const images = [
        'https://placeimg.com/640/640/nature',
        'https://placeimg.com/640/640/people',
        'https://placeimg.com/640/640/animals',
        'https://placeimg.com/640/640/beer',
      ];
        const {rowData, country, publicImage, isLoading} = this.state;
        if(isLoading) {
            return (
                <View style={styles.viewFlex}>
                    <TopBar title={ 'Feed'} navigate={this.props.navigation.navigate} />
                    <View style={styles.viewBackground}>
                        {/* <Image style={styles.media} source={{uri: rowData.image_profile}} /> */}
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
                        </View>
                        <View style={styles.viewContainer}>
                            <Text style={styles.textContainer}>{rowData.distance} </Text>
                        </View>
                        <View style={styles.viewContainer}>
                            <Text style={styles.textContainer}>{rowData.description} </Text>
                        </View>
                    </View>

                    <View style={styles.viewFlexDirection}>
                        {publicImage.results && publicImage.results.map(function(value, i) {
                            return (
                                <Image key={i} source={{uri: value.image}} style={styles.rowimage}/>
                                );
                            })
                        }
                    </View>
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