import React, { Component } from 'react';
class RoomList extends Component {
    state = {}
    // chats={chats}
    // activeChat={activeChat}
    // onSetChat={(chat) => this.handleSetChat(chat)}

    renderList() {
        const { chats, activeChat, onSetChat } = this.props;
        const list = [];
        chats.forEach(chat => {
            let item;
            if (chat !== activeChat) {
                item =
                    <div className="ui item card"
                        key={chat.id}
                        onClick={() => onSetChat(chat)}
                    >
                        <div className="content">
                            {chat.name}
                        </div>
                    </div>;
            }
            else {
                item =
                    <div className="ui item card"
                        key={chat.id}
                        onClick={() => onSetChat(chat)}
                        style={{ "background": "#cfcfcf" }}
                    >
                        <div className="content">
                            {chat.name}
                        </div>
                    </div>;
            }
            list.push(item);
        });
        return list;
    }

    render() {
        return (
            <div className="ui right close rail">
                <div className="ui segment">
                    <div className="ui divided list">
                        {this.renderList()}
                    </div>
                </div>
            </div>
        );
    }
}

export default RoomList;