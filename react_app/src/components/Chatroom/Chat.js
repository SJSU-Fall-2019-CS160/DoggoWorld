import React, { Component } from 'react';
import RoomList from './RoomList';
import ChatMessages from './ChatMesssages';
import ChatInput from './ChatInput';
import io from "socket.io-client";
import axios from 'axios';
const USER_CONNECT = "USER_CONNECT";
const MESSAGE_SEND = "MESSAGE_SEND";
const MESSAGE_RECIEVE = "MESSAGE_RECIEVE";
const MESSAGE_ERROR = "MESSAGE_ERROR";
const GET_CHATLOGS = "GET_CHATLOGS";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3RfbmFtZSI6ImZpcnN0MSIsImxhc3RfbmFtZSI6Imxhc3QiLCJjaGF0cyI6WzEsMiwxMV0sImdyb3VwcyI6W3siaWQiOjE1LCJjaGF0aWQiOjMsIm5hbWUiOiJ0ZXN0Z3JvdXAxIn0seyJpZCI6MTgsImNoYXRpZCI6NiwibmFtZSI6Imdyb3VwZGVmYXVsdGNoYXR0ZXN0MiJ9LHsiaWQiOjE5LCJjaGF0aWQiOjcsIm5hbWUiOiJ0ZXN0bm90aWZ5In0seyJpZCI6MjAsImNoYXRpZCI6OCwibmFtZSI6InRlc3Rub3RpZnkyIn0seyJpZCI6MjEsImNoYXRpZCI6OSwibmFtZSI6InRlc3Rub3RpZnkzIn0seyJpZCI6MjIsImNoYXRpZCI6MTAsIm5hbWUiOiJyZW5kZXIxIn0seyJpZCI6MjMsImNoYXRpZCI6MTIsIm5hbWUiOiJyZW5kZXIyIn1dLCJpYXQiOjE1NzU3ODA4MDZ9.Two2z4wh0apnDia3UqwkOFGFBssFYjMwiz3ad4C5-LM"
class Chat extends Component {
    state = {
        socket: io({ transports: ["websocket"] }),
        connected: false,
        chats: [],
        activeChat: null,
        events: []
    }
    //--------------- LIFECYCLE HOOKS ---------------//
    componentDidMount() {
        const { socket } = this.state;
        socket.on("connect", () => {
            console.log("connected");
        });
        socket.emit(USER_CONNECT, token, this.authCallback); // sessionStorage.getItem("authToken")
    }

    componentWillUnmount() {
        const { socket, events } = this.state;
        events.forEach(event => {
            socket.off(event);
        });
        socket.close();
    }

    //--------- SOCKET SETUP & HANDLERS ---------//

    authCallback = () => {
        const { socket } = this.state;
        socket.emit(GET_CHATLOGS, this.chatlogCallback);
    }

    /**
    * Callback helper function for initialization above.
    * Is called by backend after it readies all chats.
    * Loops through all chat objects and assigns a listener for those endpoints
    */
    chatlogCallback = newChats => {
        const { socket, events } = this.state;
        console.log("Initial chatlogs recieved");
        console.log(newChats);
        const newEvents = [];
        newChats.forEach(chat => {
            newEvents.push(`${MESSAGE_RECIEVE}-${chat.id}`);
            socket.on(
                `${MESSAGE_RECIEVE}-${chat.id}`,
                this.socketRecieverSetup(chat.id)
            );
        });
        this.setState({ chats: newChats, events: [...events, ...newEvents], connected: true });
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

    //--------- EVENT HANDLERS ---------//

    handleSetChat = chat => {
        this.setState({ activeChat: chat });
    };

    handleSendMessage = (chatid, message) => {
        console.log(chatid, message);
        this.state.socket.emit(MESSAGE_SEND, chatid, message);
    };

    renderChat() {
        const { chats, activeChat } = this.state;
        return (
            <div className="ui container segment" style={{ "width": "600px" }}>
                {/* Sidebar */}
                <RoomList
                    chats={chats}
                    activeChat={activeChat}
                    onSetChat={(chat) => this.handleSetChat(chat)}
                />

                {activeChat ? (
                    <React.Fragment>
                        <ChatMessages
                            chat={activeChat}
                        />
                        <ChatInput
                            onSend={(message) => this.handleSendMessage(activeChat.id, message)}
                        />
                    </React.Fragment>
                )
                    : (<h1 className="header">NO CHAT SELECTED</h1>)}


            </div>
        );
    }

    renderLoader() {
        return (
            <div className="ui segment">
                <p></p>
                <div className="ui active dimmer">
                    <div className="ui loader"></div>
                </div>
            </div>
        );
    }

    // props = socket
    render() {
        const { connected } = this.state;
        return (
            <React.Fragment>
                {connected ? this.renderChat() : this.renderLoader()}
            </React.Fragment>
        );
    }
}

export default Chat;