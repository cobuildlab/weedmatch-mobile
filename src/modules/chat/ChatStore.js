import {FluxStore} from '../../utils/flux-state';

export const CHAT_LIST_EVENT = "ChatList";
export const CHAT_ERROR_EVENT = "ChatError";
export const CHAT_USERNAME_EVENT = "ChatUsername";
export const CHAT_MESSAGES_EVENT = "ChatMessages";
export const CHAT_MESSAGE_READ_EVENT = "ChatMessageReadEvent";

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

        this.addEvent(CHAT_MESSAGE_READ_EVENT, (state) => {
            const prevState = this.getState(CHAT_LIST_EVENT);
            const index = (prevState || []).findIndex(chat => chat.id === state.chat);

            return [
                ...prevState.slice(0, index),
                {
                    ...prevState[index],
                    last_message: {
                        ...prevState[index].last_message,
                        status: state.status,
                    }
                },
                ...prevState.slice(index + 1)
            ];
        });
    }
}

const store = new ChatStore();
export default store;
