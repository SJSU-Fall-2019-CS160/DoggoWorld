import React, { Component } from 'react';

class Chat extends Component {
    state = {}
    // props include onSend(message), messages, chat
    render() {
        return (
            <div className="ui container" style={{ "width": "600px" }}>
                {/* MESSAGELIST */}
                <div className="ui comments" style={{ "height": "400px", "overflow-y": "scroll" }}>
                    <div className="comment">
                        <div className="content">
                            <a className="author">Stevie Feliciano</a>
                            <div className="metadata">
                                <div className="date">2 days ago</div>
                            </div>
                            <div className="text">
                                Hey guys, I hope this example comment is helping you read this documentation.
                        </div>
                        </div>
                    </div>
                    <div className="ui divider" />
                    <div className="comment">
                        <div className="content">
                            <a className="author">Stevie Feliciano</a>
                            <div className="metadata">
                                <div className="date">2 days ago</div>
                            </div>
                            <div className="text">
                                Hey guys, I hope this example comment is helping you read this documentation.
                        </div>
                        </div>
                    </div>
                    <div className="ui divider" />
                    <div className="comment">
                        <div className="content">
                            <a className="author">Stevie Feliciano</a>
                            <div className="text">
                                Hey guys, I hope this example comment is helping you read this documentation.
                        </div>
                        </div>
                    </div>
                    <div className="ui divider" />
                    <div className="comment">
                        <div className="content">
                            <a className="author">Stevie Feliciano</a>
                            <div className="text">
                                Hey guys, I hope this example comment is helping you read this documentation.
                        </div>
                        </div>
                    </div>
                    <div className="ui divider" />
                    <div className="comment">
                        <div className="content">
                            <a className="author">Stevie Feliciano</a>
                            <div className="text">
                                Hey guys, I hope this example comment is helping you read this documentation.
                        </div>
                        </div>
                    </div>
                    <div className="ui divider" />
                    <div className="comment">
                        <div className="content">
                            <a className="author">Stevie Feliciano</a>
                            <div className="text">
                                Hey guys, I hope this example comment is helping you read this documentation.
                        </div>
                        </div>
                    </div>
                </div>

                {/* INPUTS */}
                <div className="ui form" style={{ "margin-bottom": "20px" }}>
                    <div className="field">
                        <textarea rows="2" ></textarea>
                    </div>
                    <button className="ui primary submit labeled icon button">
                        <i className="icon comment alternate"></i> Send
                    </button>
                </div>

            </div>

        );
    }
}

export default Chat;