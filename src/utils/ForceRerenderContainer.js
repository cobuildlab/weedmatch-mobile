import React from 'react';

export default class ForceRerenderContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            shouldComponentRender: true
        }
    }

    forceUnmountOfChilds = () => {
        this.setState({ shouldComponentRender: false });
    };

    forceRenderOfChilds = () => {
        this.setState({ shouldComponentRender: true });
    };

    render() {
        if (this.state.shouldComponentRender === false)
            return null;
        return this.props.children;
    }
}