/**
 * @prettier
 */
import React from 'react';
import * as ReactNative from 'react-native';
const { Text, View } = ReactNative;
import { strings } from '../../../i18n';
import P from '../../../styles/palette';
import styles from './styles';

import FastImage from 'react-native-fast-image';
import { Platform } from 'react-native';
import { Image as RNImage } from 'react-native';
const Image = Platform.OS === 'ios' ? RNImage : FastImage;

interface CardProps {
    age: number;
    countryName: string;
    distanceString: string;
    firstName: string;
    /**
     * Used for onPressBlock
     */
    imageID: string;
    imageSource: ReactNative.ImageSourcePropType;
    onPressBlock: (imageID: string, userID: string, userName: string) => void;
    /**
     * Used for onPressBlock
     */
    userID: string;
    /**
     * Used for onPressBlock
     */
    userName: string;
}

export default class Card extends React.PureComponent<CardProps> {
    onPressBlock = () => {
        const { imageID, onPressBlock, userID, userName } = this.props;

        onPressBlock(imageID, userID, userName);
    };

    render() {
        const {
            age,
            countryName,
            distanceString,
            firstName,
            imageSource,
        } = this.props;

        return (
            <View
                style={[
                    P.flex,
                    P.center,
                    P.crossStretch,
                    styles.card,
                    styles.borderRadius
                ]}
            >
                <Image
                    style={[styles.image, styles.borderRadius]}
                    source={imageSource}
                />
                <View
                    style={[
                        P.flex,
                        P.row,
                        P.spaceBetween,
                        P.crossCenter,
                        styles.textsContainer,
                    ]}
                >
                    <View style={[P.flex, P.center]}>
                        <Text style={styles.nameText}>
                            {firstName}, {age}
                        </Text>
                        <Text style={styles.text}>{distanceString} </Text>
                    </View>
                    <Text style={styles.textContainer}>{countryName}</Text>
                    <Text>{strings('swiper.BLOCK_OR_REPORT')}</Text>
                </View>
            </View>
        );
    }
}
