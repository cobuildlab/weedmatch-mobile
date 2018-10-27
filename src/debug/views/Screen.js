import React from 'react';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
});

/**
 * @typedef {object} ScreenProps
 * @prop {{[K: string]: any}} props
 * @prop {React.SFC} statelessFunctionalComponent
 */

/**
 * @type {React.SFC<ScreenProps>}
 */
const Screen = ({ props, statelessFunctionalComponent: Component }) => (
    <View style={styles.root}>
        <Component {...props} />
    </View>
);

export default Screen;
