import React, { Component } from "react";

class Message extends Component {
  get messageClass() {
    const lookup = {
      incomingMessage: "message",
      incomingNotification: "notification"
    };

    return lookup[this.props.type];
  }

  render() {
    const setColor = { color: this.props.userColor };

    return (
      <div className={this.messageClass}>
        <span className="message-username" style={setColor}>
          {this.props.username}
        </span>
        <span className="message-content">{this.props.content}</span>
      </div>
    );
  }
}
export default Message;
