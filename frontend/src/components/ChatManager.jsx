import React, { Component } from "react";
import io from "socket.io-client";
import _ from "lodash";
import ChatContainer from "./ChatContainer";
import { booleanTypeAnnotation } from "@babel/types";
const socketURL = window.location.host;
const MESSAGE_SEND = "MESSAGE_SEND";
const MESSAGE_RECIEVE = "MESSAGE_RECIEVE";
const USER_CONNECT = "USER_CONNECT";
const tempAuthToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3RfbmFtZSI6ImZpcnN0MSIsImxhc3RfbmFtZSI6Imxhc3QiLCJjaGF0cyI6WzEsMl0sImdyb3VwcyI6WzJdLCJpYXQiOjE1NzMwMjI0ODd9.3eTbxKBCFkYox0jQKmadSghXy2KmtI03ceLvcrTD4A0"; // user 1.'test' privkey
const tempUsername = "John";
class ChatManager extends Component {
    state = {
        socket: null,
        chats: [],
        activeChat: null
    };

    componentDidMount() {
        console.log(socketURL);
        const socket = io(socketURL);
        socket.on("connect", () => {
            console.log("connected");
        });
        this.setState({ socket });
    }

    loadChats = () => {
        this.state.socket.emit(USER_CONNECT, tempAuthToken, this.createChats);
    };

    createChats = chats => {
        const { socket, activeChat } = this.state;
        // let chats = [...this.state.chats, ...newChats];
        // chats = _.uniqBy(chats, "id");
        console.log(chats);
        let newActive;
        if (chats.length != 0) {
            newActive = chats[0];
        }
        chats.forEach(chat => {
            socket.on(
                `${MESSAGE_RECIEVE}-${chat.id}`,
                this.addMessageToChat(chat.id)
            );
        });
        this.setState({ chats, activeChat: newActive });
    };

    addMessageToChat = chatId => {
        return messageObj => {
            const { chats } = this.state;
            let newChats = chats.map(chat => {
                if (chat.id === chatId) chat.messages.push(messageObj);
                return chat;
            });
            this.setState({ chats: newChats });
        };
    };

    setActive = chat => {
        this.setState({ activeChat: chat });
    };

    handleSend = (chatid, name, message) => {
        console.log(chatid, name, message);
        this.state.socket.emit(MESSAGE_SEND, chatid, name, message);
    };

    renderChat = () => {
        const { socket, chats, activeChat } = this.state;
        return (
            <React.Fragment>
                {chats.map(chat => (
                    <button
                        key={chat.id}
                        onClick={() => this.setActive(chat)}
                        className="btn btn-primary"
                    >
                        {chat.id}
                    </button>
                ))}
                {activeChat ? (
                    <ChatContainer
                        chat={activeChat}
                        socket={socket}
                        messages={activeChat ? activeChat.messages : null}
                        name={tempUsername}
                        onSend={message =>
                            this.handleSend(
                                activeChat.id,
                                tempUsername,
                                message
                            )
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
                <button onClick={this.loadChats} className="btn btn-primary">
                    load chats
                </button>
                {this.renderChat()}
            </React.Fragment>
        );
    }
}

export default ChatManager;
