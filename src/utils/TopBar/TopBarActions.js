import {userService} from './service';
import {AsyncStorage, Alert} from "react-native";

function changeToken(token) {

    userService.refreshToken(token)
        .then(async (response) => {
            const json = await response.json();
            console.log(`refreshToken:JSON:`, json);
            if (response.ok) {
                return;
            }
            console.log(json.detail)
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
        console.log("TOPBARACTIONS:validateTokenFirebase Token:", token);
        if (token != newToken) {
            changeToken(newToken);
        }
    }
};

export {
    changeToken,
    validateToken

};
