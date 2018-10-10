import {StyleSheet} from 'react-native';
import {black, white, gray, purple} from './colors';

export default styles = StyleSheet.create({
    purpleButton: {
        backgroundColor: purple
    },
    transparentButton: {
        opacity: 1,
        backgroundColor: black,
        borderColor: white,
        borderWidth: 1,
        color: white,
        fontWeight: "600",
    },
    transparentIconButton: {
        opacity: 1,
        backgroundColor: black,
        borderColor: white,
        borderWidth: 1,
        color: white,
        fontWeight: "600",
        paddingRight: 15,
    }
});
