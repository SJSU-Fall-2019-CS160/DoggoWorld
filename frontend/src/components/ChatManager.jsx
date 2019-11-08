import React, { Component } from "react";
import io from "socket.io-client";
import _ from "lodash";
import ChatContainer from "./ChatContainer";
import { booleanTypeAnnotation } from "@babel/types";
const socketURL = window.location.host;
const MESSAGE_SEND = "MESSAGE_SEND";
const MESSAGE_RECIEVE = "MESSAGE_RECIEVE";
const MESSAGE_ERROR = "MESSAGE_ERROR";
const USER_CONNECT = "USER_CONNECT";
const tempAuthTokens = [
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3RfbmFtZSI6ImZpcnN0MSIsImxhc3RfbmFtZSI6Imxhc3QiLCJjaGF0cyI6WzEsMl0sImdyb3VwcyI6W3siaWQiOjE1LCJjaGF0aWQiOjMsIm5hbWUiOiJ0ZXN0Z3JvdXBuZXduYW1lIn1dLCJpYXQiOjE1NzMwODI1NjF9.OHYJ3qAe0sjQUvijxXBs1fx__3vzpiu7c5Csu7VKA04",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZmlyc3RfbmFtZSI6ImZpcnN0MiIsImxhc3RfbmFtZSI6Imxhc3QiLCJjaGF0cyI6WzFdLCJncm91cHMiOlt7ImlkIjoxNSwiY2hhdGlkIjozLCJuYW1lIjoidGVzdGdyb3VwbmV3bmFtZSJ9XSwiaWF0IjoxNTczMDgzODYxfQ.93VBBv_tEI1iAmdYPIgM1oQCGl69uQ93CXxnIcZaqpk",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZmlyc3RfbmFtZSI6ImZpcnN0MyIsImxhc3RfbmFtZSI6Imxhc3QiLCJjaGF0cyI6WzJdLCJncm91cHMiOlt7ImlkIjoxNSwiY2hhdGlkIjozLCJuYW1lIjoidGVzdGdyb3VwbmV3bmFtZSJ9XSwiaWF0IjoxNTczMDgzOTIxfQ.E-zqGjiC9e5SI9txUc7RJDHvuwG5oXuaWcgb5N8cnSE"
]; // user 1.'test' privkey
const tempUsernames = ["alice", "bob", "charlie"];
const tempIds = [1, 2, 3];
class ChatManager extends Component {
    state = {
        socket: null,
        chats: [],
        activeChat: null,
        tempVal: 0
    };

    componentDidMount() {
        console.log(socketURL);
        const socket = io({ transports: ["websocket"] });
        socket.on("connect", () => {
            console.log("connected");
        });
        this.setState({ socket });
    }

    // componentWillUnmount() {
    //     this.state.socket.close();
    // }

    loadChats = () => {
        this.state.socket.emit(
            USER_CONNECT,
            tempAuthTokens[this.state.tempVal],
            this.createChats
        );
    };

    createChats = chats => {
        const { socket, activeChat } = this.state;
        // let chats = [...this.state.chats, ...newChats];
        // chats = _.uniqBy(chats, "id");
        console.log(chats);
        let newActive;
        if (chats.length !== 0) {
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

    setTempUser = () => {
        return (
            <React.Fragment>
                <button
                    className="btn btn-secondary"
                    onClick={() => this.setState({ tempVal: 0 })}
                >
                    {tempUsernames[0]}
                </button>
                <button
                    className="btn btn-secondary"
                    onClick={() => this.setState({ tempVal: 1 })}
                >
                    {tempUsernames[1]}
                </button>
                <button
                    className="btn btn-secondary"
                    onClick={() => this.setState({ tempVal: 2 })}
                >
                    {tempUsernames[2]}
                </button>
            </React.Fragment>
        );
    };

    handleSend = (chatid, message) => {
        const { tempVal } = this.state;
        console.log(chatid, tempUsernames[tempVal], message);
        this.state.socket.emit(
            MESSAGE_SEND,
            chatid,
            tempIds[tempVal],
            tempUsernames[tempVal],
            message
        );
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
                        onSend={message =>
                            this.handleSend(activeChat.id, message)
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
                {this.setTempUser()}
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
