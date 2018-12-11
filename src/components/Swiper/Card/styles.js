/**
 * @prettier
 */
import { Dimensions, StyleSheet } from 'react-native';

import { darkGray, lightGray, mediumGray, WHITE } from '../../../styles/colors';

const deviceWidth = Dimensions.get('window').width;
const calculateBottomMarginCard = () => {
    const deviceHeight = Dimensions.get('window').height;
    if (deviceHeight < 600)
        return 0;
    if (deviceHeight < 700)
        return 20;
    if (deviceHeight < 800)
        return 40;
    return 60;
}
const bottomMarginCard = calculateBottomMarginCard()
const sidePadding = 20;

const styles = StyleSheet.create({
    borderRadius: {
        borderRadius: 10,
    },
    card: {
        backgroundColor: WHITE,
        borderColor: lightGray,
        borderWidth: 2,
        marginBottom: bottomMarginCard,
    },
    image: {
        height: deviceWidth,
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
    text: {
        color: mediumGray,
        fontSize: 14,
    },
    textsContainer: {
        paddingLeft: sidePadding,
        paddingRight: sidePadding,
    },
});

export default styles;
