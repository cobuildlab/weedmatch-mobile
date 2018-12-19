import React from 'react';
import { strings } from '../../../i18n';
import P from '../../../styles/palette';
import styles from './styles';
// import FastImage from 'react-native-fast-image';
// import { Platform } from 'react-native';
// import { Image as RNImage } from 'react-native';
// const Image = Platform.OS === 'ios' ? RNImage : FastImage;
import { Image, Text, View } from 'react-native';
import * as PropTypes from 'prop-types';
import ImageSourcePropType from '../../../utils/ImageSourcePropType';

export default class Card extends React.PureComponent {
    onPressBlock = () => {
        const { imageID, onPressBlock, userID, userName } = this.props;
        onPressBlock(imageID, userID, userName);
    };

    static propTypes = {
        age: PropTypes.number.isRequired,
        countryName: PropTypes.string.isRequired,
        distanceString: PropTypes.string.isRequired,
        firstName: PropTypes.string.isRequired,
        imageID: PropTypes.string.isRequired,
        imageSource: ImageSourcePropType.isRequired,
        onPressBlock: PropTypes.func.isRequired,
        userID: PropTypes.string.isRequired,
        userName: PropTypes.string.isRequired,
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
                    styles.borderRadius,
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
