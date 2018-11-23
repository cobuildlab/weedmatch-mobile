/**
 * @prettier
 */
// Optional: Flow type
import React from 'react';
import * as PropTypes from 'prop-types';
import {Text, View, Platform, TouchableOpacity} from 'react-native';
import {Image as RNImage} from 'react-native';
import styles from '../../components/Message/style';
import FastImage from 'react-native-fast-image';
import {strings} from "../../i18n";

const Image = Platform.OS === 'ios' ? RNImage : FastImage;

/**
 * A component to represent the Item on the ChatList
 *
 * @param item
 * @param onPress
 * @param isUntouched
 * @return {*}
 * @constructor
 */
const ChatListItem = ({item, onPress, isUntouched}) => {
    return (
        <TouchableOpacity onPress={() => onPress(item)} >
            <View style={styles.viewMsg}>
                <View style={styles.imgProfileBox}>
                    <Image
                        style={styles.imgProfileItem}
                        source={{ uri: item.image_profile }}
                    />
                    {isUntouched(item.last_message) && (
                        <View style={styles.statusIndicator}/>
                    )}
                </View>
                <View style={styles.viewTexts}>
                    <Text style={styles.textUser}>{item.user}</Text>
                    <Text style={styles.textChat}>
                        {item.message ? item.message : strings('chat.write')}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

ChatListItem.propTypes = {
    isUntouched: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    onPress: PropTypes.func.isRequired
};

export default ChatListItem;
