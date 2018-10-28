import {Image} from 'react-native';
import React from "react";
import RNFetchBlob from 'rn-fetch-blob';

class Img extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            base64: ""
        };
    }

    componentDidMount() {
        RNFetchBlob.fetch('GET', this.props.src)
            .then(res => {
                let status = res.info().status;
                if (status == 200) {
                    // the conversion is done in native code
                    let base64Str = res.base64();
                    console.log(base64Str);
                    this.setState({base64: "data:image/png;base64," + base64Str});
                }
            })
            // Something went wrong:
            .catch((errorMessage, statusCode) => {
                console.log("IMG: error fetching", [errorMessage, statusCode]);
            })
    }


    render() {
        const {style} = this.props;
        return (<Image style={[style]} source={{uri: this.state.base64}}/>);
    }
}

export {Img}
