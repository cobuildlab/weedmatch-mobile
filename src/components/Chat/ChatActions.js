import { userService } from './service';
import { APP_STORE } from '../../Store';
import { URL } from '../../utils';
import logToServer from 'log-to-server'
export function getChatMessages(pageUrl) {
    // logToServer(`getChatMessagesAction: ${pageUrl}`);

    userService.chats(pageUrl).then(async response => {
        // logToServer(`getChatMessagesAction: ${pageUrl}`, response);
        const json = await response.json();
        // logToServer(`getChatMessagesAction:JSON:`, json);
        if (response.ok) {
            APP_STORE.CHATMSG_EVENT.next({ chatMsg: json.results });
            APP_STORE.CHATPAGE.next({ chatMsgPage: json.next });
            return;
        }
        APP_STORE.APP_EVENT.next({ error: json.detail });
    });
}

export function chatAction(state, chatID) {
    // logToServer(`CHATMSG: ${state}, ${chatID}`);

    var pagUrl = '';

    if (state.urlPage != '' && state.numPage > 0) {
        pagUrl = state.urlPage;
        getChatMessages(pagUrl);
    } else if (state.numPage == 0) {
        pagUrl = URL + 'messages/?chat=' + chatID;
        getChatMessages(pagUrl);
    }
}

export function appendData(oldData, newData, id) {
    // oldData.slice();

    newData.map(data => {
        // logToServer(data)

        var message = null;

        if (data.user == APP_STORE.getUser()) {
            message = {
                _id: data.id,
                createdAt: data.created,
                text: data.text,
                user: {
                    _id: APP_STORE.getId(),
                    avatar: '',
                    name: APP_STORE.getUser(),
                },
            };
        } else {
            message = {
                _id: data.id,
                createdAt: data.created,
                text: data.text,
                user: {
                    _id: id,
                    avatar: '',
                    name: data.user,
                },
            };
        }

        oldData.push(message);
    });
    logToServer(oldData);
    return oldData;
}
