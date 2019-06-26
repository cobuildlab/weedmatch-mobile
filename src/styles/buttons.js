import {StyleSheet} from 'react-native';
import {black, WHITE, purple} from './colors';

export default StyleSheet.create({
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
    },
    whiteButton: {
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 50,
        color: purple,
        paddingBottom: 10,
        paddingTop: 10,
        width: null,
    },
});
