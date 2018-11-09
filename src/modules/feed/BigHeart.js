import {Image, View} from "react-native";
import styles from "../../components/Home/styles";
import React from "react";

export const BigHeart = () => (
    <View style={styles.heartLike}>
        <Image
            style={styles.positionHeart}
            source={require('../../assets/img/heartLike.png')}
        />
    </View>
);
