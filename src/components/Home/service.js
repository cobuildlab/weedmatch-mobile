import { authHeader, catchErrorAndPropagate , URL,LENGUAGE, authHeaderForm} from '../../utils';
import DeviceInfo from 'react-native-device-info';
import {APP_STORE} from "../../Store";

export const userService = {
    feed,
    publicImage,
    publicImageLike,
};

function feed(token, state,pagUrl) {

    const requestOptions = {
        method: 'GET',
        headers: authHeader(token),
    };

    return fetch(pagUrl, requestOptions);
}

function publicImage(token, state) {

    var re = /(?:\.([^.]+))?$/;
    var ext = re.exec(state.image)[1];

    const data = new FormData();

    data.append('image', {
        uri: state.image,
        type: 'image/' + ext,
        name: 'photo.' + ext
    });
    data.append('time', state.time);
    data.append('latitud', state.latitud);
    data.append('longitud', state.longitud);
    data.append('comment', state.comment);

    const requestOptions = {
        method: 'POST',
        headers: authHeaderForm(token),
        body: data
    };

    return fetch(URL + 'public-image/', requestOptions);
}

function publicImageLike(token, id, id_user, like) {

    const data = new FormData();
    data.append('like', like);

    const requestOptions = {
        method: 'PUT',
        headers: authHeader(token),
        body: data
    };

    return fetch(URL + 'public-image/' + id + '/like/' + id_user + '/', requestOptions);
}