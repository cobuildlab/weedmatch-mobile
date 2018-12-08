/**
 * @prettier
 */
import { StyleSheet } from 'react-native';

const palette = StyleSheet.create({
    alignContentStretch: {
        alignContent: 'stretch',
    },
    alignItemsStretch: {
        alignItems: 'stretch',
    },
    center: {
        justifyContent: 'center',
    },
    crossCenter: {
        alignItems: 'center',
    },
    crossStretch: {
        alignItems: 'stretch',
    },
    flex: {
        flex: 1,
    },
    row: {
        flexDirection: 'row',
    },
    spaceAround: {
        justifyContent: 'space-around',
    },
    spaceBetween: {
        justifyContent: 'space-between',
    },
    wrap: {
        flexWrap: 'wrap',
    },
});

export default palette;
