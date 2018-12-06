import React from 'react';
import PropTypes from 'prop-types';
import {
    ListView,
    RefreshControl,
} from 'react-native';

/**
 * The Feed Component
 */
const Feed = ({style, dataSource, renderRow, onEndReached, onMomentumScrollBegin, isRefreshing, onRefresh}) => {

    return (
        <ListView
            style={[style]}
            initialListSize={13}
            enableEmptySections={true}
            dataSource={dataSource}
            renderRow={renderRow}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.5}
            onMomentumScrollBegin={onMomentumScrollBegin}
            automaticallyAdjustContentInsets={false}
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
    renderRow: PropTypes.element.isRequired,
    style: PropTypes.object,
};

export default Feed;
