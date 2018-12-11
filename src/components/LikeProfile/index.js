import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
    Dimensions,
    FlatList,
} from 'react-native';

import styles from './style';
import {
    getImages,
    appendData,
    Action420,
    swiperAction
} from './PublicProfileActions';
import { APP_STORE } from '../../Store';
import { strings } from '../../i18n';
import ImageSlider from 'react-native-image-slider';
import geoStore from "../../utils/geolocation/GeoStore";
import { publicProfileActionV2 } from '../PublicProfile/PublicProfileActions';
var {  width } = Dimensions.get('window');

export default class PublicProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            latitud: '',
            longitud: '',
            rowData: {},
            refreshing: false,
            public420: [],
            isLoading: false,
            isDetail: false,
            urlPage: '',
            numPage: 0,
        };
        this.latitude = null;
        this.longitude = null;
    }

    static navigationOptions = {
        title: strings('main.profile'),
    };

    componentDidMount() {
        this.geoDataSubscription = geoStore.subscribe("GeoData", position => {
            console.log("LikeProfile:componentDidMount:geoDataSubscription:", position);
            if (!position)
                return;
            // Forced to have the value updated
            this.latitude = position.coords.latitude.toFixed(6);
            this.longitude = position.coords.longitude.toFixed(6);

        }, true);
        this.public = APP_STORE.PUBLICPROFILE_EVENT.subscribe(state => {
            console.log("LikeProfile:componentDidMount:PUBLICPROFILE_EVENT", state);
            if (state.publicProfile) {
                this.setState({
                    rowData: state.publicProfile,
                    country: state.publicProfile.country
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

        this._feedPosition();
    }

    _feedPosition() {
        this._publicProfile();
    }

    componentWillUnmount() {
        console.log("PublicProfile:componentWillUmmount");
        this.images420.unsubscribe();
        this.images420Page.unsubscribe();
        this.public.unsubscribe();
        this.swiper.unsubscribe();
    }

    _publicProfile() {
        const { params } = this.props.navigation.state;
        const userId = params ? params.id : null;
        publicProfileActionV2(APP_STORE.getToken(), userId, this.latitude, this.longitude)
    }

    _get420Images() {
        const { params } = this.props.navigation.state;
        const userId = params ? params.id : null;
        Action420(APP_STORE.getToken(), this.state, userId);
    }

    _changeView = () => {
        this.setState({
            isDetail: !this.state.isDetail
        })
    }

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
                    // this.swipeTop(true);
                    break;
                case 3:
                    swiperAction(APP_STORE.getToken(), 'Like', this.props.navigation.state.params.userId)
                    break;
                default:
                    break;
            }
        }

    }

    renderiza() {
        console.log("DEBUG,", this.state);
        const { rowData, country } = this.state;

        return (
            <View>
                <View style={styles.viewBackground}>
                    <ImageSlider
                        images={getImages(rowData.profile_images)}
                        customSlide={({ index, item, style }) => (
                            <View key={index} style={[style, styles.customSlide]}>
                                <Image source={{ uri: item }} style={styles.media} />
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
                    <View style={styles.viewContainerPlus}>
                        <Text style={styles.textName}>{rowData.first_name}, {rowData.age} </Text>
                        {country &&
                            <Text style={styles.textContainer}>{country.name} </Text>
                        }
                        <Text style={styles.textContainer}>{rowData.distance} </Text>
                        <Text style={styles.textContainer}>{rowData.description} </Text>
                    </View>
                    <TouchableOpacity activeOpacity={0.5} style={styles.TouchableOpacityStyle}
                        onPress={this._changeView}>
                        <Image source={require('../../assets/img/down.png')} style={styles.ShowPublic} />
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

    render() {
        console.log("DEBUG,", this.state);
        const { rowData, country, isLoading, isDetail, public420 } = this.state;

        if (!isLoading) {
            return (
                <View style={[styles.containers, styles.horizontal]}>
                    <ActivityIndicator size="large" color="#9605CC" />
                </View>
            )
        }
        if (isLoading) {

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
                            style={{ flex: 1 }}
                            ListHeaderComponent={this.renderiza()}
                            keyExtractor={(item, index) => index}
                            onEndReached={() => this.onEndReached()}
                            renderItem={({ index }) =>
                                <View
                                    style={[{ width: (width) / 3 }, { height: (width) / 3 }, { marginBottom: 2 }, index % 3 !== 0 ? { paddingLeft: 2 } : { paddingLeft: 0 }]}>
                                    <Image style={styles.imageView}
                                        source={{ uri: getImages(public420)[index] }}>
                                    </Image>
                                </View>
                            }
                        />
                    </View>
                );
            } else {
                return (
                    <View style={styles.viewFlex}>
                        <View style={styles.viewBackground}>
                            <Image style={styles.media} source={{ uri: rowData.image_profile }} />
                        </View>
                        <View style={styles.viewContainer}>
                            <View style={styles.viewContainer}>
                                <Text style={styles.textName}>{rowData.first_name}, {rowData.age} </Text>
                            </View>
                            <View style={styles.viewContainer}>
                                {(country && country.name) ?
                                    <Text style={styles.textContainer}>{country.name} </Text>
                                    : null}
                                {
                                    public420.length > 0 &&
                                    <TouchableOpacity activeOpacity={0.5} style={styles.TouchableOpacityStyle}
                                        onPress={this._changeView}>
                                        <Image source={require('../../assets/img/plus.png')} style={styles.ShowDetail} />
                                    </TouchableOpacity>
                                }
                            </View>
                            <View style={styles.viewContainer}>
                                <Text style={styles.textContainer}>{rowData.distance} </Text>
                            </View>
                            <View style={styles.viewContainer}>
                                <Text style={styles.textContainer}>{rowData.description} </Text>
                            </View>
                        </View>
                    </View>
                );
            }
        }
    }
}
