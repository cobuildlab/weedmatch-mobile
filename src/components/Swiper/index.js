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
import { swiperAction,appendData } from './SwiperActions'
import TopBar from '../../utils/TopBar';
import Spinner from 'react-native-spinkit';

export default class SwiperView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      cards: [],
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

    this.cardIndex = 0;
  }

  componentDidMount() {
      console.log("SwiperView: componentDidMount");
      console.log(this.props.navigation);

      this.swiperData = APP_STORE.SWIPER_EVENT.subscribe(state => {
        console.log("SwiperView:componentDidMount:swipeDataSuscription", state);
        if (state.swiper) {

            this.setState(prevState => ({
              cards: appendData(prevState.cards, state.swiper),
              loading: false,
              isLoaded: true
            }));

          return;
        }
        if (state.error) {
          Alert.alert(state.error);
        }
      });

      this.swiperPage = APP_STORE.SWIPERPAGE_EVENT.subscribe(state => {
        console.log("SwiperView:componentDidMount:swipePageSuscription", state);
        if (state.swiperPage) {

          this.setState({
            urlPage: state.swiperPage,
            numPage: this.state.numPage + 1
          },() => {
            this._swiperData();
          })

        } else {
          this.setState({
            urlPage: '',
        })
        return;
        }
        if (state.error) {
          Alert.alert(state.error);
        }
      });

      this._position()
  }

  static navigationOptions = { header: null };

  componentWillUnmount() {
    console.log("SwiperView :componentWillUmmount");
    this.swiperData.unsubscribe();
    this.swiperPage.unsubscribe();
  }

  _position() {
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
                <Text style={styles.textContainer}>{card.country.name}</Text>
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

  onSwipe() {
    this.cardIndex = this.cardIndex + 1;
  };

  swipeLeft = () => {
    this.swiper.swipeLeft()
  };

  swipeRight = () => {
    this.swiper.swipeRight();
  };

  swipeTop = () => {
    this.swiper.swipeTop();
  };

  swipeTap = () => {
    this.props.navigation.navigate('PublicProfile', { userId: this.state.cards[this.swiper.state.firstCardIndex].id_user });
  };

  showButtons() {
    if (!this.state.noCards) {
      return(
        <View style={styles.buttonViewContainer}>
            <View>
                <TouchableOpacity onPress={this.swipeLeft}>
                <Image source={require('../../assets/img/actions/rejected.png')} style={styles.imageSize} />
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity onPress={this.swipeTop}>
                <Image source={require('../../assets/img/actions/like.png')} style={styles.imageSize} />
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity onPress={this.swipeRight}>
                <Image source={require('../../assets/img/actions/mach.png')} style={styles.imageSize} />
                </TouchableOpacity>
            </View>
        </View>
      );
    }
  }

  render () {
    if(this.state.isLoaded) {
      if(!this.state.noCards) {
        return (
          <View style={styles.container}>
            <Swiper
              ref={swiper => {
                this.swiper = swiper
              }}
              disableBottomSwipe={true}
              onTapCard={this.swipeTap}

              onSwiped={(cardIndex) => this.onSwipe()}
              onSwipedLeft={(cardIndex) => this.swipeLeft}
              onSwipedRight={(cardIndex) => this.swipeRight}
              onSwipedTop={(cardIndex) => this.swipeTop}

              cards={this.state.cards}
              cardIndex={this.cardIndex}
              marginTop={-140}
              cardVerticalMargin={160}
              renderCard={this.renderCard}
              onSwipedAll={this.onSwipedAllCards.bind(this)}
              stackSize={3}
              backgroundColor={'#fff'}
              stackSeparation={15}
              overlayLabels={{
                // bottom: {
                //   title: 'BLEAH',
                //   style: {
                //     label: {
                //       backgroundColor: 'black',
                //       borderColor: 'black',
                //       color: 'white',
                //       borderWidth: 1
                //     },
                //     wrapper: {
                //       flexDirection: 'column',
                //       alignItems: 'center',
                //       justifyContent: 'center'
                //     }
                //   }
                // },
                left: {
                  title: 'NOPE',
                  style: {
                    label: {
                      borderColor: '#dc3644',
                      color: '#dc3644',
                      borderWidth: 5,
                    },
                    wrapper: {
                      flexDirection: 'column',
                      alignItems: 'flex-end',
                      justifyContent: 'flex-start',
                      marginTop: 25,
                      marginLeft: -25,
                    }
                  }
                },
                right: {
                  title: 'LIKE',
                  style: {
                    label: {
                      borderColor: '#74c044',
                      color: '#74c044',
                      borderWidth: 5,
                    },
                    wrapper: {
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      justifyContent: 'flex-start',
                      marginTop: 25,
                      marginLeft: 25
                    }
                  }
                },
                top: {
                  title: 'SUPER LIKE',
                  style: {
                    label: {
                      borderColor: '#9605CC',
                      color: '#9605CC',
                      borderWidth: 5
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
      </View>
      );
      } else {
        return(
          <View style={styles.containerLoader}>
            <Spinner isVisible={true} size={250} type={'Pulse'} color={'#9605CC'}/>
            <Image source={require('../../assets/img/mariOn.png')} style={styles.containerLoaderImage} />
          </View>
        );
      }
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
