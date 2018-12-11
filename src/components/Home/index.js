/**
 * @prettier
 */
import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    ActivityIndicator,
    TouchableOpacity,
    Platform,
    Linking,
    Alert,
} from 'react-native';
import { Button as NativeBaseButton } from 'native-base';
import moment from 'moment';
import ImagePicker from 'react-native-image-crop-picker';
import ActionSheet from 'react-native-actionsheet';
import styles from './styles';
import { strings } from '../../i18n';
import { APP_STORE } from '../../Store';
import { feedAction, uploadAction, likeAction } from './HomeActions';
import firebase from 'react-native-firebase';
import AuthStore, {
    events as authStoreEvents,
} from '../../modules/auth/AuthStore';

import REPORT_ROUTE_KEY from '../../modules/report/index';
/**
 * @typedef {import('../report').ReportRouteParams} ReportRouteParams
 */
import { PLACE_ENUM } from '../../modules/report/index';
import Feed from './Feed';
import GeoStore from '../../utils/geolocation/GeoStore';
import buttonStyles from '../../styles/buttons';
import textStyles from '../../styles/text';
import { FeedRow } from '../../modules/feed/FeedRow';
import UploadPhotoModal from '../../modules/feed/UploadPhotoModal';
import feedStore, { events } from '../../modules/feed/FeedStore';

/**
 * View of the Photo Feed
 */
export default class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            comment: '',
            dataSource: [],
            image: '',
            isLoaded: false,
            isLoadingPhoto: false,
            latitude: 0,
            loading: true,
            longitude: 0,
            modalVisible: false,
            refreshing: false,
            time: '',
        };
        this.nextUrl = null;
        this.numPage = 0;
        this.feed = null;
        this.libraryPermissionsHasBeenAsked = false;
        this.cameraPermissionsHasBeenAsked = false;
    }

    componentDidMount() {
        this.feedSubscription = feedStore.subscribe(events.ON_FEED, state => {
            console.log('Feed:componentDidMount:ON_FEED', state);
            const newState = {
                isLoaded: true,
                loading: false,
                refreshing: false,
            };

            // refreshing means Pull Down
            if (this.state.refreshing) {
                newState.dataSource = state.results;
            } else {
                newState.dataSource = this.state.dataSource.concat(
                    state.results
                );
            }
            this.setState(newState);

            this.nextUrl = null;
            if (state.next) {
                this.nextUrl = state.next;
                this.numPage++;
            }
        });
        this.feedErrorSubscription = feedStore.subscribe(
            events.ON_FEED_ERROR,
            state => {
                console.log('Feed:componentDidMount:ON_FEED_ERROR', state);
                Alert.alert(state);
            }
        );

        this.uploadPhotoSubscription = feedStore.subscribe(
            events.ON_UPLOAD_PHOTO,
            state => {
                console.log('Feed:componentDidMount:ON_UPLOAD_PHOTO', state);
                const fakePhotoFromServer = {
                    ...state,
                    band: false,
                    distance: strings('home.near'),
                    flag: false,
                    id_image: state.id,
                    id_user: APP_STORE.getId(),
                    image_profile: AuthStore.getState(
                        authStoreEvents.PROFILE_IMAGE
                    ),
                    like: 0,
                    time: new Date(),
                    username: APP_STORE.getUser(),
                };
                const dataSource = [fakePhotoFromServer].concat(
                    this.state.dataSource
                );
                this.setState(
                    {
                        comment: '',
                        dataSource: [],
                        isLoaded: true,
                        isLoadingPhoto: false,
                        loading: false,
                        modalVisible: false,
                        refreshing: false,
                    },
                    () => {
                        this.setState({ dataSource }, () =>
                            this.feed.scrollToTop()
                        );
                    }
                );
            }
        );

        this.likeEvent = APP_STORE.LIKE_EVENT.subscribe(state => {
            console.log('APP_STORE.LIKE_EVENT.subscribe', state);
            if (state.error) {
                Alert.alert(state.error);
                return;
            }
            if (state.row !== undefined) {
                const newDs = this.state.dataSource.concat();
                const row = newDs[state.row];
                console.log('APP_STORE.LIKE_EVENT.subscribe', row);
                row.band = !row.band;
                row.like = row.band == true ? row.like + 1 : row.like - 1;
                console.log('APP_STORE.LIKE_EVENT.subscribe', row);
                this.setState({
                    dataSource: newDs,
                });
            }
        });

        this.appEvent = APP_STORE.APP_EVENT.subscribe(state => {
            if (state.error) {
                Alert.alert(state.error);
                return;
            }
        });

        this.geoDatasubscription = GeoStore.subscribe('GeoData', position => {
            console.log('HOME:componentDidMount:geoDatasubscription', position);
            if (!position.coords) {
                this.setState({
                    isLoaded: true
                });
                return;
            }

            this.setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                isLoaded: true
            }, () => feedAction(this.state, this.nextUrl, this.numPage));
        });

        setTimeout(() => {
            this.updatePositionIfExists();
        }, 1000);
    }

    updatePositionIfExists() {
        const position = GeoStore.getState('GeoData');
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
        }, () => feedAction(this.state, this.nextUrl, this.numPage));
    }

    componentWillUnmount() {
        console.log('Home420:componentWillUmmount');
        this.feedData.unsubscribe();
        this.event.unsubscribe();
        this.likeEvent.unsubscribe();
        this.feedPage.unsubscribe();
        this.geoDatasubscription.unsubscribe();
        this.appEvent.unsubscribe();
    }

    onEndReached = () => {
        console.log('Feed:onEndReached', this.numPage);
        if (!this.onEndReachedCalledDuringMomentum && this.numPage > 0) {
            feedAction(this.state, this.nextUrl, this.numPage);
            this.onEndReachedCalledDuringMomentum = true;
        }
    };

    /**
     * Handler when pressing the report button.
     * Should bring up an interface for making the report about that image.
     * @param {number} imageID Id of the image to report
     * @param {number} userID Id of the user to report
     * @param {string} userName Name of the user being reported
     * @returns {void}
     */
    onPressReport = (imageID, userID, userName) => {
        const { navigation } = this.props;

        /**
         * @type {ReportRouteParams}
         */
        const params = {
            feedImageID: String(imageID),
            place: PLACE_ENUM.Feed,
            userID: String(userID),
            userName,
        };

        navigation.navigate(REPORT_ROUTE_KEY, params);
    };

    _onRefresh() {
        this.nextUrl = null;
        this.numPage = 0;
        // Clean the feed and bring new data
        this.setState(
            {
                dataSource: [],
                refreshing: true,
            },
            () => {
                feedAction(this.state, this.nextUrl, this.numPage);
            }
        );
    }

    _uploadPhoto = () => {
        this.setState(
            {
                isLoadingPhoto: true,
                time: moment().format(),
            },
            () => {
                console.log(this.state.time);
                firebase.analytics().logEvent('upload_photo');
                uploadAction(APP_STORE.getToken(), this.state);
            }
        );
    };

    _likeHandlePress(idImage, id_user, like, row) {
        const now = new Date().getTime();

        if (this.lastImagePress && now - this.lastImagePress < 300) {
            delete this.lastImagePress;
            this.showBigHeart(row);
            this._like(idImage, id_user, like, row);
        } else {
            this.lastImagePress = now;
        }
    }

    showBigHeart(row) {
        const newDs = this.state.feedData._dataBlob.s1.slice();
        newDs[row].flag = newDs[row].flag == true ? false : true;

        this.setState(
            {
                dataSource: newDs,
            },
            () => {
                setTimeout(() => {
                    this.hideBigHeart(row);
                }, 500);
            }
        );
    }

    hideBigHeart(row) {
        const newDs = this.state.feedData._dataBlob.s1.slice();
        newDs[row].flag = newDs[row].flag == true ? false : true;
        this.setState({
            dataSource: newDs,
        });
    }

    _like(idImage, id_user, like, row) {
        firebase.analytics().logEvent('420hoy_like');
        likeAction(idImage, id_user, like, row);
    }

    static navigationOptions = { header: null };

    getPhotoFromPicker = () => {
        ImagePicker.openPicker({
            compressImageQuality: 0.5,
            cropping: false,
            height: 500,
            includeExif: true,
            width: 500,
        })
            .then(image => {
                console.log('received image', image.path);
                this.setState({
                    image: image.path,
                });
                this.toggleModal();
            })
            .catch(e => console.log(e));
    };

    _getPhoto() {
        this.getPhotoFromPicker();
    }

    takePhotoFromPicker() {
        ImagePicker.openCamera({
            compressImageQuality: 0.5,
            cropping: false,
            height: 500,
            includeExif: true,
            width: 500,
        })
            .then(image => {
                console.log('received image', image.path);
                console.log(image);
                this.setState({
                    image: image.path,
                });
                this.toggleModal();
            })
            .catch(e => console.log(e));
    }

    _takePhoto() {
        this.takePhotoFromPicker();
    }

    showActivity() {
        return (
            <View>
                <ActionSheet
                    ref={o => (this.ActionSheet = o)}
                    title={strings('home.actionSheet')}
                    options={[
                        strings('home.camera'),
                        strings('home.biblio'),
                        strings('home.cancel'),
                    ]}
                    cancelButtonIndex={2}
                    onPress={index => {
                        switch (index) {
                            case 0:
                                this._takePhoto();
                                break;
                            case 1:
                                this._getPhoto();
                                break;
                            default:
                                break;
                        }
                    }}
                />
            </View>
        );
    }

    showButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.5}
                style={styles.TouchableOpacityStyle}
                onPress={() => this.ActionSheet.show()}
            >
                <Image
                    source={require('../../assets/img/camera.png')}
                    style={styles.FloatingButtonStyle}
                />
            </TouchableOpacity>
        );
    }

    toggleModal = () => {
        this.setState({
            isLoadingPhoto: false,
            modalVisible: !this.state.modalVisible,
        });
    };

    renderFeed() {
        return (
            <View style={styles.containerFlex}>
                <Feed
                    style={styles.listView}
                    dataSource={this.state.dataSource}
                    renderItem={this._renderRow}
                    onEndReached={this.onEndReached.bind(this)}
                    onMomentumScrollBegin={() => {
                        this.onEndReachedCalledDuringMomentum = false;
                    }}
                    extraData={this.state}
                    isRefreshing={this.state.refreshing}
                    onRefresh={this._onRefresh.bind(this)}
                    ref={ref => (this.feed = ref)}
                />
            </View>
        );
    }

    _onPressButton(rowData) {
        if (rowData.id_user == APP_STORE.getId()) {
            this.props.navigation.navigate('Profile');
        } else {
            this.props.navigation.navigate('PublicProfile', {
                userId: rowData.id_user,
            });
        }
    }

    _likes(like) {
        var icon = like
            ? 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAArCAYAAAA+EwvfAAAACXBIWXMAAAsSAAALEgHS3X78AAAD5UlEQVRo3tWYT4hbVRTGv3Pe04WbdOFOJSm6KNNFIlEoRclUVFRKfdJFZUDmpo7YARkDuugyBXdubBEEEec9xHGkDMaCQillMmo3RTEFEReKGQVB7CIBETrwznGRTObmJZ3kJS9Dcjfhnbx7zve7303uH1JVDNNuvvBVhhgZZgU7CmatZTdONZBQ+++dYJ4dBbXyN+55+2xtmH60H8A381czzFpmRz1mTbUKABbELXa0wqz+0XWvHkfw7fOfHmJWww4Ms2bb+WBBNJm1wgyfSq9WYwFcP3btEDtaZsabZCXeK4CeGLNeIMZ7c2veQFf+fuuzErUGJtXqjz41rGfGFrEarCzVBwJcfex6rkWu6VYCIAbENjHM3JrXd8T+fOPzHDN8djTLHBE5GKLZhqjYOdl++Dq7mdOQqiKUFiFISBABNCTsPbc+VdATE6G0CjZ/XqiUouJ/f/2y18qN7G4f7eqPPjWsZ0FKhb7ApY9MXweuzFUzzKjt2toZ9c4oxHICxAjm1jwDAL+e3TDMukqOwunkhvVuLCdArI9iZanWBfDlka0qsRa6EicAwY5WmXXVzpkAxDax5rCy1HABYOPhbw0zFRiAQAFQZ35J10RQMCgSAxgKafeJxBcFtBidsyEAZ99ae3G7n/V9mkElAsqkqrh8+Ls6s6a7aJN1ojc2vhNNZmTc9Qdv5IiRtokn4ERPPAEnUoAaV4RMVPAMQXiuhJTrJ3hGIAquCmXkLoJnAcIVobT94qxBuCIAQJhVCFeEtgAtzCqEKyHVARR2gzMGcctVoYoAizbZDEFUSFXx4X3f16mzfW6vjJFVkeyVcXpW7MMuAEhIZQZWo3Nsyp24eP+7C3UGgHN38r6EtBXZf/fs2dXet9t7dsHeO53+I50nWvFoLCSEndyAhLQtQmUAcDtjpfAkpBoD6Sl3oilQ74FLLze6TmTLO/lGG6I55U6UHnr/TO2uZ+IP7v0hR4QqO5qKnoSm4IddfOTj0/7AW4kphSge+eQlf+h7oSmDKB5d9/zYF1tTAlHMbpzyR7qZa0PME2Gz3+3AAUAU81dO+vvp40G3aMs7+aoqin3uaSb97zRQ/FAOWE4YIqwekBPF49ee94fRxRiyLe/k/QNy4uKw4mM5cEBOBCduPGvi6IkNMEGI4JmbT5u4WkYCmABE8NyPT5lRdIwMkCBEcPKneTOqhrEAEoAIXvylYMapPzbAGBDB6d+eNOPWTgRgBIjgzB9PmCTqJgYQAyJY+Ou4SapmogBDQASv/HPMJFmPkXBrr9gX+qzYiYufiAOWEz4RFttOBK/9+7iZRJ2JAVgQOHcnbyZV43+pH15/PCQL9QAAAABJRU5ErkJggg=='
            : 'data:image/png;base64,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';

        return <Image style={styles.icons} source={{ uri: icon }} />;
    }

    _profilePhoto(url) {
        var photo =
            url == ''
                ? 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAA2CAYAAACMRWrdAAAACXBIWXMAAAsSAAALEgHS3X78AAADfklEQVRo3t2a3XGbQBDH/2byDh1AB6KD0MBO1EFIBaEEpYLgCoI60Mw2gDrAHaAORAXOgxcZ4QNxd4us8c4weXAQ+7v9ZNmn19dXaAozpwAyACmABEAEYDP6by8AzgBaAA2AmogaTT2eNMCYeQugv0LHn+kAHAAciOjwaWDMHAnIDkAMXTkBKAFURHS+Gxgz5ysBmaxYEFG1KhgzJwAqAN9xXzkK4OI4DCyt1HwCFOSZteigZzFmrgD8xGPInohybzAlqJO4cDMoA6mhDKjBzYJ5Qp0kwbQAGlN2k5jNARQOZWIWbhKMmUsAvx2h/hDRzrJ0HBzidxLOCCZB+s8xPWeuXYSjh/wylYNgwj1KR9dLPFujQg7HRkpp426m+8qxLSpcu4Re5H7bQw1N9wQGF3SpU51GfydSu9S5cY0bW2znqIxqZ+4opSShazAhjh9AQddDCqV0fLDY7gGg4BmnxRUYM2ee1lLrH00ZzkJieTe8WCxXUChRYos8778C2yoopAWWqoCJ6cMHUKiXzPP+kJnTQEmho/R6GtJqHI4W2JmINBQCERUaYaEFlilZq8/Q3mERKOkTeqZp7UOKAsUatH0gsI2WxVTApK1TKRuaYBtmblxjhJkLebmNtcA6TTgPV0oU9UCwwitHeuf7jHU1gL5EeABZw2KJQ3xF0J0wN2uAxTJtsoGqlHVo1wAD7EZoKYAfys+vAxmXnfB1pCOipk8e9RcCOwwLdPWFwKoLGBHVyu54tMlgis89CctqU6rF01yZSj0rPffCcPVRgplbx16tkzit4bjaIL3iVrJk6GitSw39ZiBe+pXlBe/rC97uRERlb2mZeGWDK7ax1geLyY/WM11AJ8FZao0CFlozxduIcDsBeSSi7BZYIgE9dIcTgJ3LWsIKkAWAv6PDTscHHRhcosXHAeoZelMoH6jIoFth8p5gwt8Po0y1wds6QvTJUDWuP8g/T3lRMBPMBYD9CK5RHNrYxlgzgtrPjeqCG5kqH8HFYrnizjFVj5KG3zrE4MdNGwTWa0CWQAnM603PS4aqi3ep5PNMZSiee8mYrSLQzvDqY7UwprkkdpS/HWw/3g1WBPOZ385tDs91rW8rXUI805U0g2vqBbO/plaPnOun14bpinuL3g2B1ursrZZnKUwt7Zp3QnpaYdm5b2D7fzHq2LuBe9Z4XyJTza7/AX0toeK9+k+4AAAAAElFTkSuQmCC'
                : url;

        return <Image style={styles.picture} source={{ uri: photo }} />;
    }

    _renderRow = ({ item, index }) => {
        return (
            <FeedRow
                key={index}
                navigation={this.props.navigation}
                rowData={item}
                rowID={index}
            />
        );
    };

    goToSettings = () => {
        Linking.openURL('app-settings:');
    };

    _onChangeComment = comment => this.setState({ comment });

    render() {
        const { isLoaded, image, isLoadingPhoto } = this.state;
        const hasPosition = this.state.longitude !== 0 && this.state.latitude !== 0;

        if (!hasPosition && isLoaded === true) {
            return (
                <View style={[{ justifyContent: 'center', alignItems: 'center', }, styles.containerFlex,]} >
                    <Text style={[{ marginBottom: 20 }]}>
                        {strings('feed.InactiveGeolocation')}
                    </Text>
                    {Platform.OS == 'ios' ? (
                        <NativeBaseButton
                            block
                            onPress={this.goToSettings}
                            rounded
                            style={[
                                { alignSelf: 'center', width: 200 },
                                buttonStyles.purpleButton,
                            ]}
                        >
                            <Text style={[textStyles.whiteText]}>
                                {strings('feed.GoToLocationServices')}
                            </Text>
                        </NativeBaseButton>
                    ) : null}
                </View>
            );
        }

        if (isLoaded === true) {
            return (
                <View style={styles.containerFlex}>
                    {this.renderFeed()}
                    {this.showButton()}
                    {this.showActivity()}
                    {/*This is the Modal for the steps of loading a new picture*/}
                    <UploadPhotoModal
                        visible={this.state.modalVisible}
                        onRequestClose={() => console.log('closed')}
                        onClosePress={this.toggleModal}
                        isLoading={isLoadingPhoto}
                        image={image}
                        onChangeText={this._onChangeComment}
                        comment={this.state.comment}
                        onUploadPress={this._uploadPhoto}
                    />
                </View>
            );
        }

        return (
            <View style={styles.containerFlex}>
                <View style={[styles.container, styles.horizontal]}>
                    <ActivityIndicator size="large" color="#9605CC" />
                </View>
            </View>
        );


    }
}
