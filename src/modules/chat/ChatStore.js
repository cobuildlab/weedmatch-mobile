import {FluxStore} from '../../utils/flux-state';

export const CHAT_LIST_EVENT = "ChatListEvent";
export const CHAT_ERROR_EVENT = "ChatError";
export const CHAT_USERNAME_EVENT = "ChatUsername";
export const CHAT_MESSAGES_EVENT = "ChatMessages";

/**
 * Store for the Chat Data
 */
class ChatStore extends FluxStore {
    constructor() {
        super();
        // List of chats
        this.addEvent(CHAT_LIST_EVENT);
        // Error in chats Store
        this.addEvent(CHAT_ERROR_EVENT);
        // Name of active chat user, backwards compatibility
        this.addEvent(CHAT_USERNAME_EVENT);
        // Chat messages
        this.addEvent(CHAT_MESSAGES_EVENT);
    }
}

const store = new ChatStore();
export default store;
