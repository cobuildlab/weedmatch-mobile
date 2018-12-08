/**
 * @prettier
 */
import React from 'react';
import * as ReactNative from 'react-native';
const { Image, Text, TouchableOpacity, View } = ReactNative;

import { strings } from '../../../i18n';

import styles from '../style';

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
            <View style={[styles.card]}>
                <View style={[styles.viewFlex]}>
                    <View style={[styles.viewBackground]}>
                        <Image style={styles.media} source={imageSource} />
                    </View>
                    <View style={styles.cardBottomHalf}>
                        <View style={[styles.viewContainer]}>
                            <Text style={styles.textName}>
                                {firstName}, {age}
                            </Text>
                            <Text style={styles.textContainer}>
                                {countryName}
                            </Text>
                            <Text style={styles.textContainer}>
                                {distanceString}{' '}
                            </Text>
                        </View>
                        <TouchableOpacity onPress={this.onPressBlock}>
                            <Text>{strings('swiper.BLOCK_OR_REPORT')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}
