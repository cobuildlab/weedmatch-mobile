import {PureComponent} from 'react';
import {Alert, AsyncStorage} from 'react-native';
import PropTypes from 'prop-types';
import ImagePicker from "react-native-image-crop-picker";
import {strings} from "../i18n";
// Optional: Flow type
import logToServer from 'log-to-server'

/**
 * GeoLocation component.
 */
export default class ImagePickerProvider extends PureComponent {

    constructor(props) {
        super(props);
        this.imagePermissionsHasBeenAsked = false;
    }

    async componentDidMount() {
        const imagePermissionsHasBeenAsked = await AsyncStorage.getItem("imagePermissionsHasBeenAsked");
        if (imagePermissionsHasBeenAsked !== null) {
            this.imagePermissionsHasBeenAsked = true;
        }
    }

    infoPermissions = (onAccept) => {
        logToServer("ImagePickerProvider:infoPermissions", this.imagePermissionsHasBeenAsked);
        if (this.imagePermissionsHasBeenAsked){
            onAccept();
            return;
        }

        this.imagePermissionsHasBeenAsked = true;
        AsyncStorage.setItem("imagePermissionsHasBeenAsked", "SomeValue");

        Alert.alert(
            this.props.alertTitle,
            this.props.alertDescription,
            [
                {
                    text: 'Cancel', onPress: () => {
                        logToServer("ImagePickerProvider:infoPermissions: cancel")
                    }, style: 'cancel'
                },
                {text: 'OK', onPress: onAccept},
            ],
            {cancelable: false}
        )

    };

    getPhoto = () => {
        logToServer("ImagePickerProvider:getPhoto");
        this.infoPermissions(() => {
            ImagePicker.openPicker({
                cropping: false,
                width: 500,
                height: 500,
                compressImageQuality: 0.5,
                includeExif: true,
            }).then(image => {
                logToServer('ImagePickerProvider: received image', image.path);
                this.props.onImage(image);
            }).catch(e => {
                logToServer('ImagePickerProvider: received image error', e);
                if (this.props.onError)
                    this.props.onError(e)
            });
        });

    };

    takePhoto = () => {
        logToServer("ImagePickerProvider:takePhoto");
        this.infoPermissions(() => {
            ImagePicker.openCamera({
                compressImageQuality: 0.5,
                cropping: false,
                height: 500,
                includeExif: true,
                width: 500,
            }).then(image => {
                logToServer('ImagePickerProvider: received photo', image.path);
                this.props.onImage(image);
            }).catch(e => {
                logToServer('ImagePickerProvider: received image error', e);
                if (this.props.onError)
                    this.props.onError(e)
            });
        });
    };

    render() {
        return null;
    }
}

ImagePickerProvider.propTypes = {
    alertDescription: PropTypes.string.isRequired,
    alertTitle: PropTypes.string.isRequired,
    onError: PropTypes.func,
    onImage: PropTypes.func.isRequired
};
