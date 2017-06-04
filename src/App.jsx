import React, { Component } from "react";
import ChatBar from "./ChatBar.jsx";
import MessageList from "./MessageList.jsx";
import NavBar from "./NavBar.jsx";

class App extends Component {
  constructor(props) {
    super(props);

    // Could refector currentUser into object + add in usercolor
    this.state = {
      username: "anonymous",
      messages: [], //messages coming from the server get pushed here
      onlineUsers: 0,
      userColor: "black"
    };

    this.addNewMessage = this.addNewMessage.bind(this);
    this.addNewUserName = this.addNewUserName.bind(this);
  }

  // Adds a new notification and sends it to server as a string
  addNewNotification(note) {
    const notification = {
      type: "postNotification",
      content: note
    };
    this.socket.send(JSON.stringify(notification));
  }
  // Adds a new message and sends to the server as a string
  addNewMessage(content) {
    const message = {
      username: this.state.username,
      content,
      type: "postMessage",
      userColor: this.state.userColor
    };
    this.socket.send(JSON.stringify(message));
  }
  // If the old user name doesn't match the new user name then adds a new notification; user name gets set to newUserName
  addNewUserName(newUserName) {
    if (this.state.username !== newUserName) {
      this.addNewNotification(
        `${this.state.username || "anonymous"} changed their name to ${newUserName}`
      );
      this.setState({ username: newUserName });
    }
  }
  //invoked immedietly after component is mounted, data coming back from the server is assigned new states here
  componentDidMount() {
    this.socket = new WebSocket("ws://127.0.0.1:3001");

    this.socket.onmessage = message => {
      const incomingObj = JSON.parse(message.data);
      switch (incomingObj.type) {
        case "incomingMessage":
        case "incomingNotification":
          this.setState({ messages: this.state.messages.concat(incomingObj) });
          break;
        case "onlineUsers":
          this.setState({
            onlineUsers: incomingObj.onlineUsers
          });
          break;
        case "setColor":
          this.setState({
            userColor: incomingObj.userColor
          });
          break;
      }
    };

    this.socket.onopen = function() {
      console.log("connected to Server");
    };
  }
  // This renders the DOM elements
  render() {
    return (
      <div className="messageContainer">
        <NavBar onlineUsers={this.state.onlineUsers} />
        <MessageList messages={this.state.messages} />
        <ChatBar
          username={this.state.username}
          newMessage={this.addNewMessage}
          newUserName={this.addNewUserName}
        />
      </div>
    );
  }
}

export default App;
