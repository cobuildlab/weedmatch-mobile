import React from 'react';
import { SectionList as RNSectionList, Text, StyleSheet } from 'react-native';
/**
 * @template T
 * @typedef {import('react-native').SectionListRenderItem<T>} SectionListRenderItem
 */
/**
 * @template Props
 * @typedef {import('../definitions').Section<Props>} Section
 */
/**
 * @template Props
 * @typedef {import('../definitions').Screen<Props>} Screen
 */

const styles = StyleSheet.create({
    // eslint-disable-next-line react-native/no-color-literals
    item: {
        backgroundColor: '#bababa',
        color: 'gray',
        paddingRight: 20,
        paddingTop: 20,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    sectionHeader: {
        fontWeight: 'bold',
    },
});

/**
 * @typedef {object} SectionListProps
 * @prop {() => void} onPressItem
 * @prop {Section<any>[]} sections
 */

/**
 * Binds the onPressItem from props to the renderItem function.
 * Inner function must be a named regular function as react uses the name for
 * internal purposes
 * @param {(item: Screen<any>) => void} onPressItem
 * @returns {SectionListRenderItem<Screen<any>>}
 */
const bindRenderItemToOnPressItemHandler = onPressItem =>
    function sectionListRenderItem({ item }) {
        return (
            <Text style={styles.item} onPress={() => onPressItem(item)}>
                {item.name}
            </Text>
        );
    };

/**
 * @type {React.SFC<SectionListProps>}
 */
const SectionList = ({ onPressItem, sections }) => (
    <RNSectionList
        renderSectionHeader={({ section: { title } }) => (
            // eslint-disable-next-line react-native/no-inline-styles
            <Text style={styles.sectionHeader}>{title}</Text>
        )}
        renderItem={bindRenderItemToOnPressItemHandler(onPressItem)}
        sections={sections}
    />
);

export default SectionList;
