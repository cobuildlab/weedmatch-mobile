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
class Feed extends React.Component {
    constructor(props) {
        super(props);
        this.ref = null;
    }

    scrollToTop = () => {
        this.ref.scrollToIndex({ animated: true, index: 0 });
    }

    render() {
        const { style, dataSource, renderItem, extraData, onEndReached, onMomentumScrollBegin, isRefreshing, onRefresh } = this.props;
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
                ref={ref => this.ref = ref}
            />
        );
    }

}


Feed.propTypes = {
    dataSource: PropTypes.array.isRequired,
    renderItem: PropTypes.func.isRequired,
    style: PropTypes.object,
};

export default Feed;
