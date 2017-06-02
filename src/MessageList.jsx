import React, { Component } from "react";

import Message from "./Message.jsx";

class MessageList extends Component {
  render() {
    const messages = this.props.messages.map(message => {
      const { id, username, content, type, userColor } = message;

      return (
        <Message
          key={id}
          username={username}
          content={content}
          type={type}
          userColor={userColor}
        />
      );
    });

    return (
      <main className="messages">
        {messages}
      </main>
    );
  }
}
export default MessageList;
