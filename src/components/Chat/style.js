import { StyleSheet } from 'react-native';

export const GRAY = '#F3F3F3';
export const MAGENTA = '#9605CC';
export const WHITE = '#FFFFFF';

const styleSheet = StyleSheet.create({
    containers: {
        flex: 1,
        justifyContent: 'center',
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
    iconSend: {
        height: 30,
        width: 30,
    },
    inputStyle: {
        height: 55,
        maxHeight: 200,
        paddingLeft: 10,
        paddingRight: 15,
        paddingTop: 5,
    },
    root: {
        flex: 1,
    },
    sendInnerView: {
        marginRight: 5,
        marginBottom: -10,
    },
    styleTextRight: {
        color: WHITE,
    },
    viewContainer: {
        backgroundColor: WHITE,
        flex: 1,
        flexDirection: 'column',
    },
    viewContainerInput: {
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    viewIconSend: {
        position: 'absolute',
        right: 10,
        top: 11,
    },
    viewInput: {
        borderTopColor: MAGENTA,
        borderWidth: 2,
        width: '100%',
    },
    viewLeft: {
        alignItems: 'flex-start',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
    },
    viewMsg: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        padding: 15,
    },
    viewRight: {
        alignItems: 'flex-end',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    viewTextLeft: {
        backgroundColor: GRAY,
        borderRadius: 10,
        marginBottom: 15,
        marginLeft: 25,
        padding: 15,
        width: 'auto',
    },
    viewTextRight: {
        backgroundColor: MAGENTA,
        borderRadius: 10,
        marginBottom: 15,
        marginLeft: 80,
        marginRight: 25,
        padding: 15,
        width: 'auto',
    },
});

export default styleSheet;
