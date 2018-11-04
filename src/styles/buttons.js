import {StyleSheet} from 'react-native';
import {black, WHITE, gray, purple} from './colors';

export default styles = StyleSheet.create({
    purpleButton: {
        backgroundColor: purple
    },
    transparentButton: {
        opacity: 1,
        backgroundColor: black,
        borderColor: WHITE,
        borderWidth: 1,
        color: WHITE,
        fontWeight: "600",
    },
    transparentIconButton: {
        opacity: 1,
        backgroundColor: black,
        borderColor: WHITE,
        borderWidth: 1,
        color: WHITE,
        fontWeight: "600",
        paddingRight: 15,
    }
});
