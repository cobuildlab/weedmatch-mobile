import React, {Component} from 'react'
import Swiper from 'react-native-deck-swiper'
import { Button,
         StyleSheet,
         Text, 
         View, 
         Alert,
         TouchableOpacity,
         Image,
         ActivityIndicator,
        } 
from 'react-native'
import styles from './style';
import { internet, checkConectivity } from '../../utils';
import {strings} from '../../i18n';
import {APP_STORE} from '../../Store'
import { swiperAction } from './SwiperActions'
import TopBar from '../../utils/TopBar';

export default class SwiperView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      cards: [],
      cardIndex: 0,
      noCards: false,
      latitud: '',
      longitud: '',
      urlPage: '',
      numPage: 0,
      isLoaded: false,
      load: false,
      loading: true,
      refreshing: false,
    }
  }

  componentDidMount() {
      console.log("SwiperView: componentDidMount");

      this.swiperData = APP_STORE.SWIPER_EVENT.subscribe(state => {
        console.log("SwiperView:componentDidMount:swipeDataSuscription", state);
        if (state.swiper) {

            this.setState({
                cards: state.swiper,
                loading: false,
                isLoaded: true
              });

          return;
        }
        if (state.error) {
          Alert.alert(state.error);
        }
      });

      this._Position()
  }

  static navigationOptions = { header: null };

  componentWillUnmount() {
    console.log("SwiperView :componentWillUmmount");
    this.swiperData.unsubscribe();
  }

  _Position() {
    navigator.geolocation.getCurrentPosition(
     (position) => {

         this.setState({
           latitud: position.coords.latitude.toFixed(6),
           longitud: position.coords.longitude.toFixed(6),
         },() => { 
           this._swiperData();
         })
     },
     (error) => {
         this._swiperData();
         console.log(error)
     },
     {enableHighAccuracy: true, timeout: 50000, maximumAge: 10000}
   );
  }

  _swiperData() {
    if (checkConectivity()) {
      swiperAction(APP_STORE.getToken(), this.state);
    } else {
      internet();
    }
  }

  renderCard = card => {
    return (
      <View style={styles.card}>
                <View style={styles.viewFlex}>
                    <View style={styles.viewBackground}>
                        <Image style={styles.media} source={{uri: card.image_profile}} />
                    </View>
                    <View style={styles.viewContainer}>
                        <View style={styles.viewContainer}>
                            <Text style={styles.textName}>{card.first_name}, {card.age} </Text>
                        </View>
                        <View style={styles.viewContainer}>
                                <Text style={styles.textContainer}>{card.country.name} </Text>
                            <TouchableOpacity activeOpacity={0.5} style={styles.TouchableOpacityStyle} onPress={this._changeView}>
                              <Image source={require('../../assets/img/plus.png')} style={styles.ShowDetail} />
                            </TouchableOpacity>
                          </View>
                        <View style={styles.viewContainer}>
                            <Text style={styles.textContainer}>{card.distance} </Text>
                        </View>
                        <View style={styles.viewContainer}>
                            <Text style={styles.textContainer}>{card.description} </Text>
                        </View>
                    </View>
                </View>
      </View>
    )
  };

  onSwipedAllCards() {
    this.setState({
        cards: [],
        noCards: true,
    });
  }

  swipeLeft = () => {
    this.swiper.swipeLeft()
  };

  swipeRight = () => {
    this.swiper.swipeRight();
  };

  swipeTop = () => {
    this.swiper.swipeTop();
  };

  showButtons() {
    if (!this.state.noCards) {
        return(
            <View style={styles.buttonViewContainer}>
                <View>
                    <TouchableOpacity onPress={this.swipeLeft}>
                    <Image source={require('../../assets/img/actions/rejected.png')} style={{width: 50, height: 50}} />
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity onPress={this.swipeTop}>
                    <Image source={require('../../assets/img/actions/like.png')} style={{width: 50, height: 50}} />
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity onPress={this.swipeRight}>
                    <Image source={require('../../assets/img/actions/mach.png')} style={{width: 50, height: 50}} />
                    </TouchableOpacity>
                </View>
            </View>   
        );
    }
  }

  render () {
    if(this.state.isLoaded) {
        return (
            <View style={styles.container} ref="Carta">
              <Swiper
                ref={swiper => {
                  this.swiper = swiper
                }}
                onSwiped={this.onSwiped}
                onTapCard={this.swipeLeft}
                cards={this.state.cards}
                cardIndex={this.state.cardIndex}
                // marginTop={-140}
                // cardVerticalMargin={160}
                marginTop={-20}
                cardVerticalMargin={100}
                renderCard={this.renderCard}
                onSwipedAll={this.onSwipedAllCards.bind(this)}
                stackSize={3}
                stackSeparation={15}
                overlayLabels={{
                  bottom: {
                    title: 'BLEAH',
                    style: {
                      label: {
                        backgroundColor: 'black',
                        borderColor: 'black',
                        color: 'white',
                        borderWidth: 1
                      },
                      wrapper: {
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }
                    }
                  },
                  left: {
                    title: 'NOPE',
                    style: {
                      label: {
                        backgroundColor: 'black',
                        borderColor: 'black',
                        color: 'white',
                        borderWidth: 1
                      },
                      wrapper: {
                        flexDirection: 'column',
                        alignItems: 'flex-end',
                        justifyContent: 'flex-start',
                        marginTop: 30,
                        marginLeft: -30
                      }
                    }
                  },
                  right: {
                    title: 'LIKE',
                    style: {
                      label: {
                        backgroundColor: 'black',
                        borderColor: 'black',
                        color: 'white',
                        borderWidth: 1
                      },
                      wrapper: {
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                        marginTop: 30,
                        marginLeft: 30
                      }
                    }
                  },
                  top: {
                    title: 'SUPER LIKE',
                    style: {
                      label: {
                        backgroundColor: 'black',
                        borderColor: 'black',
                        color: 'white',
                        borderWidth: 1
                      },
                      wrapper: {
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }
                    }
                  }
                }}
                animateOverlayLabelsOpacity
                animateCardOpacity
              >
              {this.showButtons()}
            </Swiper>
            <TopBar title={'Feed'} navigate={this.props.navigation.navigate}/>
        </View>
        )
    } else {
      return (
        <View style={styles.containerFlex}>
          <View style={[styles.containerSpinner, styles.horizontal]}>
            <ActivityIndicator size="large" color="#9605CC" />
          </View>
        </View>
      );
    }
  }
}