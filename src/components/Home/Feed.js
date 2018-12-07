import React from 'react';
import PropTypes from 'prop-types';
import {
    ListView,
    FlatList,
    RefreshControl,
} from 'react-native';

/**
 * The Feed Component
 */
const Feed = ({style, dataSource, renderItem, extraData, onEndReached, onMomentumScrollBegin, isRefreshing, onRefresh}) => {

    return (
        <FlatList
            style={[style]}
            initialListSize={13}
            enableEmptySections={true}
            data={dataSource}
            renderItem={renderItem}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.5}
            onMomentumScrollBegin={onMomentumScrollBegin}
            automaticallyAdjustContentInsets={false}
            extraData={this.state}
            refreshControl={
                <RefreshControl
                    refreshing={isRefreshing}
                    onRefresh={onRefresh}
                />
            }
        />
    );
}

Feed.propTypes = {
    dataSource: PropTypes.array.isRequired,
    renderItem: PropTypes.func.isRequired,
    style: PropTypes.object,
};

export default Feed;
