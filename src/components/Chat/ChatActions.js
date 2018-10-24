import { userService } from './service';
import { APP_STORE } from '../../Store';
import { URL } from '../../utils';

export function getChatMessages(pageUrl) {
    // console.log(`getChatMessagesAction: ${pageUrl}`);

    userService.chats(pageUrl).then(async response => {
        // console.log(`getChatMessagesAction: ${pageUrl}`, response);
        const json = await response.json();
        // console.log(`getChatMessagesAction:JSON:`, json);
        if (response.ok) {
            APP_STORE.CHATMSG_EVENT.next({ chatMsg: json.results });
            APP_STORE.CHATPAGE.next({ chatMsgPage: json.next });
            return;
        }
        APP_STORE.APP_EVENT.next({ error: json.detail });
    });
}

export function chatAction(state, chatID) {
    // console.log(`CHATMSG: ${state}, ${chatID}`);

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
    oldData.slice();

    newData.map(data => {
        // console.log(data)

        var message = null;

        if (data.user == APP_STORE.getUser()) {
            message = {
                _id: data.id,
                text: data.text,
                createdAt: data.created,
                user: {
                    _id: APP_STORE.getId(),
                    name: APP_STORE.getUser(),
                    avatar: '',
                },
            };
        } else {
            message = {
                _id: data.id,
                text: data.text,
                createdAt: data.created,
                user: {
                    _id: id,
                    name: data.user,
                    avatar: '',
                },
            };
        }

        oldData.push(message);
    });

    return oldData;
}
