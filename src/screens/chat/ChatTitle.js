import React from "react";
import {Text, View} from "react-native";
import styles from "../../components/Message/style";
import FastImage from "react-native-fast-image";

/**
 * Component to show the header of the Chat Window
 * @param props
 * @return {*}
 * @constructor
 */
const ChatTitle = (props) => {
    const {src, name} = props;
    return (
        <View style={styles.viewMsg}>
            <FastImage style={styles.imgProfileItem}
                       resizeMode={FastImage.resizeMode.contain}
                       source={{uri: src}}
            />
            <View style={styles.viewTexts}>
                <Text style={styles.textUser}>{name}</Text>
            </View>
        </View>
    );
}

export default ChatTitle;
