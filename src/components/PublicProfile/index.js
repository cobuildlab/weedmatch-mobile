import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    RefreshControl,
    Image,
    Dimensions,
    AsyncStorage,
    TouchableOpacity,
    TouchableHighlight,
    ActivityIndicator
} from 'react-native';

import {userService} from './service';
import styles from './style';
import TopBar from './../../utils/TopBar';

var mePic = require('../../images/sebas.jpg');
var meName = 'Sebastian Diaz'
var meUsername = 'holasebasdiaz'
const ds1 = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class PublicProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
          latitud: '',
          longitud: '',
          rowData:{},
          feedData:ds1.cloneWithRows([]),
          loading:true,
          refreshing:false,
          topBarShow:true,
          totalPages: '',
          nextPage: '',
          publicImage: {},
          isLoading: false
        };
    }

    static navigationOptions = { header: null };


    componentDidMount(){
        const { params } = this.props.navigation.state;
        const userId = params ? params.userId : null;
        const otherParam = params ? params.otherParam : null;

        AsyncStorage.getItem('token').then((token) => {
            userService.publicProfile(token, userId)
                .then(response => {
                    this.setState({
                        loading:false,
                        isLoading: true,
                        rowData: response,
                        country: response.country
                    })
                })

            userService.publicImage(token, userId)
                .then(response => {
                    this.setState({
                        loading:false,
                        publicImage: response
                    })
                })
        })

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
        const {rowData, country, publicImage, isLoading} = this.state;
        if(isLoading){
            return (
                    <View style={{flex:1}}>
                        <TopBar title={ 'Feed'} navigate={this.props.navigation.navigate} />
                        <View style={{backgroundColor: '#FFF', flex:3}}>
                            <Image style={styles.media} source={{uri: rowData.image_profile}} />
                        </View>

                        <View style={{flex: 1, flexDirection: 'column'}}>
                            <View style={{flex: 1, flexDirection: 'column'}}>
                                <Text style={{ marginTop: 15, paddingLeft: 20, fontSize: 16, color: '#333'}}>{rowData.first_name}, {rowData.age} </Text>
                            </View>
                            <View style={{flex: 1, flexDirection: 'column'}}>
                                {country &&
                                    <Text style={{marginTop: 10, paddingLeft: 20, fontSize: 16, color: '#333'}}>{country.name} </Text>
                                }
                            </View>
                            <View style={{flex: 1, flexDirection: 'column'}}>
                                <Text style={{marginTop: 10, paddingLeft: 20, fontSize: 16, color: '#333'}}>{rowData.distance} </Text>
                            </View>
                            <View style={{flex: 1, flexDirection: 'column'}}>
                                <Text style={{marginTop: 10, paddingLeft: 20, fontSize: 16, color: '#333'}}>{rowData.description} </Text>
                            </View>


                        </View>






                        <View style={{flexDirection: 'row'}}>
                                {publicImage.results &&
                                       publicImage.results.map(function(value, i){
                                            return (
                                                <Image key={i} source={{uri: value.image}} style={styles.rowimage}/>
                                           );
                                        })
                                     }
                        </View>
                    </View>
                    );
        }else{
            return (
                <View style={[styles.containers, styles.horizontal]}>
                    <ActivityIndicator size="large" color="#9605CC" />
                </View>
            )
        }

      }
    }