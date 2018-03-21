import React, { Component } from 'react';
import {
      AppRegistry,
      StyleSheet,
      Text,
      View,
      ListView,
      RefreshControl,
      Image,
      Dimensions
} from 'react-native';
import ActionButton from 'react-native-action-button';

var width = Dimensions.get('window').width;
var feedData = require('./../feedData');
const ds1 = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2, sectionHeaderHasChanged: (s1, s2) => s1 !== s2});

import TopBar from './../topBar';
import Stories from './../stories';

var mePic = require('../../images/sebas.jpg');
var meName = 'Sebastian Diaz'
var meUsername = 'holasebasdiaz'

export default class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {

          feedData:ds1.cloneWithRowsAndSections([]),
          loading:true,
          refreshing:false,
          topBarShow:true
        };
    }

    static navigationOptions = { header: null };


    componentDidMount(){
        this.setState({
          feedData: ds1.cloneWithRowsAndSections(feedData),
          loading:false
        })

    }

    sectionHeader(sectionData, sectionID){
    /*    if(sectionID == 0){
            return(<Stories />)
        }else{*/
            return(
              <View style={styles.mediaUser}>
                <Image
                    style={styles.picture}
                    source={sectionData.media.picture}/>
                    <Text style={styles.username}>{sectionData.media.username}</Text>
              </View>
            )
       /// }
    }

    renderFeed(data){
        return(
              <View>
                 <ListView
                    style={styles.listView}
                    initialListSize={5}
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
                          onRefresh={this._onRefresh.bind(this)}
                        />
                      }
                  />
                  <View style={{flex:1, backgroundColor: '#f3f3f3'}}>
                     {/* Rest of the app comes ABOVE the action button component !*/}
                     <ActionButton buttonColor="rgba(231,76,60,1)">
                       <ActionButton.Item buttonColor='#9b59b6' title="New Task" onPress={() => console.log("notes tapped!")}>
                         <Text >pl</Text>
                       </ActionButton.Item>
                       <ActionButton.Item buttonColor='#3498db' title="Notifications" onPress={() => {}}>
                         <Text >pl</Text>
                       </ActionButton.Item>
                       <ActionButton.Item buttonColor='#1abc9c' title="All Tasks" onPress={() => {}}>
                         <Text >pl</Text>
                       </ActionButton.Item>
                     </ActionButton>
                   </View>
              </View>
        )


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

     _renderRow(rowData, rowID, sectionID, highlightRow){

     if(sectionID != "storiesSection"){
            return(
            <View style={{backgroundColor: '#FFF',}}>
                <View style={styles.mediaUser}>
                    <Image style={styles.picture} source={mePic} />
                    <Text style={styles.username}>{meUsername}</Text>
                </View>
                 <Image
                   style={styles.media}
                  source={rowData.media}/>

                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', paddingTop: 5, paddingBottom: 5,}}>
                     <Image style={styles.icons} source={{uri: 'data:image/png;base64,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'}}/>
                   <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end',}}>
                     <Text style={styles.time}>54 weedy-likes</Text>
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
        }else{
            return false
        }
     }
      _onRefresh(){}


      render() {
        return (
          <View>
           <TopBar title={'Feed'} navigate={this.props.navigation.navigate} />

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
        marginBottom:118,
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

    });
