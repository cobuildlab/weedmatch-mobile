import {userService} from './service';
import {APP_STORE} from '../../Store';
import {URL} from '../../utils';
import {CHAT_ERROR_EVENT, CHAT_MESSAGES_EVENT} from "../../modules/chat/ChatStore";
import {dispatchEvent} from "../../utils/flux-state";

const getChatMessages = (pageUrl) => {
    console.log('Chat::ChatActions::getChatMessages', pageUrl);
    if (pageUrl.indexOf("https") === -1)
        pageUrl = pageUrl.replace('http', 'https');
    userService.chats(pageUrl).then(async response => {
        console.log('Chat::ChatActions::getChatMessages::response', response);
        try {
            const json = await response.json();
            if (response.ok) {
                return dispatchEvent(CHAT_MESSAGES_EVENT, json);
                // APP_STORE.CHATMSG_EVENT.next({chatMsg: json.results});
                // APP_STORE.CHATPAGE.next({chatMsgPage: json.next});
            } else {
                return dispatchEvent(CHAT_ERROR_EVENT, json.detail);
            }

        } catch (e) {
            return dispatchEvent(CHAT_ERROR_EVENT, e.message);
        }
    }).catch(e => dispatchEvent(CHAT_ERROR_EVENT, e.message));
}

/**
 * Retrieve the chat message
 * @param state
 * @param chatID
 */
export const chatAction = (state, chatID, urlNextPage, numPage) => {
    console.log('Chat::ChatActions::chatAction', [state, chatID, urlNextPage, numPage]);

    if (urlNextPage !== null && numPage > 0) {
        getChatMessages(urlNextPage);
    } else if (numPage == 0) {
        getChatMessages(URL + 'messages/?chat=' + chatID);
    }
};

/**
 * Transform the data for the Gifted Chat
 * @param data
 * @return {Array}
 */
export function prepareData(data) {
    console.log('ChatActions::prepareData:', data);
    const newData = data.map(data => {
        return {
            _id: data.id,
            text: data.text,
            createdAt: data.created,
            user: {
                _id: Number(data.id_user),
                name: data.user,
            },
        }
    });
    console.log('ChatActions::prepareData::', newData);
    return newData;
}
