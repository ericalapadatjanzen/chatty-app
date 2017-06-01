import React, {Component} from "react";


class Message extends Component {

  get messageClass() {
    switch(this.props.type) {
      case "incomingMessage": return "message";
      case "incomingNotification": return "notification";
    }
  }

  render() {

    return (

      <div className={this.messageClass}>
        <span className="message-username">{this.props.username}</span>
        <span className="message-content">{this.props.content}</span>
      </div>


    );
  }
}
export default Message;