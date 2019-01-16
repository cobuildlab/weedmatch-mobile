import { Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import styles from "../../components/Home/styles";
import { calculateTime, likeAction } from "../../components/Home/HomeActions";
import React from "react";
import * as PropTypes from 'prop-types';
import { APP_STORE } from "../../Store";
import firebase from "react-native-firebase";
import { BigHeart } from "./BigHeart";
import { Heart } from "./Heart";
import { PLACE_ENUM } from "../report";
import REPORT_ROUTE_KEY from "../report";
import { EMPTY_PROFILE_PICTURE } from "./index";

import FastImage from 'react-native-fast-image';
import { Platform } from 'react-native';
// import { Image } from 'react-native';
import { Image as RNImage } from 'react-native';
const Image = Platform.OS === 'ios' ? RNImage : FastImage;

/**
 * @typedef {import('../report/Report').ReportRouteParams} ReportRouteParams
 */

export class FeedRow extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            showBigHeart: false
        };
        // for handling double touch
        this.lastTimeOfImagePress = null;

    }

    onPressProfile = () => {
        if (this.props.rowData.id_user == APP_STORE.getId()) {
            this.props.navigation.navigate('Profile');
        } else {
            this.props.navigation.navigate('PublicProfile', {
                userId: this.props.rowData.id_user,
            });
        }
    };


    onPressPicture = () => {
        const now = new Date().getTime();

        if (this.lastTimeOfImagePress && now - this.lastTimeOfImagePress < 300) {
            delete this.lastTimeOfImagePress;
            this.showBigHeart();
            this.like();
        } else {
            this.lastTimeOfImagePress = now;
        }
    };

    showBigHeart = () => {
        const that = this;
        this.setState({ showBigHeart: true },
            () => {
                setTimeout(() => {
                    that.setState({ showBigHeart: false });
                }, 500);
            }
        );
    };

    like = () => {
        const { rowData, rowID } = this.props;
        const like = !rowData.band;
        const id_user = rowData.id_user;
        const idImage = rowData.id;
        firebase.analytics().logEvent('420hoy_like');
        likeAction(idImage, id_user, like, rowID);
    };


    /**
     * Handler when pressing the report button.
     * Should bring up an interface for making the report about that image.
     * @returns {void}
     */
    onPressReport = () => {
        const { navigation } = this.props;
        const { rowData } = this.props;
        const userName = rowData.username;
        const userID = rowData.id_user;
        const idImage = rowData.id;

        /**
         * @type {ReportRouteParams}
         */
        const params = {
            feedImageID: String(idImage),
            place: PLACE_ENUM.Feed,
            userID: String(userID),
            userName,
        };

        navigation.navigate(REPORT_ROUTE_KEY, params);
    };


    render() {
        const { rowData } = this.props;
        console.log("FEEDROW", rowData);

        if (!rowData)
            return null

        // this day we switch the Image transformation functions
        // So from now on, image_1x it's an optimized version 
        // of the images   
        // const swithDay = moment('2018-12-11');
        // const time = moment(rowData.time);
        let imageUrl = rowData.image_2x;
        // if (time.isBefore(swithDay))
        //     imageUrl = rowData.image;


        return (
            <View style={styles.containerView}>
                {/*HEADER*/}
                <View style={styles.mediaUser}>
                    <TouchableOpacity onPress={this.onPressProfile}>
                        <Image style={styles.picture}
                            source={{ uri: rowData.image_profile == '' ? EMPTY_PROFILE_PICTURE : rowData.image_profile }} />
                    </TouchableOpacity>
                    <View style={styles.userContainer}>
                        <TouchableOpacity onPress={this.onPressProfile}>
                            <Text style={styles.username}>
                                {rowData.username}
                            </Text>
                        </TouchableOpacity>
                        <Text style={styles.distancia}>{rowData.distance}</Text>
                    </View>
                    <Text style={styles.tiempo}>{calculateTime(rowData)}</Text>
                </View>
                {/*IMAGE*/}
                <TouchableWithoutFeedback onPress={this.onPressPicture}>
                    <View>
                        <Image style={styles.media} source={{ uri: imageUrl }} />
                        {this.state.showBigHeart && <BigHeart />}
                    </View>
                </TouchableWithoutFeedback>
                {/*FOOTER*/}
                <View style={styles.containerLikes}>
                    <TouchableOpacity onPress={this.like} style={styles.heartAndTextContainer}>
                        <Heart fill={rowData.band} />
                        <Text style={[styles.time, styles.likesNumber]}>
                            {rowData.like}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={this.onPressReport}
                        style={styles.reportButtonContainer}
                    >
                        <Image
                            // @ts-ignore file exists
                            source={require('../../assets/img/report.png')}
                            style={styles.reportButton}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.containerViewHorizontal}>
                    <Text style={styles.description}>{rowData.comment}</Text>
                    <View style={styles.containerViewSpace} />
                </View>
            </View>
        );
    };
}

FeedRow.propTypes = {
    navigation: PropTypes.object.isRequired,
    rowData: PropTypes.object.isRequired,
    rowID: PropTypes.number.isRequired,
    likes: PropTypes.number.isRequired,
};
