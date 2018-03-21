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
      AsyncStorage
} from 'react-native';
import { userService } from '../../services';

var width = Dimensions.get('window').width;
// var feedData = require('./../feedData');
const ds1 = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

import TopBar from './../topBar';
import Stories from './../stories';

export default class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {

          feedData:ds1.cloneWithRows([]),
          loading:true,
          refreshing:false,
          topBarShow:true,
          totalPages: '',
          nextPage: '',
        };
    }

    static navigationOptions = { header: null };

    componentDidMount(){

      userService.feed()
      .then(response => {
        if (response) {

          response.results.map(album => 
              console.log(album.id_user)
          );

          console.log(response.results)

          this.setState({
            feedData: ds1.cloneWithRows(response.results),
            loading:false
          })
        }
      })
      .catch(error => {
        console.log(error);
      });
    }

    // sectionHeader(sectionData, sectionID){
    // /*    if(sectionID == 0){
    //         return(<Stories />)
    //     }else{*/
    //         return(
    //           <View style={styles.mediaUser}>
    //             <Image
    //                 style={styles.picture}
    //                 source={sectionData.image}/>
    //                 <Text style={styles.username}>{sectionData.media.username}</Text>
    //           </View>
    //         )
    //    /// }
    // }

    renderFeed(data){
        return(
              <View>
                 <ListView
                    style={styles.listView}
                    // initialListSize={5}
                    // enableEmptySections={true}
                    dataSource={data}
                    renderRow={this._renderRow.bind(this)}
                    // showsHorizontalScrollIndicator={false}
                    // stickyHeaderIndices = {[0]}
                    //renderSectionHeader={this.sectionHeader}
                    // stickySectionHeadersEnabled={true}
                    // onChangeVisibleRows={(changedRows) => console.log(changedRows)}
                    // automaticallyAdjustContentInsets={false}
                    // refreshControl={
                    //     <RefreshControl
                    //       refreshing={this.state.refreshing}
                    //       onRefresh={this._onRefresh.bind(this)}
                    //     />
                    //   }
                  />
              </View>
        )
      }

      _renderRow(rowData, rowID, sectionID, highlightRow){

        console.log(rowData);
  
       if(sectionID != "storiesSection"){
              return(
              <View>
                   <Image
                     style={styles.media}
                     source={{uri: rowData.image}}
                     />
  
                   <View style={styles.mediaIcons}>
                       <Image style={styles.icons} source={require('../../images/heart.png')} />
                       <Image style={styles.icons} source={require('../../images/comm.png')} />
                       <Image style={styles.icons} source={require('../../images/share.png')} />
                    </View>
                    <View style={styles.likes}>
                   {/* {this._likes(rowData.likes)} */}
                   </View>
                     <View>
                   {/* {this._comments(rowData.comments)} */}
                   <Text style={styles.time}>HACE 2 HORAS</Text>
                   </View>
              </View>
                  )
          }else{
              return false
          }
       }

        _likes(likes){

          var users = ""
          for (var i = 0; i < likes.length; i++) {
            users = users+ likes[i].username + ", "
          }
          return(
              <Text style={styles.user}>{users}</Text>
            )
        }
        _comments(comments){
          return comments.map(function(news, i){
            return(
              <View key={i} style={styles.comments}>
                <Text style={styles.user}>{news.username}</Text>

                <Text style={styles.comment}>{news.comment}</Text>

              </View>
            );
          });
        }

      _onRefresh(){}


      render() {
        console.log(this.state.feedData);
        return (
          <View>
           <TopBar title={'Feed'} navigate={this.props.navigation.navigate} />
            {/* {this.feedData.map(album => 
              this.renderFeed(album)
            )} */}
           {this.renderFeed(this.state.feedData)}
          </View>
        );
      }
    }

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
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
        marginBottom:180,
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
        width:20,
        height:20

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
        marginLeft:10,
        fontSize:8,
        color:'#777',
        textAlign:'left'
      },
      topBar:{
        backgroundColor:'blue'
      },
      headerSection:{
        backgroundColor:'blue',

        height:40
      }

    });


