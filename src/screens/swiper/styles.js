import {StyleSheet} from 'react-native';
import {black, white, gray, purple} from '../../styles/colors';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'stretch',
        backgroundColor: black,
        opacity: 0.7
    },
    titleContainer: {
        justifyContent: 'flex-end',
        width: '100%',
        alignItems: 'center',
        paddingBottom: 10
    },
    imageContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        alignItems: 'center',
        paddingBottom: 10,
        paddingTop: 10,
    },
    image: {
        height: 150,
        width: 150,
        borderColor: gray,
        borderRadius: 50,
        borderWidth: 5
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        alignItems: 'center',
        paddingTop: 20,
    },
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '100%',
        alignItems: 'flex-start',
        paddingRight: 10
    },
    fontMatchTitle: {
        textAlign: 'center',
        color: white,
        fontSize: 28,
        fontWeight: '700',
    }
});
