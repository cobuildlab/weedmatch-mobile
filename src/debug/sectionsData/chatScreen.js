import ChatView from '../../components/Chat/View';
/**
 * @typedef {import('../../components/Chat/View').ChatViewProps} ChatViewProps
 * @typedef {import('../../components/Chat/View').Message} Message
 */
/**
 * @template Props
 * @typedef {import('../definitions').Section<Props>} Section
 */

const chatScreenUserIdOne = {
    user: {
        _id: 1,
        avatar: '',
        name: 'Sender Name',
    },
};

const chatScreenEmptyHandlers = {
    // @ts-ignore
    // eslint-disable-next-line no-unused-vars
    onInputTextChanged: text => {},
    onLoadEarlier: () => {},
    onSend: () => {},
};

const chatScreenEmptyMessages = {
    messages: [],
};

const chatScreenEmptyInputText = {
    currentInputText: '',
};

/**
 * @type {ChatViewProps}
 */
const chatScreenBaseProps = {
    ...chatScreenUserIdOne,
    ...chatScreenEmptyHandlers,
    ...chatScreenEmptyMessages,
    ...chatScreenEmptyInputText,
    isLoadingEarlier: false,
};

/**
 * @type {ReadonlyArray<Message>}
 */
const someMessages = [
    {
        _id: Math.random(),
        createdAt: new Date(),
        text: 'Hola mundo',
        user: chatScreenUserIdOne.user,
    },
    {
        _id: Math.random(),
        createdAt: new Date(),
        text: 'Bien y tu',
        user: {
            _id: 2,
            avatar: '',
            name: 'Mundo',
        },
    },
];

/**
 * @type {ReadonlyArray<Message>}
 */
const messagesWithNoId = [
    {
        _id: Math.random(),
        createdAt: new Date(),
        text: 'Hola mundo',
        user: chatScreenBaseProps.user,
    },
    {
        _id: Math.random(),
        createdAt: new Date(),
        text: 'Bien y tu',
        user: {
            // @ts-ignore for testing purposes
            _id: undefined,
            avatar: '',
            name: 'Mundo',
        },
    },
    {
        _id: Math.random(),
        createdAt: new Date(),
        text: 'Gracias',
        user: {
            // @ts-ignore for testing purposes
            _id: undefined,
            avatar: '',
            name: 'Mundo',
        },
    },
];

/**
 * @type {Section<ChatViewProps>}
 */
const chatScreenSection = {
    data: [
        {
            name: 'Chat with no texts',
            props: chatScreenBaseProps,
            statelessFunctionalComponent: ChatView,
        },
        {
            name: 'Chat with some texts',
            props: {
                ...chatScreenBaseProps,
                messages: someMessages,
            },
            statelessFunctionalComponent: ChatView,
        },
        {
            name: 'First message with _id: 1, other messages _id: undefined',
            props: {
                ...chatScreenBaseProps,
                messages: messagesWithNoId,
            },
            statelessFunctionalComponent: ChatView,
        },
    ],
    title: 'Chat Screen',
};

export default chatScreenSection;
