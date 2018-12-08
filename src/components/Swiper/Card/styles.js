/**
 * @prettier
 */
import { Dimensions, StyleSheet } from 'react-native';

import { darkGray, lightGray, mediumGray } from '../../../styles/colors';

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    card: {
        borderColor: lightGray,
        borderRadius: 10,
        borderWidth: 2,
    },
    nameText: {
        color: darkGray,
        fontSize: 18,
    },
    photo: {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderRadius: 10,
        height: deviceWidth,
    },
    textContainer: {
        color: mediumGray,
        fontSize: 14,
    },
});

export default styles;
