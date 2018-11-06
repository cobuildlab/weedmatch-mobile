import React from 'react';
import * as PropTypes from 'prop-types';
import {Text, View, TouchableHighlight} from "react-native";
import {Image} from 'react-native';
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
const ChatTitle = ({src, name, onPress}) => {
    return (
        <View style={styles.viewMsg}>
            <TouchableHighlight onPress={onPress}>
                <Image style={styles.imgProfileItem}
                           source={{uri: src}}
                           onPress={onPress}
                />
            </TouchableHighlight>
            <View style={styles.viewTexts}>
                <Text style={styles.textUser} onPress={onPress}>{name}</Text>
            </View>
        </View>
    );
};

ChatTitle.propTypes = {
    name: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired
};

export default ChatTitle;
