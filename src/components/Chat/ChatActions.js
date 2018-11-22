import { userService } from './service';
import { APP_STORE } from '../../Store';
import { URL } from '../../utils';

export function getChatMessages(pageUrl) {
    console.log('Chat::ChatActions::getChatMessages', pageUrl);

    userService.chats(pageUrl).then(async response => {
        console.log('Chat::ChatActions::getChatMessages::response', response);

        try {
            const json = await response.json();

            console.log('Chat::ChatActions::getChatMessages::json', json);
    
            if (response.ok) {
                APP_STORE.CHATMSG_EVENT.next({ chatMsg: json.results });
                APP_STORE.CHATPAGE.next({ chatMsgPage: json.next });
            } else {
                throw new Error(json.detail)
            }
    
        } catch (e) {
            APP_STORE.APP_EVENT.next(e.message);
        }
    });
}

export function chatAction(state, chatID) {
    console.log('Chat::ChatActions::chatAction', state, chatID);

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
    console.log(
        'ChatActions::appendData::CHATMSG_EVENT',
        oldData,
        newData,
        id
    );

    newData.map(data => {
        // console.log(data)

        var message = null;

        if (data.user == APP_STORE.getUser()) {
            message = {
                _id: data.id,
                createdAt: data.created,
                text: data.text,
                user: {
                    _id: Number(APP_STORE.getId()),
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
                    _id: Number(id),
                    avatar: '',
                    name: data.user,
                },
            };
        }

        oldData.push(message);
    });

    console.log(oldData);

    return oldData;
}
