import {userService} from './service';
import {AsyncStorage, Alert} from "react-native";
import {dispatchEvent} from "../flux-state";
import logToServer from 'log-to-server'
function changeToken(token) {

    userService.refreshToken(token)
        .then(async (response) => {
            const json = await response.json();
            logToServer(`refreshToken:JSON:`, json);
            if (response.ok) {
                return;
            }
            logToServer(json.detail)
        });
}

const validateToken = async (newToken) => {
    let token;
    try {
        token = await AsyncStorage.getItem('firebase');
    } catch (error) {
        console.error('TOPBARACTIONS:validateToken:', error.message);
        Alert.alert(error.message);
    }

    if (token) {
        logToServer("TOPBARACTIONS:validateTokenFirebase Token:", token);
        if (token != newToken) {
            changeToken(newToken);
        }
    }
};

const updatelocation = position =>{
    logToServer("updateLocation:", position);
    if (!position || !position.coords)
        return;

    return dispatchEvent("GeoData", position);
};

export {
    changeToken,
    validateToken,
    updatelocation

};
