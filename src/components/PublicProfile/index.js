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
      TouchableHighlight
} from 'react-native';

import {userService} from './../../services';
var width = Dimensions.get('window').width;
const ds1 = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

import TopBar from './../../utils/TopBar';
import Stories from './../stories';

var mePic = require('../../images/sebas.jpg');
var meName = 'Sebastian Diaz'
var meUsername = 'holasebasdiaz'

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
          publicImage: {}
        };
    }

    static navigationOptions = { header: null };


    componentDidMount(){
        const { params } = this.props.navigation.state;
        const userId = params ? params.userId : null;
        const otherParam = params ? params.otherParam : null;

        AsyncStorage.getItem('id_token').then((token) => {
            userService.publicProfile(token, userId)
                .then(response => {
                    this.setState({
                        loading:false,
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
        const {rowData, country, publicImage} = this.state;
        return (
        <View style={{flex:1}}>
            <TopBar title={ 'Feed'} navigate={this.props.navigation.navigate} />
            <View style={{backgroundColor: '#FFF', flex:3}}>
                <Image style={styles.media} source={{uri: rowData.image}} />
            </View>

            <View style={{flex: 2, flexDirection: 'column'}}>
                <View style={{flex: 1, flexDirection: 'column'}}>
                    <Text style={{paddingTop: 20,paddingLeft: 20, fontSize: 20, color: '#333'}}>{rowData.first_name}, {rowData.age} </Text>
                </View>
                <View style={{flex: 1, flexDirection: 'column'}}>
                    {country &&
                        <Text style={{paddingTop: 20,paddingLeft: 20, fontSize: 20, color: '#333'}}>{country.name} </Text>
                    }
                </View>
                <View style={{flex: 1, flexDirection: 'column'}}>
                    <Text style={{paddingTop: 20,paddingLeft: 20, fontSize: 20, color: '#333'}}>{rowData.distance} </Text>
                </View>
                <View style={{flex: 1, flexDirection: 'column'}}>
                    <Text style={{paddingTop: 20,paddingLeft: 20, fontSize: 20, color: '#333'}}>{rowData.description} </Text>
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
      }
    }

    const styles = StyleSheet.create({

      MainContainer :{

        justifyContent: 'center',
        flex:1,
        margin: 10
      },

      rowViewContainer:
      {

        fontSize: 18,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10,

      },

      TouchableOpacityStyle:{

          position: 'absolute',
          width: 50,
          height: 50,
          alignItems: 'center',
          justifyContent: 'center',
          right: 30,
          bottom: 30,
        },

        FloatingButtonStyle: {

          resizeMode: 'contain',
          width: 50,
          height: 50,
        },
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
      },
      actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
      },
      welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 5,
      },
      instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
      },
      listView:{
        marginTop:0,
        width:width,
      },
      picture:{
        width:30,
        height:30,
        borderRadius:15,

      },
      media:{
      width:width,
      height:width
      },
      mediaUser:{
      alignItems: 'center',
      padding:10,
      backgroundColor:'#FFF',
      width:width,
      flexDirection:'row',
      borderWidth:1,
      borderTopColor:'#fff',
      borderLeftColor:'#fff',
      borderRightColor:'#fff',
      borderBottomColor:'#fff',
      },
      username:{
        paddingLeft:10,
      },
      mediaIcons:{
           width:width-10,

        flexDirection:'row',
        height:30,

      },
      icons:{
        marginLeft:10,
        marginTop:5,
        width:30,
        height:26
      },
      likes:{
        flexDirection:'row',
        width:width,
        marginTop:10,
        marginLeft:10,
        marginBottom:10,
      },
      comments:{

        flexDirection:'row',
        width:width,
        marginLeft:10,
        marginBottom:5
      },
      user:{
        fontWeight:'bold',
        fontSize:10
      },
      comment:{

        marginLeft:5,
        fontSize:10
      },
      time:{
        marginRight:20,
        marginTop: 10,
        fontSize:14,
        color:'#777',
        textAlign:'left'
      },
      topBar:{
        backgroundColor:'blue'
      },
      headerSection:{
        backgroundColor:'blue',

        height:40
      },
      mediaUser:{
          alignItems: 'center',
          padding:10,
          backgroundColor:'#FFF',
          width:width,
          flexDirection:'row',
          borderWidth:1,
          borderTopColor:'#fff',
          borderLeftColor:'#fff',
          borderRightColor:'#fff',
          borderBottomColor:'#fff',
        },   picture:{
             width:30,
             height:30,
             borderRadius:15,

           },
            username:{
             paddingLeft:10,

           },
      rowimage:{
        width:width/3,
        height:width/3,
        borderWidth:.5,
        borderColor:'#fff'

      }

    });
