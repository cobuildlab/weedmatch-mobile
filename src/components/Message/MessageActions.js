import { APP_STORE } from '../../Store';
import { strings } from '../../i18n';
import { isValidText } from '../../utils/index';
import { userService } from './service';

function getChat() {
    userService.chatService(APP_STORE.getToken()).then(async response => {
        const json = await response.json();
        console.warn(`getChat:JSON:`, json);
        if (response.ok) {
            APP_STORE.CHAT_EVENT.next({ chats: json });
            return;
        }
        APP_STORE.APP_EVENT.next({ error: json.detail });
    });
}

function getImages(data) {
    const _images = [];

    data.map(image => {
        _images.push(image.image);
    });

    return _images;
}

export { getChat, getImages };
