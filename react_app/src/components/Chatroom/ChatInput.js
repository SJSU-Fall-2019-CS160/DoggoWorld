import React, { Component } from 'react';

class ChatInput extends Component {
    state = {
        message: ""
    };

    handleSubmit = e => {
        e.preventDefault();
        this.sendMessage();
        this.setState({ message: "" });
    };

    sendMessage = () => {
        this.props.onSend(this.state.message);
    };

    render() {
        const { message } = this.state;
        return (
            <div className="ui form" >
                <div className="field">
                    <textarea
                        rows="2"
                        name="textarea"
                        value={message}
                        onChange={({ target }) => {
                            this.setState({ message: target.value });
                        }}
                    />
                </div>
                <button className="ui primary submit labeled icon button"
                    onClick={this.handleSubmit}
                    disabled={message.length < 1}
                >
                    <i className="icon comment alternate"></i> Send
                </button>
            </div>
        );
    }
}

export default ChatInput;
// onSend={(message) => this.handleSendMessage(activeChat.id, message)}
