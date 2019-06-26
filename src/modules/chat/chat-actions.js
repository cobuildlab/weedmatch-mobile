import { APP_STORE } from '../../Store';
import { isValidPositiveNumber, authHeader, URL } from '../../utils/index';
import { dispatchEvent } from "../../utils/flux-state";
import { CHAT_ERROR_EVENT, CHAT_DELETED_EVENT} from '../../modules/chat/ChatStore';
import firebase from 'react-native-firebase';

/**
 * Delete a Chat from the System
 * @param {number} chatId The Chat to be deleted
 */
const deleteChat = async (chatId) => {
    if (!isValidPositiveNumber(chatId)) throw new Error("Invalid chatId");

    const token = APP_STORE.getToken();
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader(token)
    };

    let response;
    try {
        response = await fetch(`${URL}getchat/${chatId}/`, requestOptions);
    } catch (e) {
        return dispatchEvent(CHAT_ERROR_EVENT, e.message);
    }
    firebase.analytics().logEvent('un_match');
    const jsonResponse = await response.json();
    dispatchEvent(CHAT_DELETED_EVENT, jsonResponse);
    return jsonResponse;
};


/**
 * Delete the Messages from a Chat
 * @param {number} chatId The Chat to be deleted
 */
const deleteChatMessages = async (chatId) => {
    if (!isValidPositiveNumber(chatId)) throw new Error("Invalid chatId");

    const token = APP_STORE.getToken();
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader(token)
    };

    let response;
    try {
        response = await fetch(`${URL}messages-delete/${chatId}/`, requestOptions);
    } catch (e) {
        return dispatchEvent(CHAT_ERROR_EVENT, e.message);
    }
    firebase.analytics().logEvent('delete_messages');
    const jsonResponse = await response.json();
    dispatchEvent(CHAT_DELETED_EVENT, jsonResponse);
    return jsonResponse;
};


export { deleteChat, deleteChatMessages };
