import { dispatchEvent } from '../../utils/flux-state';
import * as services  from './services';

export const fetchChat = () => {
    const successCallback = async res => {
        if (res.ok) {
            const json = await res.json();

            dispatchEvent('ChatList', json);
        } else {
            const json = await res.json();
            const detail =
                typeof json.detail !== 'string' ? 'UNKNOWN_ERROR' : json.detail;

            dispatchEvent('ChatError', detail);
        }
    };

    const errorCallback = e => {
        dispatchEvent('ChatError', e.message);

        if (__DEV__) {
            // eslint-disable-next-line no-console
            console.warn(e.message);
        }
    };

    try {
        services.fetchChat()
            .then(successCallback)
            .catch(errorCallback);
    } catch (e) {
        if (__DEV__) {
            // eslint-disable-next-line no-console
            console.warn(e.message);
        }
        // catch synchronous errors
        errorCallback(e);
    }
};

export const touchChatMessage = messageId => {
    const successCallback = async res => {
        if (res.ok) {
            const json = await res.json();

            dispatchEvent('ChatRead', json);
        } else {
            const json = await res.json();
            const detail =
                typeof json.detail !== 'string' ? 'UNKNOWN_ERROR' : json.detail;

            dispatchEvent('ChatError', detail);
        }
    };

    const errorCallback = e => {
        dispatchEvent('ChatError', e.message);

        if (__DEV__) {
            // eslint-disable-next-line no-console
            console.warn(e.message);
        }
    };

    try {
        services.touchChatMessage(messageId)
            .then(successCallback)
            .catch(errorCallback);
    } catch (e) {
        if (__DEV__) {
            // eslint-disable-next-line no-console
            console.warn(e.message);
        }
        // catch synchronous errors
        errorCallback(e);
    }
};
