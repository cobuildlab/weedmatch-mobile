import { dispatchEvent, FluxStore } from '../../utils/flux-state';

class ChatStore extends FluxStore {
    constructor() {
        super();

        this.addEvent('ChatList');

        this.addEvent('ChatRead', (state) => {
            const prevState = this.getState('ChatList');
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

        this.addEvent('ChatError');
    }
}

const store = new ChatStore();
export default store;
