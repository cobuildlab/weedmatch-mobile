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
      ToastAndroid
      } from 'react-native';

import ImagePicker from 'react-native-image-crop-picker';
import { userService } from '../../services';
import TopBar from '../../utils/TopBar';

var width = Dimensions.get('window').width;
const ds1 = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
          latitud: '',
          longitud: '',
          feedData: ds1.cloneWithRows([]),
          loading: true,
          refreshing:false,
          topBarShow:true,
          totalPages: '',
          nextPage: '',
          image: '',
          comment: '',
          modalVisible: false,
          photos: [],
          isLoaded: false
        };
    }

    static navigationOptions = { header: null };


    componentDidMount(){
      navigator.geolocation.getCurrentPosition(
          (position) => {
              this.setState({
                latitud: '',//position.coords.latitude.toFixed(6),
                longitud: '',// position.coords.longitude.toFixed(6),
              })
          },
          (error) => {
              console.log(error)
          },
          {enableHighAccuracy: true, timeout: 50000, maximumAge: 10000}
      );
        AsyncStorage.getItem('token').then((token) => {
            userService.feed(token, this.state)
                .then(response => {
                    this.setState({
                        feedData: ds1.cloneWithRows(response.results),
                        loading: false,
                        isLoaded: true
                    })
                })
        })

    }

    _refresh420(){
        console.log(1);
        AsyncStorage.getItem('token').then((token) => {
                userService.feed(token, this.state)
                    .then(response => {
                        this.setState({
                            feedData: ds1.cloneWithRows(response.results),
                            loading: false,
                            isLoaded: true
                        })
                    })
            })
    }

    _getPhoto(){
        ImagePicker.openPicker({
              cropping: false,
              width: 500,
              height: 500,
              includeExif: true,
            }).then(image => {
              console.log('received image', image.path);
              console.log(image);
              this.setState({
                image: image.path
              });
            }).catch(e => alert(e));
    }

    showButton() {
      return (
      <TouchableOpacity activeOpacity={0.5} style={styles.TouchableOpacityStyle}  onPress={() => { this.toggleModal(); this._getPhoto(); }}>
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

    share = () => {
       this.setState({isLoaded: true});
       var re = /(?:\.([^.]+))?$/;
       var ext = re.exec(this.state.image)[1];

       AsyncStorage.getItem('token').then((token) => {
           const data = new FormData();

           data.append('image', {
               uri: this.state.image,
               type: 'image/' + ext,
               name: 'photo.' + ext
           });

           data.append('latitud', this.state.latitud);
           data.append('longitud', this.state.longitud);
           data.append('comment', this.state.comment);
           
            const requestOptions = {
                method: 'POST',
                headers: {'Authorization': 'Token ' + token},
                body: data
            };
            console.log(requestOptions);

           fetch("https://weedmatch.herokuapp.com/public-image/", requestOptions)
              .then(res => res.json())
              .then(response => {
                console.log(response);
                ToastAndroid.show(response.detail, ToastAndroid.LONG);
                this.setState({isLoaded: false, modalVisible: false});
                this._refresh420();
              })
           .catch(res => {
            console.log(res)
              });
        })
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
                          onRefresh={this._onRefresh.bind(this)}
                        />
                      }


                  />
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
              </View>
            );
          });
        }

    _onPressButton(rowData){
        this.props.navigation.navigate('PublicProfile', { userId: rowData.id_user });
    }

    takePicture() {

    }


    _renderRow(rowData, rowID, sectionID, highlightRow){

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
                  <TouchableOpacity>
                    <Image style={styles.icons} source={{uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAArCAYAAAA+EwvfAAAACXBIWXMAAAsSAAALEgHS3X78AAAFtElEQVRo3tWZXWhcVRCAZ+ZWH0TclApSsGTrH5IiuWWrDUXNtlq1NaRbFVsqNXfbqC1Iu6IPPohuQKhvTaXgS3HvBY2xNbqJbTCGkLu1xf4QusVSREWTCoooNAtS2sKd8eGe3T3Z5md/7pb1vN2798yZ78yZOTOzKCJQzjiz8VgYCcJEAmQIEEm2daBzGgIaV953omQIoC9/+pa3dmTLmYfzARyPjoSJJEmGxIgk5C8AoEGcJ0PSRGKv6I9NVqLwP29/2kQkFhlgEUmrkgcaRI5I0kRgY2KnWxHAWNtoExmSJIK9qAkuLgA3vCOSHiTobemLLWiVv978LIH+xoT8+TDLGtozQQZJLNjTPbkgwMiqMdMnl2ZfAEAFEFNIYLX0xWbdsd9f/9wkApsMaSUqUXJhiJyCSOsySX8Ybh03xUOXGZuZEdhDYAYQDx1mXLtmdAO2jWxE9nCxMGxmxkH/m/y32CwM4xe3pROlyv/22pGYLxta83PEn5dhxjh7sPyOnu14+7svIzOuZA97hDFXkM8QEsav4MND1qwWGGpxw0SQzZtV7XqGSKwnTq2f83yf7TgWJhKbDGnXdxAJnJa+mAUA8MuOAYtIUmgIGAXZMEWGWEv3b3XncewmMqQXSbo0SwCSrIQ93dkZAIMPZlwkaSeCvBLOM+fWWeU65UTn0QQZsr8UggxxiSRVeOdDOGhIYtnBLWVFsav7bAs1GUQwhSQm7OmeRhGBgXu/s/KLoP/BYMeFaKzSUDjReTSqolJIgyj1k/g9h16wK5V9dZ+dRJL3NIgeTOxMoojAkeUnJomkWS0yhSRm58VoVTF+ovOoqXZ9Noj4A85zdrV3xdV9tn9KfFk5IghT/90nTfbAd1rfqZLVKg8AEBnqyLKHUdYcUBiAPaxJeQAA9tCSYsAIMYNFzPmXAMyY2/zz43att6qCSGjRqaelL1az3Nve6ZpkDzMaRIzYQ7MY0iAdVGoQGeqw2cM4MzoPHd6UDEouM6bZK4Tg9kXCGObipZCFAEdkqMMGADtImexhVr/EFjFjMwGAgggUoB6DGWc8L2IGAEBQEOGGB/B8fQtWYMYMM+SvdvN/YIGwCjjAHgKxh5Mq1wBmjDW+BTDKxah5nkR5tYJodpacthpV+T/f6A8LY1cxgYQ0vXplVVoYpzSIXmfJ6aYG3X1by2KBGW1SPyRLbrh0oyl/affhXmZo11LxA3d+8NIkAQDsuhaxS2649tTi03ajKP9r9xeWx7hXVH3CHk4xY3JGQSMCMfZwSoPoagSIn7q+tJgxJR6CxwjiYY4ZYkv3b52eAbD7emRaQeQaBeLitrTFjKnCsfEhEssObsnOWRN/dOuEiQguGRLSalInfnn1TY1OP7w46FdxM+uJ+H0fP2/PWRMrS2RFIDqLJXpvlvLnNn9tsYcpLRUHZrxB+Xn7QnNYIh6/vLquR+psxzFLL0Hz667onz0dn7exdbMhTj09bJGhjo22XutAp11VZ05BRBFhvKRPEzjEiXXfRMmQ8ZK+U1yl5HMOWkjw7usRVwTiWhEBzJhKLQ4u5cg89q3JekrjIQjDgsqXBaAg7HpBjLWNmszgiochrQSNPzL8bFkWpnIXqgfEyKoxkxld9jCkOoDAjAfWjG4o+3hiue11zScsREjV6hPDreMmkbiYb/D6spy1J5+qaEMqBggCYqjFNYn86Ka1MZ31Z56s2JpVAdQC8dX9x00yxEWSULVtzEAAqoE4svyESVTs2qk2ptNxIVq1H1EtEaQSx1YdQNevN/KhEmtSvmaAciE+uet7kxldYQwVCnJGZ9OP7TWH4ZqOUBnHaS0RTBOpM19o9oqz5dKjgVyEgQHMAZFTrfCQ9peSs+2PNYHd4oECzGMJID+3cbb/3RZoXUEQ8FA+0VPiE8AMgStfFwtolrARoUtZwnnl34frUtHVDUCDgF3XInUrR/8D0wNTVEI9jskAAAAASUVORK5CYII='}}/>
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
      _onRefresh(){}

      render() {
        console.log(this.state);
        const { isLoaded, image } = this.state;
        if(isLoaded){
          return (
            <View style={{flex:1}}>
             <TopBar title={'Feed'} navigate={this.props.navigation.navigate} />
             {this.renderFeed(this.state.feedData)}
             {this.showButton()}
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
                         <ScrollView
                           contentContainerStyle={styles.scrollView}>

                           <ActivityIndicator size="large" color="#9605CC" hidesWhenStopped={this.state.isLoaded} />
                            return {image != '' &&
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
                                                          placeholder='Comentario'
                                                          ref='comment'
                                                          returnKeyType='next'
                                                          value={this.state.comment}
                                                      />



                         </ScrollView>
                          {
                            this.state.index !== null  && (
                              <View style={styles.shareButton}>
                                <Button

                                    color= '#9605CC'
                                    title='Subir Imagen'
                                    onPress={this.share}
                                  />
                              </View>
                            )
                          }

                       </View>
                 </Modal>
            </View>
          );
        }else{
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

    const styles = StyleSheet.create({
      MainContainer:{
        justifyContent: 'center',
        flex:1,
        margin: 10
      },
      rowViewContainer:{
        fontSize: 18,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10,
      },
      TouchableOpacityStyle:{
          position: 'absolute',
          width: 100,
          height: 50,
          alignItems: 'center',
          justifyContent: 'center',
          bottom: 5,
          right: 156,
      },
      FloatingButtonStyle: {
        resizeMode: 'contain',
        width: 100,
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
      },
      picture:{
        width:30,
        height:30,
        borderRadius:15,
      },
      username:{
        paddingLeft:10,
      },
      modalContainer: {
        paddingTop: 20,
        flex: 1
      },
      scrollView: {
          flexWrap: 'wrap',
          flexDirection: 'row'
      },
      containers: {
          flex: 1,
          justifyContent: 'center'
      },
      horizontal: {
          flexDirection: 'row',
          justifyContent: 'space-around',
          padding: 10
      },
      preview: {
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'center'
      },
      capture: {
          flex: 0,
          backgroundColor: '#fff',
          borderRadius: 5,
          color: '#000',
          padding: 10,
          margin: 40
      },
      inputStyle:{
          backgroundColor: '#ffffff',
          height: 80,
          width: width,
          padding: 5
        }
    });
