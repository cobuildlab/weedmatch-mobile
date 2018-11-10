import styles from "../../components/Home/styles";
import {Image} from "react-native";
import React from "react";
import {EMPTY_HEAR_BASE64, FILL_HEART_BASE64} from "./index";
import * as PropTypes from "prop-types";

export const Heart = (props) => {
    const {fill} = props;
    return (
        <Image style={styles.icons} source={{uri: fill ? FILL_HEART_BASE64 : EMPTY_HEAR_BASE64}}/>
    )
};

Heart.propTypes = {
    fill: PropTypes.bool.isRequired
};
