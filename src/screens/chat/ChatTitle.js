import React from 'react';

import * as PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';

import styles from '../../components/Message/style';

/**
 * @typedef {object} ChatTitleProps
 * @prop {string} name Username
 * @prop {string} src Image source
 */

/**
 * Component to show the header of the Chat Window
 * @type {React.SFC<ChatTitleProps>}
 */
const ChatTitle = ({ name, src }) => (
    <View style={styles.viewMsg}>
        <FastImage
            style={styles.imgProfileItem}
            resizeMode={FastImage.resizeMode.contain}
            source={{ uri: src }}
        />
        <View style={styles.viewTexts}>
            <Text style={styles.textUser}>{name}</Text>
        </View>
    </View>
);

ChatTitle.propTypes = {
    name: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
};

export default ChatTitle;
