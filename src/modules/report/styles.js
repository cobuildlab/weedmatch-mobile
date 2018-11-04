import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    /**
     * <Content> has two items, the first one the form and the title, will stick
     * to the top and the 2nd one, will stick to the button unless the form
     * grow then the user can actually scroll to see the button
     */
    content: {
        flexGrow: 1,
        justifyContent: 'space-between',
    },
    headerAndForm: {
        flex: 1,
        alignItems: 'center'
    },
});

export default styles;
