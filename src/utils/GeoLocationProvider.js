import {PureComponent} from 'react';
import {PermissionsAndroid, Platform, AsyncStorage} from 'react-native';
import PropTypes from 'prop-types';
// Optional: Flow type

/**
 * GeoLocation component.
 */
export default class GeoLocationProvider extends PureComponent {

    constructor(props) {
        super(props);
        this.permissionGranted = false;
    }

    updateValues() {
        console.log('GeoLocationProvider:updateValues', this.permissionGranted);
        if (!this.permissionGranted)
            return;

        navigator.geolocation.getCurrentPosition(this.props.onLocation,
            (error) => {
                this.permissionGranted = false;
                console.log("GeoLocationProvider:updateValues", error);
                if (this.props.onError)
                    this.props.onError(error);
            },
            {enableHighAccuracy: false, timeout: 5000}
        );
    }

    async componentDidMount() {
        console.log('GeoLocationProvider', 'Trying to acquire location');
        if (Platform.OS === "ios") { // IOS
            navigator.geolocation.requestAuthorization();
            this.permissionGranted = true;
            this.updateValues();
        } else { // ANDROID
            const granted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
            if (granted === true) { // We have permission
                this.permissionGranted = true;
                this.updateValues();
                return;
            }

            let androidLocationPermissionResult = await AsyncStorage.getItem("androidLocationPermissionResult");
            if (androidLocationPermissionResult === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN)
                return;

            androidLocationPermissionResult = await this.requestPermission();
            if (androidLocationPermissionResult === PermissionsAndroid.RESULTS.GRANTED) {
                this.permissionGranted = true;
                this.updateValues();
                return;
            }

            if (androidLocationPermissionResult !== null)
                await AsyncStorage.setItem("androidLocationPermissionResult", androidLocationPermissionResult);
        }
    }

    componentWillUnmount() {

    }

    async requestPermission() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    'message': this.props.dialogMessage,
                    'title': this.props.dialogTitle
                }
            );
            return granted

        } catch (error) {
            this.permissionGranted = false;
            console.log("GeoLocationProvider:requestPermission", error);
            if (this.props.onError)
                this.props.onError(error);
        }
        return null;
    }

    render() {
        return null;
    }
}

GeoLocationProvider.propTypes = {
    dialogMessage: PropTypes.string.isRequired,
    dialogTitle: PropTypes.string.isRequired,
    onError: PropTypes.func,
    onLocation: PropTypes.func.isRequired
};
