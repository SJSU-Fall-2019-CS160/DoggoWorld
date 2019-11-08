import React, { Component } from "react";
import io from "socket.io-client";
import ChatContainer from "./ChatContainer";
const socketURL = window.location.host;
const MESSAGE_SEND = "MESSAGE_SEND";
const MESSAGE_RECIEVE = "MESSAGE_RECIEVE";
const MESSAGE_ERROR = "MESSAGE_ERROR";
const ADD_CHAT = "ADD_CHAT";
const USER_CONNECT = "USER_CONNECT";
const testtoken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3RfbmFtZSI6ImZpcnN0MSIsImxhc3RfbmFtZSI6Imxhc3QiLCJjaGF0cyI6WzEsMl0sImdyb3VwcyI6W3siaWQiOjE1LCJjaGF0aWQiOjMsIm5hbWUiOiJ0ZXN0Z3JvdXBuZXduYW1lIn1dLCJpYXQiOjE1NzMxOTY3MjV9.OOBb7ncMV9HaKpuNqmCQ4YSYaH1mdzURUWWd1mlOxPY";

class ChatManager extends Component {
    state = {
        socket: io({ transports: ["websocket"] }),
        chats: [],
        activeChat: null
    };

    //-------------------------------- LIFECYCLE HOOKS --------------------------------//

    componentDidMount() {
        const { socket } = this.state;
        console.log(socketURL);
        socket.on("connect", () => {
            console.log("connected");
        });
        this.initializeChatState();
    }

    //-------------------------------- SOCKET SETUP & HANDLERS --------------------------------//

    /**
     * Initializing required states by requesting them from the backend.
     * Sets up listeners for all chats and for potential new chats.
     */
    initializeChatState = () => {
        const { socket } = this.state;
        socket.emit(
            USER_CONNECT,
            //sessionStorage.getItem("authToken"), //  [[[[WARNING!!!!!]]]] Need to provide actual JWT TOKEN here.
            testtoken,
            this.initializationCallback
        );
        socket.on(ADD_CHAT, chat => {
            let newChats = [...this.state.chats, chat];
            socket.on(
                `${MESSAGE_RECIEVE}-${chat.id}`,
                this.socketRecieverSetup(chat.id)
            );
            this.setState({ chats: newChats });
        });
    };

    /**
     * Callback helper function for initialization above.
     * Is called by backend after it readies all chats.
     * Loops through all chat objects and assigns a listener for those endpoints
     */
    initializationCallback = newChats => {
        const { socket, chats } = this.state;
        console.log("Initial chatlogs recieved");
        console.log(newChats);
        newChats.forEach(chat => {
            socket.on(
                `${MESSAGE_RECIEVE}-${chat.id}`,
                this.socketRecieverSetup(chat.id)
            );
        });
        this.setState({ chats: newChats });
    };

    /**
     * Appending a message to the chat designated.
     * Each chat listens for their own message.
     */
    socketRecieverSetup = chatId => {
        return message => {
            const { chats } = this.state;
            let newChats = chats.map(chat => {
                if (chat.id === chatId) chat.messages.push(message);
                return chat;
            });
            this.setState({ chats: newChats });
        };
    };

    //-------------------------------- EVENT HANDLERS --------------------------------//

    /**
     * Sets the active chat to one selected.
     */
    handleSetActiveChat = chat => {
        this.setState({ activeChat: chat });
    };

    /**
     * Emits a message to the backend
     */
    handleSendMessage = (chatid, message) => {
        console.log(chatid, message);
        this.state.socket.emit(MESSAGE_SEND, chatid, message);
    };

    //-------------------------------- RENDER FUNCTIONS --------------------------------//

    renderManager = () => {
        const { socket, chats, activeChat } = this.state;
        return (
            <React.Fragment>
                {chats.map(chat => (
                    <button
                        key={chat.id}
                        onClick={() => this.handleSetActiveChat(chat)}
                        className="btn btn-primary"
                    >
                        {chat.name}
                    </button>
                ))}
                {activeChat ? (
                    <ChatContainer
                        chat={activeChat}
                        socket={socket}
                        messages={activeChat ? activeChat.messages : null}
                        onSend={message =>
                            this.handleSendMessage(activeChat.id, message)
                        }
                    />
                ) : (
                    "No active Chat"
                )}
            </React.Fragment>
        );
    };

    render() {
        return (
            <React.Fragment>
                <h1>Chat Manager</h1>
                {this.renderManager()}
            </React.Fragment>
        );
    }
}

export default ChatManager;
