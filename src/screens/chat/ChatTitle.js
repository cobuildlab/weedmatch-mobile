import React from "react";
import {Text, View, TouchableHighlight} from "react-native";
import styles from "../../components/Message/style";
import FastImage from "react-native-fast-image";

/**
 * Component to show the header of the Chat Window
 * @param props
 * @return {*}
 * @constructor
 */
const ChatTitle = (props) => {
    const {src, name, onPress} = props;

    return (
        <View style={styles.viewMsg}>
            <TouchableHighlight onPress={onPress}>
                <FastImage style={styles.imgProfileItem}
                           resizeMode={FastImage.resizeMode.contain}
                           source={{uri: src}}
                           onPress={onPress}
                />
            </TouchableHighlight>
            <View style={styles.viewTexts}>
                <Text style={styles.textUser} onPress={onPress}>{name}</Text>
            </View>
        </View>
    );
}

export default ChatTitle;
