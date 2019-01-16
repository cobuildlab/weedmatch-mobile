import React, { Component } from 'react'
import Swiper from 'react-native-deck-swiper'
import {
    Text,
    View,
    Alert,
    TouchableOpacity,
    Image,
    Linking, Platform,
}
    from 'react-native'
import styles from './style';
import { strings } from '../../i18n';
import { APP_STORE } from '../../Store'
import { swiperAction, appendData, swiperListAction } from './SwiperActions'
import Spinner from 'react-native-spinkit';
import firebase from "react-native-firebase";
import { Button as NativeBaseButton } from "native-base";
import buttonStyles from "../../styles/buttons";
import textStyles from "../../styles/text";
import GeoStore from "../../utils/geolocation/GeoStore";
import REPORT_ROUTE_KEY, { PLACE_ENUM } from '../../modules/report'
import ReportStore from '../../modules/report/ReportStore'
import Card from '../../modules/swiper/Card';


export default class SwiperView extends Component {
    static navigationOptions = { header: null };
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
        this.state = SwiperView.getInitialState();
        this.cardIndex = 0;
    }

    componentDidMount() {
        console.log("SwiperView: componentDidMount");
        this.errorSubscription = APP_STORE.ERROR_EVENT.subscribe(state => {
            if (state)
                Alert.alert(strings("main.internet"));
        });

        this.badSubscription = APP_STORE.BAD_EVENT.subscribe(state => {
            console.log("SwiperView:componentDidMount:BAD_EVENT", state);
            if (state.bad) {
                if (this.swiper != null) {
                    this.swiper.swipeBack(() => {
                    });
                }
                return;
            }
        });

        // this.actionSubscription = APP_STORE.SWIPERACTION_EVENT.subscribe(state => {
        //     console.log("SwiperView:componentDidMount:SWIPERACTION_EVENT", state);
        //     if (state.swiperAction) {
        //         if (this.swiper != null) {
        //             if (this.swiper.state.firstCardIndex == 0) {
        //                 this.onSwipedAllCards()
        //             }
        //         }
        //     }
        // });

        this.swiperDataSubscription = APP_STORE.SWIPER_EVENT.subscribe(state => {
            console.log("SwiperView:componentDidMount:swipeDataSuscription", state);
            if (state.error) {
                return Alert.alert(state.error);
            }
            if (state.swiper) {
                this.setState({
                    cards: appendData(this.state.cards, state.swiper),
                    isLoaded: true,
                    urlPage: state.swiperPage,
                    numPage: this.state.numPage + 1
                });
            }
        });

        this.geoDatasubscription = GeoStore.subscribe("GeoData", position => {
            console.log("HOME:componentDidMount:geoDatasubscription", position);
            if (!position.coords)
                return;
            this.setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                isLoaded: true
            }, () => this._swiperData());
        });

        this.reportSubscription = ReportStore.subscribe("Reported", () => {
            // reload component
            this.setState(SwiperView.getInitialState())
            this._swiperData();
        });

        setTimeout(() => {
            this.updatePositionIfExists();
        }, 1000);
    }

    updatePositionIfExists() {
        const position = GeoStore.getState("GeoData");
        if (!position || !position.coords) {
            this.setState({
                isLoaded: true
            });
            return;
        }
        this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            isLoaded: true
        }, () => this._swiperData());
    }

    componentWillUnmount() {
        this.badSubscription.unsubscribe();
        // this.actionSubscription.unsubscribe();
        this.swiperDataSubscription.unsubscribe();
        this.errorSubscription.unsubscribe();
        this.geoDatasubscription.unsubscribe();
        this.reportSubscription.unsubscribe();
    }


    _swiperData = () => {
        console.log("_swiperData");
        const state = { ...this.state };
        swiperListAction(APP_STORE.getToken(), state);
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
        const { navigation } = this.props;

        const params = {
            place: PLACE_ENUM.Swiper,
            profileImageID: String(imageID),
            userID: String(userID),
            userName,
        };

        navigation.navigate(REPORT_ROUTE_KEY, params);
    }

    renderCard = card => {
        return (
            <Card
                age={card.age}
                countryName={card.country.name}
                distanceString={card.distance}
                firstName={card.first_name}
                imageID={card.profile_images[0].id}
                imageSource={{ uri: card.profile_images[0].image_1x }}
                onPressBlock={this.onPressBlock}
                userID={card.id_user}
                userName={card.username}
            />
        )
    };

    onSwipedAllCards = () => {
        console.log("onSwipedAllCards");
        this.setState({
            cards: [],
            isLoaded: false,
        }, () => this._swiperData());
    }

    onSwipe() {
        this.cardIndex = this.cardIndex + 1;
    };

    swipeLeft(aux) {
        if (this.swiper.state.firstCardIndex == this.state.cards.length - 1) {
            firebase.analytics().logEvent("swiper_dislike");
            swiperAction(APP_STORE.getToken(), 'DisLike', this.state.cards[this.swiper.state.firstCardIndex].id_user)
        } else {
            if (aux) {
                this.swiper.swipeLeft()
            } else {
                firebase.analytics().logEvent("swiper_dislike");
                swiperAction(APP_STORE.getToken(), 'DisLike', this.state.cards[this.swiper.state.firstCardIndex].id_user)
            }
        }
    };

    swipeRight(aux) {
        if (this.swiper.state.firstCardIndex == this.state.cards.length - 1) {
            firebase.analytics().logEvent("swiper_like");
            swiperAction(APP_STORE.getToken(), 'Like', this.state.cards[this.swiper.state.firstCardIndex].id_user)
        } else {
            if (aux) {
                this.swiper.swipeRight();
            } else {
                firebase.analytics().logEvent("swiper_like");
                swiperAction(APP_STORE.getToken(), 'Like', this.state.cards[this.swiper.state.firstCardIndex].id_user)
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
            // userId: 4237, // @4geeks
            // userId: 2079, // @gmail
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
                        <Image source={require('../../assets/img/actions/rejected.png')} style={styles.imageSize} />
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity onPress={() => this.swipeTop(true)}>
                        <Image source={require('../../assets/img/actions/like.png')} style={styles.imageSize} />
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity onPress={() => this.swipeRight(true)}>
                        <Image source={require('../../assets/img/actions/mach.png')} style={styles.imageSize} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    goToSettings = () => {
        Linking.openURL('app-settings:');
    };

    render() {
        const hasPosition = this.state.longitude !== 0 && this.state.latitude !== 0;

        if (!hasPosition && this.state.isLoaded === true) {
            return (
                <View style={[{ justifyContent: "center", alignItems: "center" }, styles.containerFlex]}>
                    <Text style={[{ marginBottom: 20 }]}>
                        {strings("feed.InactiveGeolocation")}
                    </Text>
                    {(Platform.OS == 'ios') ?
                        <NativeBaseButton block onPress={this.goToSettings} rounded
                            style={[{ alignSelf: "center", width: 200 }, buttonStyles.purpleButton]}>
                            <Text style={[textStyles.whiteText]}>{strings("feed.GoToLocationServices")}</Text>
                        </NativeBaseButton>
                        :
                        null}
                </View>
            );
        };

        if (this.state.cards.length > 0) {
            return (
                <View style={styles.container}>
                    <Swiper
                        // containerStyle={[styles.swiper]}
                        ref={swiper => {
                            this.swiper = swiper
                        }}
                        // goBackToPreviousCardOnSwipeBottom={true}
                        // onTapCard={this.swipeTap}
                        onSwipedAll={this.onSwipedAllCards}
                        onSwiped={() => this.onSwipe()}
                        onSwipedLeft={() => this.swipeLeft(false)}
                        onSwipedRight={() => this.swipeRight(false)}
                        onSwipedTop={() => this.swipeTop(false)}
                        cards={this.state.cards}
                        // cardIndex={this.cardIndex}
                        marginTop={-140}
                        cardVerticalMargin={160}
                        renderCard={this.renderCard}
                        stackSize={3}
                        backgroundColor={'#fff'}
                        disableBottomSwipe={true}
                        disableLeftSwipe={true}
                        disableRightSwipe={true}
                        disableTopSwipe={true}
                        stackSeparation={5}
                        horizontalSwipe={false}
                        swipeAnimationDuration={250}
                        verticalSwipe={false}
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
                    // animateOverlayLabelsOpacity
                    // animateCardOpacity
                    >
                    </Swiper>

                    <View style={[styles.buttonViewContainer]}>
                        <TouchableOpacity onPress={() => this.swiper.swipeLeft()}>
                            <Image source={require('../../assets/img/actions/rejected.png')} style={styles.imageSize} />
                        </TouchableOpacity>
                        <View style={[styles.centeredButtons]}>
                            <TouchableOpacity onPress={() => this.swiper.swipeTop()}>
                                <Image source={require('../../assets/img/actions/like.png')} style={styles.imageSize} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.swipeTap}>
                                <Image source={require('../../assets/img/actions/profile.png')} style={styles.imageSize} />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={() => this.swiper.swipeRight()}>
                            <Image source={require('../../assets/img/actions/mach.png')} style={styles.imageSize} />
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }

        return (
            <View style={styles.containerLoader}>
                <Spinner isVisible={true} size={250} type={'Pulse'} color={'#9605CC'} />
                <Image source={require('../../assets/img/mariOn.png')} style={styles.containerLoaderImage} />
                <Text>{strings("swiper.searching")}</Text>
            </View>
        );

    }
}
