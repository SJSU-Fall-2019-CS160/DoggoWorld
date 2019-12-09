import React, { Component } from "react";
import RoomList from "./RoomList";
import ChatMessages from "./ChatMesssages";
import ChatInput from "./ChatInput";
import io from "socket.io-client";

const USER_CONNECT = "USER_CONNECT";
const MESSAGE_SEND = "MESSAGE_SEND";
const MESSAGE_RECIEVE = "MESSAGE_RECIEVE";
const MESSAGE_ERROR = "MESSAGE_ERROR";
const GET_CHATLOGS = "GET_CHATLOGS";
class Chat extends Component {
  state = {
    socket: io({ transports: ["websocket"] }),
    connected: false,
    chats: [],
    activeChat: null,
    events: []
  };
  //--------------- LIFECYCLE HOOKS ---------------//
  componentDidMount() {
    const { socket } = this.state;
    socket.on("connect", () => {
      console.log("connected");
    });
    socket.emit(
      USER_CONNECT,
      sessionStorage.getItem("authToken"),
      this.authCallback
    ); // sessionStorage.getItem("authToken")
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
  };

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
    this.setState({
      chats: newChats,
      events: [...events, ...newEvents],
      connected: true
    });
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
      <div className="ui container segment" style={{ width: "600px" }}>
        {/* Sidebar */}
        <RoomList
          chats={chats}
          activeChat={activeChat}
          onSetChat={chat => this.handleSetChat(chat)}
        />

        {activeChat ? (
          <React.Fragment>
            <ChatMessages chat={activeChat} />
            <ChatInput
              onSend={message => this.handleSendMessage(activeChat.id, message)}
            />
          </React.Fragment>
        ) : (
          <h1 className="header">NO CHAT SELECTED</h1>
        )}
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
