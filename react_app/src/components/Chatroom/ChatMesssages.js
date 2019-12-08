import React, { Component } from 'react';
import { formatDistance } from "date-fns";

class ChatMessages extends Component {
    state = {
        minutes: 0
    };

    messagesEndRef = React.createRef();

    componentDidMount() {
        this.interval = setInterval(() => this.tick(), 30000);
        this.scrollToBottom();
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    tick = () => {
        this.setState({ minutes: this.state.minutes + 1 });
    };

    scrollToBottom = () => {
        this.messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    };

    renderMessages = messages => {
        let counter = 0;
        return messages.map(message => (
            <React.Fragment>
                <div key={counter++} className="comment">
                    <div className="content">
                        <a className="author">{message.name}</a>
                        <div className="metadata">
                            <div className="date">
                                {formatDistance(new Date(message.created_at), new Date(), { addSuffix: true })}
                            </div>
                        </div>
                        <div className="text">
                            {message.message}
                        </div>
                    </div>
                </div>
                <div key={counter++} className="ui divider" />
            </React.Fragment>
        ));
        // return (
        //     <React.Fragment>
        //         <div className="comment">
        //             <div className="content">
        //                 <a className="author">Stevie Feliciano</a>
        //                 <div className="metadata">
        //                     <div className="date">2 days ago</div>
        //                 </div>
        //                 <div className="text">
        //                     Hey guys, I hope this example comment is helping you read this documentation.
        //                 </div>
        //             </div>
        //         </div>
        //         <div className="ui divider" />
        //         <div className="comment">
        //             <div className="content">
        //                 <a className="author">Stevie Feliciano</a>
        //                 <div className="metadata">
        //                     <div className="date">2 days ago</div>
        //                 </div>
        //                 <div className="text">
        //                     Hey guys, I hope this example comment is helping you read this documentation.
        //                 </div>
        //             </div>
        //         </div>
        //         <div className="ui divider" />
        //     </React.Fragment>
        // );
    }

    render() {
        return (
            <div className="ui comments" style={{ "height": "400px", "overflowY": "scroll" }}>
                {this.renderMessages(this.props.chat.messages)}
                <div ref={this.messagesEndRef} />
            </div>
        );
    }
}

export default ChatMessages;