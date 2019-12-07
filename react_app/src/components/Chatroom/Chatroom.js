import React, { Component } from 'react';
import Chat from "./Chat"
class Chatroom extends Component {
    state = {}
    render() {
        return (
            <div className="ui container">
                <h1>CHAT ROOM</h1>
                <Chat></Chat>
            </div>);
    }
}

export default Chatroom;