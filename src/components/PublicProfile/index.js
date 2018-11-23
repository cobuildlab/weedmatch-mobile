import React, {Component} from 'react';
import {
    Text,
    View,
    Image,
    AsyncStorage,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
    SafeAreaView,
    TouchableHighlight,
    Dimensions,
    FlatList,
    ScrollView
} from 'react-native';

import styles from './style';
import {
    publicProfileAction,
    getImages,
    publicImages420Action,
    appendData,
    Action420,
    swiperAction,
    saveHour
} from './PublicProfileActions';
import {connection, internet, checkConectivity} from '../../utils';
import {APP_STORE} from '../../Store';
import {strings} from '../../i18n';
import ImageSlider from 'react-native-image-slider';
import {Content, Container} from 'native-base';
import REPORT_ROUTE_KEY from '../../modules/report/index';
import geoStore from "../../utils/geolocation/GeoStore";

/**
 * @typedef {import('../../modules/report/Report').ReportRouteParams} ReportRouteParams
 */



export default class PublicProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            latitud: null,
            longitud: null,
            rowData: {},
            refreshing: false,
            public420: [],
            isLoading: false,
            isDetail: false,
            urlPage: '',
            numPage: 0,
            like: false,
            disLike: false,
            super: false,
        };
        this.width = Dimensions.get('window');
        this.like = false;
        this.dislike = false;
        this.superLike = false;

        console.log('PublicProfile');
    }

    static navigationOptions = {
        title: strings('main.profile'),
    };

    componentDidMount() {
        this.geoDataSubscription = geoStore.subscribe("GeoData", position => {
            console.log("PublicProfile:componentDidMount:geoDataSubscription:", position);
            if (!position)
                return;
            // Forced to have the value updated
            this.state.latitud = position.coords.latitude.toFixed(6);
            this.state.longitud = position.coords.longitude.toFixed(6);

        }, true);

        this.public = APP_STORE.PUBLICPROFILE_EVENT.subscribe(state => {
            console.log("Public Profile:componentDidMount:PUBLICPROFILE_EVENT", state);
            if (state.publicProfile) {

                switch (state.publicProfile.weed_action) {
                    case true || "SuperLike":
                        this.like = true
                        this.dislike = true
                        this.superLike = true
                        break;
                    case "Like":
                        this.like = true
                        break;
                    case "DisLike":
                        this.dislike = true
                        break;
                    default:
                        break;
                }

                this.setState({
                    rowData: state.publicProfile,
                    country: state.publicProfile.country,
                    like: this.like,
                    disLike: this.dislike,
                    super: this.superLike,
                })

                this._get420Images();
                return;
            }
            if (state.error) {
                Alert.alert(state.error);
            }
        });

        this.swiper = APP_STORE.SWIPERACTION_EVENT.subscribe(state => {
            console.log("Public Profile:componentDidMount:SWIPERACTION_EVENT", state);
            if (state.swiperAction) {
                this.props.navigation.goBack();
                return;
            }
            if (state.error) {
                Alert.alert(state.error);
            }
        });

        this.images420 = APP_STORE.PUBLICIMAGES420_EVENT.subscribe(state => {
            console.log("Public Profile:componentDidMount:images420Suscription", state);
            if (state.publicImages420) {

                this.setState(prevState => ({
                    public420: appendData(prevState.public420, state.publicImages420),
                    isLoading: true,
                }))

                console.log(getImages(this.state.public420));

                return;
            }
            if (state.error) {
                Alert.alert(state.error);
            }
        });

        this.images420Page = APP_STORE.PUBLICIMAGES420PAGE_EVENT.subscribe(state => {
            console.log("Public Profile:componentDidMount:images420PageSuscription", state);
            if (state.publicImages420Page) {

                this.setState({
                    urlPage: state.publicImages420Page,
                    numPage: this.state.numPage + 1
                })
                return;
            } else {
                this.setState({
                    urlPage: '',
                })
            }
            if (state.error) {
                Alert.alert(state.error);
            }
        });

        this._publicProfile();
    }


    componentWillUnmount() {
        console.log("PublicProfile:componentWillUmmount");
        this.images420.unsubscribe();
        this.images420Page.unsubscribe();
        this.public.unsubscribe();
        this.swiper.unsubscribe();
        this.geoDataSubscription.unsubscribe();
    }

    _publicProfile() {
        const {params} = this.props.navigation.state;
        const userId = params ? params.userId : null;

        publicProfileAction(APP_STORE.getToken(), userId, this.state)
    }

    _get420Images() {
        const {params} = this.props.navigation.state;
        const userId = params ? params.userId : null;

        if (checkConectivity()) {
            Action420(APP_STORE.getToken(), this.state, userId);
        } else {
            internet();
        }
    }

    _changeView = () => {
        this.setState({
            isDetail: !this.state.isDetail
        })
    };

    actionSwiper(val) {
        if (this.props.navigation.state.params.root) {
            this.props.navigation.goBack();
            this.props.navigation.state.params.updateData(val);
        } else {
            switch (val) {
                case 1:
                    swiperAction(APP_STORE.getToken(), 'DisLike', this.props.navigation.state.params.userId)
                    break;
                case 2:
                    saveHour(this.props.navigation.state.params.userId)
                    break;
                case 3:
                    swiperAction(APP_STORE.getToken(), 'Like', this.props.navigation.state.params.userId)
                    break;
                default:
                    break;
            }
        }

    }

    showButtons() {
        console.log(this.state);
        return (
            <View style={styles.buttonViewContainer}>
                <TouchableOpacity onPress={() => this.actionSwiper(1)} disabled={this.state.disLike}
                                  style={!this.state.disLike ? styles.activeButton : styles.disactiveButton}>
                    <Image source={require('../../assets/img/actions/rejected.png')} style={{width: 50, height: 50}}/>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.actionSwiper(2)} disabled={this.state.super}
                                  style={!this.state.super ? styles.activeButton : styles.disactiveButton}>
                    <Image source={require('../../assets/img/actions/like.png')} style={{width: 50, height: 50}}/>
                </TouchableOpacity>


                <TouchableOpacity onPress={() => this.actionSwiper(3)} disabled={this.state.like}
                                  style={!this.state.like ? styles.activeButton : styles.disactiveButton}>
                    <Image source={require('../../assets/img/actions/mach.png')} style={{width: 50, height: 50}}/>
                </TouchableOpacity>
            </View>
        );
    }

    renderiza() {
        const {rowData, country} = this.state;

        return (
            <View style={styles.viewFlex}>
                <View style={styles.viewBackground}>
                    <ImageSlider
                        images={getImages(rowData.profile_images)}
                        customSlide={({index, item, style}) => (
                            <View key={index} style={[style, styles.customSlide]}>
                                <Image source={{uri: item}} style={styles.media}/>
                            </View>
                        )}
                        customButtons={(position, move) => (
                            <View style={styles.buttons}>
                                {getImages(rowData.profile_images).map((image, index) => {
                                    return (
                                        <TouchableOpacity
                                            key={index}
                                            underlayColor="#fff"
                                            onPress={() => move(index)}
                                            style={styles.button}
                                        >
                                            <Text style={position === index && styles.buttonSelected}>
                                                -
                                            </Text>
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>
                        )}
                    />
                </View>
                <View style={styles.viewContainer}>
                    <View style={styles.viewContainer}>
                        <Text style={styles.textNameDetails}>{rowData.first_name}, {rowData.age} </Text>
                    </View>
                    <View>
                        {country &&
                        <Text style={styles.textCountry}>{country.name} </Text>
                        }
                        <Text style={styles.textDistance}>{rowData.distance} </Text>
                        <Text style={styles.textDescription}>{rowData.description} </Text>
                    </View>

                    <TouchableOpacity activeOpacity={0.5} style={styles.TouchableOpacityStyle}
                                      onPress={this._changeView}>
                        <Image source={require('../../assets/img/down.png')} style={styles.ShowPublic}/>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    onEndReached = () => {
        if (!this.onEndReachedCalledDuringMomentum && this.state.numPage > 0) {
            this._get420Images();
            this.onEndReachedCalledDuringMomentum = true;
        }
    };

    /**
     * @private
     * @property
     * @returns {void}
     */
    onPressReport = () => {
        const {rowData} = this.state

        /**
         * @type {ReportRouteParams}
         */
        const params = {
            place: 'Profile',
            profileImageID: rowData.profile_images[0].id,
            userID: rowData.id_user,
            userName: rowData.username,
        }

        this.props.navigation.navigate(REPORT_ROUTE_KEY, params)
    };

    render() {
        const {rowData, country, isLoading, isDetail, public420} = this.state;

        if (!isLoading)
            return (
                <View style={[styles.containers, styles.horizontal]}>
                    <ActivityIndicator size="large" color="#9605CC"/>
                </View>
            )


        if (isDetail) {
            return (
                <View style={styles.viewFlex}>
                    <FlatList
                        horizontal={false}
                        numColumns={3}
                        bounces={false}
                        onEndReachedThreshold={0.5}
                        onMomentumScrollBegin={() => {
                            this.onEndReachedCalledDuringMomentum = false;
                        }}
                        data={getImages(public420)}
                        style={{flex: 1}}
                        ListHeaderComponent={this.renderiza()}
                        keyExtractor={(item, index) => index}
                        onEndReached={() => this.onEndReached()}
                        renderItem={({item, index}) =>
                            <View
                                style={[{width: (this.width) / 3}, {height: (this.width) / 3}, {marginBottom: 2}, index % 3 !== 0 ? {paddingLeft: 2} : {paddingLeft: 0}]}>
                                <Image style={styles.imageView}
                                       source={{uri: getImages(public420)[index]}}>
                                </Image>
                            </View>
                        }
                    />
                </View>
            );
        } else {
            return (
                <Container>
                    <Content>
                        <Image
                            source={{uri: rowData.image_profile}}
                            style={styles.media}
                        />
                        <View style={styles.dataAndReportButton}>
                            <View style={styles.viewFlex}>
                                <Text style={styles.textName}>
                                    {rowData.first_name}, {rowData.age}
                                </Text>
                                {(country && country.name) ?
                                    <Text style={styles.textCountry}>{country.name}</Text>
                                    : null}
                                <Text style={styles.textDistance}>{rowData.distance}</Text>
                            </View>

                            <TouchableOpacity
                                onPress={this.onPressReport}
                                style={styles.reportButtonContainer}
                            >
                                <Image style={styles.reportButtonImage}
                                       source={require('../../assets/img/report.png')}/>
                                <Text
                                    style={styles.reportButtonText}>{strings('PublicProfile.reportButtonText')}</Text>
                            </TouchableOpacity>

                        </View>

                        <Text style={styles.textDescription}>
                            {rowData.description}
                        </Text>

                    </Content>
                    {
                        // absolutely positioned
                        this.showButtons()
                    }
                </Container>
            )
        }
    }
}

