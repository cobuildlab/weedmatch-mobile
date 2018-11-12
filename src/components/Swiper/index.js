import React, {Component} from 'react'
import Swiper from 'react-native-deck-swiper'
import {
    Button,
    AsyncStorage,
    Text,
    View,
    Alert,
    TouchableOpacity,
    Image,
    ActivityIndicator, Linking, Platform,
}
    from 'react-native'
import styles from './style';
import {internet, checkConectivity} from '../../utils';
import {strings} from '../../i18n';
import {APP_STORE} from '../../Store'
import {swiperAction, appendData, swiper, swiperListAction} from './SwiperActions'
import Spinner from 'react-native-spinkit';
import firebase from "react-native-firebase";
import {Button as NativeBaseButton} from "native-base";
import buttonStyles from "../../styles/buttons";
import textStyles from "../../styles/text";
import GeoStore from "../../utils/GeoStore";

import REPORT_ROUTE_KEY from '../../modules/report'
import { PLACE_ENUM } from '../../modules/report';


export default class SwiperView extends Component {
    static getInitialState() {
        return {
            cards: [],
            isLoaded: false,
            latitude: 0,
            longitude: 0,
            numPage: 0,
            urlPage: '',
        }
    }

    constructor(props) {
        super(props);
        this.state = SwiperView.getInitialState()

        this.cardIndex = 0;
    }

    componentDidMount() {
        console.log("SwiperView: componentDidMount");

        this.errorSubscription = APP_STORE.ERROR_EVENT.subscribe(state => {
            if (state)
                Alert.alert(strings("main.internet"));
        });

        this.bad = APP_STORE.BAD_EVENT.subscribe(state => {
            console.log("SwiperView:componentDidMount:BAD_EVENT", state);
            if (state.bad) {
                if (this.swiper != null) {
                    this.swiper.swipeBack(() => {
                    })
                }
                return;
            }
        });

        this.action = APP_STORE.SWIPERACTION_EVENT.subscribe(state => {
            console.log("SwiperView:componentDidMount:SWIPERACTION_EVENT", state);
            if (state.swiperAction) {
                if (this.swiper != null) {
                    if (this.swiper.state.firstCardIndex == 0) {
                        this.onSwipedAllCards()
                    }
                }
            }
        });

        this.swiperData = APP_STORE.SWIPER_EVENT.subscribe(state => {
            console.log("SwiperView:componentDidMount:swipeDataSuscription", state);
            if (state.swiper) {
                this.setState(prevState => ({
                    cards: appendData(prevState.cards, state.swiper),
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
                }, () => {
                    this._swiperData();
                });
            } else {
                this.setState({
                    urlPage: '',
                });
                return;
            }
            if (state.error) {
                Alert.alert(state.error);
            }
        });

        this.geoDatasubscription = GeoStore.subscribe("GeoData", position => {
            console.log("HOME:componentDidMount:geoDatasubscription", position);
            if (!position.coords)
                return;

            this.setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });
        });

        setTimeout(() => {
            this.updatePositionIfExists();
            this._swiperData();
        }, 2000);

        this.navigationSubscription = this.props.navigation.addListener(
            "willFocus",
            () => {
                // reload component
                this.setState(SwiperView.getInitialState())
                this._swiperData()
        });
    }

    updatePositionIfExists() {
        const position = GeoStore.getState("GeoData");

        if (!position || !position.coords) {
            this.setState({
                latitude: undefined,
                longitude: undefined
            });
            return;
        }
        this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }

    static navigationOptions = {header: null};

    componentWillUnmount() {
        console.log("SwiperView :componentWillUmmount");
        this.swiperData.unsubscribe();
        this.swiperPage.unsubscribe();
        this.errorSubscription.unsubscribe();
        this.geoDatasubscription.unsubscribe();
        this.navigationSubscription.remove();
    }


    _swiperData() {
        if (checkConectivity()) {
            swiperListAction(APP_STORE.getToken(), this.state);
        } else {
            internet();
        }
    }

    /**
     * @property
     * @private
     * @param {string} imageID Id of the image to report
     * @param {string} userID Id of the user to report
     * @param {string} userName Name of the user being reported
     * @returns {void}
     */
    onPressBlock = (imageID, userID, userName) => {
        const {navigation} = this.props;

        const params = {
            place: PLACE_ENUM.Swiper,
            profileImageID: imageID,
            userID,
            userName,
        };

        navigation.navigate(REPORT_ROUTE_KEY, params);
    }

    renderCard = card => {
        return (
            <View style={[styles.card]}>
                <View style={[styles.viewFlex]}>
                    <View style={[styles.viewBackground]}>
                        <Image style={styles.media} source={{uri: card.image_profile}}/>
                    </View>
                    <View style={styles.cardBottomHalf}>
                        <View style={[styles.viewContainer]}>
                            <Text style={styles.textName}>{card.first_name}, {card.age}</Text>
                            <Text style={styles.textContainer}>{card.country.name}</Text>
                            <Text style={styles.textContainer}>{card.distance} </Text>
                        </View>
                        <TouchableOpacity
                            onPress={this.onPressBlock.bind(
                                this,
                                card.profile_images[0].id,
                                card.id_user,
                                card.username
                            )}
                        >
                            <Text>{strings('swiper.BLOCK_OR_REPORT')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    };


    onSwipedAllCards() {
        this.setState({
            isLoaded: false,
        });
    }

    onSwipe() {
        this.cardIndex = this.cardIndex + 1;
    };

    swipeLeft(aux) {
        if (this.swiper.state.firstCardIndex == this.state.cards.length - 1) {
            if (checkConectivity()) {
                firebase.analytics().logEvent("swiper_dislike");
                swiperAction(APP_STORE.getToken(), 'DisLike', this.state.cards[this.swiper.state.firstCardIndex].id_user)
            } else {
                internet();
            }
        } else {
            if (aux) {
                this.swiper.swipeLeft()
            } else {
                if (checkConectivity()) {
                    firebase.analytics().logEvent("swiper_dislike");
                    swiperAction(APP_STORE.getToken(), 'DisLike', this.state.cards[this.swiper.state.firstCardIndex].id_user)
                } else {
                    internet();
                }
            }
        }
    };

    swipeRight(aux) {
        if (this.swiper.state.firstCardIndex == this.state.cards.length - 1) {
            if (checkConectivity()) {
                firebase.analytics().logEvent("swiper_like");
                swiperAction(APP_STORE.getToken(), 'Like', this.state.cards[this.swiper.state.firstCardIndex].id_user)
            } else {
                internet();
            }
        } else {
            if (aux) {
                this.swiper.swipeRight();
            } else {
                if (checkConectivity()) {
                    firebase.analytics().logEvent("swiper_like");
                    swiperAction(APP_STORE.getToken(), 'Like', this.state.cards[this.swiper.state.firstCardIndex].id_user)
                } else {
                    internet();
                }
            }
        }
    };

    async swipeTop() {
        console.log("Swiper:swipeTop");
        const swiperId = this.state.cards[this.swiper.state.firstCardIndex].id_user;
        await swiperAction(APP_STORE.getToken(), 'SuperLike', swiperId);
    };

    swipeTap = () => {
        this.props.navigation.navigate('PublicProfile', {
            userId: this.state.cards[this.swiper.state.firstCardIndex].id_user,
            root: 'Swiper',
            updateData: this.getData
        })
    };

    getData = (data) => {
        switch (data) {
            case 1:
                this.swipeLeft(true);
                break;
            case 2:
                this.swipeTop(true);
                break;
            case 3:
                this.swipeRight(true);
                break;
            default:
                break;
        }
    };

    showButtons() {
        return (
            <View style={styles.buttonViewContainer}>
                <View>
                    <TouchableOpacity onPress={() => this.swipeLeft(true)}>
                        <Image source={require('../../assets/img/actions/rejected.png')} style={styles.imageSize}/>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity onPress={() => this.swipeTop(true)}>
                        <Image source={require('../../assets/img/actions/like.png')} style={styles.imageSize}/>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity onPress={() => this.swipeRight(true)}>
                        <Image source={require('../../assets/img/actions/mach.png')} style={styles.imageSize}/>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    goToSettings = () => {
        Linking.openURL('app-settings:');
    };

    render() {
        if (this.state.longitude === undefined || this.state.latitude === undefined) {
            return (
                <View style={[{
                    justifyContent: "center",
                    alignItems: "center"
                }, styles.containerFlex]}>
                    <Text style={[{marginBottom: 20}]}>
                        {strings("feed.InactiveGeolocation")}
                    </Text>
                    {(Platform.OS == 'ios') ?
                        <NativeBaseButton block onPress={this.goToSettings} rounded
                                          style={[{alignSelf: "center", width: 200}, buttonStyles.purpleButton]}>
                            <Text style={[textStyles.whiteText]}>{strings("feed.GoToLocationServices")}</Text>
                        </NativeBaseButton>
                        :
                        null}
                </View>
            );
        }

        if (this.state.isLoaded && this.state.cards.length > 0) {
            return (
                <View style={styles.container}>

                    <Swiper
                        containerStyle={styles.swiper}
                        ref={swiper => {
                            this.swiper = swiper
                        }}
                        // goBackToPreviousCardOnSwipeBottom={true}
                        disableBottomSwipe={true}
                        onTapCard={this.swipeTap}
                        onSwiped={(cardIndex) => this.onSwipe()}
                        onSwipedLeft={(cardIndex) => this.swipeLeft(false)}
                        onSwipedRight={(cardIndex) => this.swipeRight(false)}
                        onSwipedTop={(cardIndex) => this.swipeTop(false)}
                        cards={this.state.cards}
                        cardIndex={this.cardIndex}
                        marginTop={-140}
                        cardVerticalMargin={160}
                        renderCard={this.renderCard}
                        stackSize={3}
                        backgroundColor={'#fff'}
                        stackSeparation={5}
                        overlayLabels={{
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
                    </Swiper>

                    <View style={[styles.buttonViewContainer]}>
                        <TouchableOpacity onPress={() => this.swiper.swipeLeft()}>
                            <Image source={require('../../assets/img/actions/rejected.png')} style={styles.imageSize}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.swiper.swipeTop()}>
                            <Image source={require('../../assets/img/actions/like.png')} style={styles.imageSize}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.swiper.swipeRight()}>
                            <Image source={require('../../assets/img/actions/mach.png')} style={styles.imageSize}/>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        } else {
            return (
                <View style={styles.containerLoader}>
                    <Spinner isVisible={true} size={250} type={'Pulse'} color={'#9605CC'}/>
                    <Image source={require('../../assets/img/mariOn.png')} style={styles.containerLoaderImage}/>
                    <Text>{strings("swiper.searching")}</Text>
                </View>
            );
        }
    }
}
