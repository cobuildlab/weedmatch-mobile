/**
 * @prettier
 */
import React from 'react';
import * as PropTypes from 'prop-types';
import { Text, View, TouchableHighlight, Platform } from 'react-native';
import { Image as RNImage } from 'react-native';
import styles from '../../components/Message/style';
import FastImage from 'react-native-fast-image';

/**
 * @typedef {object} ChatTitleProps
 * @prop {string} name Username
 * @prop {string} src Image source
 * @prop {() => void} onPress
 */

const Image = Platform.OS === 'ios' ? RNImage : FastImage;

/**
 * Component to show the header of the Chat Window
 * @type {React.SFC<ChatTitleProps>}
 */
const ChatTitle = ({ name, onPress, src }) => {
    return (
        <View style={styles.viewMsg}>
            <TouchableHighlight onPress={onPress}>
                <Image
                    style={styles.imgProfileItem}
                    source={{ uri: src }}
                    onPress={onPress}
                />
            </TouchableHighlight>
            <View style={styles.viewTexts}>
                <Text style={styles.textUser} onPress={onPress}>
                    {name}
                </Text>
            </View>
        </View>
    );
};

ChatTitle.propTypes = {
    name: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    src: PropTypes.string.isRequired,
};

export default ChatTitle;
