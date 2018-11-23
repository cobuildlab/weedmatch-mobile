import { dispatchEvent } from '../../utils/flux-state';
import * as services  from './services';
import {
    CHAT_LIST_EVENT,
    CHAT_ERROR_EVENT,
    CHAT_MESSAGE_READ_EVENT
} from './ChatStore';

export const fetchChat = () => {
    const successCallback = async res => {
        if (res.ok) {
            const json = await res.json();

            dispatchEvent(CHAT_LIST_EVENT, json);
        } else {
            const json = await res.json();
            const detail =
                typeof json.detail !== 'string' ? 'UNKNOWN_ERROR' : json.detail;

            dispatchEvent(CHAT_ERROR_EVENT, detail);
        }
    };

    const errorCallback = e => {
        dispatchEvent(CHAT_ERROR_EVENT, e.message);
        // eslint-disable-next-line no-console
        console.warn(e.message);
    };

    try {
        services.fetchChat()
            .then(successCallback)
            .catch(errorCallback);
    } catch (e) {
        // eslint-disable-next-line no-console
        console.warn(e.message);
        // catch synchronous errors
        errorCallback(e);
    }
};

export const touchChatMessage = messageId => {
    const successCallback = async res => {
        if (res.ok) {
            const json = await res.json();

            dispatchEvent(CHAT_MESSAGE_READ_EVENT, json);
        } else {
            const json = await res.json();
            const detail =
                typeof json.detail !== 'string' ? 'UNKNOWN_ERROR' : json.detail;

            dispatchEvent(CHAT_ERROR_EVENT, detail);
        }
    };

    const errorCallback = e => {
        dispatchEvent(CHAT_ERROR_EVENT, e.message);
        console.warn(e.message);
    };

    try {
        services.touchChatMessage(messageId)
            .then(successCallback)
            .catch(errorCallback);
    } catch (e) {
        console.warn(e.message);

        // catch synchronous errors
        errorCallback(e);
    }
};
